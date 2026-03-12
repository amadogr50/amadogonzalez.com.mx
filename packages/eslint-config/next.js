import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for Next.js apps.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,

  // React
  {
    plugins: {
      'react': pluginReact,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: { version: '19' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Ignores for Next.js
  {
    ignores: ['.next/**'],
  },
]
