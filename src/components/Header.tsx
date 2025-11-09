"use client"

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from './common/Button'
import { BookOpen } from 'lucide-react'

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Filient</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/docs">
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              {t.nav?.docs || 'Docs'}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
