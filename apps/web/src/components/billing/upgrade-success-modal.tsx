'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UpgradeSuccessModal({
  open,
  onClose,
  onComplete,
  completeLabel = 'Continuar',
  autoCompleteMs = 2200,
  title = '¡Gracias por suscribirte!',
  description = 'Tu plan Pro ya está activo. Disfruta de vidas infinitas y acceso completo.',
}: {
  open: boolean
  onClose: () => void
  onComplete: () => void
  completeLabel?: string
  autoCompleteMs?: number
  title?: string
  description?: string
}) {
  const didCompleteRef = useRef(false)

  useEffect(() => {
    if (!open) return
    didCompleteRef.current = false
    const t = setTimeout(() => {
      if (didCompleteRef.current) return
      didCompleteRef.current = true
      onComplete()
    }, autoCompleteMs)
    return () => clearTimeout(t)
  }, [open, autoCompleteMs, onComplete])

  const completeNow = () => {
    if (didCompleteRef.current) return
    didCompleteRef.current = true
    onComplete()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
        >
          {/* Backdrop */}
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-lg"
          >
            <div className="bg-gradient-to-br from-brand-500/20 to-accent-purple/20 border-2 border-brand-500/30 rounded-3xl p-6 sm:p-7 text-left shadow-[0_0_80px_rgba(168,85,247,0.15)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-brand-300 font-semibold">
                    <Crown className="w-5 h-5" />
                    Progressia Pro
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    {title}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 mt-3">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/20 border border-accent-purple/30 text-accent-purple text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  Vidas infinitas
                  <span className="font-black">∞</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/20 text-brand-300 text-sm font-bold">
                  Acceso completo
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" onClick={onClose}>
                  Cerrar
                </Button>
                <Button variant="premium" className="w-full" onClick={completeNow}>
                  {completeLabel}
                </Button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Redirigiendo automáticamente…
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


