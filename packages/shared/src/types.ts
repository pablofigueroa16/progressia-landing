// Tipos compartidos para TradeX Academy

import type { League } from './schemas/gamification'

export type Role = 'USER' | 'ADMIN'
export type Experience = 'BEGINNER' | 'INTERMEDIATE' | 'PRO'
export type Objective = 'LEARN' | 'OPERATE' | 'COPY'
export type QuizType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ORDER_STEPS' | 'BEST_DECISION'
// League type is exported from ./schemas/gamification
export type ChallengeType = 'DUEL' | 'GROUP'
export type ChallengeStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
export type SubscriptionPlan = 'FREE' | 'PRO_MONTHLY' | 'PRO_YEARLY'
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'EXPIRED'

export interface UserSession {
  id: string
  email: string
  role: Role
  displayName: string
  username: string
  avatarUrl?: string
  isPro: boolean
}

export interface UserProgress {
  totalXP: number
  currentStreak: number
  longestStreak: number
  lessonsCompleted: number
  unitsCompleted: number
  levelsCompleted: number
  perfectQuizzes: number
  currentLevel: number
  weeklyXP: number
  league: League
}

export interface LevelWithProgress {
  id: string
  number: number
  title: string
  description?: string
  imageUrl?: string
  isPro: boolean
  isLocked: boolean
  progress: number // 0-100
  unitsCompleted: number
  totalUnits: number
}

export interface UnitWithProgress {
  id: string
  number: number
  title: string
  description?: string
  imageUrl?: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  isLocked: boolean
}

export interface LessonWithProgress {
  id: string
  number: number
  title: string
  description?: string
  duration: number
  xpReward: number
  isCompleted: boolean
  isLocked: boolean
}

export interface QuizQuestion {
  id: string
  type: QuizType
  question: string
  options: string[] | { id: string; text: string }[]
  explanation?: string
}

export interface QuizResult {
  score: number
  isPerfect: boolean
  xpEarned: number
  correctAnswers: number
  totalQuestions: number
  results: {
    questionId: string
    isCorrect: boolean
    correctAnswer: any
    userAnswer: any
  }[]
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  displayName: string
  avatarUrl?: string
  xp: number
  league: League
  isCurrentUser: boolean
}

export interface Badge {
  id: string
  code: string
  name: string
  description: string
  imageUrl?: string
  earnedAt?: Date
  isEarned: boolean
}

export interface Challenge {
  id: string
  type: ChallengeType
  goalType: string
  goalTarget: number
  title: string
  description?: string
  status: ChallengeStatus
  startsAt: Date
  endsAt: Date
  creatorId: string
  creatorName: string
  members: ChallengeMember[]
  myProgress?: number
  winnerId?: string
}

export interface ChallengeMember {
  userId: string
  username: string
  displayName: string
  avatarUrl?: string
  progress: number
  isWinner: boolean
}

export interface Friend {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  currentStreak: number
  weeklyXP: number
  league: League
  isOnline?: boolean
}

export interface FriendRequest {
  id: string
  senderId: string
  senderUsername: string
  senderDisplayName: string
  senderAvatarUrl?: string
  createdAt: Date
}

export interface Notification {
  id: string
  type: 'FRIEND_REQUEST' | 'CHALLENGE_INVITE' | 'BADGE_EARNED' | 'STREAK_WARNING' | 'CHALLENGE_ENDED'
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

