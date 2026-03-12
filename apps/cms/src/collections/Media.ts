import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 300, height: undefined },
      { name: 'square', width: 500, height: 500 },
      { name: 'small', width: 600, height: undefined },
      { name: 'medium', width: 900, height: undefined },
      { name: 'large', width: 1400, height: undefined },
      { name: 'xlarge', width: 1920, height: undefined },
      { name: 'og', width: 1200, height: 630 },
    ],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
    },
  ],
}
