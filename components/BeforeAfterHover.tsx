'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Icon } from '@/components/Icon'

// Before/after reveal card — shows the "before" (storm damage) and cross-fades to the
// finished "after" roof on hover (or tap on touch devices). Mirrors the landing page's
// premium photo treatment: rounded-xl, large shadow, navy caption bar, green status badge.
export function BeforeAfterHover({
  before,
  after,
  city,
  alt,
  beforeLabel,
  afterLabel,
  badge,
  priority = false,
}: {
  before: string
  after: string
  city: string
  alt: string
  beforeLabel: string
  afterLabel: string
  badge: string
  priority?: boolean
}) {
  const [revealed, setRevealed] = useState(false)

  return (
    <figure
      style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', cursor: 'pointer' }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed((v) => !v)}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
        <Image src={before} alt={`${alt} — ${beforeLabel}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority={priority} />
        <Image
          src={after}
          alt={`${alt} — ${afterLabel}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', transition: 'opacity 0.45s ease', opacity: revealed ? 1 : 0 }}
        />

        {/* Status badge (green) */}
        <span style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--green)', color: '#fff', borderRadius: 999, padding: '0.3rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-sora)' }}>
          <Icon name="check" size={13} strokeWidth={3} /> {badge}
        </span>

        {/* Before / After pill */}
        <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'rgba(17,29,74,.85)', color: '#fff', borderRadius: 999, padding: '0.3rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-sora)', letterSpacing: '0.04em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>
          {revealed ? afterLabel : beforeLabel}
        </span>
      </div>

      <figcaption style={{ background: 'var(--navy2)', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sora)', fontWeight: 600, fontSize: '0.875rem', color: '#fff' }}>
          <Icon name="pin" size={15} style={{ color: 'var(--orange)' }} /> {city}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'rgba(255,255,255,.55)' }}>
          <Icon name="arrowRight" size={14} /> {beforeLabel} / {afterLabel}
        </span>
      </figcaption>
    </figure>
  )
}
