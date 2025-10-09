"use client"

import { useState, useEffect } from 'react'

interface PlatformInfo {
  isMac: boolean
  isWindows: boolean
  isLinux: boolean
  isMobile: boolean
  platform: string
}

export function usePlatformDetection(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>({
    isMac: false,
    isWindows: false,
    isLinux: false,
    isMobile: false,
    platform: 'unknown'
  })

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent
      const platformStr = navigator.platform

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isMac = platformStr.toUpperCase().indexOf('MAC') >= 0
      const isWindows = platformStr.toUpperCase().indexOf('WIN') >= 0
      const isLinux = platformStr.toUpperCase().indexOf('LINUX') >= 0

      // Determine platform string with mobile detection
      const getPlatformString = () => {
        if (isMobile) {
          if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS'
          if (/Android/i.test(userAgent)) return 'Android'
          return 'Mobile'
        }
        if (isMac) return 'macOS'
        if (isWindows) return 'Windows'
        if (isLinux) return 'Linux'
        return 'unknown'
      }

      setPlatform({
        isMac,
        isWindows,
        isLinux,
        isMobile,
        platform: getPlatformString()
      })
    }

    detectPlatform()
  }, [])

  return platform
}