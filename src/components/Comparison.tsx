"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Check, X } from 'lucide-react'

export function Comparison() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.comparison.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.comparison.titleHighlight}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto card"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-gray-500 font-normal"></th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-gray-900">{t.comparison.tableHeaders.filient}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.comparison.tableHeaders.fillientSubtitle}</div>
                </th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-gray-600">{t.comparison.tableHeaders.hazel}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.comparison.tableHeaders.hazelSubtitle}</div>
                </th>
                <th className="p-4 text-left">
                  <div className="font-semibold text-gray-600">{t.comparison.tableHeaders.manual}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.comparison.tableHeaders.manualSubtitle}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.features.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="p-4 text-gray-600 font-medium">{row.name}</td>
                  <td className="p-4">
                    <span className="text-gray-900 font-medium">{row.filient}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-500">{row.hazel}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-500">{row.manual}</span>
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
