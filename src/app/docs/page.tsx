"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { docsContent } from '@/lib/docs-content'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, ChevronDown, BookOpen, Rocket, Zap, FileText } from 'lucide-react'

const categoryIcons: { [key: string]: React.ReactNode } = {
  'getting-started': <Rocket className="w-4 h-4" />,
  'features': <Zap className="w-4 h-4" />,
  'advanced': <BookOpen className="w-4 h-4" />,
  'reference': <FileText className="w-4 h-4" />
}

export default function DocsPage() {
  const { language } = useLanguage()
  const [selectedSection, setSelectedSection] = useState(docsContent[0].sections[0].id)
  const [selectedCategory, setSelectedCategory] = useState(docsContent[0].id)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([docsContent[0].id])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSectionClick = (categoryId: string, sectionId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSection(sectionId)
    if (!expandedCategories.includes(categoryId)) {
      setExpandedCategories(prev => [...prev, categoryId])
    }
  }

  const currentContent = docsContent
    .find(cat => cat.id === selectedCategory)
    ?.sections.find(sec => sec.id === selectedSection)

  const formatContent = (content: string) => {
    // Clean up the content first
    let cleanContent = content
      .replace(/^####\s+/gm, '') // Remove #### prefixes
      .replace(/^###\s+(.+)$/gm, '### $1') // Ensure proper ### format
      .trim()

    // Convert markdown-style formatting to HTML
    return cleanContent
      .split('\n')
      .map(line => {
        // Headers - support h1 through h4
        if (line.startsWith('#### ')) {
          return `<h4 class="text-base font-medium text-gray-800 mt-4 mb-2">${line.slice(5)}</h4>`
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">${line.slice(4)}</h3>`
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">${line.slice(3)}</h2>`
        }
        if (line.startsWith('# ')) {
          return `<h1 class="text-2xl font-bold text-gray-900 mb-6">${line.slice(2)}</h1>`
        }

        // Lists - improved regex for numbered lists
        if (line.startsWith('- ')) {
          const content = line.slice(2)
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
          return `<li class="flex items-start mb-2"><span class="text-blue-500 mr-2 mt-0.5">•</span><span class="text-gray-600 flex-1">${content}</span></li>`
        }

        // Numbered lists - fixed regex
        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/)
        if (numberedMatch) {
          const [, num, content] = numberedMatch
          const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
          return `<li class="flex items-start mb-2"><span class="text-blue-600 font-medium mr-3">${num}.</span><span class="text-gray-600 flex-1">${formattedContent}</span></li>`
        }

        // Code blocks
        if (line.startsWith('```')) {
          return line === '```' ? '</pre>' : '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm">'
        }

        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')

        // Inline code
        line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')

        // Blockquotes
        if (line.startsWith('> ')) {
          return `<blockquote class="border-l-4 border-blue-500 pl-4 my-4 text-gray-600 italic">${line.slice(2)}</blockquote>`
        }

        // Regular paragraphs
        if (line.trim() && !line.startsWith('<')) {
          return `<p class="text-gray-600 mb-4 leading-relaxed">${line}</p>`
        }

        return line
      })
      .join('\n')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen overflow-y-auto">
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
              {docsContent.map((category) => (
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
                        <button
                          key={section.id}
                          onClick={() => handleSectionClick(category.id, section.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                            selectedSection === section.id && selectedCategory === category.id
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {language === 'ko' ? section.title : section.titleEn}
                        </button>
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
            {currentContent && (
              <article>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: formatContent(
                        language === 'ko' ? currentContent.content : currentContent.contentEn
                      )
                    }}
                  />
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  {(() => {
                    const currentCat = docsContent.find(cat => cat.id === selectedCategory)
                    const currentIndex = currentCat?.sections.findIndex(sec => sec.id === selectedSection) ?? -1
                    const prevSection = currentIndex > 0 ? currentCat?.sections[currentIndex - 1] : null
                    const nextSection = currentIndex < (currentCat?.sections.length ?? 0) - 1
                      ? currentCat?.sections[currentIndex + 1]
                      : null

                    return (
                      <>
                        {prevSection && (
                          <button
                            onClick={() => setSelectedSection(prevSection.id)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {language === 'ko' ? prevSection.title : prevSection.titleEn}
                            </span>
                          </button>
                        )}
                        {!prevSection && <div />}

                        {nextSection && (
                          <button
                            onClick={() => setSelectedSection(nextSection.id)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <span className="text-sm font-medium">
                              {language === 'ko' ? nextSection.title : nextSection.titleEn}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )
                  })()}
                </div>
              </article>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}