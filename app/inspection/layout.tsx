import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LiveFeed } from '@/components/LiveFeed'

// Chrome solo para la landing embebida. Google Maps YA NO se carga aquí:
// ahora se carga BAJO DEMANDA (lib/loadGoogleMaps) cuando el usuario llega al paso
// de contacto/dirección, así nunca bloquea la carga inicial de la página
// (gran ganancia de velocidad móvil / Lighthouse).
export default function InspectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StickyMobileCTA />
      <WhatsAppButton />
      <LiveFeed />
    </>
  )
}
