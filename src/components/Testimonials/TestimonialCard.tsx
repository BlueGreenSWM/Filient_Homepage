"use client"

import React from 'react'

interface TestimonialCardProps {
  text: string
  author: string
  avatarText: string
  avatarColor: string
}

export function TestimonialCard({
  text,
  author,
  avatarText,
  avatarColor
}: TestimonialCardProps) {
  return (
    <div className="w-[320px] min-h-[180px] bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0 flex flex-col">
      {/* 리뷰 텍스트 */}
      <p className="text-gray-600 italic mb-4 leading-relaxed flex-grow">
        "{text}"
      </p>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mt-auto">
        {/* 아바타 */}
        <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg">{avatarText}</span>
        </div>

        {/* 이름 */}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{author}</p>
        </div>
      </div>
    </div>
  )
}
