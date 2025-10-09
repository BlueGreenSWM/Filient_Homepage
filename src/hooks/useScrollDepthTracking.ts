"use client"

import { useEffect, useRef, useState } from 'react'
import { trackScrollDepth, getCurrentSection } from '@/lib/analytics'

/**
 * Custom hook for tracking scroll depth milestones
 * Tracks 25%, 50%, 75%, 100% scroll depths
 * Growth Hacking: Essential for understanding content engagement
 */
export function useScrollDepthTracking() {
  const [tracked, setTracked] = useState({
    25: false,
    50: false,
    75: false,
    100: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return // Avoid division by zero

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100)
      const currentSection = getCurrentSection()

      // Update max scroll depth in localStorage for engagement scoring
      const maxScrollDepth = parseInt(localStorage.getItem('max_scroll_depth') || '0')
      if (scrollPercentage > maxScrollDepth) {
        localStorage.setItem('max_scroll_depth', scrollPercentage.toString())
      }

      // Track 25% milestone
      if (scrollPercentage >= 25 && !tracked[25]) {
        trackScrollDepth(25, currentSection)
        setTracked(prev => ({ ...prev, 25: true }))
      }

      // Track 50% milestone
      if (scrollPercentage >= 50 && !tracked[50]) {
        trackScrollDepth(50, currentSection)
        setTracked(prev => ({ ...prev, 50: true }))
      }

      // Track 75% milestone
      if (scrollPercentage >= 75 && !tracked[75]) {
        trackScrollDepth(75, currentSection)
        setTracked(prev => ({ ...prev, 75: true }))
      }

      // Track 100% milestone
      if (scrollPercentage >= 98 && !tracked[100]) { // 98% to account for floating point
        trackScrollDepth(100, currentSection)
        setTracked(prev => ({ ...prev, 100: true }))
      }
    }

    // Initial check in case user is already scrolled
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tracked])

  return tracked
}
