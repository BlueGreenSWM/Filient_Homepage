"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Download, MessageSquare, CheckCircle } from 'lucide-react'

const icons = [Download, MessageSquare, CheckCircle]

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-white border-t border-gray-200" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.howItWorks.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.howItWorks.titleHighlight}
            </span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {t.howItWorks.steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col md:flex-row gap-8 items-start card p-8"
              >
                <div className="flex items-center gap-4 md:min-w-[200px]">
                  <span className="text-5xl font-bold text-gray-200">{step.number}</span>
                  <div className="p-3 rounded-xl bg-blue-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  {step.example && (
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <code className="text-sm text-blue-700 font-mono">
                        {step.example}
                      </code>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center card p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t.howItWorks.noManualFiling}
          </h3>
          <p className="text-gray-600">
            {t.howItWorks.noManualFilingDesc}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
