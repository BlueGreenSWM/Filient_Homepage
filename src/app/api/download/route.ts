import { NextRequest, NextResponse } from 'next/server'
import { getLatestVersion, getS3FileStream, extractS3KeyFromUrl, convertZipUrlToDmg } from '@/lib/s3-utils'

export async function GET(request: NextRequest) {
  try {
    // Get user agent to detect platform
    const userAgent = request.headers.get('user-agent') || ''

    // Check if request is from macOS
    const isMac = userAgent.includes('Macintosh') || userAgent.includes('Mac OS')

    if (!isMac) {
      return NextResponse.json(
        { error: 'Download is currently only available for macOS' },
        { status: 400 }
      )
    }

    // 최신 버전 정보 가져오기
    const latestVersion = await getLatestVersion()

    // ZIP URL을 DMG URL로 변환
    const dmgUrl = convertZipUrlToDmg(latestVersion.downloadUrl)

    // S3 키 추출
    const s3Key = extractS3KeyFromUrl(dmgUrl)

    console.log(`Download initiated: ${latestVersion.version} at ${new Date().toISOString()} from ${userAgent}`)

    // S3에서 파일 스트림 가져오기
    const s3Response = await getS3FileStream(s3Key)

    if (!s3Response.Body) {
      throw new Error('Empty response from S3')
    }

    // Stream을 ReadableStream으로 변환
    const stream = s3Response.Body.transformToWebStream()

    // 파일명 생성
    const fileName = `Filient-${latestVersion.version}.dmg`

    // 스트리밍 응답 반환
    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-apple-diskimage',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': s3Response.ContentLength?.toString() || '',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process download request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Track download analytics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In production, you would:
    // 1. Send analytics to your tracking service
    // 2. Store download count in database
    // 3. Send event to marketing automation

    console.log('Download analytics:', {
      timestamp: new Date().toISOString(),
      platform: body.platform,
      version: body.version,
      source: body.source,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    )
  }
}