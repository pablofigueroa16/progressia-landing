import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifyEmailSchema } from 'shared'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = verifyEmailSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      )
    }

    const { token } = validation.data

    // Find user with this token
    const user = await prisma.user.findFirst({
      where: { verifyToken: token },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 400 }
      )
    }

    // Mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verifyToken: null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Email verificado exitosamente',
    })
  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.json(
      { error: 'Error al verificar el email' },
      { status: 500 }
    )
  }
}

