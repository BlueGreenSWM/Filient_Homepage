import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const slug = params.slug
    const lang = req.nextUrl.searchParams.get('lang') || 'ko'

    // Construct file path
    const category = slug[0]
    const docName = slug[slug.length - 1]
    const filePath = path.join(process.cwd(), 'src/content/docs', category, lang, `${docName}.mdx`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Fallback to a default content
      return NextResponse.json({
        content: `# ${docName}

This document is not yet available. Please check back later.

이 문서는 아직 준비 중입니다. 나중에 다시 확인해 주세요.`,
        meta: {
          title: docName,
        }
      })
    }

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return NextResponse.json({
      content,
      meta: data
    })
  } catch (error) {
    console.error('Error loading MDX:', error)
    return NextResponse.json(
      { error: 'Failed to load document' },
      { status: 500 }
    )
  }
}