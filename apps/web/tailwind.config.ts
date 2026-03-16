import type { Config } from 'tailwindcss'

import sharedConfig from '@amado/ui/tailwind'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [sharedConfig],
}

export default config
