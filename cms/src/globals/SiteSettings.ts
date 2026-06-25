import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ajustes del Sitio',
  admin: {
    group: 'Sistema',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req?.user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Sherlock AI',
      label: 'Nombre del Sitio',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logotipo Principal',
    },
    {
      name: 'contactEmail',
      type: 'text',
      label: 'Correo de Contacto',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes Sociales',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Plataforma',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Enlace (URL)',
        },
      ],
    },
  ],
}
