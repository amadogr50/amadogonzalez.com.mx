export interface Category {
  id: string
  title: string
  slug: string
  parent?: Category
  breadcrumbs?: { label: string; url: string }[]
  createdAt: string
  updatedAt: string
}
