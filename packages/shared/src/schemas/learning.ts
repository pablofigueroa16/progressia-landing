import { z } from 'zod'

export const submitQuizSchema = z.object({
  lessonId: z.string(),
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.string()),
      z.array(z.number()),
    ]),
  })),
})

export const completeLessonSchema = z.object({
  lessonId: z.string(),
  timeSpent: z.number().min(0).optional(),
})

export const createLevelSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  xpRequired: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
  isPro: z.boolean().optional(),
})

export const createUnitSchema = z.object({
  levelId: z.string(),
  number: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isPublished: z.boolean().optional(),
})

export const createLessonSchema = z.object({
  unitId: z.string(),
  number: z.number().int().positive(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  content: z.string().min(1),
  xpReward: z.number().int().min(0).optional(),
  duration: z.number().int().min(1).optional(),
  isPublished: z.boolean().optional(),
})

export const createQuizQuestionSchema = z.object({
  lessonId: z.string(),
  type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'ORDER_STEPS', 'BEST_DECISION']),
  question: z.string().min(1),
  options: z.array(z.any()),
  correctAnswer: z.any(),
  explanation: z.string().optional(),
  order: z.number().int().optional(),
})

export type SubmitQuizInput = z.infer<typeof submitQuizSchema>
export type CompleteLessonInput = z.infer<typeof completeLessonSchema>
export type CreateLevelInput = z.infer<typeof createLevelSchema>
export type CreateUnitInput = z.infer<typeof createUnitSchema>
export type CreateLessonInput = z.infer<typeof createLessonSchema>
export type CreateQuizQuestionInput = z.infer<typeof createQuizQuestionSchema>

