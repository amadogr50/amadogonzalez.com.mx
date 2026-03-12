import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPost, getPosts } from '@/lib/cms'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { docs: posts } = await getPosts({ limit: 100 })
  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.seo?.metaDescription ?? post.excerpt ?? '',
    openGraph: {
      title: post.seo?.metaTitle ?? post.title,
      description: post.seo?.metaDescription ?? post.excerpt ?? '',
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-[680px] px-6 py-16 md:px-12">
      {post.categories?.[0] && (
        <span className="mb-3 inline-block rounded bg-sage px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
          {post.categories[0].title}
        </span>
      )}
      <h1 className="font-serif text-[34px] font-medium leading-[1.15]">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-stone">
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        {post.readingTime && ` · ${post.readingTime} min read`}
      </p>
      <div className="mt-6 border-t border-hairline pt-6">
        <div className="prose-custom text-base leading-[1.85] text-stone">
          {/* Rich text content will be rendered here with a Lexical serializer */}
          <p className="text-sm italic text-warm-gray-light">
            Content rendering requires a Lexical rich text serializer.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.title,
            'datePublished': post.publishedAt,
            'author': {
              '@type': 'Person',
              'name': 'Amado González',
              'url': 'https://amadogonzalez.dev',
            },
          }),
        }}
      />
    </article>
  )
}
