'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WaitlistModal } from './waitlist-modal'

interface WaitlistButtonProps {
  text?: string
  variant?: 'default' | 'outline'
  className?: string
}

export function WaitlistButton({ 
  text = 'Únete Ahora - Lista de espera',
  variant = 'default',
  className = ''
}: WaitlistButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        size="xl"
        variant={variant}
        className={`w-full sm:w-auto group ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        {text}
        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

