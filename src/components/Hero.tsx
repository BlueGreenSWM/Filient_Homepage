"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './common/Button'
import { usePlatformDetection } from '@/hooks/usePlatformDetection'
import { ArrowRight, X, Play } from 'lucide-react'

export function Hero() {
  const platform = usePlatformDetection()
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            File organization
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              powered by AI
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Tell Filient what to do in plain English. No complex rules, no manual setup.
          Just describe how you want your files organized.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {platform.isMac ? (
            <>
              <Button variant="primary" size="lg" className="min-w-[180px]">
                Download for Mac
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="min-w-[180px] text-gray-400"
                onClick={() => setShowDemo(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" size="lg" className="min-w-[180px]">
                Join Waitlist
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="min-w-[180px] text-gray-400"
                onClick={() => setShowDemo(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </>
          )}
        </motion.div>

      </div>

      {/* Demo Modal */}
      {showDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowDemo(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full"
              >
                <source src="/demo-video.mov" type="video/quicktime" />
                <source src="/demo-video.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}