// Appcast XML 타입 정의
export interface AppcastItem {
  version: string
  shortVersionString: string
  pubDate: string
  isCriticalUpdate: boolean
  description: string
  downloadUrl: string
  fileSize: number
  edSignature: string
  minimumSystemVersion: string
  releaseNotesUrl?: string
}

export interface AppcastChannel {
  title: string
  description: string
  language: string
  link: string
  latestVersion: AppcastItem
}

export interface LatestVersionResponse {
  version: string
  downloadUrl: string
  fileSize: number
  fileSizeMB: string
  pubDate: string
  isCriticalUpdate: boolean
  minimumSystemVersion: string
  releaseNotesUrl?: string
}
