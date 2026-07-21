import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/client'
import { getAllPostsForSitemapQuery } from '@/sanity/queries'
import { postPath } from '@/lib/post-url'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.losangelescheckcashing.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL + '/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: BASE_URL + '/our-services/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE_URL + '/locations/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE_URL + '/locations/sherman-oaks-check-cashing/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/locations/la-cienega-check-cashing/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/locations/canoga-park-check-cashing/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/find-a-location/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE_URL + '/money-exchange/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
{ url: BASE_URL + '/se-habla-espanol/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE_URL + '/blog/', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: BASE_URL + '/accessibility/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: BASE_URL + '/privacy-policy/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: BASE_URL + '/terms-of-service/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const posts = await sanityFetch<Array<{ slug: { current: string }, publishedAt: string }>>(getAllPostsForSitemapQuery) || []

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: BASE_URL + postPath(post.slug.current, post.publishedAt),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes]
}
