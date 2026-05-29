'use client'

import Link from 'next/link'
import { business } from '@/lib/site'
import { copy } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { useT } from '@/providers/LanguageProvider'

// title/subtitle accept already-translated overrides; otherwise the default band copy is used.
export function CtaBand({ title, subtitle }: { title?: string; subtitle?: string }) {
  const { lang } = useT()
  const c = copy[lang].ctaBand

  return (
    <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy3) 100%)', padding: 'clamp(3.5rem, 7vw, 5.5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="container-lg" style={{ position: 'relative', zIndex: 1, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', width: 64, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', background: 'rgba(232,64,28,.15)', color: 'var(--orange)', marginBottom: '1.25rem' }}>
          <Icon name="roof" size={30} />
        </span>
        <h2 className="font-sora" style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#fff', lineHeight: 1.15 }}>{title ?? c.title}</h2>
        <p style={{ margin: '1rem auto 0', maxWidth: 520, fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,.72)' }}>
          {subtitle ?? c.subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/inspection" className="btn-primary w-full sm:w-auto">{c.primary}</Link>
          <a href={business.phoneHref} className="btn-ghost-light w-full sm:w-auto">
            <Icon name="phone" size={17} /> {c.call} {business.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
