import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Simulator } from '@/components/sections/Simulator'
import { TrustBar } from '@/components/sections/TrustBar'

export const metadata: Metadata = {
  title: 'Free Roof Inspection',
  description:
    'Check in 2 minutes if your insurance can cover a new roof in Connecticut. Free inspection — you only pay your deductible.',
  alternates: { canonical: '/inspection' },
  // The conversion funnel is intentionally kept out of the index; the marketing pages rank.
  robots: { index: false, follow: true },
}

// LANDING DE CONVERSIÓN — una sola acción: completar el formulario para calificar el lead.
// Estructura mínima a propósito (headline → formulario → confianza). Sin secciones que distraigan.
export default function InspectionPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Simulator />
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
