'use client'

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import es from '@/translations/es'
import en from '@/translations/en'

export type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const TRANSLATIONS: Record<Language, any> = { es, en }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')
  const didMountRef = useRef(false)

  useEffect(() => {
    let next: Language = 'es'

    try {
      const saved = localStorage.getItem('language') as Language | null
      if (saved === 'es' || saved === 'en') {
        next = saved
      } else {
        const browserLang = (navigator.language || 'es').toLowerCase()
        next = browserLang.startsWith('en') ? 'en' : 'es'
      }
    } catch {
      const browserLang = (navigator.language || 'es').toLowerCase()
      next = browserLang.startsWith('en') ? 'en' : 'es'
    }

    setLanguageState(prev => (prev === next ? prev : next))
  }, [])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    try {
      localStorage.setItem('language', language)
    } catch {
      // ignore
    }
  }, [language])

  const t = useMemo(() => {
    const translations = TRANSLATIONS[language]

    return (key: string): string => {
      const keys = key.split('.')
      let value: any = translations

      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) return key
      }

      return value || key
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
