import { env } from '@/env'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { CaseStudies } from './collections/CaseStudies'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  collections: [Media, Tags, Posts, Projects, CaseStudies],
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor(),
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Spanish' },
    ],
  },
  plugins: [
    seoPlugin({
      collections: ['posts', 'projects', 'case-studies'],
      generateTitle: ({ doc }) =>
        `${typeof doc?.title === 'string' ? doc.title : 'Untitled'} | Mario Amado`,
      generateURL: ({ collectionSlug, doc }) =>
        `${env.NEXT_PUBLIC_SITE_URL}/${collectionSlug}/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      uploadsCollection: 'media',
    }),
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },
})
