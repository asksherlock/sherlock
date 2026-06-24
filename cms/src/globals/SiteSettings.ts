import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'System',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Sherlock AI',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
