"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Check, X } from 'lucide-react'

const comparisonData = [
  {
    feature: 'Setup complexity',
    filient: 'Write in plain English',
    hazel: 'Complex rule builder',
    manual: 'No automation',
  },
  {
    feature: 'Learning curve',
    filient: 'Zero - just describe what you want',
    hazel: 'Steep - requires technical knowledge',
    manual: 'None',
  },
  {
    feature: 'Flexibility',
    filient: 'Natural language commands',
    hazel: 'Limited to predefined patterns',
    manual: 'Full manual control',
  },
  {
    feature: 'Time to first rule',
    filient: '< 1 minute',
    hazel: '10-30 minutes',
    manual: 'N/A',
  },
  {
    feature: 'Handles edge cases',
    filient: true,
    hazel: false,
    manual: true,
  },
  {
    feature: 'Automatic updates',
    filient: true,
    hazel: false,
    manual: false,
  },
]

export function Comparison() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 border-t border-gray-900" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for humans,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              not programmers
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-900">
                <th className="text-left p-4 text-gray-500 font-normal"></th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-white">Filient</div>
                  <div className="text-xs text-gray-500 mt-1">AI-powered</div>
                </th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-gray-400">Hazel</div>
                  <div className="text-xs text-gray-500 mt-1">Rule-based</div>
                </th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-gray-400">Manual</div>
                  <div className="text-xs text-gray-500 mt-1">DIY</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  className="border-b border-gray-900/50"
                >
                  <td className="p-4 text-gray-400">{row.feature}</td>
                  <td className="p-4">
                    {typeof row.filient === 'boolean' ? (
                      row.filient ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-white">{row.filient}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {typeof row.hazel === 'boolean' ? (
                      row.hazel ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-gray-500">{row.hazel}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {typeof row.manual === 'boolean' ? (
                      row.manual ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )
                    ) : (
                      <span className="text-gray-500">{row.manual}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}