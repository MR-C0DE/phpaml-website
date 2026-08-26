import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://phpaml.com/sitemap.xml',
    host: 'https://phpaml.com',
  }
}
