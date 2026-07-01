'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { sendLead } from '@/lib/webhook'
import { toast } from 'sonner'
import type { SimState } from '@/types/simulator'

interface Props {
  state: SimState
  setResult: (r: SimState['result']) => void
}

export function StepResult({ state, setResult }: Props) {
  const router = useRouter()

  const sentRef = useRef(false)
  useEffect(() => {
    if (sentRef.current) return // evita doble envío (React StrictMode en dev / re-render)
    sentRef.current = true
    setResult('high')
    // 1) Enviar el lead (correo + Google Sheet) ANTES de redirigir.
    sendLead({ ...state, result: 'high', stage: 'completo' }).catch(() => {
      toast.error('No pudimos guardar tu información. Por favor llámanos directamente.')
    })
    // 2) Redirigir a la página de GRACIAS (URL que dispara la conversión en Meta).
    const t = setTimeout(() => router.push('/inspection/gracias'), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--white)' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✅</div>
      <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: 800, fontSize: '1.0625rem', marginBottom: '0.25rem' }}>
        ¡Listo! Guardando tu información…
      </h3>
      <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,.6)' }}>Un momento, por favor.</p>
    </div>
  )
}
