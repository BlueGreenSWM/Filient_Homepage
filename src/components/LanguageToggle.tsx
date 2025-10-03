"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            language === 'en'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {language === 'en' && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-blue-500 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            <Languages className="w-4 h-4" />
            EN
          </span>
        </button>
        <button
          onClick={() => setLanguage('ko')}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            language === 'ko'
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {language === 'ko' && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-blue-500 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">KO</span>
        </button>
      </div>
    </div>
  )
}
