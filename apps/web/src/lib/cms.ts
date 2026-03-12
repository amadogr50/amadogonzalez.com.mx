const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

interface FetchOptions {
  limit?: number
  locale?: string
}

export async function getPosts(opts?: FetchOptions) {
  const limit = opts?.limit ?? 10
  const locale = opts?.locale ?? 'en'

  const res = await fetch(
    `${CMS_URL}/api/posts?limit=${limit}&locale=${locale}&where[_status][equals]=published&sort=-publishedAt`,
    { next: { tags: ['posts'], revalidate: 60 } },
  )

  if (!res.ok) return { docs: [], totalDocs: 0 }
  return res.json()
}

export async function getPost(slug: string) {
  const res = await fetch(
    `${CMS_URL}/api/posts?where[slug][equals]=${slug}&where[_status][equals]=published&limit=1`,
    { next: { tags: [`post-${slug}`], revalidate: 60 } },
  )

  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

export async function getCaseStudies() {
  const res = await fetch(
    `${CMS_URL}/api/case-studies?where[_status][equals]=published&sort=order`,
    { next: { tags: ['case-studies'], revalidate: 60 } },
  )

  if (!res.ok) return { docs: [], totalDocs: 0 }
  return res.json()
}

export async function getGlobal(slug: 'header' | 'footer') {
  const res = await fetch(`${CMS_URL}/api/globals/${slug}`, {
    next: { tags: [slug], revalidate: 60 },
  })

  if (!res.ok) return null
  return res.json()
}
