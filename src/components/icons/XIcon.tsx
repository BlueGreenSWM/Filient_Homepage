import React from 'react'

interface XIconProps {
  className?: string
  size?: number
}

export function XIcon({ className = '', size = 24 }: XIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#000000" />
      <path
        d="M14.258 10.152L18.487 5h-1.002l-3.674 4.264L10.651 5H6.5l4.44 6.46L6.5 17h1.002l3.88-4.505L14.805 17H18.956l-4.698-6.848zm-1.375 1.595l-.45-.644-3.577-5.117h1.54l2.884 4.13.45.644 3.752 5.373h-1.54l-3.06-4.386z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
