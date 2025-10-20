import React from 'react'

interface KakaoIconProps {
  className?: string
  size?: number
}

export function KakaoIcon({ className = '', size = 24 }: KakaoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#FEE500" />
      <path
        d="M12 5C8.13 5 5 7.58 5 10.75C5 12.7 6.23 14.43 8.09 15.41L7.5 17.5C7.46 17.64 7.6 17.76 7.72 17.68L10.32 15.89C10.85 15.96 11.41 16 12 16C15.87 16 19 13.42 19 10.25C19 7.08 15.87 5 12 5Z"
        fill="#3C1E1E"
      />
    </svg>
  )
}
