import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DOCS_PATH = path.join(process.cwd(), 'src/content/docs')

export interface DocMeta {
  id: string
  title: string
  description?: string
  order?: number
  category: string
  slug: string
}

export interface DocCategory {
  id: string
  title: string
  titleEn: string
  order: number
  sections: DocMeta[]
}

// Get all MDX files from a directory
export function getDocsFromDirectory(dir: string, lang: 'ko' | 'en'): DocMeta[] {
  const dirPath = path.join(DOCS_PATH, dir, lang)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.mdx'))

  return files.map(file => {
    const filePath = path.join(dirPath, file)
    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)
    const id = file.replace('.mdx', '')

    return {
      id,
      title: data.title || id,
      description: data.description,
      order: data.order || 999,
      category: dir,
      slug: `${dir}/${id}`
    }
  }).sort((a, b) => a.order - b.order)
}

// Get document content by slug
export async function getDocBySlug(slug: string, lang: 'ko' | 'en') {
  const filePath = path.join(DOCS_PATH, `${slug}/${lang}/${slug.split('/').pop()}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    meta: data,
    content
  }
}

// Get all categories with their documents
export function getAllDocs(lang: 'ko' | 'en'): DocCategory[] {
  const categories = [
    {
      id: 'getting-started',
      title: '시작하기',
      titleEn: 'Getting Started',
      order: 1
    },
    {
      id: 'features',
      title: '핵심 기능',
      titleEn: 'Core Features',
      order: 2
    },
    {
      id: 'advanced',
      title: '고급 기능',
      titleEn: 'Advanced Features',
      order: 3
    },
    {
      id: 'reference',
      title: '참고자료',
      titleEn: 'Reference',
      order: 4
    }
  ]

  return categories.map(category => ({
    ...category,
    sections: getDocsFromDirectory(category.id, lang)
  })).filter(cat => cat.sections.length > 0)
}