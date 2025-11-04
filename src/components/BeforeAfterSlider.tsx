"use client"

import React, { useId, useMemo } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

type Position = 'left' | 'right'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  /** 초기 슬라이더 핸들 위치 (0~100). 기본 75 */
  initialPosition?: number
  /** CSS aspect-ratio 표현. 기본 16/9 */
  aspectRatio?: string
  /** 좌우 라벨 표시 여부. 기본 true */
  showLabels?: boolean
  /** 하단 안내 문구 표시 여부. 기본 true */
  showInstruction?: boolean
  /** 외부에서 추가 스타일을 주고 싶을 때 */
  className?: string
  /** 접근성용 라벨 */
  ariaLabel?: string
  /** 라벨 오버라이드(기본: 언어에 따라 BEFORE/AFTER 또는 이전/이후) */
  beforeLabelOverride?: string
  afterLabelOverride?: string
}

function OverlayLabel({ position, children }: { position: Position; children: React.ReactNode }) {
  const sideClass = position === 'left' ? 'left-4' : 'right-4'
  return (
    <div
      className={cn(
        'absolute bottom-4 z-10 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-semibold backdrop-blur-sm select-none pointer-events-none',
        sideClass,
      )}
    >
      {children}
    </div>
  )
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  initialPosition = 75,
  aspectRatio = '16/9',
  showLabels = true,
  showInstruction = true,
  className,
  ariaLabel,
  beforeLabelOverride,
  afterLabelOverride,
}: BeforeAfterSliderProps) {
  const { language } = useLanguage()
  const instructionId = useId()

  const { beforeLabel, afterLabel, instructionText, clampedPosition, aspectClass } = useMemo(() => {
    const b = beforeLabelOverride ?? (language === 'ko' ? '이전' : 'BEFORE')
    const a = afterLabelOverride ?? (language === 'ko' ? '이후' : 'AFTER')
    const i = language === 'ko' ? '좌우로 슬라이드해서 비교해보세요' : 'Drag the slider to compare'
    const pos = Math.max(0, Math.min(100, initialPosition))
    const ratioClass = `aspect-[${aspectRatio}]`
    return { beforeLabel: b, afterLabel: a, instructionText: i, clampedPosition: pos, aspectClass: ratioClass }
  }, [afterLabelOverride, aspectRatio, beforeLabelOverride, initialPosition, language])

  return (
    <div className={cn('w-full', className)} aria-label={ariaLabel} aria-describedby={showInstruction ? instructionId : undefined}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-xl overflow-hidden shadow-2xl"
      >
        {showLabels && <OverlayLabel position="left">{beforeLabel}</OverlayLabel>}
        {showLabels && <OverlayLabel position="right">{afterLabel}</OverlayLabel>}

        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src={beforeImage} alt={beforeLabel} className="object-cover w-full h-full" />}
          itemTwo={<ReactCompareSliderImage src={afterImage} alt={afterLabel} className="object-cover w-full h-full" />}
          position={clampedPosition}
          className={aspectClass}
        />
      </motion.div>

      {showInstruction && (
        <motion.p
          id={instructionId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-center text-base text-gray-500 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          {instructionText}
        </motion.p>
      )}
    </div>
  )
}
