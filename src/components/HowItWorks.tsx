"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Download, MessageSquare, CheckCircle } from 'lucide-react'
import { BeforeAfterSlider } from './BeforeAfterSlider'

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

        {/* 30:70 Grid Layout - Desktop: Steps left (30%) + Slider right (70%), Mobile: Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 items-start">

          {/* Left: Compact Step Cards */}
          <div className="space-y-4 lg:order-1 order-2">
            {t.howItWorks.steps.map((step, index) => {
              const Icon = icons[index]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="card p-6"
                >
                  {/* Number + Icon at Top */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-gray-200">{step.number}</span>
                    <div className="p-2.5 rounded-xl bg-blue-600">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    {step.example && (
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <code className="text-xs text-blue-700 font-mono">
                          {step.example}
                        </code>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Before/After Slider */}
          <div className="flex items-center lg:pl-8 lg:order-2 order-1">
            <BeforeAfterSlider
              beforeImage="/images/desktop-before.png"
              afterImage="/images/desktop-after.png"
            />
          </div>
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
