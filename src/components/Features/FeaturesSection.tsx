'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import FeatureCard from './FeatureCard'
import VideoPlayer from './VideoPlayer'
import VideoPlaceholder from './VideoPlaceholder'
import { FEATURES_CONFIG, VIDEO_SOURCES } from './features.data'

function FeaturesSection() {
  const { t } = useLanguage()
  const [activeFeatureId, setActiveFeatureId] = useState(1)

  // Get active feature config
  const activeFeature = FEATURES_CONFIG.find((f) => f.id === activeFeatureId)

  // Handle card click
  const handleCardClick = (id: number) => {
    setActiveFeatureId(id)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveFeatureId(id)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextId = id < FEATURES_CONFIG.length ? id + 1 : 1
      setActiveFeatureId(nextId)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevId = id > 1 ? id - 1 : FEATURES_CONFIG.length
      setActiveFeatureId(prevId)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Very subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

      {/* Very subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="features-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgb(156, 163, 175)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">{t.features.title}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Main Content: Cards (27%) + Video (73%) */}
        <div className="grid lg:grid-cols-[27%_73%] gap-10 items-end">
          {/* Left: Feature Cards - 모두 붙은 단일 컨테이너 */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            {FEATURES_CONFIG.map((feature, index) => {
              const isFirst = index === 0
              const isLast = index === FEATURES_CONFIG.length - 1

              return (
                <FeatureCard
                  key={feature.id}
                  id={feature.id}
                  icon={feature.icon}
                  title={t[`feature${feature.id}Title` as keyof typeof t] as string}
                  description={t[`feature${feature.id}Desc` as keyof typeof t] as string}
                  isActive={activeFeatureId === feature.id}
                  hasVideo={feature.hasVideo}
                  onClick={() => handleCardClick(feature.id)}
                  onKeyDown={(e) => handleKeyDown(e, feature.id)}
                  isFirst={isFirst}
                  isLast={isLast}
                />
              )
            })}
          </div>

          {/* Right: Video Player or Placeholder */}
          <div>
            {/* 기능 제목 및 설명 */}
            <motion.div
              key={`header-${activeFeatureId}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              {/* 기능 제목 */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t[`feature${activeFeatureId}Title` as keyof typeof t] as string}
              </h3>

              {/* 기능 설명 */}
              <p className="text-base text-gray-600 leading-relaxed">
                {t[`feature${activeFeatureId}Desc` as keyof typeof t] as string}
              </p>
            </motion.div>

            {/* Video or Placeholder */}
            <motion.div
              key={activeFeatureId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[16/9]"
            >
              {activeFeature?.hasVideo && activeFeature.videoKey ? (
                <VideoPlayer
                  videoUrl={VIDEO_SOURCES[activeFeature.videoKey]}
                  title={t[`feature${activeFeatureId}Title` as keyof typeof t] as string}
                />
              ) : (
                <VideoPlaceholder
                  title={t[`feature${activeFeatureId}Title` as keyof typeof t] as string}
                  comingSoonText={t.comingSoon}
                  comingSoonDescription={t.comingSoonDesc}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Responsive: Mobile Layout */}
        <style jsx>{`
          @media (max-width: 1023px) {
            .lg\\:sticky {
              position: static !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}

// Named export
export { FeaturesSection }

// Default export
export default FeaturesSection
