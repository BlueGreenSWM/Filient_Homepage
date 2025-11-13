"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Languages, BookOpen, Download } from 'lucide-react'
import { trackLanguageChanged, getCurrentSection, getTimeOnPage, trackCTAClicked } from '@/lib/analytics'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { EmailDownloadModal } from './EmailDownloadModal'
import Link from 'next/link'

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()
  const platform = usePlatformDetection()
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleLanguageChange = (newLanguage: 'en' | 'ko') => {
    if (newLanguage !== language) {
      const section = getCurrentSection()
      const timeOnPage = getTimeOnPage()
      trackLanguageChanged(language, newLanguage, timeOnPage, section)
      setLanguage(newLanguage)
    }
  }

  const handleDownloadClick = () => {
    trackCTAClicked(t?.hero?.downloadCta || 'Download', 'nav', 'download')
    if (platform.isMac) {
      window.location.hash = 'download'
      setShowEmailModal(true)
    }
  }

  const handleEmailSubmit = async (email: string) => {
    setIsDownloading(true)
    try {
      trackCTAClicked(`Email submitted: ${email}`, 'nav_email_modal', 'download')
      // Save email to Airtable (non-blocking)
      try {
        await fetch('/api/collect-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            platform: platform.platform,
            language
          })
        })
      } catch (e) {
        console.warn('Airtable collect-email failed (ignored):', e)
      }
      const response = await fetch('/api/download')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Filient.dmg'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        setTimeout(() => {
          setShowEmailModal(false)
          setIsDownloading(false)
        }, 1000)
      } else {
        console.error('Download failed:', await response.text())
        setIsDownloading(false)
      }
    } catch (error) {
      console.error('Download error:', error)
      setIsDownloading(false)
    }
  }

  const handleSkipEmail = async () => {
    setIsDownloading(true)
    try {
      trackCTAClicked('Skip email download', 'nav_email_modal', 'skip')
      const response = await fetch('/api/download')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Filient.dmg'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        setTimeout(() => {
          setShowEmailModal(false)
          setIsDownloading(false)
        }, 1000)
      } else {
        console.error('Download failed:', await response.text())
        setIsDownloading(false)
      }
    } catch (error) {
      console.error('Download error:', error)
      setIsDownloading(false)
    }
  }

  return (
    <>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {/* Download Button - Only show for Mac users */}
        {platform.isMac && (
          <button
            onClick={handleDownloadClick}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'ko' ? '다운로드' : 'Download'}</span>
          </button>
        )}

        {/* User Guide Button */}
      <Link
        href="/docs"
        className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
      >
        <BookOpen className="w-4 h-4" />
        <span>{t?.nav?.userGuide || (language === 'ko' ? '사용 가이드' : 'User Guide')}</span>
      </Link>

      {/* Language Toggle */}
      <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-200 p-1">
        <button
          onClick={() => handleLanguageChange('en')}
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
          onClick={() => handleLanguageChange('ko')}
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

      {/* Email Download Modal */}
      <EmailDownloadModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
        onSkipEmail={handleSkipEmail}
        isLoading={isDownloading}
      />
    </>
  )
}
