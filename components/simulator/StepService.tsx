'use client'

import { useState, useEffect } from 'react'
import { MicroConfirm } from './MicroConfirm'
import { useT } from '@/providers/LanguageProvider'
import { SERVICE_ICON } from '@/lib/serviceIcons'
import type { SimState, ServiceOption } from '@/types/simulator'

interface Props {
  state: SimState
  setService: (value: ServiceOption) => void
  goNext: () => void
}

export function StepService({ state, setService, goNext }: Props) {
  const { t } = useT()
  const q = t.stepService
  const [confirm, setConfirm] = useState<string | null>(null)
  const [advancing, setAdvancing] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = document.getElementById('simulador')
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
    return () => window.clearTimeout(id)
  }, [])

  // Un toque y avanza solo: nada de botón Continuar en este paso.
  const handleSelect = (value: ServiceOption) => {
    if (advancing) return
    setService(value)
    setConfirm(q.confirms[value])
    setAdvancing(true)
    setTimeout(() => goNext(), 800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: 'var(--font-sora)' }}>
          {q.label}
        </p>
        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--navy2)', lineHeight: 1.25 }}>
          {q.title}
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--muted)', marginTop: '0.35rem', fontWeight: 500 }}>{q.sub}</p>
      </div>

      <div className="service-grid">
        {q.options.map((opt) => {
          const value = opt.value as ServiceOption
          const selected = state.service === value
          return (
            <button
              key={opt.value}
              type="button"
              className={`service-card${selected ? ' selected' : ''}`}
              onClick={() => handleSelect(value)}
              disabled={advancing && !selected}
              aria-pressed={selected}
            >
              <span className="service-check" aria-hidden="true">{selected ? '✓' : ''}</span>
              <span
                className="service-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{
                  __html: `<svg width="46" height="46" viewBox="0 0 48 48">${SERVICE_ICON[opt.value]}</svg>`,
                }}
              />
              <span className="service-label">{opt.label}</span>
            </button>
          )
        })}
      </div>

      <MicroConfirm message={confirm} />
    </div>
  )
}
