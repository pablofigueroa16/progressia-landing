import { z } from 'zod'

export const createCheckoutSchema = z.object({
  plan: z.enum(['PRO_MONTHLY', 'PRO_YEARLY']),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
})

export const portalSessionSchema = z.object({
  returnUrl: z.string().url().optional(),
})

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>
export type PortalSessionInput = z.infer<typeof portalSessionSchema>

// Pricing
export const PRICING = {
  PRO_MONTHLY: {
    price: 15.99,
    currency: 'USD',
    interval: 'month',
  },
  PRO_YEARLY: {
    price: 149,
    currency: 'USD',
    interval: 'year',
    savings: '22%',
  },
} as const

