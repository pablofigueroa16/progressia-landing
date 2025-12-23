import { NextResponse } from 'next/server'
import { prisma } from 'database'
import { verifySession } from '@/lib/auth'
import { calculateLeague } from '@/lib/gamification'

export async function GET() {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Get user stats in parallel
    const [
      totalXPResult,
      streak,
      lessonsCompleted,
      perfectQuizzes,
      badges,
      currentWeekEntry,
    ] = await Promise.all([
      prisma.xPEvent.aggregate({
        where: { userId: session.id },
        _sum: { amount: true },
      }),
      prisma.streak.findUnique({
        where: { userId: session.id },
      }),
      prisma.userLessonProgress.count({
        where: { userId: session.id, completed: true },
      }),
      prisma.quizAttempt.count({
        where: { userId: session.id, isPerfect: true },
      }),
      prisma.userBadge.findMany({
        where: { userId: session.id },
        include: { badge: true },
      }),
      getCurrentWeekEntry(session.id),
    ])

    // Count completed units and levels
    const completedLessons = await prisma.userLessonProgress.findMany({
      where: { userId: session.id, completed: true },
      include: {
        lesson: {
          include: {
            unit: {
              include: {
                lessons: { select: { id: true } },
                level: {
                  include: {
                    units: {
                      include: {
                        lessons: { select: { id: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    // Group by unit and level
    const completedLessonIds = new Set(completedLessons.map((p) => p.lessonId))
    const units = new Map<string, { total: number; completed: number }>()
    const levels = new Map<string, { total: number; completed: number }>()

    completedLessons.forEach((progress) => {
      const unit = progress.lesson.unit
      const level = unit.level

      // Unit progress
      if (!units.has(unit.id)) {
        const totalInUnit = unit.lessons.length
        const completedInUnit = unit.lessons.filter((l) =>
          completedLessonIds.has(l.id)
        ).length
        units.set(unit.id, { total: totalInUnit, completed: completedInUnit })
      }

      // Level progress
      if (!levels.has(level.id)) {
        const totalInLevel = level.units.reduce((sum, u) => sum + u.lessons.length, 0)
        const completedInLevel = level.units.reduce(
          (sum, u) =>
            sum + u.lessons.filter((l) => completedLessonIds.has(l.id)).length,
          0
        )
        levels.set(level.id, { total: totalInLevel, completed: completedInLevel })
      }
    })

    const unitsCompleted = Array.from(units.values()).filter(
      (u) => u.completed === u.total
    ).length
    const levelsCompleted = Array.from(levels.values()).filter(
      (l) => l.completed === l.total
    ).length

    const totalXP = totalXPResult._sum.amount || 0
    const weeklyXP = currentWeekEntry?.weeklyXP || 0
    const league = calculateLeague(weeklyXP)

    return NextResponse.json({
      totalXP,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      lessonsCompleted,
      unitsCompleted,
      levelsCompleted,
      perfectQuizzes,
      weeklyXP,
      league,
      badges: badges.map((ub) => ({
        code: ub.badge.code,
        name: ub.badge.name,
        description: ub.badge.description,
        earnedAt: ub.earnedAt,
      })),
    })
  } catch (error) {
    console.error('Get progress error:', error)
    return NextResponse.json(
      { error: 'Error al obtener el progreso' },
      { status: 500 }
    )
  }
}

async function getCurrentWeekEntry(userId: string) {
  const now = new Date()
  const startOfWeek = getStartOfWeek(now)

  const leagueWeek = await prisma.leagueWeek.findUnique({
    where: { weekStart: startOfWeek },
    include: {
      entries: {
        where: { userId },
      },
    },
  })

  return leagueWeek?.entries[0] || null
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

