import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

import './src/env.ts'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@amado/ui'],
}

export default withPayload(withNextIntl(nextConfig), {
  configPath: './src/cms/payload.config.ts',
})
