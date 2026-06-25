import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Artículo',
    plural: 'Artículos',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req?.user),
    update: ({ req }) => Boolean(req?.user),
    delete: ({ req }) => Boolean(req?.user),
    readVersions: ({ req }) => Boolean(req?.user),
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Enlace (Slug)',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen de Portada',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      label: 'Autor',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de Publicación',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Extracto corto para SEO',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Cuerpo del artículo',
    },
  ],
}
