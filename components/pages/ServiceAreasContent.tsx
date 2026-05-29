'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { ALL_SERVICE_AREAS } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
}

export function ServiceAreasContent() {
  const { lang } = useT()
  const p = copy[lang].serviceAreasPage

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy) 60%, var(--navy3) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-lg relative py-16 text-center md:py-20">
          <span className="badge" style={{ background: 'rgba(232,64,28,.15)', color: 'var(--orange)' }}>{p.badge}</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-sora text-4xl font-extrabold text-white md:text-5xl" style={{ fontWeight: 900 }}>{p.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,.75)' }}>{p.sub}</p>
        </div>
      </section>

      {/* Cities grid — 2 cols mobile · 4 tablet · 5 desktop */}
      <section className="section">
        <div className="container-lg">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {ALL_SERVICE_AREAS.map((city) => (
              <div
                key={city}
                className="group flex flex-col items-center gap-1.5 rounded-xl border-2 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: 'rgba(27,42,107,.18)' }}
              >
                <span className="text-navy transition-colors group-hover:text-orange">
                  <Icon name="roof" size={26} />
                </span>
                <span className="font-sora text-sm font-bold text-navy2 transition-colors group-hover:text-orange">{city}</span>
                <span className="text-xs text-muted">{p.cityCountry}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy3) 100%)', padding: 'clamp(3.5rem, 7vw, 5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-lg relative text-center" style={{ maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="font-sora text-3xl font-extrabold text-white md:text-4xl" style={{ fontWeight: 900 }}>{p.ctaTitle}</h2>
          <div className="mt-8">
            <Link href="/inspection" className="btn-primary">{p.ctaButton}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
