"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './common/Button'
import { EmailDownloadModal } from './EmailDownloadModal'
import { FeatureHighlights } from './FeatureHighlights'
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
      {/* White background */}
      <div className="absolute inset-0 bg-white">
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[38%_62%] gap-12 items-start">
          {/* Left side - Text content */}
          <div className="text-left">
            {/* Eyebrow Text */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg font-bold text-gray-400 mb-4 uppercase tracking-wide"
            >
              {t.hero.eyebrow}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
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
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {platform.isMac ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="min-w-[220px] h-[64px] text-xl font-semibold shadow-[0_8px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={handleDownloadClick}
                  >
                    {t.hero.downloadCta}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    className="min-w-[220px] h-[64px] text-xl font-semibold shadow-[0_8px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_28px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={handleWaitlistClick}
                  >
                    {t.hero.waitlistCta}
                  </Button>
                )}
              </div>

              {/* Feature Highlights */}
              <FeatureHighlights />
            </motion.div>
          </div>

          {/* Right side - Demo Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block mt-8"
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

        {/* Press Coverage Section - Full Width, Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="hidden lg:block mt-8"
        >
          <div className="py-10 px-16 bg-gradient-to-r from-blue-50/20 via-purple-50/10 to-blue-50/20 rounded-2xl hover:bg-opacity-80 transition-all duration-300">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-gray-900">
                    {t.hero.press.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {t.hero.press.subtitle}
                  </p>
                </div>
              </div>

              <div className="h-12 w-px bg-gray-300 opacity-60"></div>

              <div className="flex gap-4 -ml-4">
                <a
                  href="https://mediaecon.com/news/view.php?bIdx=38142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <img
                    src="/news/mediaecon.png"
                    alt="미디어경제뉴스"
                    className="h-6 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://seenthis.kr/newspageeng/4217"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <img
                    src="/news/seenthis.png"
                    alt="seenthis"
                    className="h-6 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>

              <div className="h-12 w-px bg-gray-300"></div>

              {/* Disquiet Badge */}
              <div className="flex items-center gap-3">
                <a
                  href="https://disquiet.io/product/filient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="/images/disquiet_badge.png"
                    alt="Disquiet Product of the Week"
                    className="h-auto w-auto max-h-[85px]"
                  />
                </a>
                <p className="text-sm text-gray-500 font-medium whitespace-pre-line">
                  {t.hero.disquietPressLabel}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
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