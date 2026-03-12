import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'
import { Users } from '@/collections/Users'
import { Authors } from '@/collections/Authors'
import { Categories } from '@/collections/Categories'
import { Tags } from '@/collections/Tags'
import { Media } from '@/collections/Media'
import { Posts } from '@/collections/Posts'
import { CaseStudies } from '@/collections/CaseStudies'
import { Header } from '@/globals/Header'
import { Footer } from '@/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Users, Authors, Categories, Tags, Media, Posts, CaseStudies],
  globals: [Header, Footer],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: defaultLexical,
  plugins: [
    seoPlugin({
      collections: ['posts', 'case-studies'],
      generateTitle: ({ doc }) =>
        `${(doc as { title?: string }).title ?? ''} — amadogonzalez.dev`,
      generateURL: ({ doc }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amadogonzalez.dev'}/writing/${(doc as { slug?: string }).slug ?? ''}`,
    }),
    nestedDocsPlugin({
      collections: ['categories'],
    }),
    redirectsPlugin({
      collections: ['posts'],
    }),
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  typescript: {
    outputFile: path.resolve(dirname, '../../../packages/types/src/payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  sharp,
})
