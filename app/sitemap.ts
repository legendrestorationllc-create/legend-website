import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static export date; bump when content changes meaningfully.
  const lastModified = new Date('2026-05-28')
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'weekly' },
    { path: '/services', priority: 0.9, freq: 'monthly' },
    { path: '/service-areas', priority: 0.8, freq: 'monthly' },
    { path: '/projects', priority: 0.8, freq: 'monthly' },
    { path: '/about', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
  ]
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
