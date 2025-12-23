import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import { onboardingSchema } from 'shared'

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const validation = onboardingSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { experience, objective, dailyGoal } = validation.data

    // Update profile
    await prisma.profile.update({
      where: { userId: session.id },
      data: {
        experience,
        objective,
        dailyGoal,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Perfil actualizado',
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Error al guardar preferencias' },
      { status: 500 }
    )
  }
}

