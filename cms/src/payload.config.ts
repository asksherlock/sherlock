import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { Portfolios } from './collections/Portfolios'
import { Services } from './collections/Services'
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
        Icon: '@/components/Logo#Logo',
      }
    },
    meta: {
      titleSuffix: '- Sherlock AI',
    }
  },
  cors: ['http://localhost:5173'], // Habilitar CORS para el frontend Vite
  csrf: ['http://localhost:5173'],
  collections: [Users, Media, Posts, Testimonials, Portfolios, Services],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  localization: {
    locales: ['en', 'es'],
    fallback: true,
    defaultLocale: 'es',
  },
})
