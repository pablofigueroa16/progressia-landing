'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useLanguage } from '@/contexts/language-context'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Verificar que el componente está montado (para evitar problemas de SSR)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      toast({
        title: t('waitlist.toastErrorTitle'),
        description: t('waitlist.toastErrorMissingFields'),
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || t('waitlist.toastErrorDefault'))
      }

      toast({
        title: t('waitlist.toastSuccessTitle'),
        description: t('waitlist.toastSuccessDescription'),
        variant: 'success',
      })

      setName('')
      setEmail('')
      onClose()
    } catch (error) {
      toast({
        title: t('waitlist.toastErrorTitle'),
        description: error instanceof Error ? error.message : t('waitlist.toastErrorDefault'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label={t('waitlist.close')}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('waitlist.headerTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('waitlist.headerDescription')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('waitlist.nameLabel')}
            </label>
            <Input
              id="name"
              type="text"
              placeholder={t('waitlist.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('waitlist.emailLabel')}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t('waitlist.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-500 hover:bg-brand-600"
            disabled={isLoading || !name.trim() || !email.trim()}
          >
            {isLoading ? t('waitlist.submitting') : t('waitlist.submit')}
          </Button>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

