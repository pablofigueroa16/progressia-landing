"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type IconProps = React.SVGProps<SVGSVGElement> & {
  className?: string
}

/**
 * Iconos personalizados para la sección Audience.
 * Usan `currentColor` para integrarse con el tema y clases Tailwind.
 */

export function AudienceBeginnersIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Head */}
      <path
        d="M12 11.2a3.2 3.2 0 1 0 0-6.4a3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body */}
      <path
        d="M5.5 19.2c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Plus badge */}
      <path
        d="M18.6 8.2h2.6M19.9 6.9v2.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AudienceCuriousIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Magnifier */}
      <path
        d="M10.5 16.2a5.7 5.7 0 1 0 0-11.4a5.7 5.7 0 0 0 0 11.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 15.2L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Spark inside */}
      <path
        d="M10.5 8.2v2.6M9.2 9.5h2.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AudienceTradersIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
      {...props}
    >
      {/* Trend line */}
      <path
        d="M4.5 16.5l5-5l3.3 3.3L19.5 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head */}
      <path
        d="M19.5 8v4.2h-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Baseline */}
      <path
        d="M4.5 19.5h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

