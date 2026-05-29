import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Stats } from '@/components/sections/Stats'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Simulator } from '@/components/sections/Simulator'
import { WhyLegend } from '@/components/sections/WhyLegend'
import { Testimonials } from '@/components/sections/Testimonials'
import { Guarantee } from '@/components/sections/Guarantee'
import { DanielSection } from '@/components/sections/DanielSection'
import { TeamProjects } from '@/components/sections/TeamProjects'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Free Roof Inspection',
  description:
    'Check in 2 minutes if your insurance can cover a new roof in Connecticut. Free inspection — you only pay your deductible.',
  alternates: { canonical: '/inspection' },
  // The conversion funnel is intentionally kept out of the index; the marketing pages rank.
  robots: { index: false, follow: true },
}

// The original Legend Restoration landing page, served verbatim at /inspection.
// Section order matches the source landing exactly.
export default function InspectionPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <HowItWorks />
        <Simulator />
        <WhyLegend />
        <Testimonials />
        <Guarantee />
        <DanielSection />
        <TeamProjects />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
