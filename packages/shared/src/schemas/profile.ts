import { z } from 'zod'

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'PRO']).optional(),
  objective: z.enum(['LEARN', 'OPERATE', 'COPY']).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  avatarPreset: z.string().optional(),
  bio: z.string().max(280).optional().nullable(),
  dailyGoal: z.enum(['5', '10', '15']).transform(Number).optional(),
})

export const onboardingSchema = z.object({
  displayName: z.string().min(2).max(50),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  experience: z.enum(['BEGINNER', 'INTERMEDIATE', 'PRO']),
  objective: z.enum(['LEARN', 'OPERATE', 'COPY']),
  dailyGoal: z.number().refine(val => [5, 10, 15].includes(val)),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>

