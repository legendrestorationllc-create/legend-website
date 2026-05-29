'use client'

import { useEffect } from 'react'
import { useT } from '@/providers/LanguageProvider'
import type { SimState } from '@/types/simulator'

interface Props {
  state: SimState
  advanceAnalyze: () => void
  goNext: () => void
}

export function StepAnalyzing({ state, advanceAnalyze, goNext }: Props) {
  const { t } = useT()
  const q = t.stepAnalyzing

  useEffect(() => {
    if (state.analyzeStep >= q.steps.length) {
      const timer = setTimeout(goNext, 450)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(advanceAnalyze, 950)
    return () => clearTimeout(timer)
  }, [state.analyzeStep, advanceAnalyze, goNext, q.steps.length])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚙️</div>
        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--white)', marginBottom: '0.375rem' }}>{q.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,.6)' }}>{q.sub}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
        {q.steps.map((text, i) => {
          const done = i < state.analyzeStep
          const active = i === state.analyzeStep
          const pending = i > state.analyzeStep
          return (
            <div key={i} className={`analyze-item${active ? ' active' : done ? ' done' : ''}`}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{done ? '✅' : active ? '⏳' : '⭕'}</span>
              <span style={{ opacity: pending ? 0.4 : 1 }}>{text}</span>
            </div>
          )
        })}
      </div>

      <div style={{ background: 'rgba(255,255,255,.08)', borderRadius: 'var(--radius)', overflow: 'hidden', height: 6 }}>
        <div style={{ height: '100%', background: 'var(--orange)', width: `${(state.analyzeStep / q.steps.length) * 100}%`, transition: 'width 0.8s ease', borderRadius: 'var(--radius)' }} />
      </div>
    </div>
  )
}
