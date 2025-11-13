"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTimeOnPage, getCurrentScrollDepth } from '@/lib/analytics'

interface EmailDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string, marketingConsent: boolean) => void
  onSkipEmail: () => void
  isLoading?: boolean
}

export function EmailDownloadModal({ isOpen, onClose, onSubmit, onSkipEmail, isLoading = false }: EmailDownloadModalProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [error, setError] = useState('')
  const modalOpenTime = useRef<number>(0)
  const emailInputStarted = useRef(false)

  // 1. Track modal opened when it becomes visible
  useEffect(() => {
    if (isOpen && modalOpenTime.current === 0) {
      modalOpenTime.current = Date.now()

      // Track modal opened event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_modal_opened', {
          event_category: 'engagement',
          time_on_page: getTimeOnPage(),
          scroll_depth: getCurrentScrollDepth()
        })

        // Track virtual pageview for GA4 (for URL-based funnel analysis)
        if (window.location.hash === '#download') {
          window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
            page_path: '/#download',
            page_title: 'Download Modal - Email Collection'
          })
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('📊 GA4 Event: email_modal_opened', {
            time_on_page: getTimeOnPage(),
            scroll_depth: getCurrentScrollDepth()
          })
          console.log('📄 GA4 Virtual Pageview: /#download')
        }
      }
    }
  }, [isOpen])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 4. Track email validation errors
    if (!email.trim()) {
      // Track empty email error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_validation_error', {
          event_category: 'error',
          error_type: 'empty_email',
          error_message: 'Email is required',
          time_on_modal: Math.round((Date.now() - modalOpenTime.current) / 1000)
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('📊 GA4 Event: email_validation_error (empty_email)')
        }
      }
      setError(t.download?.emailRequired || 'Email is required')
      return
    }

    if (!validateEmail(email)) {
      // Track invalid email format error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_validation_error', {
          event_category: 'error',
          error_type: 'invalid_email',
          error_message: 'Invalid email format',
          email_length: email.length,
          has_at_symbol: email.includes('@'),
          has_dot: email.includes('.'),
          time_on_modal: Math.round((Date.now() - modalOpenTime.current) / 1000)
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('📊 GA4 Event: email_validation_error (invalid_email)', {
            email_length: email.length,
            has_at_symbol: email.includes('@'),
            has_dot: email.includes('.')
          })
        }
      }
      setError(t.download?.emailInvalid || 'Please enter a valid email address')
      return
    }

    // Clear error and submit
    setError('')
    onSubmit(email, marketingConsent)
  }

  const handleClose = (trigger: 'x_button' | 'background_click' | 'esc_key' | 'browser_back' = 'x_button') => {
    if (!isLoading) {
      const timeOnModal = Date.now() - modalOpenTime.current
      const hasEnteredEmail = email.length > 0

      // 1. Track modal closed (abandonment)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'email_modal_closed', {
          event_category: 'engagement',
          close_trigger: trigger,
          time_on_modal: Math.round(timeOnModal / 1000),
          email_entered: hasEnteredEmail,
          email_length: email.length,
          email_input_started: emailInputStarted.current,
          had_error: error.length > 0,
          conversion_completed: false
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('📊 GA4 Event: email_modal_closed', {
            close_trigger: trigger,
            time_on_modal: Math.round(timeOnModal / 1000),
            email_entered: hasEnteredEmail,
            email_input_started: emailInputStarted.current
          })
        }
      }

      // Remove hash from URL
      if (typeof window !== 'undefined' && window.location.hash === '#download') {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }

      // Reset state
      setEmail('')
      setError('')
      modalOpenTime.current = 0
      emailInputStarted.current = false
      onClose()
    }
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        handleClose('esc_key')
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isLoading, email, error])

  // Handle browser back button (hash change) to close modal
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash !== '#download' && isOpen && !isLoading) {
        handleClose('browser_back')
      }
    }

    if (isOpen) {
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [isOpen, isLoading, email, error])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => handleClose('background_click')}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => handleClose('x_button')}
              disabled={isLoading}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {t.download?.modalTitle || 'Download Filient'}
              </h2>

              <p className="text-gray-600 text-center mb-6">
                {t.download?.modalDescription || 'Enter your email to start downloading'}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.download?.emailLabel || 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      onFocus={() => {
                        // 3. Track email input started (only once)
                        if (!emailInputStarted.current) {
                          emailInputStarted.current = true

                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'email_input_started', {
                              event_category: 'engagement',
                              time_on_modal: Math.round((Date.now() - modalOpenTime.current) / 1000)
                            })

                            if (process.env.NODE_ENV === 'development') {
                              console.log('📊 GA4 Event: email_input_started', {
                                time_on_modal: Math.round((Date.now() - modalOpenTime.current) / 1000)
                              })
                            }
                          }
                        }
                      }}
                      disabled={isLoading}
                      placeholder={t.download?.emailPlaceholder || 'your.email@example.com'}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 ${
                        error ? 'border-red-500' : 'border-gray-300'
                      }`}
                      autoComplete="email"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                {/* Marketing Consent Checkbox */}
                <div className="mb-4 mt-3">
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      disabled={isLoading}
                      className="mt-[1px] w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-xs text-gray-700 group-hover:text-gray-900 transition-colors leading-[14px] block">
                        {t.download?.marketingConsent || 'I\'d like to receive Filient updates and helpful tips via email (Optional)'}
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight whitespace-pre-line">
                        {t.download?.marketingConsentDetail || 'You\'ll receive new feature announcements, file organization tips, and special events. Unsubscribe anytime.'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.download?.downloading || 'Downloading...'}
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {t.download?.startDownload || 'Start Download'}
                    </>
                  )}
                </button>
              </form>

              {/* Privacy note */}
              <p className="mt-4 text-xs text-gray-500 text-center">
                {t.download?.privacyNote || 'We respect your privacy. No spam, ever.'}
              </p>

              {/* Skip email link - Always visible */}
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={onSkipEmail}
                  disabled={isLoading}
                  className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.download?.downloadWithoutEmail || 'Download without email'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
