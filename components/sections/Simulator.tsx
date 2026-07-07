'use client'

import { useSimulator } from '@/hooks/useSimulator'
import { SimulatorCard } from '@/components/simulator/SimulatorCard'
import { useT } from '@/providers/LanguageProvider'

export function Simulator() {
  const { t } = useT()
  const {
    state, goStep, toggleSign, setOwner, setKnew,
    setField, setAddress, advanceAnalyze, setResult,
  } = useSimulator()

  return (
    <section style={{ background: 'var(--off)', padding: '1.25rem 1rem 2.5rem', position: 'relative', overflow: 'hidden', minHeight: 'calc(100svh - 60px)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange) 0%, var(--navy3) 100%)' }} />

      <div className="container-lg" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: '0.875rem' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>{t.simulator.badge}</div>
          <h2 className="section-title" style={{ marginBottom: 0, fontSize: 'clamp(1.35rem, 5.5vw, 2rem)', lineHeight: 1.18 }}>
            {t.simulator.title}<br />
            <span style={{ color: 'var(--orange)' }}>{t.simulator.titleHighlight}</span>
          </h2>
        </div>

        <SimulatorCard
          state={state}
          toggleSign={toggleSign}
          setOwner={setOwner}
          setKnew={setKnew}
          setField={setField}
          setAddress={setAddress}
          goStep={goStep}
          advanceAnalyze={advanceAnalyze}
          setResult={setResult}
        />
      </div>
    </section>
  )
}
