import type { MetadataRoute } from 'next'
import { getAllNewsPosts } from './news-content'

const siteUrl = 'https://phpaml.com'
export const dynamic = 'force-dynamic'

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
  '/fr/tutorial',
  ...Array.from({ length: 10 }, (_, index) => `/fr/tutorial/${String(index + 1).padStart(2, '0')}`),
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllNewsPosts()
  const newsRoutes = posts.flatMap(({ slug }) => [`/news/${slug}`, `/fr/news/${slug}`])
  return [...routes, ...newsRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: route.includes('/news/') ? posts.find(({ slug }) => route.endsWith(`/${slug}`))?.updatedAt : undefined,
    changeFrequency: route.includes('/tutorial/') ? 'monthly' : 'weekly',
    priority: route === '' || route === '/fr' ? 1 : route.includes('/tutorial/') ? 0.7 : 0.8,
  }))
}
