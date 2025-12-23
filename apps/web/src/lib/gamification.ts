import { prisma } from 'database'
import { XP_REWARDS, LEAGUE_THRESHOLDS } from 'shared'

export type XPEventType = 
  | 'LESSON_COMPLETE'
  | 'QUIZ_PASS'
  | 'QUIZ_PERFECT'
  | 'UNIT_COMPLETE'
  | 'LEVEL_COMPLETE'
  | 'DAILY_GOAL'
  | 'CHALLENGE_WIN'
  | 'CHALLENGE_PARTICIPATE'
  | 'STREAK_BONUS'

export async function awardXP(
  userId: string,
  type: XPEventType,
  amount?: number,
  metadata?: Record<string, any>
): Promise<{ xpAwarded: number; newTotal: number }> {
  const xpAmount = amount ?? XP_REWARDS[type] ?? 0

  // Create XP event
  await prisma.xPEvent.create({
    data: {
      userId,
      type,
      amount: xpAmount,
      metadata,
    },
  })

  // Update weekly leaderboard
  const now = new Date()
  const startOfWeek = getStartOfWeek(now)

  // Find or create current week
  let leagueWeek = await prisma.leagueWeek.findUnique({
    where: { weekStart: startOfWeek },
  })

  if (!leagueWeek) {
    leagueWeek = await prisma.leagueWeek.create({
      data: {
        weekStart: startOfWeek,
        weekEnd: getEndOfWeek(now),
      },
    })
  }

  // Update or create user's league entry
  const existingEntry = await prisma.leagueEntry.findUnique({
    where: {
      leagueWeekId_userId: {
        leagueWeekId: leagueWeek.id,
        userId,
      },
    },
  })

  if (existingEntry) {
    const newWeeklyXP = existingEntry.weeklyXP + xpAmount
    const newLeague = calculateLeague(newWeeklyXP)

    await prisma.leagueEntry.update({
      where: { id: existingEntry.id },
      data: {
        weeklyXP: newWeeklyXP,
        league: newLeague,
      },
    })
  } else {
    await prisma.leagueEntry.create({
      data: {
        leagueWeekId: leagueWeek.id,
        userId,
        weeklyXP: xpAmount,
        league: calculateLeague(xpAmount),
      },
    })
  }

  // Calculate total XP
  const totalXP = await prisma.xPEvent.aggregate({
    where: { userId },
    _sum: { amount: true },
  })

  return {
    xpAwarded: xpAmount,
    newTotal: totalXP._sum.amount || 0,
  }
}

export async function updateStreak(userId: string): Promise<{
  currentStreak: number
  streakIncreased: boolean
  bonusXP: number
}> {
  const streak = await prisma.streak.findUnique({
    where: { userId },
  })

  if (!streak) {
    // Create new streak
    await prisma.streak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveAt: new Date(),
      },
    })
    return { currentStreak: 1, streakIncreased: true, bonusXP: 0 }
  }

  const now = new Date()
  const userTimezone = 'America/Mexico_City' // TODO: Get from user profile
  
  const todayStart = getStartOfDay(now, userTimezone)
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000)
  
  const lastActiveDay = streak.lastActiveAt 
    ? getStartOfDay(streak.lastActiveAt, userTimezone)
    : null

  let newStreak = streak.currentStreak
  let streakIncreased = false
  let bonusXP = 0

  if (!lastActiveDay || lastActiveDay.getTime() < yesterdayStart.getTime()) {
    // Streak broken - reset to 1
    newStreak = 1
    streakIncreased = true
  } else if (lastActiveDay.getTime() < todayStart.getTime()) {
    // Continue streak
    newStreak = streak.currentStreak + 1
    streakIncreased = true

    // Check for streak bonuses
    if (newStreak === 7) {
      bonusXP = XP_REWARDS.STREAK_BONUS_7
      await awardXP(userId, 'STREAK_BONUS', bonusXP, { streakDays: 7 })
    } else if (newStreak === 30) {
      bonusXP = XP_REWARDS.STREAK_BONUS_30
      await awardXP(userId, 'STREAK_BONUS', bonusXP, { streakDays: 30 })
    }
  }
  // If lastActiveDay === todayStart, streak already counted today

  await prisma.streak.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streak.longestStreak),
      lastActiveAt: now,
    },
  })

  return { currentStreak: newStreak, streakIncreased, bonusXP }
}

export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const earnedBadges: string[] = []
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
  })
  const earnedCodes = new Set(userBadges.map((ub) => ub.badge.code))

  // Get user stats
  const [lessonsCompleted, perfectQuizzes, streak] = await Promise.all([
    prisma.userLessonProgress.count({
      where: { userId, completed: true },
    }),
    prisma.quizAttempt.count({
      where: { userId, isPerfect: true },
    }),
    prisma.streak.findUnique({ where: { userId } }),
  ])

  const badgeChecks = [
    { code: 'ROOKIE', condition: lessonsCompleted >= 1 },
    { code: 'QUIZ_MASTER', condition: perfectQuizzes >= 10 },
    { code: 'STREAK_7', condition: (streak?.currentStreak || 0) >= 7 },
    { code: 'STREAK_30', condition: (streak?.currentStreak || 0) >= 30 },
  ]

  for (const check of badgeChecks) {
    if (check.condition && !earnedCodes.has(check.code)) {
      const badge = await prisma.badge.findUnique({
        where: { code: check.code },
      })

      if (badge) {
        await prisma.userBadge.create({
          data: { userId, badgeId: badge.id },
        })
        earnedBadges.push(check.code)
      }
    }
  }

  return earnedBadges
}

export function calculateLeague(weeklyXP: number): 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' {
  if (weeklyXP >= LEAGUE_THRESHOLDS.DIAMOND) return 'DIAMOND'
  if (weeklyXP >= LEAGUE_THRESHOLDS.GOLD) return 'GOLD'
  if (weeklyXP >= LEAGUE_THRESHOLDS.SILVER) return 'SILVER'
  return 'BRONZE'
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function getEndOfWeek(date: Date): Date {
  const start = getStartOfWeek(date)
  return new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000 - 1)
}

function getStartOfDay(date: Date, timezone: string): Date {
  const d = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
  d.setHours(0, 0, 0, 0)
  return d
}

