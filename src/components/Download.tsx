"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useSectionViewTracking } from '@/hooks/useSectionViewTracking'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from './common/Button'
import {
  trackDownloadInitiated,
  trackDownloadStarted,
  trackDownloadCompleted,
  trackDownloadFailed,
  trackWaitlistFormViewed,
  trackWaitlistEmailStarted,
  trackWaitlistSubmitted,
  getCurrentScrollDepth,
} from '@/lib/analytics'
import type { LatestVersionResponse } from '@/types/appcast'

export function Download() {
  const { ref, isVisible } = useScrollAnimation()
  const sectionRef = useSectionViewTracking('download')
  const platform = usePlatformDetection()
  const { t, language } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [latestVersion, setLatestVersion] = useState<LatestVersionResponse | null>(null)
  const [versionLoading, setVersionLoading] = useState(true)

  // Fetch latest version on mount
  useEffect(() => {
    const fetchLatestVersion = async () => {
      try {
        const response = await fetch('/api/latest-version')
        if (response.ok) {
          const data: LatestVersionResponse = await response.json()
          setLatestVersion(data)
        }
      } catch (error) {
        console.error('Failed to fetch latest version:', error)
      } finally {
        setVersionLoading(false)
      }
    }

    fetchLatestVersion()
  }, [])

  // Track waitlist form view for non-Mac users
  useEffect(() => {
    if (!platform.isMac && platform.platform !== 'unknown') {
      trackWaitlistFormViewed(platform.platform, 'auto')
    }
  }, [platform.isMac, platform.platform])

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      const emailDomain = email.split('@')[1] || 'unknown'
      trackWaitlistSubmitted(platform.platform, emailDomain, language)
      setSubmitted(true)
      console.log('Waitlist email:', email)
    }
  }

  const handleDownload = async () => {
    const scrollDepth = getCurrentScrollDepth()

    // Track download initiated
    trackDownloadInitiated('download', platform.platform, language, scrollDepth)

    const downloadStartTime = Date.now()

    try {
      // Track download started
      trackDownloadStarted(platform.platform, navigator.userAgent)

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

        // Track download completed
        const downloadTime = Math.round((Date.now() - downloadStartTime) / 1000)
        const fileSize = latestVersion?.fileSizeMB || '24MB'
        trackDownloadCompleted(fileSize, downloadTime)
      } else {
        const errorText = await response.text()
        trackDownloadFailed('api_error', errorText)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      trackDownloadFailed('network_error', errorMessage)
      console.error('Download failed:', error)
    }
  }

  return (
    <section
      className="py-24 bg-gray-50 border-t border-gray-200"
      ref={sectionRef as any}
      data-section="download"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.download.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.download.titleHighlight}
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t.download.subtitle}
          </p>

          {platform.isMac ? (
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleDownload}
                className="min-w-[200px]"
                disabled={versionLoading}
              >
                {versionLoading ? 'Loading...' : t.download.downloadCta}
              </Button>
              <div className="space-y-1">
                {latestVersion && !versionLoading && (
                  <p className="text-sm text-gray-600 font-medium">
                    Version {latestVersion.version} • {latestVersion.fileSizeMB}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {t.download.requirements}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {!submitted ? (
                <form onSubmit={handleWaitlist} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => trackWaitlistEmailStarted()}
                    placeholder={t.download.emailPlaceholder}
                    className="flex-1 bg-white text-gray-900 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <Button type="submit" variant="primary">
                    {t.download.waitlistCta}
                  </Button>
                </form>
              ) : (
                <div className="bg-green-50 text-green-700 rounded-lg p-4 border border-green-200">
                  {t.download.waitlistSuccess.replace('{{platform}}', platform.platform)}
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">{t.download.featuredIn}</p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {t.download.publications.map((pub, idx) => (
              <div key={idx} className="text-gray-600 font-medium">{pub}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
