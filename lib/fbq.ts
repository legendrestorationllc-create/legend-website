// Wrapper seguro del píxel de Meta: no falla si fbq aún no cargó ni en SSR.
// Eventos estándar → track('Lead'). Eventos propios → track('Sim_q2', true).
type Fbq = (...args: unknown[]) => void

export function fbqTrack(event: string, custom = false) {
  if (typeof window === 'undefined') return
  const fbq = (window as unknown as { fbq?: Fbq }).fbq
  fbq?.(custom ? 'trackCustom' : 'track', event)
}
