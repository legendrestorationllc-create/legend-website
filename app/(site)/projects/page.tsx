import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd'
import { ProjectsContent } from '@/components/pages/ProjectsContent'
import { PROJECTS, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Roofing Projects in Connecticut — Before & After Gallery',
  description:
    'See before-and-after roof replacements completed by Legend Restoration across Connecticut — Hartford, New Haven, Bridgeport, Stamford and more.',
  alternates: { canonical: '/projects' },
}

const galleryLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Legend Restoration — Connecticut Roofing Projects',
  associatedMedia: PROJECTS.map((p) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${p.img}`,
    description: `${p.scope} — ${p.city}`,
  })),
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={[galleryLd, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])]} />
      <ProjectsContent />
    </>
  )
}
