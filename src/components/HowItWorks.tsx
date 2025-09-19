"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Download, MessageSquare, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Install Filient',
    description: 'Download and install in under a minute. Works with macOS Monterey and later.',
    example: null,
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Tell it what to do',
    description: 'Write rules in plain English. No technical knowledge required.',
    example: '"Put all invoices in the Accounting folder and rename them with the date"',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Files organize themselves',
    description: 'Filient runs in the background, organizing files as they arrive.',
    example: 'Invoice_2024.pdf → Accounting/2024-01-15_Invoice.pdf',
  },
]

export function HowItWorks() {
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
            Three steps to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              perfect organization
            </span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex items-center gap-4 md:min-w-[300px]">
                  <span className="text-5xl font-bold text-gray-800">{step.number}</span>
                  <div className="p-3 rounded-xl bg-gray-900">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {step.description}
                  </p>
                  {step.example && (
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                      <code className="text-sm text-indigo-400">
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-gray-900"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              No more manual filing
            </h3>
            <p className="text-gray-400">
              Filient works 24/7 in the background. Set it up once and never think about file organization again.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}