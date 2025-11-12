import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filient.ai'
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Documentation pages
  const docPages = [
    // Getting Started
    '01-introduction',
    '02-installation',
    '03-first-rule',

    // Features
    'features/01-folder-management',
    'features/02-rule-system',
    'features/03-rule-templates',
    'features/04-rule-execution',
    'features/05-history-rollback',

    // Advanced
    'advanced/01-direct-action',
    'advanced/02-notifications',
    'advanced/03-scheduler',

    // Reference
    'reference/01-conditions',
    'reference/02-actions',
    'reference/05-faq',
  ]

  const docSitemap: MetadataRoute.Sitemap = docPages.map((slug) => ({
    url: `${baseUrl}/docs/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...docSitemap]
}
