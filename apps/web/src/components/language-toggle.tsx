'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className={className}
      aria-label="Toggle language"
    >
      <span className="text-sm font-semibold">
        {language === 'es' ? 'EN' : 'ES'}
      </span>
    </Button>
  )
}
