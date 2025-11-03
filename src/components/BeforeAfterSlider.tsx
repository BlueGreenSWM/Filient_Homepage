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
  const instructionText = language === 'ko'
    ? '좌우로 슬라이드해서 비교해보세요'
    : 'Drag the slider to compare'

  return (
    <div className="w-full">
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
          position={75}
          className="aspect-[16/9]"
        />
      </motion.div>

      {/* Instruction Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-center text-base text-gray-500 flex items-center justify-center gap-2"
      >
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        {instructionText}
      </motion.p>
    </div>
  )
}
