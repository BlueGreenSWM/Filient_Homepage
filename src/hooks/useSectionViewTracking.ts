"use client"

import { useEffect, useRef } from 'react'
import { trackSectionViewed, getCurrentScrollDepth, getTimeOnPage } from '@/lib/analytics'

/**
 * Custom hook for tracking section visibility
 * Tracks when a section enters the viewport
 * Growth Hacking: Critical for funnel analysis
 *
 * @param sectionName - Name of the section (hero, stats, features, etc.)
 * @param threshold - Intersection threshold (default: 0.5 = 50% visible)
 */
export function useSectionViewTracking(sectionName: string, threshold: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const trackedRef = useRef(false)
  const pageLoadTime = useRef(typeof window !== 'undefined' ? Date.now() : 0)

  useEffect(() => {
    const element = ref.current
    if (!element || trackedRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !trackedRef.current) {
          const timeToSection = getTimeOnPage()
          const scrollPercentage = getCurrentScrollDepth()

          trackSectionViewed(sectionName, timeToSection, scrollPercentage)
          trackedRef.current = true

          // Unobserve after tracking once
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin: '0px', // Trigger exactly when threshold is met
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [sectionName, threshold])

  return ref
}
