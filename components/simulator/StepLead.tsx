'use client'

import { useT } from '@/providers/LanguageProvider'
import { sendLead } from '@/lib/webhook'
import { fbqTrack } from '@/lib/fbq'
import type { SimState } from '@/types/simulator'

interface Props {
  state: SimState
  setField: (field: 'name' | 'phone', value: string) => void
  goNext: () => void
}

export function StepLead({ state, setField, goNext }: Props) {
  const { t } = useT()
  const q = t.stepLead
  // Teléfono real (≥10 dígitos): evita leads basura que GHL no puede contactar.
  const phoneDigits = state.phone.replace(/\D/g, '')
  const canSubmit = state.name.trim() !== '' && phoneDigits.length >= 10

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: 'var(--font-sora)' }}>
          {q.label}
        </p>
        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--navy2)', lineHeight: 1.3 }}>
          {q.title}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.375rem', fontFamily: 'var(--font-sora)' }}>
            {q.nameLabel}
          </label>
          <input type="text" value={state.name} onChange={(e) => setField('name', e.target.value)} placeholder={q.namePlaceholder} autoComplete="name" style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '1rem', fontFamily: 'var(--font-dm)', color: 'var(--navy2)', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--navy)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.375rem', fontFamily: 'var(--font-sora)' }}>
            {q.phoneLabel}
          </label>
          <input type="tel" value={state.phone} onChange={(e) => setField('phone', e.target.value)} placeholder={q.phonePlaceholder} autoComplete="tel" style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '1rem', fontFamily: 'var(--font-dm)', color: 'var(--navy2)', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--navy)' }} onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }} />
        </div>
      </div>

      <div style={{ background: 'var(--light)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        <span>🔒</span>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{q.privacy}</p>
      </div>

      {/* Consentimiento TCPA: necesario para que GHL/IA pueda llamar/textear legalmente.
          El envío del formulario cuenta como firma electrónica (E-SIGN). */}
      <p style={{ fontSize: '0.6875rem', color: 'var(--muted)', lineHeight: 1.45 }}>{q.consent}</p>

      <button
        className="btn-primary"
        onClick={() => {
          // EVENTO DE CONVERSIÓN para Meta: dispara "Lead" al dar nombre+teléfono.
          // Así el algoritmo de Meta optimiza por LEADS reales, no por clics baratos.
          fbqTrack('Lead')
          // CAPTURA TEMPRANA: enviamos el lead apenas da nombre+teléfono (con la
          // dirección ya incluida, porque el mapa va antes). Si abandona en el
          // análisis/resultado, el lead completo ya quedó guardado. Fire-and-forget.
          sendLead({ ...state, stage: 'parcial' }).catch(() => {})
          goNext()
        }}
        disabled={!canSubmit}
        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
      >
        {q.cta}
      </button>

      {/* Salida WhatsApp: el canal nativo del público latino. Menos fricción que el
          formulario para quien desconfía de dar datos en una página. */}
      <a
        href={`https://wa.me/18633815735?text=${encodeURIComponent(q.whatsappPrefill)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => fbqTrack('Contact')}
        style={{ textAlign: 'center', fontSize: '0.9375rem', fontWeight: 700, color: '#059669', textDecoration: 'none', fontFamily: 'var(--font-sora)' }}
      >
        {q.whatsapp}
      </a>
    </div>
  )
}
