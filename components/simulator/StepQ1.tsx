'use client'

import { useState } from 'react'
import { MicroConfirm } from './MicroConfirm'
import { useT } from '@/providers/LanguageProvider'
import type { SimState } from '@/types/simulator'

interface Props {
  state: SimState
  toggleSign: (id: string) => void
  goNext: () => void
}

export function StepQ1({ state, toggleSign, goNext }: Props) {
  const { t } = useT()
  const q = t.stepQ1
  const [confirm, setConfirm] = useState<string | null>(null)
  const [advancing, setAdvancing] = useState(false)

  // Avance automático: al tocar una señal, confirma y pasa a la siguiente pregunta.
  const handleSelect = (id: string) => {
    if (advancing) return
    toggleSign(id)
    setConfirm(q.confirm)
    setAdvancing(true)
    setTimeout(() => goNext(), 900)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: 'var(--font-sora)' }}>
          {q.label}
        </p>
        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--navy2)', lineHeight: 1.3 }}>
          {q.title}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {q.signOptions.map((opt) => {
          const selected = state.signs.includes(opt.id)
          return (
            <button
              key={opt.id}
              className={`step-option${selected ? ' selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
              type="button"
              disabled={advancing && !selected}
            >
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
