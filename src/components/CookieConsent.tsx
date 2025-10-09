"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { updateConsent } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * GDPR/CCPA Compliant Cookie Consent Banner
 * Growth Hacking: Essential for legal compliance and trust building
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    // Check if user has already made a consent choice
    const consent = localStorage.getItem('cookie_consent')

    if (!consent) {
      // Show banner after 2 seconds to avoid interrupting initial experience
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)

      return () => clearTimeout(timer)
    } else if (consent === 'accepted') {
      // Update consent to granted if already accepted
      updateConsent('granted')
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    localStorage.setItem('consent_date', new Date().toISOString())
    updateConsent('granted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie_consent', 'declined')
    localStorage.setItem('consent_date', new Date().toISOString())
    updateConsent('denied')
    setShowBanner(false)
  }

  const content = {
    en: {
      title: 'Cookie Consent',
      message: 'We use cookies to improve your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.',
      accept: 'Accept Cookies',
      decline: 'Decline',
      learnMore: 'Learn more',
    },
    ko: {
      title: '쿠키 동의',
      message: '사용자 경험 개선 및 사이트 트래픽 분석을 위해 쿠키를 사용합니다. "수락"을 클릭하면 쿠키 사용에 동의하는 것입니다.',
      accept: '쿠키 수락',
      decline: '거부',
      learnMore: '자세히 알아보기',
    },
  }

  const t = content[language]

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.message}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={acceptCookies}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      {t.accept}
                    </button>
                    <button
                      onClick={declineCookies}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      {t.decline}
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={declineCookies}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
