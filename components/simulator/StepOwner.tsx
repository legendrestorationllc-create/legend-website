'use client'

import { useState, useEffect } from 'react'
import { MicroConfirm } from './MicroConfirm'
import { useT } from '@/providers/LanguageProvider'
import type { SimState, OwnerOption } from '@/types/simulator'

interface Props {
  state: SimState
  setOwner: (value: OwnerOption) => void
  goNext: () => void
}

// PASO 1 — Dueño de casa. Pregunta de compromiso (yes-ladder) que califica al lead
// y enmarca la oferta antes de cualquier otra pregunta.
export function StepOwner({ state, setOwner, goNext }: Props) {
  const { t } = useT()
  const q = t.stepOwner
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

  const handleSelect = (value: OwnerOption) => {
    if (advancing) return
    setOwner(value)
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
        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--navy2)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
          {q.title}
        </h3>
        <div style={{ background: 'var(--light)', borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem', fontSize: '0.8125rem', color: 'var(--navy)', borderLeft: '3px solid var(--orange)' }}>
          {q.infoBox}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {q.options.map((opt) => {
          const selected = state.owner === opt.value
          return (
            <button key={opt.value} className={`step-option${selected ? ' selected' : ''}`} onClick={() => handleSelect(opt.value as OwnerOption)} type="button" disabled={advancing && !selected}>
              <span className="emoji">{opt.emoji}</span>
              <span style={{ flex: 1, fontWeight: selected ? 600 : 400 }}>{opt.label}</span>
              {selected && <span style={{ color: 'var(--navy)', fontSize: '1.1rem' }}>✓</span>}
            </button>
          )
        })}
      </div>

      <MicroConfirm message={confirm} />
    </div>
  )
}
