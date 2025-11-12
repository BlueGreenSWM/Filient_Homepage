'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  id: number
  icon: LucideIcon
  title: string
  description: string
  isActive: boolean
  hasVideo: boolean
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  isFirst: boolean
  isLast: boolean
}

export default function FeatureCard({
  id,
  icon: Icon,
  title,
  description,
  isActive,
  hasVideo,
  onClick,
  onKeyDown,
  isFirst,
  isLast,
}: FeatureCardProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`
        group relative p-5 cursor-pointer
        transition-all duration-300 ease-out
        ${isActive ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}
        ${!isLast ? 'border-b border-gray-200' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: id * 0.1 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-500 ${
            isFirst ? 'rounded-tl-xl' : ''
          } ${isLast ? 'rounded-bl-xl' : ''}`}
          layoutId="activeIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {/* Icon + Title (horizontal layout) */}
      <div className="flex items-center gap-3 mb-2">
        {/* Icon */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-200"
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3
          className={`
          text-xl font-bold transition-colors duration-300
          ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}
        `}
        >
          {title}
        </h3>
      </div>

      {/* Description */}
      <p
        className={`
        text-sm leading-relaxed transition-colors duration-300
        ${
          isActive
            ? 'text-gray-700'
            : 'text-gray-600 group-hover:text-gray-700'
        }
      `}
      >
        {description}
      </p>

      {/* Video indicator badge */}
      {!hasVideo && (
        <div className="absolute top-2 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-300">
            Coming Soon
          </span>
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-700/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
