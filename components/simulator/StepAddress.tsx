'use client'

import { useState, useEffect } from 'react'
import { SatelliteMap } from '@/components/map/SatelliteMap'
import { useT } from '@/providers/LanguageProvider'
import { fbqTrack } from '@/lib/fbq'
import type { SimState } from '@/types/simulator'

interface Props {
  state: SimState
  setAddress: (address: string, lat: number, lng: number) => void
  goNext: () => void
}

export function StepAddress({ state, setAddress, goNext }: Props) {
  const { t } = useT()
  const q = t.stepAddress
  const [addressInput, setAddressInput] = useState(state.address)
  const [addressOk, setAddressOk] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = document.getElementById('simulador')
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
    return () => window.clearTimeout(id)
  }, [])

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setAddress(address, lat, lng)
    setAddressInput(address)
  }

  const handleContinue = () => {
    // Solo avanza si hay una dirección VERIFICADA de Connecticut (addressOk).
    // Ya quedó guardada por handleAddressSelect al elegir la sugerencia.
    if (!addressOk) return
    goNext()
  }

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

      <SatelliteMap
        onAddressSelect={handleAddressSelect}
        inputValue={addressInput}
        onInputChange={setAddressInput}
        placeholder={q.placeholder}
        onValidChange={setAddressOk}
      />

      <button className="btn-primary" onClick={handleContinue} disabled={!addressOk} style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}>
        {q.continue}
      </button>

      {/* Guía cuando escribió pero no eligió de la lista (antes: botón muerto sin explicación) */}
      {!addressOk && addressInput.trim().length >= 4 && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--orange)', textAlign: 'center', fontWeight: 600 }}>
          {q.chooseHint}
        </p>
      )}

      {/* Escape: la dirección NUNCA debe costar un lead — se confirma por teléfono */}
      <button
        type="button"
        onClick={() => { fbqTrack('Sim_address_skip', true); goNext() }}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.8125rem', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'var(--font-dm)', padding: '0.25rem' }}
      >
        {q.skip}
      </button>
    </div>
  )
}
