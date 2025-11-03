"use client"

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  trackFeatureVideoAutoplayFailed,
  trackFeatureVideoError,
  trackFeatureVideoLoaded,
} from '@/lib/analytics'

interface VideoPlayerProps {
  featureId: number
  videoUrl: string
  title: string
}

export default function VideoPlayer({ featureId, videoUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsLoading(true)
    setHasError(false)

    const handleCanPlay = () => {
      setIsLoading(false)
      trackFeatureVideoLoaded(featureId, title, videoUrl)

      video
        .play()
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : 'Unknown autoplay error'
          trackFeatureVideoAutoplayFailed(featureId, title, videoUrl, errorMessage)
          console.error('Video autoplay failed:', err)
        })
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      trackFeatureVideoError(featureId, title, videoUrl)
      console.error('Video load error:', videoUrl)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    // Load the video
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [featureId, title, videoUrl])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900/50">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-gray-400">Failed to load video</p>
          </div>
        </div>
      )}

      {/* Video element */}
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Title overlay (optional, fades out after video loads) */}
      {!isLoading && !hasError && (
        <motion.div
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-sm text-white font-medium">{title}</p>
        </motion.div>
      )}

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
