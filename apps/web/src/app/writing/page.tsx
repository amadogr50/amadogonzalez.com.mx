import type { Metadata } from 'next'
import Link from 'next/link'

import { getPosts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on engineering, infrastructure, and running a real business.',
}

export default async function WritingPage() {
  const { docs: posts } = await getPosts({ limit: 50 })

  return (
    <div className="mx-auto max-w-content px-6 py-16 md:px-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        Writing
      </p>
      <h1 className="mt-2 font-serif text-[34px] font-medium leading-tight">
        Notes on building things
      </h1>
      <p className="mt-3 max-w-[600px] text-sm text-stone">
        I write about the intersection of engineering, infrastructure, and
        running a real business. Mostly practical — occasionally reflective.
      </p>
      <div className="mt-8 h-px w-10 bg-sage" />

      <div className="mt-8 space-y-4">
        {posts.length > 0 ? (
          posts.map(
            (post: {
              id: string
              slug: string
              title: string
              categories?: { title: string }[]
              publishedAt?: string
              readingTime?: number
            }) => (
              <Link
                key={post.id}
                href={`/writing/${post.slug}`}
                className="block rounded-lg border border-hairline bg-card-bg p-7 transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                {post.categories?.[0] && (
                  <span className="mb-3 inline-block rounded bg-sage px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
                    {post.categories[0].title}
                  </span>
                )}
                <h2 className="font-serif text-[26px] font-medium leading-[1.15]">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-stone">
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  {post.readingTime && ` · ${post.readingTime} min read`}
                </p>
              </Link>
            ),
          )
        ) : (
          <p className="text-sm italic text-warm-gray-light">
            Posts coming soon.
          </p>
        )}
      </div>
    </div>
  )
}
