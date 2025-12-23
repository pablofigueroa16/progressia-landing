'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
  showValue?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, showValue, ...props }, ref) => (
  <div className="relative">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-700',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-brand-500 transition-all duration-500 ease-out',
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {showValue && (
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 -mr-8">
        {value}%
      </span>
    )}
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// XP Progress bar with glow effect
const XPProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps & { current: number; target: number }
>(({ className, current, target, ...props }, ref) => {
  const percentage = Math.min(100, (current / target) * 100)
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">XP Diario</span>
        <span className="font-medium text-brand-500">
          {current} / {target} XP
        </span>
      </div>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-700',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700 ease-out shadow-glow"
          style={{ width: `${percentage}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
XPProgress.displayName = 'XPProgress'

export { Progress, XPProgress }

