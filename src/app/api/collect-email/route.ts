import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

// Ensure this route executes in a Node.js runtime (Airtable SDK needs Node APIs)
export const runtime = 'nodejs'

/**
 * POST /api/collect-email
 * Body: { email: string; platform?: string; language?: string }
 * Stores a lead in Airtable. Does not block download flow on failure.
 */
export async function POST(request: NextRequest) {
  try {
    const { AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env

    if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
      return NextResponse.json(
        { error: 'Airtable is not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, platform, language } = body || {}

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Initialize Airtable client
    const airtable = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN })
    const base = airtable.base(AIRTABLE_BASE_ID)
    const table = base(AIRTABLE_TABLE_ID)

    // Create record
    const record = await table.create({
      Email: email,
      Platform: platform || 'unknown',
      Language: language || 'en',
    })

    return NextResponse.json({ success: true, recordId: record.id }, { status: 200 })
  } catch (error) {
    console.error('Airtable error:', error)
    return NextResponse.json(
      {
        error: 'Failed to save email',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

