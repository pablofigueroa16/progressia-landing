import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-brand-500 text-white hover:bg-brand-600',
        secondary:
          'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-100',
        destructive:
          'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-foreground',
        xp: 'border-transparent bg-brand-500/20 text-brand-600 dark:text-brand-400',
        streak: 'border-transparent bg-accent-orange/20 text-accent-orange',
        bronze: 'border-transparent bg-accent-bronze/20 text-accent-bronze',
        silver: 'border-transparent bg-accent-silver/20 text-accent-silver',
        gold: 'border-transparent bg-accent-gold/20 text-accent-gold',
        diamond: 'border-transparent bg-accent-diamond/20 text-accent-diamond',
        pro: 'border-transparent bg-gradient-to-r from-accent-purple to-brand-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// XP Badge with icon
function XPBadge({ xp, className }: { xp: number; className?: string }) {
  return (
    <Badge variant="xp" className={cn('gap-1', className)}>
      <svg
        className="h-3 w-3"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      {xp} XP
    </Badge>
  )
}

// Streak Badge with fire icon
function StreakBadge({ streak, className }: { streak: number; className?: string }) {
  return (
    <Badge variant="streak" className={cn('gap-1', className)}>
      <span className="text-sm">🔥</span>
      {streak}
    </Badge>
  )
}

// League Badge
function LeagueBadge({ league, className }: { league: string; className?: string }) {
  const variant = league.toLowerCase() as 'bronze' | 'silver' | 'gold' | 'diamond'
  const icons = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
  }
  
  return (
    <Badge variant={variant} className={cn('gap-1', className)}>
      <span className="text-sm">{icons[variant] || '🏆'}</span>
      {league}
    </Badge>
  )
}

export { Badge, badgeVariants, XPBadge, StreakBadge, LeagueBadge }

