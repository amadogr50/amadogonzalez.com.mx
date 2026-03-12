import type { Author } from './author'
import type { Category } from './category'
import type { Media } from './media'
import type { Tag } from './tag'

export type PostStatus = 'draft' | 'published'

export interface PostSeo {
  metaTitle?: string
  metaDescription?: string
  metaImage?: Media
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: unknown
  heroImage?: Media
  authors?: Author[]
  categories?: Category[]
  tags?: Tag[]
  publishedAt?: string
  readingTime?: number
  featured?: boolean
  language?: 'en' | 'es'
  seo?: PostSeo
  _status?: PostStatus
  createdAt: string
  updatedAt: string
}
