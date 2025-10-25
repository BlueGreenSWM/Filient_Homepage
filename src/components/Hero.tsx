"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './common/Button'
import { EmailDownloadModal } from './EmailDownloadModal'
import { FeatureHighlights } from './FeatureHighlights'
import { DisquietLeaderBadge } from './DisquietLeaderBadge'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { useSectionViewTracking } from '@/hooks/useSectionViewTracking'
import { useLanguage } from '@/contexts/LanguageContext'
import { VIDEO_ASSETS } from '@/lib/constants'
import {
  trackCTAClicked,
  trackVideoStart,
} from '@/lib/analytics'

export function Hero() {
  const sectionRef = useSectionViewTracking('hero')
  const platform = usePlatformDetection()
  const { t, language } = useLanguage()
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadClick = () => {
    trackCTAClicked(t.hero.downloadCta, 'hero', 'primary')
    setShowEmailModal(true)
  }

  const handleEmailSubmit = async (email: string) => {
    setIsDownloading(true)

    try {
      // Track email submission
      trackCTAClicked(`Email submitted: ${email}`, 'hero_email_modal', 'download')

      // Save email to Airtable
      await fetch('/api/collect-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          platform: platform.platform,
          language
        })
      })

      // Trigger actual download
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

        // Close modal after successful download
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
      // Track skip email action
      trackCTAClicked('Skip email download', 'hero_email_modal', 'skip')

      // Trigger actual download without email collection
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

        // Close modal after successful download
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

  const handleWaitlistClick = () => {
    trackCTAClicked(t.hero.waitlistCta, 'hero', 'primary')
  }

  return (
    <section
      ref={sectionRef as any}
      data-section="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Light theme background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[40%_60%] gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left">
            {/* Eyebrow Text */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base font-semibold text-gray-500 mb-4 uppercase tracking-wide"
            >
              {t.hero.eyebrow}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                {t.hero.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {t.hero.titleHighlight}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 space-y-2"
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {t.hero.subtitle2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-start"
            >
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {platform.isMac ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="min-w-[220px] h-[64px] text-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={handleDownloadClick}
                  >
                    {t.hero.downloadCta}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    className="min-w-[220px] h-[64px] text-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={handleWaitlistClick}
                  >
                    {t.hero.waitlistCta}
                  </Button>
                )}

                {/* Disquiet Badge - 가로로 배치, 높이 맞춤 */}
                <div className="flex items-center h-[72px]">
                  <iframe
                    title="disquiet-badge"
                    src="https://badge.disquiet.io/vote-badge?productUrlSlug=filient&mode=light"
                    className="h-[72px] w-[240px] border-0"
                    style={{ overflow: 'hidden', pointerEvents: 'auto' }}
                    scrolling="no"
                  />
                </div>
              </div>

              {/* Disquiet Leader Badge */}
              <DisquietLeaderBadge />

              {/* Feature Highlights */}
              <FeatureHighlights />
            </motion.div>
          </div>

          {/* Right side - Demo Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                src={VIDEO_ASSETS.DEMO.url}
                poster={VIDEO_ASSETS.DEMO.thumbnail}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
                onPlay={() => trackVideoStart('hero_inline')}
              >
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
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
    </section>
  )
}