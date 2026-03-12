import { getPosts } from '@/lib/cms'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://amadogonzalez.dev'

export async function GET() {
  const { docs: posts } = await getPosts({ limit: 50 })

  const items = posts
    .map(
      (post: {
        title: string
        slug: string
        excerpt?: string
        publishedAt?: string
      }) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/writing/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writing/${post.slug}</guid>
      ${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ''}
    </item>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Amado González — Writing</title>
    <link>${SITE_URL}</link>
    <description>Notes on engineering, infrastructure, and building things.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
