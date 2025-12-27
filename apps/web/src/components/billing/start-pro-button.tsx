'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers'

export function StartProButton({ className }: { className?: string }) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // No autenticado: mantener el flujo actual (registro con intención de Pro)
  if (!isLoading && !user) {
    return (
      <Link href="/register?plan=pro">
        <Button variant="premium" className={className ?? 'w-full'}>
          Comenzar con Pro
        </Button>
      </Link>
    )
  }

  // Ya es Pro
  if (!isLoading && user?.isPro) {
    return (
      <Link href="/learn">
        <Button variant="premium" className={className ?? 'w-full'}>
          <Crown className="w-4 h-4 mr-2" />
          Ya eres Pro
        </Button>
      </Link>
    )
  }

  const handleCheckout = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'PRO_MONTHLY',
          successPath: '/profile?upgraded=true',
          cancelPath: '/?upgradeCanceled=true',
        }),
      })

      if (res.status === 401) {
        router.push('/register?plan=pro')
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      variant="premium"
      className={className ?? 'w-full'}
      onClick={handleCheckout}
      isLoading={isLoading || isSubmitting}
    >
      Comenzar con Pro
    </Button>
  )
}


