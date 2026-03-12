import type { Media } from './media'

export interface Author {
  id: string
  name: string
  slug: string
  bio?: unknown
  avatar?: Media
  socials?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  createdAt: string
  updatedAt: string
}
