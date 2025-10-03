"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from './common/Button'

export function Download() {
  const { ref, isVisible } = useScrollAnimation()
  const platform = usePlatformDetection()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      console.log('Waitlist email:', email)
    }
  }

  const handleDownload = async () => {
    try {
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
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200" ref={ref as any}>
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
              >
                {t.download.downloadCta}
              </Button>
              <p className="text-sm text-gray-500">
                {t.download.requirements}
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {!submitted ? (
                <form onSubmit={handleWaitlist} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
