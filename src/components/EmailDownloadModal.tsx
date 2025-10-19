"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Download } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface EmailDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  isLoading?: boolean
}

export function EmailDownloadModal({ isOpen, onClose, onSubmit, isLoading = false }: EmailDownloadModalProps) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Email validation
    if (!email.trim()) {
      setError(t.download?.emailRequired || 'Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError(t.download?.emailInvalid || 'Please enter a valid email address')
      return
    }

    // Clear error and submit
    setError('')
    onSubmit(email)
  }

  const handleClose = () => {
    if (!isLoading) {
      setEmail('')
      setError('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 text-gray-700 hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-50"
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
                      disabled={isLoading}
                      placeholder={t.download?.emailPlaceholder || 'your.email@example.com'}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 ${
                        error ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
