import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function GET() {
  // Útil para comprobar rápidamente que el endpoint existe (no expone secretos).
  return NextResponse.json({ ok: true })
}

function mapStripeStatusToDb(status: Stripe.Subscription.Status): 'ACTIVE' | 'PAST_DUE' | 'EXPIRED' {
  if (status === 'active' || status === 'trialing') return 'ACTIVE'
  if (status === 'past_due' || status === 'unpaid') return 'PAST_DUE'
  return 'EXPIRED'
}

function inferPlanFromStripeSubscription(subscription: Stripe.Subscription): 'PRO_MONTHLY' | 'PRO_YEARLY' | null {
  const interval = subscription.items.data[0]?.price?.recurring?.interval
  if (interval === 'month') return 'PRO_MONTHLY'
  if (interval === 'year') return 'PRO_YEARLY'
  return null
}

export async function POST(req: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET no está configurado')
      return NextResponse.json({ error: 'Webhook no configurado' }, { status: 500 })
    }

    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log('[stripe webhook]', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = typeof session.customer === 'string' ? session.customer : null
        const email = session.customer_details?.email || session.customer_email || null

        let userId = session.metadata?.userId || session.client_reference_id || undefined
        const metadataPlan = session.metadata?.plan as 'PRO_MONTHLY' | 'PRO_YEARLY' | undefined
        const stripeSubscriptionId = session.subscription as string | null

        // Si por algún motivo no llega metadata.userId (por ejemplo, checkout creado fuera de la app),
        // intentamos resolverlo por stripeCustomerId o email.
        if (!userId && customerId) {
          const sub = await prisma.subscription.findUnique({
            where: { stripeCustomerId: customerId },
            select: { userId: true },
          })
          userId = sub?.userId
        }

        if (!userId && email) {
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: { id: true },
          })
          userId = user?.id
        }

        console.log('[stripe webhook] checkout.session.completed', {
          sessionId: session.id,
          userId: userId ?? null,
          customerId,
          email,
          stripeSubscriptionId,
          metadataPlan: metadataPlan ?? null,
        })

        if (userId && stripeSubscriptionId) {
          let stripeSub: Stripe.Subscription | null = null
          try {
            stripeSub = await stripe.subscriptions.retrieve(stripeSubscriptionId)
          } catch (err) {
            console.error('[stripe webhook] No se pudo recuperar la suscripción en Stripe (¿test/live mismatch o key incorrecta?)', {
              stripeSubscriptionId,
              err,
            })
          }

          const inferredPlan = stripeSub ? inferPlanFromStripeSubscription(stripeSub) : null
          const plan = metadataPlan ?? inferredPlan

          if (!plan) {
            console.error('No se pudo determinar el plan desde metadata ni desde Stripe subscription', {
              userId,
              stripeSubscriptionId,
            })
            break
          }

          await prisma.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: customerId ?? undefined,
              stripeSubscriptionId,
              plan,
              status: stripeSub ? mapStripeStatusToDb(stripeSub.status) : 'ACTIVE',
              currentPeriodStart: stripeSub ? new Date(stripeSub.current_period_start * 1000) : undefined,
              currentPeriodEnd: stripeSub ? new Date(stripeSub.current_period_end * 1000) : undefined,
            },
            update: {
              stripeCustomerId: customerId ?? undefined,
              stripeSubscriptionId,
              plan,
              status: stripeSub ? mapStripeStatusToDb(stripeSub.status) : 'ACTIVE',
              currentPeriodStart: stripeSub ? new Date(stripeSub.current_period_start * 1000) : undefined,
              currentPeriodEnd: stripeSub ? new Date(stripeSub.current_period_end * 1000) : undefined,
            },
          })
        } else if (userId && metadataPlan) {
          // Fallback si por algún motivo no vino subscription id (poco común en modo subscription)
          await prisma.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: customerId ?? undefined,
              plan: metadataPlan,
              status: 'ACTIVE',
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + (metadataPlan === 'PRO_YEARLY' ? 365 : 30) * 24 * 60 * 60 * 1000),
            },
            update: {
              stripeCustomerId: customerId ?? undefined,
              plan: metadataPlan,
              status: 'ACTIVE',
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + (metadataPlan === 'PRO_YEARLY' ? 365 : 30) * 24 * 60 * 60 * 1000),
            },
          })
        } else {
          console.error('[stripe webhook] No se pudo resolver userId para checkout.session.completed', {
            sessionId: session.id,
            customerId,
            email,
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        const inferredPlan = inferPlanFromStripeSubscription(subscription)
        const stripeCustomerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : (subscription.customer as Stripe.Customer | null)?.id ?? null

        const primaryUpdate = await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: mapStripeStatusToDb(subscription.status),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            ...(inferredPlan ? { plan: inferredPlan } : {}),
          },
        })

        // Si no encontramos por stripeSubscriptionId (por ejemplo, no se procesó checkout.session.completed),
        // intentamos por stripeCustomerId.
        if (primaryUpdate.count === 0 && stripeCustomerId) {
          await prisma.subscription.updateMany({
            where: { stripeCustomerId },
            data: {
              stripeSubscriptionId: subscription.id,
              status: mapStripeStatusToDb(subscription.status),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              ...(inferredPlan ? { plan: inferredPlan } : {}),
            },
          })
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan: 'FREE',
            status: 'EXPIRED',
            stripeSubscriptionId: null,
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        if (invoice.subscription) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: invoice.subscription as string },
            data: { status: 'PAST_DUE' },
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

