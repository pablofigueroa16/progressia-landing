import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import { createChallengeSchema, CHALLENGE_LIMITS } from 'shared'

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Get challenges where user is a member
    const challenges = await prisma.challenge.findMany({
      where: {
        members: {
          some: { userId: session.id },
        },
        status: { in: ['PENDING', 'ACTIVE'] },
      },
      include: {
        creator: {
          include: { profile: true },
        },
        members: {
          include: {
            user: {
              include: { profile: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      challenges: challenges.map((c: typeof challenges[number]) => ({
        id: c.id,
        type: c.type,
        goalType: c.goalType,
        goalTarget: c.goalTarget,
        title: c.title,
        description: c.description,
        status: c.status,
        startsAt: c.startsAt,
        endsAt: c.endsAt,
        creatorId: c.creatorId,
        creatorName: c.creator.profile?.displayName || 'Usuario',
        winnerId: c.winnerId,
        members: c.members.map((m: typeof c.members[number]) => ({
          userId: m.userId,
          username: m.user.profile?.username || 'usuario',
          displayName: m.user.profile?.displayName || 'Usuario',
          avatarUrl: m.user.profile?.avatarUrl,
          progress: m.progress,
          isWinner: m.isWinner,
        })),
        myProgress: c.members.find((m: typeof c.members[number]) => m.userId === session.id)?.progress || 0,
      })),
    })
  } catch (error) {
    console.error('Get challenges error:', error)
    return NextResponse.json(
      { error: 'Error al obtener retos' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const validation = createChallengeSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { type, goalType, goalTarget, title, description, durationHours, invitedUserIds } = validation.data

    // Check subscription for challenge limits
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.id },
    })

    const isPro = subscription?.plan !== 'FREE' && subscription?.status === 'ACTIVE'

    if (!isPro) {
      // Count challenges created this week
      const startOfWeek = getStartOfWeek(new Date())
      const weeklyCount = await prisma.challenge.count({
        where: {
          creatorId: session.id,
          createdAt: { gte: startOfWeek },
        },
      })

      if (weeklyCount >= CHALLENGE_LIMITS.FREE_CHALLENGES_PER_WEEK) {
        return NextResponse.json(
          { error: 'Has alcanzado el límite de retos semanales. Actualiza a Pro para retos ilimitados.' },
          { status: 403 }
        )
      }
    }

    // Validate group size
    if (type === 'GROUP') {
      if (invitedUserIds.length < CHALLENGE_LIMITS.MIN_GROUP_SIZE - 1) {
        return NextResponse.json(
          { error: `Un reto grupal necesita al menos ${CHALLENGE_LIMITS.MIN_GROUP_SIZE} participantes` },
          { status: 400 }
        )
      }
      if (invitedUserIds.length > CHALLENGE_LIMITS.MAX_GROUP_SIZE - 1) {
        return NextResponse.json(
          { error: `Un reto grupal puede tener máximo ${CHALLENGE_LIMITS.MAX_GROUP_SIZE} participantes` },
          { status: 400 }
        )
      }
    }

    if (type === 'DUEL' && invitedUserIds.length !== 1) {
      return NextResponse.json(
        { error: 'Un duelo debe tener exactamente 2 participantes' },
        { status: 400 }
      )
    }

    // Verify all invited users exist and are friends
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: session.id, user2Id: { in: invitedUserIds } },
          { user1Id: { in: invitedUserIds }, user2Id: session.id },
        ],
      },
    })

    const friendIds = new Set(
      friendships.map((f: typeof friendships[number]) => (f.user1Id === session.id ? f.user2Id : f.user1Id))
    )

    const nonFriends = invitedUserIds.filter((id: string) => !friendIds.has(id))
    if (nonFriends.length > 0) {
      return NextResponse.json(
        { error: 'Solo puedes invitar a amigos a un reto' },
        { status: 400 }
      )
    }

    // Create challenge
    const endsAt = new Date(Date.now() + durationHours * 60 * 60 * 1000)

    const challenge = await prisma.challenge.create({
      data: {
        creatorId: session.id,
        type,
        goalType,
        goalTarget,
        title,
        description,
        status: 'PENDING',
        endsAt,
        members: {
          create: [
            { userId: session.id }, // Creator joins automatically
            ...invitedUserIds.map((userId) => ({ userId })),
          ],
        },
      },
      include: {
        members: {
          include: {
            user: { include: { profile: true } },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      challenge: {
        id: challenge.id,
        title: challenge.title,
        type: challenge.type,
        status: challenge.status,
        endsAt: challenge.endsAt,
        members: challenge.members.map((m: typeof challenge.members[number]) => ({
          userId: m.userId,
          username: m.user.profile?.username,
          displayName: m.user.profile?.displayName,
        })),
      },
    })
  } catch (error) {
    console.error('Create challenge error:', error)
    return NextResponse.json(
      { error: 'Error al crear el reto' },
      { status: 500 }
    )
  }
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

