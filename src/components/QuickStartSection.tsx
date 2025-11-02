"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from './common/Button'

export function QuickStartSection() {
  const { t } = useLanguage()

  const handleUserGuideClick = () => {
    window.location.href = '/docs'
  }

  const handleFeedbackClick = () => {
    window.open('https://forms.gle/QZKCSgFT4cwitzt79', '_blank')
  }

  return (
    <section className="pt-8 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* User Guide Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group"
          >
            <div className="
              bg-white
              rounded-2xl
              p-6
              border border-gray-200
              hover:border-gray-300
              hover:shadow-lg
              transition-all duration-300
              h-full
              flex flex-col
            ">
              {/* Icon */}
              <div className="text-center mb-3">
                <span className="text-4xl">{t.quickStart.userGuide.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {t.quickStart.userGuide.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 text-center mb-4 flex-grow">
                {t.quickStart.userGuide.subtitle}
              </p>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300"
                onClick={handleUserGuideClick}
              >
                {t.quickStart.userGuide.cta}
                <svg
                  className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </motion.div>

          {/* Feedback Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group"
          >
            <div className="
              bg-white
              rounded-2xl
              p-6
              border border-gray-200
              hover:border-gray-300
              hover:shadow-lg
              transition-all duration-300
              h-full
              flex flex-col
            ">
              {/* Icon */}
              <div className="text-center mb-3">
                <span className="text-4xl">{t.quickStart.feedback.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {t.quickStart.feedback.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-600 text-center mb-4 flex-grow">
                {t.quickStart.feedback.subtitle}
              </p>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 transition-all duration-300"
                onClick={handleFeedbackClick}
              >
                {t.quickStart.feedback.cta}
                <svg
                  className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
