import type { Config } from 'tailwindcss'

import { colors, fonts } from './src/tokens'

const config: Config = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: fonts.serif,
        sans: fonts.sans,
      },
      maxWidth: {
        content: '1100px',
      },
    },
  },
}

export default config
