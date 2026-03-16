import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { CaseStudies } from './collections/CaseStudies'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Tags, Posts, Projects, CaseStudies],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      collections: ['posts', 'projects', 'case-studies'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${typeof doc?.title === 'string' ? doc.title : 'Untitled'} | Mario Amado`,
      generateURL: ({ doc, collectionSlug }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/${collectionSlug}/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
    }),
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
})
