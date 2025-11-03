"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { storeUTMParamsFromUrl } from '@/lib/utm'

export function UTMTracker() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    storeUTMParamsFromUrl(window.location.search, document.referrer)
  }, [searchParams, pathname])

  return null
}
