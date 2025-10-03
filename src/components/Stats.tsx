"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from './common/AnimatedCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'

export function Stats() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  return (
    <section className="py-20 border-t border-gray-200 bg-white" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {t.stats.items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center card p-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {isVisible && (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                )}
              </div>
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
