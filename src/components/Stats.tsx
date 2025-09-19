"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from './common/AnimatedCounter'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const stats = [
  {
    value: 230,
    suffix: ' hours',
    label: 'Saved per year',
  },
  {
    value: 54,
    suffix: '%',
    label: 'Less time searching',
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Files organized daily',
  },
  {
    value: 5,
    suffix: ' min',
    label: 'Average setup time',
  },
]

export function Stats() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 border-t border-gray-900" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isVisible && (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                )}
              </div>
              <p className="text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}