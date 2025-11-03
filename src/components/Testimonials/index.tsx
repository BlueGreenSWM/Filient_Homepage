"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { TestimonialCard } from './TestimonialCard'
import { trackTestimonialsInteraction, trackTestimonialsViewed } from '@/lib/analytics'

export function Testimonials() {
  const { t } = useLanguage()
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const hoverStartRef = useRef<number | null>(null)

  const reviews = t.testimonials.reviews

  // 스크롤 너비 계산: (카드 너비 + gap) * 카드 개수
  const cardWidth = 320
  const gap = 24
  const scrollWidth = reviews.length * (cardWidth + gap)

  useEffect(() => {
    // 초기 애니메이션 시작
    controls.start({
      x: -scrollWidth,
      transition: {
        duration: 30, // 30초에 1회전
        repeat: Infinity,
        ease: "linear"
      }
    })
  }, [controls, scrollWidth])

  useEffect(() => {
    if (isInView) {
      trackTestimonialsViewed(reviews.length)
    }
  }, [isInView, reviews.length])

  const handleMouseEnter = () => {
    controls.stop()
    hoverStartRef.current = Date.now()
    trackTestimonialsInteraction('pause', reviews.length)
  }

  const handleMouseLeave = () => {
    controls.start({
      x: -scrollWidth,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    })
    if (hoverStartRef.current) {
      const hoverDuration = Math.round((Date.now() - hoverStartRef.current) / 1000)
      trackTestimonialsInteraction('resume', reviews.length, hoverDuration)
      hoverStartRef.current = null
    } else {
      trackTestimonialsInteraction('resume', reviews.length)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gray-50 overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* 데스크톱: 무한 스크롤 */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* 좌측 페이드 그라디언트 */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* 우측 페이드 그라디언트 */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* 스크롤 래퍼 */}
            <div
              ref={containerRef}
              className="overflow-hidden"
            >
              <motion.div
                className="flex gap-6"
                animate={controls}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ x: 0 }}
              >
                {/* 첫 번째 카드 세트 */}
                {reviews.map((review) => (
                  <TestimonialCard
                    key={review.id}
                    text={review.text}
                    author={review.author}
                    avatarText={review.avatarText}
                    avatarColor={review.avatarColor}
                  />
                ))}

                {/* 두 번째 카드 세트 (무한 루프용 복제) */}
                {reviews.map((review) => (
                  <TestimonialCard
                    key={`${review.id}-duplicate`}
                    text={review.text}
                    author={review.author}
                    avatarText={review.avatarText}
                    avatarColor={review.avatarColor}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* 모바일/태블릿: 세로 스택 (처음 4개만) */}
        <div className="lg:hidden flex flex-col gap-6 items-center">
          {reviews.slice(0, 4).map((review) => (
            <TestimonialCard
              key={review.id}
              text={review.text}
              author={review.author}
              avatarText={review.avatarText}
              avatarColor={review.avatarColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
