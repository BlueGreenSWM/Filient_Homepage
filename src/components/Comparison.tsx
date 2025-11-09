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
    <section className="pt-24 pb-12 bg-gray-50 border-t border-gray-200" ref={ref as any}>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              {t.comparison.titleHighlight}
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Best Choice Badge - positioned above table */}
          <div className="absolute left-[25%] -top-4 w-[25%] flex justify-center z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg whitespace-nowrap">
              ✨ Best Choice
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto card mt-8"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-center px-4 py-3 text-gray-700 font-semibold bg-gray-50 w-[25%]"></th>
                  <th className="px-4 py-3 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 w-[25%]">
                    <div className="font-bold text-gray-900 text-xl">{t.comparison.tableHeaders.filient}</div>
                    <div className="text-xs text-blue-600 font-semibold mt-1">{t.comparison.tableHeaders.fillientSubtitle}</div>
                  </th>
                  <th className="px-4 py-3 text-center bg-gray-50 w-[25%] border-l border-gray-200">
                    <div className="font-semibold text-gray-600">{t.comparison.tableHeaders.hazel}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.comparison.tableHeaders.hazelSubtitle}</div>
                  </th>
                  <th className="px-4 py-3 text-center bg-gray-50 w-[25%] border-l border-gray-200">
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
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 text-center text-gray-800 font-semibold bg-white">{row.name}</td>
                    <td className="p-4 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-l-4 border-blue-500">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-900 font-semibold">{row.filient}</span>
                      </div>
                    </td>
                    <td className="p-4 bg-white border-l border-gray-200 text-center">
                      <span className="text-gray-500">{row.hazel}</span>
                    </td>
                    <td className="p-4 bg-white border-l border-gray-200 text-center">
                      <span className="text-gray-500">{row.manual}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
