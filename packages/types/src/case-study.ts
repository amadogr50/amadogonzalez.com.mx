import type { Media } from './media'
import type { Tag } from './tag'

export interface CaseStudy {
  id: string
  title: string
  slug: string
  subtitle?: string
  company?: string
  role?: string
  year?: string
  description?: unknown
  content?: unknown
  tags?: Tag[]
  coverImage?: Media
  links?: { label: string; url: string }[]
  featured?: boolean
  order?: number
  _status?: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}
