import { z } from 'zod'

export const setDailyGoalSchema = z.object({
  minutes: z.number().refine(val => [5, 10, 15].includes(val), {
    message: 'La meta diaria debe ser 5, 10 o 15 minutos',
  }),
})

export const leaderboardQuerySchema = z.object({
  range: z.enum(['weekly', 'allTime']).optional().default('weekly'),
  league: z.enum(['BRONZE', 'SILVER', 'GOLD', 'DIAMOND']).optional(),
  limit: z.number().int().min(1).max(100).optional().default(50),
})

export type SetDailyGoalInput = z.infer<typeof setDailyGoalSchema>
export type LeaderboardQuery = z.infer<typeof leaderboardQuerySchema>

// XP Constants
export const XP_REWARDS = {
  LESSON_COMPLETE: 10,
  QUIZ_PASS: 10,
  QUIZ_PERFECT_BONUS: 5,
  UNIT_COMPLETE: 25,
  LEVEL_COMPLETE: 100,
  CHALLENGE_WIN: 50,
  CHALLENGE_PARTICIPATE: 20,
  STREAK_BONUS_7: 25,
  STREAK_BONUS_30: 100,
} as const

// League thresholds (weekly XP)
export const LEAGUE_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 200,
  GOLD: 500,
  DIAMOND: 1000,
} as const

export type League = keyof typeof LEAGUE_THRESHOLDS

