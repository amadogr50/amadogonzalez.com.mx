import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
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
      name: 'description',
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
      name: 'repoUrl',
      type: 'text',
    },
    {
      name: 'liveUrl',
      type: 'text',
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
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
      name: 'featured',
      type: 'checkbox',
    },
    {
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'active',
      name: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
      ],
      type: 'select',
    },
  ],
  slug: 'projects',
}
