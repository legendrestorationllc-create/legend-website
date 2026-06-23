import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GraciasContent } from '@/components/GraciasContent'

export const metadata: Metadata = {
  title: 'Gracias — Información recibida',
  description: 'Gracias por completar tu solicitud. Un experto de Legend Restoration te contactará pronto.',
  alternates: { canonical: '/inspection/gracias' },
  robots: { index: false, follow: false },
}

// Página de GRACIAS — destino tras completar el formulario.
// Su URL (/inspection/gracias) se usa para crear el evento / conversión personalizada en Meta.
export default function GraciasPage() {
  return (
    <>
      <Header />
      <GraciasContent />
      <Footer />
    </>
  )
}
