"use client"

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h3 className="text-xl font-bold text-gray-900">Filient</h3>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              {t.footer.links.privacy}
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              {t.footer.links.terms}
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              {t.footer.links.contact}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          {t.footer.copyright.replace('{{year}}', new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  )
}
