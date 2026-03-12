import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/cms'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://amadogonzalez.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: posts } = await getPosts({ limit: 100 })

  const postEntries = posts.map(
    (post: { slug: string; updatedAt: string }) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  )

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...postEntries,
  ]
}
