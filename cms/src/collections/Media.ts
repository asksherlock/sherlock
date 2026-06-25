import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medio',
    plural: 'Multimedia',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req?.user),
    update: ({ req }) => Boolean(req?.user),
    delete: ({ req }) => Boolean(req?.user),
  },
  admin: {
    group: 'Sistema',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
