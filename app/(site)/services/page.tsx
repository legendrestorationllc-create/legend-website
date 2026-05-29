import type { Metadata } from 'next'
import { JsonLd, servicesSchema, breadcrumbSchema, faqSchema } from '@/components/JsonLd'
import { ServicesContent } from '@/components/pages/ServicesContent'

export const metadata: Metadata = {
  title: 'Roofing Services in Connecticut — Replacement & Insurance Claims',
  description:
    'Roof replacement, insurance claim assistance, and storm/hail damage repair across Connecticut. We manage your claim end to end — you only pay your deductible.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[
        servicesSchema(),
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
        faqSchema(),
      ]} />
      <ServicesContent />
    </>
  )
}
