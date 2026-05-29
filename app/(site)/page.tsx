import type { Metadata } from 'next'
import { JsonLd, faqSchema } from '@/components/JsonLd'
import { HomeContent } from '@/components/pages/HomeContent'

export const metadata: Metadata = {
  title: 'Insurance-Approved Roofing in Connecticut | Free Roof Inspection',
  description:
    'Connecticut roofing contractor. Storm or hail damage? Your insurance may cover a full roof replacement — you only pay your deductible. Free inspection across CT.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <HomeContent />
    </>
  )
}
