'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useT } from '@/providers/LanguageProvider'

const LOGO_SRC = '/logo-legend.png'
const LOGO_FALLBACK = '/logo.jpg'

export function Header() {
  const { t } = useT()
  const pathname = usePathname()
  // En la landing/simulador: logo más chico y ocultamos el CTA "Ver si califico"
  // (es redundante — el usuario ya está dentro del simulador).
  const isLanding = pathname?.startsWith('/inspection') ?? false
  const logoH = isLanding ? 44 : 56
  const [scrolled, setScrolled] = useState(false)
  const [logoSrc, setLogoSrc] = useState(LOGO_SRC)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToSim = () => {
    document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(17,29,74,0.97)' : 'var(--navy2)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid rgba(255,255,255,${scrolled ? '.08' : '0'})`,
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.2)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div className="container-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <Image
              src={logoSrc}
              alt="Legend Restoration Logo"
              height={346}
              width={1600}
              priority
              style={{ objectFit: 'contain', width: 'auto', height: logoH }}
              sizes="200px"
              onError={() => setLogoSrc(LOGO_FALLBACK)}
            />
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href={t.contact.phoneHref}
            style={{ color: 'rgba(255,255,255,.7)', fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'var(--font-dm)' }}
            className="hidden md:flex items-center gap-1"
          >
            📞 {t.contact.phone}
          </a>
          {/* Mini avatar del fundador con punto verde "en línea" — rostro humano = confianza */}
          <div style={{ position: 'relative', width: 34, height: 34, flexShrink: 0 }}>
            <Image
              src="/daniel.jpg"
              alt="Daniel, fundador de Legend Restoration"
              width={34}
              height={34}
              style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', border: '2px solid rgba(255,255,255,.3)' }}
            />
            <span style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--navy2)' }} />
          </div>
          <button className="btn-primary" onClick={scrollToSim} style={{ padding: '0.5rem 0.85rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
            {t.header.cta}
          </button>
        </nav>
      </div>
    </header>
  )
}
