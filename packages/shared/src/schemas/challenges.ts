import { z } from 'zod'

export const createChallengeSchema = z.object({
  type: z.enum(['DUEL', 'GROUP']),
  goalType: z.enum(['LESSONS_COMPLETE', 'XP_EARNED', 'PERFECT_QUIZZES', 'TOTAL_XP']),
  goalTarget: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  durationHours: z.number().int().min(1).max(168), // max 1 semana
  invitedUserIds: z.array(z.string()).min(1).max(9), // mínimo 1, máximo 9 para grupo de 10
})

export const joinChallengeSchema = z.object({
  challengeId: z.string(),
})

export const leaveChallengeSchema = z.object({
  challengeId: z.string(),
})

export type CreateChallengeInput = z.infer<typeof createChallengeSchema>
export type JoinChallengeInput = z.infer<typeof joinChallengeSchema>
export type LeaveChallengeInput = z.infer<typeof leaveChallengeSchema>

// Challenge limits
export const CHALLENGE_LIMITS = {
  FREE_CHALLENGES_PER_WEEK: 2,
  PRO_CHALLENGES_PER_WEEK: -1, // unlimited
  MAX_GROUP_SIZE: 10,
  MIN_GROUP_SIZE: 2,
  INVITATION_COOLDOWN_HOURS: 1,
} as const

