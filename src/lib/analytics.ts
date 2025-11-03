// Google Analytics 4 Tracking Library
// Growth Hacker Implementation - Comprehensive Event Tracking

import { getUTMEventParams } from './utm'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

type EventParams = {
  [key: string]: string | number | boolean
}

// ============================================
// CORE TRACKING FUNCTIONS
// ============================================

/**
 * Base event tracking function
 * All events go through this function for consistency
 */
export const trackEvent = (
  eventName: string,
  eventCategory: string,
  params: EventParams = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const utmParams = getUTMEventParams()

    window.gtag('event', eventName, {
      event_category: eventCategory,
      ...params,
      ...utmParams,
    })

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 GA4 Event:', eventName, {
        eventCategory,
        ...params,
        ...utmParams,
      })
    }
  }
}

/**
 * Page view tracking
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
      page_title: title,
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('📄 GA4 Page View:', url, title)
    }
  }
}

// ============================================
// CONVERSION EVENTS (Critical)
// ============================================

/**
 * Download funnel tracking
 */
export const trackDownloadInitiated = (
  section: string,
  platform: string,
  language: string,
  scrollDepth: number
) => {
  const timeOnPage = typeof window !== 'undefined'
    ? Math.round((Date.now() - window.performance.timing.navigationStart) / 1000)
    : 0

  trackEvent('download_initiated', 'conversion', {
    section,
    platform,
    language,
    scroll_depth: scrollDepth,
    time_on_page: timeOnPage,
  })
}

export const trackDownloadStarted = (platform: string, userAgent: string) => {
  trackEvent('download_started', 'conversion', {
    platform,
    user_agent: userAgent,
  })
}

export const trackDownloadCompleted = (fileSize: string, downloadTime: number) => {
  trackEvent('download_completed', 'conversion', {
    file_size: fileSize,
    download_time: downloadTime,
    value: 59.88, // Annual subscription value
    currency: 'USD',
  })
}

export const trackDownloadFailed = (errorType: string, errorMessage: string) => {
  trackEvent('download_failed', 'error', {
    error_type: errorType,
    error_message: errorMessage,
  })
}

/**
 * Waitlist funnel tracking
 */
export const trackWaitlistFormViewed = (platform: string, trigger: string) => {
  trackEvent('waitlist_form_viewed', 'engagement', {
    platform,
    trigger, // 'auto' or 'manual_scroll'
  })
}

export const trackWaitlistEmailStarted = () => {
  trackEvent('waitlist_email_started', 'engagement', {})
}

export const trackWaitlistSubmitted = (
  platform: string,
  emailDomain: string,
  language: string
) => {
  // Determine if B2B or B2C based on email domain
  const isB2B = !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'naver.com', 'daum.net', 'kakao.com'].includes(emailDomain.toLowerCase())

  trackEvent('waitlist_submitted', 'conversion', {
    platform,
    email_domain: emailDomain,
    language,
    lead_type: isB2B ? 'b2b' : 'b2c',
    value: 29.94, // Half-year estimated value
    currency: 'USD',
  })
}

// ============================================
// HIGH-INTENT ENGAGEMENT (Lead Qualification)
// ============================================

/**
 * ROI Calculator tracking - Critical for lead qualification
 */
export const trackCalculatorOpened = (scrollDepth: number) => {
  trackEvent('calculator_opened', 'engagement', {
    section: 'pricing',
    scroll_depth: scrollDepth,
  })
}

export const trackCalculatorUsed = (
  hourlyRate: number,
  hoursWasted: number,
  calculatedROI: number
) => {
  // Tier-based segmentation for remarketing
  const roiTier =
    calculatedROI > 10000 ? 'high' : calculatedROI > 5000 ? 'medium' : 'low'

  trackEvent('calculator_used', 'engagement', {
    hourly_rate: hourlyRate,
    hours_wasted: hoursWasted,
    calculated_roi: calculatedROI,
    roi_tier: roiTier,
  })

  // Separate high-value lead event for audience segmentation
  if (calculatedROI > 10000) {
    trackEvent('high_value_lead', 'qualification', {
      calculated_roi: calculatedROI,
      hourly_rate: hourlyRate,
      potential_annual_value: calculatedROI,
    })
  }
}

/**
 * Video engagement tracking
 */
export const trackVideoOpened = (triggerLocation: string, timeOnPage: number) => {
  trackEvent('video_opened', 'engagement', {
    trigger_location: triggerLocation,
    time_on_page: timeOnPage,
  })
}

export const trackVideoStart = (videoUrl: string) => {
  trackEvent('video_start', 'engagement', {
    video_provider: 'youtube',
    video_url: videoUrl,
  })
}

export const trackVideoProgress = (percent: number, currentTime: number) => {
  trackEvent('video_progress', 'engagement', {
    video_percent: percent,
    video_current_time: currentTime,
  })
}

export const trackVideoComplete = (videoLength: number) => {
  trackEvent('video_complete', 'engagement', {
    video_length: videoLength,
    completion_rate: 100,
  })
}

export const trackVideoClosed = (watchTime: number, completionPercent: number) => {
  trackEvent('video_closed', 'engagement', {
    watch_time: watchTime,
    completion_percent: completionPercent,
  })
}

/**
 * Comparison table tracking - Competitive research signal
 */
export const trackComparisonViewed = (scrollDepth: number, timeOnSection: number) => {
  trackEvent('comparison_viewed', 'engagement', {
    scroll_depth: scrollDepth,
    time_on_section: timeOnSection,
    competitor: 'hazel', // High-intent signal
  })
}

export const trackComparisonHovered = (featureName: string, hoverDuration: number) => {
  trackEvent('comparison_feature_hover', 'engagement', {
    feature_name: featureName,
    hover_duration: hoverDuration,
  })
}

// ============================================
// SECTION ENGAGEMENT
// ============================================

export const trackSectionViewed = (
  sectionName: string,
  timeToSection: number,
  scrollPercentage: number
) => {
  trackEvent('section_viewed', 'engagement', {
    section_name: sectionName,
    time_to_section: timeToSection,
    scroll_percentage: scrollPercentage,
  })
}

export const trackScrollDepth = (depthPercentage: number, deepestSection: string) => {
  trackEvent('scroll_depth', 'engagement', {
    depth_percentage: depthPercentage,
    deepest_section: deepestSection,
  })
}

// ============================================
// FEATURE EXPLORATION
// ============================================

export const trackFeatureCardViewed = (
  featureName: string,
  index: number,
  hasVideo: boolean
) => {
  trackEvent('feature_card_viewed', 'engagement', {
    feature_name: featureName,
    feature_index: index,
    has_video: hasVideo,
  })
}

export const trackFeatureCardHover = (featureName: string, hoverDuration: number) => {
  trackEvent('feature_card_hover', 'engagement', {
    feature_name: featureName,
    hover_duration: hoverDuration,
  })
}

export const trackExampleCommandViewed = (command: string, index: number) => {
  trackEvent('example_command_viewed', 'engagement', {
    command: command,
    command_index: index,
  })
}

export const trackFeatureVideoLoaded = (
  featureId: number,
  featureName: string,
  videoUrl: string
) => {
  trackEvent('feature_video_loaded', 'engagement', {
    feature_id: featureId,
    feature_name: featureName,
    video_url: videoUrl,
  })
}

export const trackFeatureVideoError = (
  featureId: number,
  featureName: string,
  videoUrl: string
) => {
  trackEvent('feature_video_error', 'error', {
    feature_id: featureId,
    feature_name: featureName,
    video_url: videoUrl,
  })
}

export const trackFeatureVideoAutoplayFailed = (
  featureId: number,
  featureName: string,
  videoUrl: string,
  errorMessage: string
) => {
  trackEvent('feature_video_autoplay_failed', 'error', {
    feature_id: featureId,
    feature_name: featureName,
    video_url: videoUrl,
    error_message: errorMessage,
  })
}

// ============================================
// PRICING & PLANS
// ============================================

export const trackPricingPlanViewed = (
  planName: string,
  planPrice: number,
  popularBadge: boolean
) => {
  trackEvent('pricing_plan_viewed', 'engagement', {
    plan_name: planName,
    plan_price: planPrice,
    popular_badge: popularBadge,
  })
}

export const trackPricingPlanClicked = (
  planName: string,
  planPrice: number,
  ctaText: string
) => {
  trackEvent('pricing_plan_clicked', 'engagement', {
    plan_name: planName,
    plan_price: planPrice,
    cta_text: ctaText,
    value: planPrice * 12, // Annual value
  })
}

// ============================================
// CTA & BUTTON TRACKING
// ============================================

export const trackCTAClicked = (
  buttonText: string,
  buttonLocation: string,
  buttonVariant: string
) => {
  trackEvent('cta_clicked', 'engagement', {
    button_text: buttonText,
    button_location: buttonLocation,
    button_variant: buttonVariant,
  })
}

export const trackButtonHover = (
  buttonText: string,
  buttonLocation: string,
  hoverDuration: number
) => {
  trackEvent('button_hover', 'engagement', {
    button_text: buttonText,
    button_location: buttonLocation,
    hover_duration: hoverDuration,
  })
}

// ============================================
// LANGUAGE & LOCALIZATION
// ============================================

export const trackLanguageChanged = (
  fromLanguage: string,
  toLanguage: string,
  timeOnPage: number,
  sectionAtChange: string
) => {
  trackEvent('language_changed', 'engagement', {
    from_language: fromLanguage,
    to_language: toLanguage,
    time_on_page: timeOnPage,
    section_at_change: sectionAtChange,
  })
}

// ============================================
// STATS & COUNTERS
// ============================================

export const trackStatsViewed = (timeToStats: number) => {
  trackEvent('stats_section_viewed', 'engagement', {
    time_to_stats: timeToStats,
  })
}

export const trackCounterAnimationComplete = (statName: string, statValue: number) => {
  trackEvent('counter_animation_complete', 'engagement', {
    stat_name: statName,
    stat_value: statValue,
  })
}

// ============================================
// HOW IT WORKS
// ============================================

export const trackHowItWorksStepViewed = (
  stepNumber: string,
  stepTitle: string,
  timeToStep: number
) => {
  trackEvent('how_it_works_step_viewed', 'engagement', {
    step_number: stepNumber,
    step_title: stepTitle,
    time_to_step: timeToStep,
  })
}

// ============================================
// FOOTER & NAVIGATION
// ============================================

export const trackFooterLinkClicked = (linkText: string, linkUrl: string) => {
  trackEvent('footer_link_clicked', 'engagement', {
    link_text: linkText,
    link_url: linkUrl,
  })
}

export const trackSocialLinkClicked = (platform: string) => {
  trackEvent('social_link_clicked', 'engagement', {
    social_platform: platform,
  })
}

// ============================================
// TESTIMONIALS & SOCIAL PROOF
// ============================================

export const trackTestimonialsViewed = (reviewCount: number) => {
  trackEvent('testimonials_viewed', 'engagement', {
    review_count: reviewCount,
  })
}

export const trackTestimonialsInteraction = (
  action: 'pause' | 'resume',
  reviewCount: number,
  hoverDuration?: number
) => {
  trackEvent('testimonials_interaction', 'engagement', {
    action,
    review_count: reviewCount,
    ...(hoverDuration !== undefined ? { hover_duration: hoverDuration } : {}),
  })
}

// ============================================
// ERROR & EXCEPTION TRACKING
// ============================================

export const trackError = (errorType: string, errorMessage: string, errorLocation: string) => {
  trackEvent('application_error', 'error', {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
  })
}

export const trackAPIError = (
  endpoint: string,
  statusCode: number,
  errorMessage: string
) => {
  trackEvent('api_error', 'error', {
    endpoint,
    status_code: statusCode,
    error_message: errorMessage,
  })
}

// ============================================
// USER ENGAGEMENT SCORE
// ============================================

/**
 * Calculate and track engagement score
 * Used for audience segmentation and remarketing
 */
export const calculateEngagementScore = () => {
  // This would be called periodically or on page exit
  // Score calculation based on actions taken
  let score = 0

  // Example scoring logic (customize based on your needs)
  const videoWatched = localStorage.getItem('video_watched') === 'true'
  const calculatorUsed = localStorage.getItem('calculator_used') === 'true'
  const comparisonViewed = localStorage.getItem('comparison_viewed') === 'true'
  const scrollDepth = parseInt(localStorage.getItem('max_scroll_depth') || '0')

  if (videoWatched) score += 30
  if (calculatorUsed) score += 25
  if (comparisonViewed) score += 20
  if (scrollDepth >= 75) score += 15
  if (scrollDepth >= 50) score += 10

  return score
}

export const trackEngagementScore = (score: number, level: 'low' | 'medium' | 'high') => {
  trackEvent('engagement_score_calculated', 'engagement', {
    engagement_score: score,
    engagement_level: level,
  })
}

// ============================================
// CONSENT MANAGEMENT
// ============================================

export const updateConsent = (consentType: 'granted' | 'denied') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'ad_storage': consentType,
      'ad_user_data': consentType,
      'ad_personalization': consentType,
      'analytics_storage': consentType,
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('🍪 Consent updated:', consentType)
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get current scroll depth percentage
 */
export const getCurrentScrollDepth = (): number => {
  if (typeof window === 'undefined') return 0
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  return Math.round((window.scrollY / scrollHeight) * 100)
}

/**
 * Get current section based on scroll position
 */
export const getCurrentSection = (): string => {
  if (typeof window === 'undefined') return 'unknown'

  const sections = ['hero', 'stats', 'features', 'how-it-works', 'comparison', 'pricing', 'download']
  const scrollY = window.scrollY + window.innerHeight / 2

  for (const section of sections) {
    const element = document.querySelector(`[data-section="${section}"]`)
    if (element) {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementBottom = elementTop + rect.height

      if (scrollY >= elementTop && scrollY <= elementBottom) {
        return section
      }
    }
  }

  return 'unknown'
}

/**
 * Get time on page in seconds
 */
export const getTimeOnPage = (): number => {
  if (typeof window === 'undefined') return 0
  return Math.round((Date.now() - window.performance.timing.navigationStart) / 1000)
}
