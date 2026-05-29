import type { Metadata } from 'next'
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd'
import { ContactContent } from '@/components/pages/ContactContent'

export const metadata: Metadata = {
  title: 'Contact — Free Roof Inspection in Connecticut',
  description:
    'Contact Legend Restoration for a free roof inspection in Connecticut. Call (863) 381-5735 or send a message. We respond within 48 hours — often the same day.',
  alternates: { canonical: '/contact' },
}

const contactLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Legend Restoration',
  description: 'Get a free roof inspection in Connecticut.',
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactLd, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]} />
      <ContactContent />
    </>
  )
}
