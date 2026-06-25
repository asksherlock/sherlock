import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { es } from '@payloadcms/translations/languages/es'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/DashboardStats#DashboardStats'],
      graphics: {
        Logo: '@/components/Logo#Logo',
        Icon: '@/components/Icon#Icon',
      }
    },
    meta: {
      titleSuffix: '- Sherlock AI',
    }
  },
  cors: ['http://localhost:5173', 'http://localhost:4000'],
  csrf: ['http://localhost:5173', 'http://localhost:4000'],
  collections: [Users, Media, Posts, Testimonials],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    schemaName: 'sherlock',
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  i18n: {
    supportedLanguages: { es },
  },
  localization: {
    locales: ['en', 'es'],
    fallback: true,
    defaultLocale: 'es',
  },
})
