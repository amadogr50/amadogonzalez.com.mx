import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { linkField } from '@/fields/link'
import { revalidateFooter } from '@/hooks/revalidateGlobal'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [linkField],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Amado González',
    },
  ],
}
