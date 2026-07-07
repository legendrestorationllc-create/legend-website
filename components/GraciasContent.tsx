'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { business } from '@/lib/site'

export function GraciasContent() {
  useEffect(() => {
    confetti({
      particleCount: 160,
      spread: 80,
      colors: ['#C9A84C', '#E8401C', '#ffffff', '#1B2A6B', '#059669'],
      origin: { y: 0.5 },
    })
  }, [])

  const steps = [
    'Un experto de Legend revisa tu información.',
    'Te contactamos en menos de 24 horas para agendar tu inspección gratis.',
    'Documentamos el daño y manejamos el reclamo con tu seguro. Tú solo pagas tu deducible.',
  ]

  return (
    <main
      style={{
        minHeight: '78vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy) 60%, var(--navy3) 100%)',
      }}
    >
      <div style={{ maxWidth: 540, width: '100%', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
        <h1 style={{ fontFamily: 'var(--font-sora)', fontWeight: 900, fontSize: 'clamp(1.5rem, 5vw, 2rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          ¡Buenas noticias!
        </h1>

        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, rgba(245,197,66,.20) 0%, rgba(201,168,76,.07) 100%)', border: '1px solid rgba(245,197,66,.55)', borderRadius: 'var(--radius)', padding: '1.5rem 2.75rem', marginBottom: '1.25rem', boxShadow: '0 8px 40px rgba(245,197,66,0.30)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F5C542', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-sora)' }}>Tu probabilidad de calificar</span>
          <span style={{ fontSize: 'clamp(3.25rem, 13vw, 4.5rem)', fontFamily: 'var(--font-sora)', fontWeight: 900, background: 'linear-gradient(135deg, #FFE79A 0%, #F5C542 45%, #C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, margin: '0.35rem 0', filter: 'drop-shadow(0 2px 10px rgba(245,197,66,.45))' }}>97%</span>
          <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,.92)', fontWeight: 600, fontFamily: 'var(--font-sora)' }}>de calificar para un techo nuevo</span>
        </div>

        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          Un experto de <strong style={{ color: 'white' }}>Legend Restoration</strong> te contactará en menos de <strong style={{ color: 'white' }}>24 horas</strong> para tu inspección gratuita.
        </p>

        <div style={{ background: 'linear-gradient(135deg, #F26A21 0%, #E8401C 100%)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 'var(--radius)', padding: '1.25rem 1.375rem', textAlign: 'left', marginBottom: '1.75rem', boxShadow: '0 10px 30px rgba(232,64,28,.35)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,.9)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem', fontFamily: 'var(--font-sora)' }}>
            Qué sigue
          </p>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: i < steps.length - 1 ? '0.75rem' : 0 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', color: '#E8401C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 800, flexShrink: 0, fontFamily: 'var(--font-sora)', marginTop: 1 }}>{i + 1}</span>
              <p style={{ fontSize: '0.9375rem', color: 'white', fontWeight: 500, lineHeight: 1.5 }}>{s}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#F5C542', fontWeight: 800, fontFamily: 'var(--font-sora)', letterSpacing: '0.02em' }}>
            👇 Agenda tu inspección GRATIS
          </span>
          <a
            href={`${business.whatsappHref}?text=Hola%2C%20acabo%20de%20llenar%20el%20formulario%20y%20quiero%20agendar%20mi%20inspecci%C3%B3n.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#059669', color: 'white', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', fontSize: '1rem', fontWeight: 800, textDecoration: 'none', fontFamily: 'var(--font-sora)', boxShadow: '0 6px 20px rgba(5,150,105,0.35)' }}
          >
            💬 Escríbenos por WhatsApp ahora
          </a>
          <a href={business.phoneHref} style={{ color: 'rgba(255,255,255,.85)', fontSize: '0.9375rem', textDecoration: 'none', fontWeight: 600 }}>
            o llámanos: {business.phone}
          </a>
        </div>
      </div>
    </main>
  )
}
