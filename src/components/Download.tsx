"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { Button } from './common/Button'
import { ArrowRight, Mail } from 'lucide-react'

export function Download() {
  const { ref, isVisible } = useScrollAnimation()
  const platform = usePlatformDetection()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      console.log('Waitlist email:', email)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Filient.dmg'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <section className="py-24 border-t border-gray-900" ref={ref as any}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to save
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              230 hours a year?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands who've already simplified their file management with AI.
          </p>

          {platform.isMac ? (
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleDownload}
                className="min-w-[200px]"
              >
                Download for Mac
              </Button>
              <p className="text-sm text-gray-500">
                macOS 12.0+ • Free 14-day trial
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {!submitted ? (
                <form onSubmit={handleWaitlist} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-800 focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <Button type="submit" variant="primary">
                    Join Waitlist
                  </Button>
                </form>
              ) : (
                <div className="bg-green-900/20 text-green-400 rounded-lg p-4">
                  Thanks! We'll notify you when Filient is ready for {platform.platform}.
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-16 border-t border-gray-900"
        >
          <p className="text-sm text-gray-500 mb-4">As featured in</p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            <div className="text-gray-400">TechCrunch</div>
            <div className="text-gray-400">Product Hunt</div>
            <div className="text-gray-400">Hacker News</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}