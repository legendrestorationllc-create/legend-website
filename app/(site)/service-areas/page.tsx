import type { Metadata } from 'next'
import { JsonLd, localBusinessSchema, breadcrumbSchema } from '@/components/JsonLd'
import { ServiceAreasContent } from '@/components/pages/ServiceAreasContent'
import { ALL_SERVICE_AREAS } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Roofing Service Areas in Connecticut | Legend Restoration' },
  description:
    'Legend Restoration serves all 50+ cities in Connecticut. Free roof inspection. Insurance claims specialists. Call (863) 381-5735.',
  alternates: { canonical: '/service-areas' },
}

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={[
        localBusinessSchema(ALL_SERVICE_AREAS),
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/service-areas' }]),
      ]} />
      <ServiceAreasContent />
    </>
  )
}
