"use client"

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, ChevronDown, BookOpen, Rocket, Zap, FileText } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const categoryIcons: { [key: string]: React.ReactNode } = {
  'getting-started': <Rocket className="w-4 h-4" />,
  'features': <Zap className="w-4 h-4" />,
  'advanced': <BookOpen className="w-4 h-4" />,
  'reference': <FileText className="w-4 h-4" />
}

// MDX components with custom styling
const mdxComponents = {
  h1: (props: any) => <h1 className="text-2xl font-bold text-gray-900 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-base font-medium text-gray-800 mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="space-y-2 mb-4" {...props} />,
  ol: (props: any) => <ol className="space-y-2 mb-4" {...props} />,
  li: (props: any) => (
    <li className="flex items-start">
      <span className="text-blue-500 mr-2 mt-0.5">•</span>
      <span className="text-gray-600 flex-1" {...props} />
    </li>
  ),
  strong: (props: any) => <strong className="font-semibold text-gray-800" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-600 italic" {...props} />,
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={400}
      className="rounded-lg shadow-md w-full h-auto my-6 block"
      alt={props.alt || ''}
      style={{ display: 'block' }}
    />
  ),
  a: (props: any) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />
}

// Mock docs structure (will be replaced with actual MDX files)
const docsStructure = [
  {
    id: 'getting-started',
    title: '시작하기',
    titleEn: 'Getting Started',
    sections: [
      { id: 'introduction', title: 'Filient 소개', titleEn: 'Introduction', slug: 'getting-started/introduction' },
      { id: 'installation', title: '설치 및 설정', titleEn: 'Installation', slug: 'getting-started/installation' },
      { id: 'first-rule', title: '첫 번째 규칙', titleEn: 'First Rule', slug: 'getting-started/first-rule' }
    ]
  },
  {
    id: 'features',
    title: '핵심 기능',
    titleEn: 'Core Features',
    sections: [
      { id: 'folder-management', title: '폴더 관리', titleEn: 'Folder Management', slug: 'features/folder-management' },
      { id: 'rule-system', title: '규칙 시스템', titleEn: 'Rule System', slug: 'features/rule-system' },
      { id: 'templates', title: '템플릿', titleEn: 'Templates', slug: 'features/templates' }
    ]
  },
  {
    id: 'advanced',
    title: '고급 기능',
    titleEn: 'Advanced Features',
    sections: [
      { id: 'ai-assistant', title: 'AI 어시스턴트', titleEn: 'AI Assistant', slug: 'advanced/ai-assistant' },
      { id: 'scheduler', title: '스케줄러', titleEn: 'Scheduler', slug: 'advanced/scheduler' },
      { id: 'notifications', title: '알림', titleEn: 'Notifications', slug: 'advanced/notifications' }
    ]
  },
  {
    id: 'reference',
    title: '참고자료',
    titleEn: 'Reference',
    sections: [
      { id: 'conditions', title: '조건 유형', titleEn: 'Conditions', slug: 'reference/conditions' },
      { id: 'actions', title: '액션 유형', titleEn: 'Actions', slug: 'reference/actions' },
      { id: 'faq', title: 'FAQ', titleEn: 'FAQ', slug: 'reference/faq' }
    ]
  }
]

export default function DocPage() {
  const { language } = useLanguage()
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug.join('/') : params?.slug || 'getting-started/introduction'

  // Helper function to get category from slug
  const getCategoryFromSlug = (slug: string) => {
    const category = slug.split('/')[0]
    return category
  }

  // Initialize with the current category expanded
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    const currentCategory = getCategoryFromSlug(slug)
    return [currentCategory]
  })
  const [mdxSource, setMdxSource] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Update expanded categories when slug changes
  useEffect(() => {
    const currentCategory = getCategoryFromSlug(slug)
    setExpandedCategories(prev => {
      if (!prev.includes(currentCategory)) {
        return [...prev, currentCategory]
      }
      return prev
    })
  }, [slug])

  // Load MDX content
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      setMdxSource(null) // Clear previous content
      try {
        // Fetch the actual MDX content from API
        const response = await fetch(`/api/docs/${slug}?lang=${language}`)
        if (!response.ok) {
          throw new Error('Failed to fetch document')
        }

        const { content, meta } = await response.json()

        // Serialize the MDX content
        const mdxSource = await serialize(content)
        setMdxSource(mdxSource)
      } catch (error) {
        console.error('Failed to load MDX:', error)
        // Fallback content
        const fallbackContent = `
# Document Loading Error

The document you're looking for could not be loaded. Please try again later.

문서를 불러올 수 없습니다. 나중에 다시 시도해주세요.
        `
        const mdxSource = await serialize(fallbackContent)
        setMdxSource(mdxSource)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadContent()
    }
  }, [slug, language])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const getCurrentSection = () => {
    for (const category of docsStructure) {
      const section = category.sections.find(s => s.slug === slug)
      if (section) {
        return { category, section }
      }
    }
    return null
  }

  const current = getCurrentSection()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ko' ? '홈으로' : 'Back to Home'}
              </span>
            </Link>

            <nav className="space-y-2">
              {docsStructure.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {categoryIcons[category.id]}
                      <span className="font-medium text-gray-900">
                        {language === 'ko' ? category.title : category.titleEn}
                      </span>
                    </div>
                    {expandedCategories.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {expandedCategories.includes(category.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {category.sections.map((section) => (
                        <Link
                          key={section.id}
                          href={`/docs/${section.slug}`}
                          className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                            slug === section.slug
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {language === 'ko' ? section.title : section.titleEn}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <article>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">로딩 중...</div>
                  </div>
                ) : mdxSource ? (
                  <div className="prose prose-lg max-w-none">
                    <MDXRemote {...mdxSource} components={mdxComponents} />
                  </div>
                ) : (
                  <div className="text-gray-500">문서를 찾을 수 없습니다.</div>
                )}
              </div>

              {/* Navigation buttons */}
              {current && (
                <div className="flex justify-between mt-8">
                  {(() => {
                    const currentCategoryIndex = docsStructure.findIndex(c => c.id === current.category.id)
                    const currentSectionIndex = current.category.sections.findIndex(s => s.id === current.section.id)

                    let prevSection = null
                    let nextSection = null

                    // Find previous section
                    if (currentSectionIndex > 0) {
                      prevSection = current.category.sections[currentSectionIndex - 1]
                    } else if (currentCategoryIndex > 0) {
                      const prevCategory = docsStructure[currentCategoryIndex - 1]
                      prevSection = prevCategory.sections[prevCategory.sections.length - 1]
                    }

                    // Find next section
                    if (currentSectionIndex < current.category.sections.length - 1) {
                      nextSection = current.category.sections[currentSectionIndex + 1]
                    } else if (currentCategoryIndex < docsStructure.length - 1) {
                      const nextCategory = docsStructure[currentCategoryIndex + 1]
                      nextSection = nextCategory.sections[0]
                    }

                    return (
                      <>
                        {prevSection ? (
                          <Link
                            href={`/docs/${prevSection.slug}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {language === 'ko' ? prevSection.title : prevSection.titleEn}
                            </span>
                          </Link>
                        ) : <div />}

                        {nextSection && (
                          <Link
                            href={`/docs/${nextSection.slug}`}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <span className="text-sm font-medium">
                              {language === 'ko' ? nextSection.title : nextSection.titleEn}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        )}
                      </>
                    )
                  })()}
                </div>
              )}
            </article>
          </div>
        </main>
      </div>
    </div>
  )
}