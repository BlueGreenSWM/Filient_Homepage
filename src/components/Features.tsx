"use client"

import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Clock, RotateCcw, Bot, PlayCircle, X } from 'lucide-react'
import { VIDEO_ASSETS } from '@/lib/constants'

type FeatureVideoKey = keyof typeof VIDEO_ASSETS.FEATURES

type FeatureItem = {
  title: string
  description: string
  videoKey?: FeatureVideoKey
}

const featureIcons = [Clock, RotateCcw, Bot]

export function Features() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()
  const featureItems = t.features.items as readonly FeatureItem[]
  const [activeVideoKey, setActiveVideoKey] = useState<FeatureVideoKey | null>(null)

  const activeVideo = activeVideoKey
    ? VIDEO_ASSETS.FEATURES?.[activeVideoKey]
    : null

  const activeFeature = useMemo(
    () => featureItems.find((item) => item.videoKey === activeVideoKey),
    [activeVideoKey, featureItems]
  )

  const handleClose = () => {
    setActiveVideoKey(null)
  }

  const handleFeatureClick = (videoKey?: FeatureVideoKey) => {
    if (!videoKey) return
    setActiveVideoKey((current) => (current === videoKey ? null : videoKey))
  }

  return (
    <section className="py-24 bg-gray-50" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.features.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((feature, index) => {
            const Icon = featureIcons[index] || Clock
            const isInteractive = Boolean(feature.videoKey)

            return (
              <motion.button
                key={index}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => handleFeatureClick(feature.videoKey)}
                className={`card p-6 h-full text-left transition-shadow ${
                  isInteractive
                    ? 'hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    : ''
                }`}
                aria-label={
                  isInteractive
                    ? `${feature.title} - ${t.features.watchVideoLabel}`
                    : feature.title
                }
              >
                <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                {isInteractive && (
                  <span className="mt-4 inline-flex items-center text-blue-600 font-medium">
                    {t.features.watchVideoLabel}
                    <PlayCircle className="w-5 h-5 ml-2" aria-hidden="true" />
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && activeFeature && (
          <motion.div
            key={activeVideoKey}
            className="max-w-5xl mx-auto px-6 md:px-0 mt-12"
            initial={{ opacity: 0, y: 40, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {activeFeature.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {activeFeature.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="sr-only">Close feature video</span>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="aspect-video bg-black"
              >
                <video
                  key={activeVideo.url}
                  src={activeVideo.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
