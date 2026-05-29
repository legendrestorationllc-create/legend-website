import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd'
import { AboutContent } from '@/components/pages/AboutContent'

export const metadata: Metadata = {
  title: 'About Us — Daniel Rivera & the Legend Restoration Team',
  description:
    'Meet Daniel Rivera and the Legend Restoration team — Connecticut roofing specialists helping homeowners get insurance-approved roof replacements with no upfront cost.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <AboutContent />
    </>
  )
}
