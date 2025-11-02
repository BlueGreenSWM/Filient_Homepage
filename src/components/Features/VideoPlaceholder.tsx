'use client'

import { motion } from 'framer-motion'

interface VideoPlaceholderProps {
  title: string
  comingSoonText?: string
  comingSoonDescription?: string
}

export default function VideoPlaceholder({
  title,
  comingSoonText = 'Coming Soon',
  comingSoonDescription = 'This feature will be available soon',
}: VideoPlaceholderProps) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-200"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: ['-50%', '-45%', '-50%'],
          y: ['-50%', '-45%', '-50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          <div className="relative">
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center border-2 border-blue-200 shadow-lg">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-blue-700 border-2 border-blue-300 shadow-sm">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              ⏳
            </motion.span>
            {comingSoonText}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600 text-sm max-w-md"
        >
          {comingSoonDescription}
        </motion.p>

        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75" />
        <div className="absolute top-1/4 left-12 w-1 h-1 rounded-full bg-pink-500 animate-pulse delay-150" />
        <div className="absolute bottom-1/4 right-12 w-1 h-1 rounded-full bg-blue-500 animate-pulse delay-300" />
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 pointer-events-none" />
    </div>
  )
}
