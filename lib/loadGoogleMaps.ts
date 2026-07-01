// Carga la API de Google Maps BAJO DEMANDA (no en el arranque de la página).
// Se llama solo cuando el usuario llega al paso de contacto/dirección, así Maps
// nunca pesa en la carga inicial — gran mejora de velocidad en móvil / Lighthouse.
// Es idempotente: si ya está cargada, dispara el evento al instante.

let started = false

export function loadGoogleMaps(): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { google?: { maps?: unknown } }

  // Ya disponible → avisa de inmediato.
  if (w.google?.maps) {
    window.dispatchEvent(new Event('google-maps-ready'))
    return
  }
  if (started) return
  started = true

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  const s = document.createElement('script')
  s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places,marker&callback=Function.prototype`
  s.async = true
  s.defer = true
  s.onload = () => window.dispatchEvent(new Event('google-maps-ready'))
  document.head.appendChild(s)
}
