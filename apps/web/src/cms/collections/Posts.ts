import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      localized: true,
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      localized: true,
      name: 'excerpt',
      type: 'textarea',
    },
    {
      localized: true,
      name: 'content',
      type: 'richText',
    },
    {
      name: 'coverImage',
      relationTo: 'media',
      type: 'upload',
    },
    {
      hasMany: true,
      name: 'tags',
      relationTo: 'tags',
      type: 'relationship',
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'publishedAt',
      type: 'date',
    },
  ],
  slug: 'posts',
}
