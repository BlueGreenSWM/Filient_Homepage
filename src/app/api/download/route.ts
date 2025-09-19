import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

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

    // Path to the DMG file in public directory
    const dmgPath = path.join(process.cwd(), 'public', 'downloads', 'Filient.dmg')

    // Check if file exists
    if (!fs.existsSync(dmgPath)) {
      // For demo purposes, return a placeholder response
      return NextResponse.json(
        {
          message: 'DMG file not found. In production, this would serve the actual Filient.dmg file.',
          note: 'Please add Filient.dmg to public/downloads/ directory'
        },
        { status: 404 }
      )
    }

    // Read the file
    const fileBuffer = fs.readFileSync(dmgPath)

    // Track download (in production, you'd log this to analytics)
    console.log(`Download initiated at ${new Date().toISOString()} from ${userAgent}`)

    // Return the file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-apple-diskimage',
        'Content-Disposition': 'attachment; filename="Filient.dmg"',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
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