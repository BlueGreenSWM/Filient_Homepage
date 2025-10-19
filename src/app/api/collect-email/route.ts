import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

// Airtable 설정
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
})

const base = airtable.base(process.env.AIRTABLE_BASE_ID!)
const table = base(process.env.AIRTABLE_TABLE_ID!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, platform, language } = body

    // 이메일 유효성 검사
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Airtable에 저장
    const record = await table.create({
      Email: email,
      Platform: platform || 'unknown',
      Language: language || 'en',
    })

    console.log('Email saved to Airtable:', email)

    return NextResponse.json(
      {
        success: true,
        recordId: record.id
      },
      { status: 200 }
    )
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
