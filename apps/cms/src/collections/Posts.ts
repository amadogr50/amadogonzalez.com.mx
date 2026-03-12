import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidatePost } from '@/hooks/revalidatePost'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
            },
            {
              name: 'authors',
              type: 'relationship',
              relationTo: 'authors',
              hasMany: true,
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'readingTime',
              type: 'number',
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'language',
              type: 'select',
              defaultValue: 'en',
              options: [
                { label: 'English', value: 'en' },
                { label: 'Spanish', value: 'es' },
              ],
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
      ],
    },
  ],
}
