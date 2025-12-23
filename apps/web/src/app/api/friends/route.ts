import { NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Get all friendships where user is either user1 or user2
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: session.id },
          { user2Id: session.id },
        ],
      },
      include: {
        user1: {
          include: {
            profile: true,
            streak: true,
          },
        },
        user2: {
          include: {
            profile: true,
            streak: true,
          },
        },
      },
    })

    // Get weekly XP for friends
    const startOfWeek = getStartOfWeek(new Date())
    const leagueWeek = await prisma.leagueWeek.findUnique({
      where: { weekStart: startOfWeek },
    })

    const friendIds = friendships.map((f) =>
      f.user1Id === session.id ? f.user2Id : f.user1Id
    )

    const leagueEntries = leagueWeek
      ? await prisma.leagueEntry.findMany({
          where: {
            leagueWeekId: leagueWeek.id,
            userId: { in: friendIds },
          },
        })
      : []

    type LeagueEntryType = typeof leagueEntries[number]
    const xpMap = new Map<string, LeagueEntryType>(leagueEntries.map((e) => [e.userId, e]))

    const friends = friendships.map((friendship) => {
      const friend = friendship.user1Id === session.id
        ? friendship.user2
        : friendship.user1
      const leagueEntry = xpMap.get(friend.id)

      return {
        id: friend.id,
        username: friend.profile?.username || 'usuario',
        displayName: friend.profile?.displayName || 'Usuario',
        avatarUrl: friend.profile?.avatarUrl,
        currentStreak: friend.streak?.currentStreak || 0,
        weeklyXP: leagueEntry?.weeklyXP || 0,
        league: leagueEntry?.league || 'BRONZE',
      }
    })

    return NextResponse.json({ friends })
  } catch (error) {
    console.error('Get friends error:', error)
    return NextResponse.json(
      { error: 'Error al obtener amigos' },
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

