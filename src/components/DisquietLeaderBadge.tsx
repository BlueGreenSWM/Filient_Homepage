"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function DisquietLeaderBadge() {
  const { t } = useLanguage()

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-4 text-sm text-gray-700"
    >
      🏆 {t.hero.disquietBadge}
    </motion.p>
  )
}
