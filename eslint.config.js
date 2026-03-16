import { config as nextConfig } from './packages/eslint-config/next.js'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      'packages/eslint-config/**',
      'packages/prettier-config/**',
    ],
  },
  ...nextConfig,
]
