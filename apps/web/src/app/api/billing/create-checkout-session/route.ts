import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const DEFAULT_PRO_PRODUCT_ID = 'prod_TgCGTchgFOK6Vh'

function isSafeRelativePath(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const path = value.trim()
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false
  if (path.includes('://')) return false
  return true
}

function getAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL || ''
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

async function resolvePriceId(plan: 'PRO_MONTHLY' | 'PRO_YEARLY'): Promise<string> {
  const direct = plan === 'PRO_MONTHLY'
    ? process.env.STRIPE_PRICE_MONTHLY
    : process.env.STRIPE_PRICE_YEARLY

  // Prefer explicit price envs when available (more deterministic)
  if (direct) return direct

  const productId = process.env.STRIPE_PRO_PRODUCT_ID || DEFAULT_PRO_PRODUCT_ID
  if (!productId) {
    throw new Error('STRIPE_PRO_PRODUCT_ID no está configurado')
  }

  // Checkout requiere un Price (no un Product). Si sólo tenemos Product ID,
  // listamos precios activos del producto y elegimos por intervalo.
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  })

  const targetInterval = plan === 'PRO_MONTHLY' ? 'month' : 'year'
  const matches = prices.data.filter((p) => p.recurring?.interval === targetInterval)

  // Si hay múltiples, tomamos el de menor monto por defecto
  const match = matches
    .filter((p) => typeof p.unit_amount === 'number')
    .sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))[0] ?? matches[0]

  if (!match?.id) {
    throw new Error(`No se encontró un Price activo para el producto ${productId} con intervalo ${targetInterval}`)
  }

  return match.id
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { plan } = body
    const appUrl = getAppUrl()

    if (!['PRO_MONTHLY', 'PRO_YEARLY'].includes(plan)) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    if (!appUrl) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_APP_URL no está configurado' },
        { status: 500 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY no está configurado' },
        { status: 500 }
      )
    }

    const successPath = isSafeRelativePath(body?.successPath)
      ? body.successPath.trim()
      : '/profile?success=true'

    const cancelPath = isSafeRelativePath(body?.cancelPath)
      ? body.cancelPath.trim()
      : '/pricing?canceled=true'

    // Get or create Stripe customer
    let subscription = await prisma.subscription.findUnique({
      where: { userId: session.id },
    })

    let customerId = subscription?.stripeCustomerId

    if (!customerId) {
      // Get user email
      const user = await prisma.user.findUnique({
        where: { id: session.id },
      })

      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: session.id },
      })

      customerId = customer.id

      // Update subscription record
      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { stripeCustomerId: customerId },
        })
      } else {
        await prisma.subscription.create({
          data: {
            userId: session.id,
            stripeCustomerId: customerId,
            plan: 'FREE',
          },
        })
      }
    }

    // Get price ID (from explicit env or resolved from product)
    const priceId = await resolvePriceId(plan)

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      client_reference_id: session.id,
      subscription_data: {
        metadata: {
          userId: session.id,
          plan,
        },
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}${successPath}`,
      cancel_url: `${appUrl}${cancelPath}`,
      metadata: {
        userId: session.id,
        plan,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Create checkout session error:', error)
    return NextResponse.json(
      { error: 'Error al crear sesión de pago' },
      { status: 500 }
    )
  }
}

