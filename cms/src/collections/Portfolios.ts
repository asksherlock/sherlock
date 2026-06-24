import type { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  admin: {
    useAsTitle: 'title',
    group: 'Business',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
