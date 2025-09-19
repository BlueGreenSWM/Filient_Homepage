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

      setPlatform({
        isMac,
        isWindows,
        isLinux,
        isMobile,
        platform: isMac ? 'macOS' : isWindows ? 'Windows' : isLinux ? 'Linux' : 'unknown'
      })
    }

    detectPlatform()
  }, [])

  return platform
}