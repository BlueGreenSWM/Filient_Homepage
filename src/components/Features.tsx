"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { MessageSquare, Zap, Brain, Lock, Clock, Folder } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Language Rules',
    description: 'Just tell Filient what you want: "Move all PDFs older than 30 days to Archive" or "Organize photos by date and location"',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'No complex rule builders or regex patterns. Write what you want in plain English and Filient handles the rest.',
  },
  {
    icon: Brain,
    title: 'Smart Understanding',
    description: 'Filient understands context. It knows "old files" means different things for downloads vs documents.',
  },
  {
    icon: Lock,
    title: 'Local Processing',
    description: 'Everything runs on your machine. Your files and rules never leave your computer.',
  },
  {
    icon: Clock,
    title: 'Real-time Organization',
    description: 'Files are organized as they arrive. Your system stays clean automatically.',
  },
  {
    icon: Folder,
    title: 'Retroactive Cleaning',
    description: 'Apply rules to existing files. Clean up years of file chaos in minutes.',
  },
]

export function Features() {
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
            Natural language,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              powerful automation
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No more clicking through complex UIs. Just describe what you want and let AI do the work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group"
              >
                <div className="p-6 rounded-2xl border border-gray-900 hover:border-gray-800 transition-all duration-200 h-full bg-black/50">
                  <div className="inline-flex p-2 rounded-lg bg-gray-900 mb-4">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Example commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl border border-gray-900 bg-black/50"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Example commands</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <code className="text-sm text-indigo-400">
                "Delete all files with 'product' in their name"
              </code>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <code className="text-sm text-indigo-400">
                "Organize all files by date created"
              </code>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <code className="text-sm text-indigo-400">
                "Delete files older than 7 days"
              </code>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <code className="text-sm text-indigo-400">
                "Tag work-related files with red priority label"
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}