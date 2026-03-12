import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { linkField } from '@/fields/link'
import { revalidateHeader } from '@/hooks/revalidateGlobal'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
  },
  hooks: {
    afterChange: [revalidateHeader],
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [linkField],
    },
  ],
}
