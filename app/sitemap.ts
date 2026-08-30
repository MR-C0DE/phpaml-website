import type { MetadataRoute } from 'next'

const siteUrl = 'https://phpaml.com'

const routes = [
  '',
  '/platform',
  '/docs',
  '/download',
  '/demos',
  '/demos/book-reader',
  '/demos/tutor-chess',
  '/demos/movies-api',
  '/news',
  '/news/phpaml-data-enters-alpha',
  '/tutorial',
  ...Array.from({ length: 10 }, (_, index) => `/tutorial/${String(index + 1).padStart(2, '0')}`),
  '/fr',
  '/fr/platform',
  '/fr/docs',
  '/fr/download',
  '/fr/demos',
  '/fr/demos/book-reader',
  '/fr/demos/tutor-chess',
  '/fr/demos/movies-api',
  '/fr/news',
  '/fr/news/phpaml-data-enters-alpha',
  '/fr/tutorial',
  ...Array.from({ length: 10 }, (_, index) => `/fr/tutorial/${String(index + 1).padStart(2, '0')}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.includes('/tutorial/') ? 'monthly' : 'weekly',
    priority: route === '' || route === '/fr' ? 1 : route.includes('/tutorial/') ? 0.7 : 0.8,
  }))
}
