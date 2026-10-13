import type { MetadataRoute } from 'next'
import { getAllNewsPosts } from './news-content'

const siteUrl = 'https://phpaml.com'
export const dynamic = 'force-dynamic'

const routes = [
  '',
  '/platform',
  '/docs',
  '/docs/01',
  '/docs/01/installation',
  '/docs/01/verification',
  '/docs/01/creation',
  '/docs/01/execution',
  '/docs/01/depannage',
  '/docs/02',
  '/docs/02/requete',
  '/docs/02/structure',
  '/docs/02/mvc',
  '/docs/02/variantes',
  '/docs/02/atelier',
  '/docs/reference',
  '/download',
  '/demos',
  '/demos/oracle-arena',
  '/demos/book-reader',
  '/demos/tutor-chess',
  '/demos/movies-api',
  '/news',
  '/tutorial',
  ...Array.from({ length: 10 }, (_, index) => `/tutorial/${String(index + 1).padStart(2, '0')}`),
  '/fr',
  '/fr/platform',
  '/fr/docs',
  '/fr/docs/01',
  '/fr/docs/01/installation',
  '/fr/docs/01/verification',
  '/fr/docs/01/creation',
  '/fr/docs/01/execution',
  '/fr/docs/01/depannage',
  '/fr/docs/02',
  '/fr/docs/02/requete',
  '/fr/docs/02/structure',
  '/fr/docs/02/mvc',
  '/fr/docs/02/variantes',
  '/fr/docs/02/atelier',
  '/fr/docs/reference',
  '/fr/download',
  '/fr/demos',
  '/fr/demos/oracle-arena',
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
