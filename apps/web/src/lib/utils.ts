import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`
  }
  return xp.toString()
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function getLeagueColor(league: string): string {
  switch (league) {
    case 'DIAMOND':
      return 'text-accent-diamond'
    case 'GOLD':
      return 'text-accent-gold'
    case 'SILVER':
      return 'text-accent-silver'
    case 'BRONZE':
    default:
      return 'text-accent-bronze'
  }
}

export function getLeagueBgColor(league: string): string {
  switch (league) {
    case 'DIAMOND':
      return 'bg-accent-diamond/20'
    case 'GOLD':
      return 'bg-accent-gold/20'
    case 'SILVER':
      return 'bg-accent-silver/20'
    case 'BRONZE':
    default:
      return 'bg-accent-bronze/20'
  }
}

export function getProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.round((current / total) * 100))
}

export function timeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'ahora mismo'
  if (diffMins < 60) return `hace ${diffMins} min`
  if (diffHours < 24) return `hace ${diffHours}h`
  if (diffDays < 7) return `hace ${diffDays} días`
  return past.toLocaleDateString('es-ES')
}

export function generateAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&backgroundColor=22c55e`
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥👑'
  if (streak >= 14) return '🔥💪'
  if (streak >= 7) return '🔥⭐'
  if (streak >= 3) return '🔥'
  return '✨'
}

export function getRankEmoji(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return ''
  }
}

