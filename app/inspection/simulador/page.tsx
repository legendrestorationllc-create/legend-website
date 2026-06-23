import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Simulator } from '@/components/sections/Simulator'
import { TrustBar } from '@/components/sections/TrustBar'

export const metadata: Metadata = {
  title: 'Verifica si tu seguro paga tu techo nuevo',
  description:
    'Responde 4 preguntas rápidas y descubre si tu seguro puede cubrir un techo nuevo en Connecticut. Gratis, sin compromiso.',
  alternates: { canonical: '/inspection/simulador' },
  robots: { index: false, follow: true },
}

// PÁGINA DEL SIMULADOR — el anuncio cae DIRECTO en la primera pregunta.
// Sin hero, sin botones intermedios: la primera acción del usuario es responder.
export default function SimuladorPage() {
  return (
    <>
      <Header />
      <main>
        <Simulator />
        <TrustBar />
      </main>
      <Footer />
    </>
  )
}
