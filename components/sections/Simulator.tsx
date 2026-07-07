'use client'

import Image from 'next/image'
import { useSimulator } from '@/hooks/useSimulator'
import { SimulatorCard } from '@/components/simulator/SimulatorCard'
import { useT } from '@/providers/LanguageProvider'

export function Simulator() {
  const { t, lang } = useT()
  const {
    state, goStep, toggleSign, setOwner, setKnew,
    setField, setAddress, advanceAnalyze, setResult,
  } = useSimulator()

  return (
    <section style={{ background: 'var(--off)', padding: '1.1rem 1rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--orange) 0%, var(--navy3) 100%)' }} />

      <div className="container-lg" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: '0.875rem' }}>
          <div className="badge badge-orange" style={{ marginBottom: '0.5rem' }}>{t.simulator.badge}</div>
          <h2 className="section-title" style={{ marginBottom: 0, fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)', lineHeight: 1.2 }}>
            {t.simulator.title}<br />
            <span style={{ color: 'var(--orange)' }}>{t.simulator.titleHighlight}</span>
          </h2>

          {/* Rostro humano = confianza: fundador con punto "en línea" */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.625rem' }}>
            <div style={{ position: 'relative', width: 30, height: 30, flexShrink: 0 }}>
              <Image src="/daniel.jpg" alt="Daniel, fundador" width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%' }} />
              <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--off)' }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, fontFamily: 'var(--font-dm)' }}>
              {lang === 'es' ? 'Daniel, fundador' : 'Daniel, founder'} · <span style={{ color: 'var(--green)', fontWeight: 700 }}>{lang === 'es' ? 'en línea' : 'online'}</span>
            </span>
          </div>
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
