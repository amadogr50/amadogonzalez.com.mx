import Link from 'next/link'

import { getPosts } from '@/lib/cms'
import { Container } from '@/components/container'

export async function WritingPreview() {
  const { docs: posts } = await getPosts({ limit: 3 })

  return (
    <section id='writing'>
      <Container className="py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm-gray-light">
        Writing
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight">
        Notes on building things
      </h2>
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
                <h3 className="font-serif text-[26px] font-medium leading-[1.15]">
                  {post.title}
                </h3>
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

      {posts.length > 0 && (
        <Link
          href="/writing"
          className="mt-8 inline-block border-b border-sage pb-0.5 text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:text-sage"
        >
          View all writing
        </Link>
      )}
      </Container>
    </section>
  )
}
