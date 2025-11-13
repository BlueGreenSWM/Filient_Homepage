"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en | typeof translations.ko
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ko')

  useEffect(() => {
    // Priority 1: Check URL parameter (?lang=ko or ?lang=en)
    const urlParams = new URLSearchParams(window.location.search)
    const urlLang = urlParams.get('lang') as Language

    if (urlLang && (urlLang === 'en' || urlLang === 'ko')) {
      setLanguageState(urlLang)
      localStorage.setItem('language', urlLang)
      // Update HTML lang attribute
      document.documentElement.lang = urlLang
      return
    }

    // Priority 2: Check localStorage (user's saved preference)
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ko')) {
      setLanguageState(savedLanguage)
      // Update HTML lang attribute
      document.documentElement.lang = savedLanguage
      return
    }

    // Priority 3: Auto-detect browser language
    const browserLang = navigator.language.toLowerCase()
    const detectedLang: Language = browserLang.startsWith('ko') ? 'ko' : 'en'
    setLanguageState(detectedLang)
    localStorage.setItem('language', detectedLang)
    // Update HTML lang attribute
    document.documentElement.lang = detectedLang
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Update HTML lang attribute dynamically
    document.documentElement.lang = lang
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
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
