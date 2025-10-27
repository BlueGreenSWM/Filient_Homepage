"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export function DisquietLeaderBadge() {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-4 flex items-start"
    >
      <div className="flex-shrink-0">
        <iframe
          title="disquiet-badge"
          frameBorder="0"
          src="https://badge.disquiet.io/rank-badge?productUrlSlug=filient&mode=light&rank=gold"
          className="h-[80px] w-auto border-0 block"
          style={{ overflow: 'hidden', display: 'block' }}
        />
      </div>
      <p className="text-sm font-bold text-gray-400 pt-1 -ml-8">
        🏆 {t.hero.disquietBadge}
      </p>
    </motion.div>
  )
}
