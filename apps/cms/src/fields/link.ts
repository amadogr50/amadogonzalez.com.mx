import type { Field } from 'payload'

export const linkField: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'reference',
      options: [
        { label: 'Internal Link', value: 'reference' },
        { label: 'Custom URL', value: 'custom' },
      ],
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['posts'],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const linkGroupField: Field = {
  name: 'links',
  type: 'array',
  fields: [linkField],
}
