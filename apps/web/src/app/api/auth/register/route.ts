import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { registerSchema } from 'shared'
import { hashPassword, generateToken } from '@/lib/password'
import { createSession, checkRateLimit } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const allowed = await checkRateLimit(ip, 'register', 3, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor, espera antes de intentar de nuevo.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password, displayName, username } = validation.data

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }

    // Check if username exists
    const existingUsername = await prisma.profile.findUnique({
      where: { username: username.toLowerCase() },
    })

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Este nombre de usuario ya está en uso' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)
    const verifyToken = generateToken()

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        verifyToken,
        profile: {
          create: {
            displayName,
            username: username.toLowerCase(),
          },
        },
        streak: {
          create: {},
        },
        subscription: {
          create: {
            plan: 'FREE',
          },
        },
      },
      include: {
        profile: true,
      },
    })

    // Create session
    await createSession(user.id)

    // TODO: Send verification email
    // await sendVerificationEmail(email, verifyToken)

    return NextResponse.json({
      success: true,
      message: 'Cuenta creada exitosamente. Por favor verifica tu email.',
      user: {
        id: user.id,
        email: user.email,
        displayName: user.profile?.displayName,
        username: user.profile?.username,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Error al crear la cuenta. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}

