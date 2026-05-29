import Script from 'next/script'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LiveFeed } from '@/components/LiveFeed'

// Chrome for the embedded landing page only. The Google Maps loader and the floating
// widgets live here (not in the root layout) so they never load on the marketing pages —
// keeping those pages light for Lighthouse.
// Google Maps browser key — read from env (set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local).
// It's a client-side key (visible in the browser by design) so it must be restricted by
// HTTP referrer in Google Cloud Console; keeping it out of source avoids committing it.
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

export default function InspectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StickyMobileCTA />
      <WhatsAppButton />
      <LiveFeed />
      <Script
        id="google-maps-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){var s=document.createElement('script');s.src='https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places,marker&callback=Function.prototype';s.async=true;s.defer=true;s.onload=function(){window.dispatchEvent(new Event('google-maps-ready'))};document.head.appendChild(s);})();`,
        }}
      />
    </>
  )
}
