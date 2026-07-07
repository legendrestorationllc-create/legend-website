'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

// El chat de GoHighLevel (LeadConnector) se carga en TODO el sitio MENOS en el
// embudo /inspection. Ahí ya mandan el botón de WhatsApp + el CTA sticky, y el
// chat los tapaba en móvil. Así quedan separados y el simulador no se afecta.
export function GhlChat() {
  const pathname = usePathname()
  if (pathname?.startsWith('/inspection')) return null
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a4c3660c1e521454a1eece5"
      data-source="WEB_USER"
      strategy="afterInteractive"
    />
  )
}
