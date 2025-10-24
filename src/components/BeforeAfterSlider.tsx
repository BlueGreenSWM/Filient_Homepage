"use client"

import React from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage
}: BeforeAfterSliderProps) {
  const { language } = useLanguage()

  const beforeLabel = language === 'ko' ? '이전' : 'BEFORE'
  const afterLabel = language === 'ko' ? '이후' : 'AFTER'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Before Label - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-semibold backdrop-blur-sm">
        {beforeLabel}
      </div>

      {/* After Label - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-semibold backdrop-blur-sm">
        {afterLabel}
      </div>

      {/* Compare Slider */}
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt={beforeLabel}
            className="object-cover w-full h-full"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt={afterLabel}
            className="object-cover w-full h-full"
          />
        }
        position={50}
        className="aspect-[16/9]"
      />
    </motion.div>
  )
}
