"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type IconProps = React.SVGProps<SVGSVGElement> & {
  className?: string
}

/**
 * Iconos personalizados para la sección Method.
 * - Diseñados para usar `currentColor` (controlado vía clases Tailwind).
 * - Mantienen un look consistente (stroke redondeado, detalles simples).
 */

export function MethodLessonsIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Book */}
      <path
        d="M6 4.5h9.25c1.52 0 2.75 1.23 2.75 2.75V19c-1.4-1.05-3.2-1.5-5-1.5H6c-1.1 0-2 .9-2 2V6.5c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Page spine */}
      <path
        d="M8 7.5h7.5M8 10.5h7.5M8 13.5h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MethodPracticeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Circular arrows */}
      <path
        d="M20 12a8 8 0 0 1-14.3 4.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 12a8 8 0 0 1 14.3-4.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Arrow heads */}
      <path
        d="M18.5 6.5v3.2h-3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 17.5v-3.2h3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MethodProgressIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Rising bars */}
      <path
        d="M6 18v-4M12 18v-7M18 18v-10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Baseline */}
      <path
        d="M5 18h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Spark/goal dot */}
      <path
        d="M18 7.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

