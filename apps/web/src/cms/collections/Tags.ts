import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      localized: true,
      name: 'name',
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
  ],
  slug: 'tags',
}
