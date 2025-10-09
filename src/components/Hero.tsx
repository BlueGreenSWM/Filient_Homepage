"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from './common/Button'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { useSectionViewTracking } from '@/hooks/useSectionViewTracking'
import { useLanguage } from '@/contexts/LanguageContext'
import { X, Play } from 'lucide-react'
import {
  trackVideoOpened,
  trackVideoStart,
  trackCTAClicked,
  getTimeOnPage,
} from '@/lib/analytics'

export function Hero() {
  const sectionRef = useSectionViewTracking('hero')
  const platform = usePlatformDetection()
  const { t } = useLanguage()
  const [showDemo, setShowDemo] = useState(false)

  const handleDemoOpen = () => {
    const timeOnPage = getTimeOnPage()
    trackVideoOpened('hero', timeOnPage)
    setShowDemo(true)
  }

  const handleVideoReady = () => {
    trackVideoStart('a6qRC__E0ZM')
  }

  const handleDownloadClick = () => {
    trackCTAClicked(t.hero.downloadCta, 'hero', 'primary')
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            {t.hero.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.hero.titleHighlight}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {platform.isMac ? (
            <>
              <Button
                variant="primary"
                size="lg"
                className="min-w-[200px]"
                onClick={handleDownloadClick}
              >
                {t.hero.downloadCta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                onClick={handleDemoOpen}
              >
                <Play className="w-4 h-4 mr-2" />
                {t.hero.watchDemo}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="lg"
                className="min-w-[200px]"
                onClick={handleWaitlistClick}
              >
                {t.hero.waitlistCta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                onClick={handleDemoOpen}
              >
                <Play className="w-4 h-4 mr-2" />
                {t.hero.watchDemo}
              </Button>
            </>
          )}
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <div className="badge badge-primary">AI-Powered</div>
          <div className="badge badge-success">Local Processing</div>
        </motion.div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowDemo(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/a6qRC__E0ZM?autoplay=1"
                title="Filient Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                onLoad={handleVideoReady}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}