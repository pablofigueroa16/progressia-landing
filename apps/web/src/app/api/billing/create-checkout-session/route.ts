import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { plan } = body

    if (!['PRO_MONTHLY', 'PRO_YEARLY'].includes(plan)) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

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

    // Get price ID
    const priceId = plan === 'PRO_MONTHLY'
      ? process.env.STRIPE_PRICE_MONTHLY
      : process.env.STRIPE_PRICE_YEARLY

    if (!priceId) {
      return NextResponse.json(
        { error: 'Configuración de precios no disponible' },
        { status: 500 }
      )
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
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

