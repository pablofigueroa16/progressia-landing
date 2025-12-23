import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from 'database'
import type { UserSession } from 'shared'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-change-in-production'
)

const SESSION_COOKIE = 'progressia_session'
const SESSION_EXPIRY = 60 * 60 * 24 * 7 // 7 days

export async function createSession(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  // Store session in database
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY * 1000)
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })

  return token
}

export async function verifySession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) return null

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    // Check if session exists in database
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            profile: true,
            subscription: true,
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session
      if (session) {
        await prisma.session.delete({ where: { id: session.id } })
      }
      return null
    }

    const { user } = session
    
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.profile?.displayName || 'Usuario',
      username: user.profile?.username || '',
      avatarUrl: user.profile?.avatarUrl || undefined,
      isPro: user.subscription?.plan !== 'FREE' && user.subscription?.status === 'ACTIVE',
    }
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (token) {
      await prisma.session.deleteMany({ where: { token } })
    }

    cookieStore.delete(SESSION_COOKIE)
  } catch {
    // Ignore errors during logout
  }
}

export async function requireAuth(): Promise<UserSession> {
  const session = await verifySession()
  if (!session) {
    throw new Error('No autorizado')
  }
  return session
}

export async function requireAdmin(): Promise<UserSession> {
  const session = await requireAuth()
  if (session.role !== 'ADMIN') {
    throw new Error('Se requieren permisos de administrador')
  }
  return session
}

// Rate limiting helper
export async function checkRateLimit(
  identifier: string,
  endpoint: string,
  maxRequests: number,
  windowMs: number
): Promise<boolean> {
  const windowStart = new Date(Date.now() - windowMs)

  // Clean old entries
  await prisma.rateLimit.deleteMany({
    where: {
      windowStart: { lt: windowStart },
    },
  })

  // Get or create rate limit entry
  const entry = await prisma.rateLimit.findUnique({
    where: {
      identifier_endpoint: { identifier, endpoint },
    },
  })

  if (!entry) {
    await prisma.rateLimit.create({
      data: { identifier, endpoint },
    })
    return true
  }

  if (entry.windowStart < windowStart) {
    // Reset window
    await prisma.rateLimit.update({
      where: { id: entry.id },
      data: { count: 1, windowStart: new Date() },
    })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  await prisma.rateLimit.update({
    where: { id: entry.id },
    data: { count: entry.count + 1 },
  })

  return true
}

