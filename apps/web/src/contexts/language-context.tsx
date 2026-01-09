'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')
  const [translations, setTranslations] = useState<Record<string, any>>({})

  // Detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase()
    const detectedLang = browserLang.startsWith('en') ? 'en' : 'es'
    const savedLang = localStorage.getItem('language') as Language
    
    setLanguageState(savedLang || detectedLang)
  }, [])

  // Load translations when language changes
  useEffect(() => {
    import(`@/translations/${language}.ts`)
      .then((module) => setTranslations(module.default))
      .catch((err) => console.error('Error loading translations:', err))
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    
    return value || key
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
