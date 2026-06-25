import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonio',
    plural: 'Testimonios',
  },
  admin: {
    useAsTitle: 'author',
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req?.user),
    update: ({ req }) => Boolean(req?.user),
    delete: ({ req }) => Boolean(req?.user),
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor (Empresa o Cliente)',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Cita (Testimonio)',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Puesto o Rol',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Logotipo o Foto (Avatar)',
    },
  ],
}
