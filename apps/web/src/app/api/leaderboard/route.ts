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
    const range = searchParams.get('range') || 'weekly'
    const league = searchParams.get('league')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    if (range === 'weekly') {
      // Get current week's leaderboard
      const startOfWeek = getStartOfWeek(new Date())
      
      const leagueWeek = await prisma.leagueWeek.findUnique({
        where: { weekStart: startOfWeek },
      })

      if (!leagueWeek) {
        return NextResponse.json({ leaderboard: [], myRank: null })
      }

      const whereClause: any = { leagueWeekId: leagueWeek.id }
      if (league) {
        whereClause.league = league
      }

      const entries = await prisma.leagueEntry.findMany({
        where: whereClause,
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: { weeklyXP: 'desc' },
        take: limit,
      })

      // Calculate ranks
      const leaderboard = entries.map((entry, index) => ({
        rank: index + 1,
        userId: entry.userId,
        username: entry.user.profile?.username || 'usuario',
        displayName: entry.user.profile?.displayName || 'Usuario',
        avatarUrl: entry.user.profile?.avatarUrl,
        xp: entry.weeklyXP,
        league: entry.league,
        isCurrentUser: entry.userId === session.id,
      }))

      // Find current user's rank if not in top results
      let myRank = leaderboard.find((e) => e.isCurrentUser)?.rank || null

      if (!myRank) {
        const userEntry = await prisma.leagueEntry.findUnique({
          where: {
            leagueWeekId_userId: {
              leagueWeekId: leagueWeek.id,
              userId: session.id,
            },
          },
        })

        if (userEntry) {
          const rank = await prisma.leagueEntry.count({
            where: {
              leagueWeekId: leagueWeek.id,
              weeklyXP: { gt: userEntry.weeklyXP },
            },
          })
          myRank = rank + 1
        }
      }

      return NextResponse.json({ leaderboard, myRank })
    } else {
      // All-time leaderboard
      const xpByUser = await prisma.xPEvent.groupBy({
        by: ['userId'],
        _sum: { amount: true },
        orderBy: { _sum: { amount: 'desc' } },
        take: limit,
      })

      const userIds = xpByUser.map((x) => x.userId)
      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        include: { profile: true },
      })

      type UserType = typeof users[number]
      const usersMap = new Map<string, UserType>(users.map((u) => [u.id, u]))

      const leaderboard = xpByUser.map((entry, index) => {
        const user = usersMap.get(entry.userId)
        return {
          rank: index + 1,
          userId: entry.userId,
          username: user?.profile?.username || 'usuario',
          displayName: user?.profile?.displayName || 'Usuario',
          avatarUrl: user?.profile?.avatarUrl,
          xp: entry._sum.amount || 0,
          isCurrentUser: entry.userId === session.id,
        }
      })

      return NextResponse.json({ leaderboard })
    }
  } catch (error) {
    console.error('Get leaderboard error:', error)
    return NextResponse.json(
      { error: 'Error al obtener el ranking' },
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

