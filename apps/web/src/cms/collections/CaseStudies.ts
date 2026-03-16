import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
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
      name: 'company',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      localized: true,
      name: 'problem',
      type: 'richText',
    },
    {
      localized: true,
      name: 'solution',
      type: 'richText',
    },
    {
      localized: true,
      name: 'results',
      type: 'richText',
    },
    {
      fields: [
        {
          name: 'name',
          required: true,
          type: 'text',
        },
      ],
      name: 'technologies',
      type: 'array',
    },
    {
      fields: [
        {
          name: 'image',
          relationTo: 'media',
          required: true,
          type: 'upload',
        },
      ],
      name: 'gallery',
      type: 'array',
    },
    {
      name: 'coverImage',
      relationTo: 'media',
      type: 'upload',
    },
  ],
  slug: 'case-studies',
}
