import { NextResponse } from 'next/server'
import { getLatestVersion, formatFileSize, convertZipUrlToDmg } from '@/lib/s3-utils'
import type { LatestVersionResponse } from '@/types/appcast'

/**
 * GET /api/latest-version
 * 최신 버전 정보 반환
 */
export async function GET() {
  try {
    const latestVersion = await getLatestVersion()

    // ZIP URL을 DMG URL로 변환 (웹사이트 다운로드는 DMG 제공)
    const dmgUrl = convertZipUrlToDmg(latestVersion.downloadUrl)

    const response: LatestVersionResponse = {
      version: latestVersion.version,
      downloadUrl: dmgUrl,
      fileSize: latestVersion.fileSize,
      fileSizeMB: formatFileSize(latestVersion.fileSize),
      pubDate: latestVersion.pubDate,
      isCriticalUpdate: latestVersion.isCriticalUpdate,
      minimumSystemVersion: latestVersion.minimumSystemVersion,
      releaseNotesUrl: latestVersion.releaseNotesUrl,
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5분 캐시
      },
    })
  } catch (error) {
    console.error('Latest version API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch latest version information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
