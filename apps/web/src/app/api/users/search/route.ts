import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')

    if (!username || username.length < 2) {
      return NextResponse.json(
        { error: 'Ingresa al menos 2 caracteres' },
        { status: 400 }
      )
    }

    // Search by username
    const profiles = await prisma.profile.findMany({
      where: {
        username: {
          contains: username.toLowerCase(),
          mode: 'insensitive',
        },
        userId: {
          not: session.id, // Exclude current user
        },
      },
      include: {
        user: {
          select: { id: true },
        },
      },
      take: 10,
    })

    // Get weekly XP for each user
    const startOfWeek = getStartOfWeek(new Date())
    const leagueWeek = await prisma.leagueWeek.findUnique({
      where: { weekStart: startOfWeek },
    })

    const userIds = profiles.map((p) => p.userId)
    const leagueEntries = leagueWeek
      ? await prisma.leagueEntry.findMany({
          where: {
            leagueWeekId: leagueWeek.id,
            userId: { in: userIds },
          },
        })
      : []

    type LeagueEntryType = typeof leagueEntries[number]
    const xpMap = new Map<string, LeagueEntryType>(leagueEntries.map((e) => [e.userId, e]))

    // Check existing friendships
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: session.id, user2Id: { in: userIds } },
          { user1Id: { in: userIds }, user2Id: session.id },
        ],
      },
    })

    const friendIds = new Set(
      friendships.map((f) => (f.user1Id === session.id ? f.user2Id : f.user1Id))
    )

    // Check pending requests
    const pendingRequests = await prisma.friendRequest.findMany({
      where: {
        status: 'PENDING',
        OR: [
          { senderId: session.id, receiverId: { in: userIds } },
          { senderId: { in: userIds }, receiverId: session.id },
        ],
      },
    })

    const pendingMap = new Map(
      pendingRequests.map((r) => [
        r.senderId === session.id ? r.receiverId : r.senderId,
        r.senderId === session.id ? 'sent' : 'received',
      ])
    )

    const users = profiles.map((profile) => {
      const leagueEntry = xpMap.get(profile.userId)
      return {
        id: profile.userId,
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        weeklyXP: leagueEntry?.weeklyXP || 0,
        league: leagueEntry?.league || 'BRONZE',
        isFriend: friendIds.has(profile.userId),
        pendingRequest: pendingMap.get(profile.userId) || null,
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Search users error:', error)
    return NextResponse.json(
      { error: 'Error al buscar usuarios' },
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

