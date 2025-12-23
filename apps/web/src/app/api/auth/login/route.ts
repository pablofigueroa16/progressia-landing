import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { loginSchema } from 'shared'
import { verifyPassword } from '@/lib/password'
import { createSession, checkRateLimit } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const allowed = await checkRateLimit(ip, 'login', 5, 15 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor, espera 15 minutos.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        profile: true,
        subscription: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // Create session
    await createSession(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        displayName: user.profile?.displayName || 'Usuario',
        username: user.profile?.username || '',
        avatarUrl: user.profile?.avatarUrl,
        isPro: user.subscription?.plan !== 'FREE' && user.subscription?.status === 'ACTIVE',
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error al iniciar sesión. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}

