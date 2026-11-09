'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { business } from '@/lib/site'
import { copy } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { useContactSubmit } from '@/components/ContactForm'
import { useT } from '@/providers/LanguageProvider'

// Home hero (approved mockup "portada-ganadora", nov-2026): real photo + navy veil,
// arched project photo with two seals, white quote card riding the hero's bottom edge
// and a strip of 5 credentials. Styles: .hx-* in app/globals.css.

function GoogleG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  )
}

// Stars as SVG (not ★ text) so the amber color never trips the text-contrast audit.
function Stars({ label }: { label: string }) {
  return (
    <span className="hx-stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={14} />)}
    </span>
  )
}

function QuoteForm() {
  const { lang } = useT()
  const q = copy[lang].hero.form
  const f = copy[lang].contactForm
  const { status, submit } = useContactSubmit()
  const msgRef = useRef<HTMLDivElement>(null)

  // Keep the success / error message on screen (it can land below the fold at 1440x900).
  useEffect(() => {
    if (status === 'ok' || status === 'error') msgRef.current?.scrollIntoView({ block: 'nearest' })
  }, [status])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const service = String(data.get('service') || '')
    submit({
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      city: '',
      message: service ? `Servicio: ${service} (formulario de la portada)` : '',
    })
  }

  return (
    <form className="hx-wrap hx-quote" onSubmit={handleSubmit} aria-labelledby="hx-quote-title">
      <div className="hx-quote-head">
        <h2 id="hx-quote-title">{q.titlePre}<em>{q.titleEm}</em>{q.titlePost}</h2>
        <p>{q.sub}</p>
      </div>
      <div className="hx-fields">
        <label className="hx-field">
          <span className="sr-only">{q.name}</span>
          <input type="text" name="name" required placeholder={q.name} autoComplete="name" />
          <Icon name="user" size={17} />
        </label>
        <label className="hx-field">
          <span className="sr-only">{q.phone}</span>
          <input type="tel" name="phone" required placeholder={q.phone} autoComplete="tel" />
          <Icon name="phone" size={17} />
        </label>
        <label className="hx-field">
          <span className="sr-only">{q.email}</span>
          <input type="email" name="email" placeholder={q.email} autoComplete="email" />
          <Icon name="mail" size={17} />
        </label>
        <label className="hx-field">
          <span className="sr-only">{q.service}</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>{q.service}</option>
            {q.services.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <Icon name="chevronDown" size={17} />
        </label>
        <button className="hx-btn hx-btn-send" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : q.send} <Icon name="arrowRight" size={19} strokeWidth={2.4} />
        </button>
      </div>
      <p className="hx-fine">{q.fine}</p>
      <div aria-live="polite" ref={msgRef}>
        {status === 'ok' && (
          <p className="hx-msg hx-msg-ok"><Icon name="check" size={16} strokeWidth={3} /> {f.sentOk}</p>
        )}
        {status === 'error' && (
          <p className="hx-msg hx-msg-err">
            {f.sentErr} <a href={business.phoneHref}>{business.phone}</a>.
          </p>
        )}
      </div>
    </form>
  )
}

export function HomeHero() {
  const { lang } = useT()
  const h = copy[lang].hero
  const t = h.trust
  const s = h.stamps
  const rating = business.rating.value

  return (
    <>
      <section className="hx-hero">
        <div className="hx-hero-bg">
          <Image src="/work-12.jpg" alt={h.bgAlt} fill priority sizes="(min-width: 1101px) 150vw, 100vw" />
        </div>
        <div className="hx-hero-veil" aria-hidden="true" />

        {/* Desktop: project photo in an arch + floating seals */}
        <figure className="hx-owner">
          <div className="hx-arch">
            <Image src="/hero-proyecto.jpg" alt={h.project.alt} fill sizes="300px" />
          </div>
          <figcaption className="hx-owner-tag">
            <i aria-hidden="true" /><b>{h.project.title}</b> · {h.project.detail}
          </figcaption>

          <svg className="hx-stamp hx-s1" viewBox="0 0 120 120" role="img" aria-label={s.roofsLabel}>
            <defs>
              <path id="hx-s1-top" d="M17 60a43 43 0 0 1 86 0" />
              <path id="hx-s1-bot" d="M13 60a47 47 0 0 0 94 0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#fff" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#1B2A6B" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="35" fill="#1B2A6B" />
            <circle cx="60" cy="60" r="31" fill="none" stroke="#E8401C" strokeWidth="1.5" strokeDasharray="2 3" />
            <text fontWeight="700" fontSize="9" letterSpacing="1.5" fill="#1B2A6B">
              <textPath href="#hx-s1-top" startOffset="50%" textAnchor="middle">{s.roofsTop}</textPath>
            </text>
            <text fontWeight="700" fontSize="8.6" letterSpacing="1.3" fill="#c73515">
              <textPath href="#hx-s1-bot" startOffset="50%" textAnchor="middle">{s.roofsBottom}</textPath>
            </text>
            <text x="60" y="61" textAnchor="middle" fontWeight="800" fontSize="21" fill="#fff">+500</text>
            <text x="60" y="75" textAnchor="middle" fontWeight="700" fontSize="8" letterSpacing="1.6" fill="#fff">{s.roofsWord}</text>
          </svg>

          <svg className="hx-stamp hx-s2" viewBox="0 0 120 120" role="img" aria-label={s.gafLabel}>
            <defs>
              <path id="hx-s2-top" d="M17 60a43 43 0 0 1 86 0" />
              <path id="hx-s2-bot" d="M13 60a47 47 0 0 0 94 0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#fff" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#E8401C" strokeWidth="2.5" />
            <circle cx="60" cy="60" r="35" fill="#E8401C" />
            <circle cx="60" cy="60" r="31" fill="none" stroke="#fff" strokeWidth="1.2" strokeDasharray="2 3" opacity=".8" />
            <text fontWeight="700" fontSize="9" letterSpacing="2" fill="#1B2A6B">
              <textPath href="#hx-s2-top" startOffset="50%" textAnchor="middle">{s.gafTop}</textPath>
            </text>
            <text fontWeight="700" fontSize="8.6" letterSpacing="1.8" fill="#c73515">
              <textPath href="#hx-s2-bot" startOffset="50%" textAnchor="middle">{s.gafBottom}</textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" fontWeight="800" fontSize="24" letterSpacing="1" fill="#fff">GAF</text>
          </svg>
        </figure>

        <div className="hx-wrap hx-hero-in">
          <div className="hx-hero-copy">
            <span className="hx-tag">
              <i aria-hidden="true"><Icon name="star" size={12} /></i>{h.badge}
            </span>
            <h1 className="hx-h1">{h.title}</h1>
            <p className="hx-hl">{h.qualifyPre}<em>{h.qualifyEm}</em></p>
            <p className="hx-lead">{h.sub}</p>
            <ul className="hx-ticks">
              {h.bullets.map((b) => (
                <li key={b}>
                  <span className="hx-ck" aria-hidden="true"><Icon name="check" size={12} strokeWidth={3} /></span>{b}
                </li>
              ))}
            </ul>

            {/* Phone / tablet: round project photo card */}
            <div className="hx-owner-m">
              <span className="hx-av"><Image src="/hero-proyecto.jpg" alt="" fill sizes="64px" /></span>
              <span><b>{h.project.title}</b><small>{h.project.mobileDetail}</small></span>
            </div>

            <div className="hx-cta-row">
              <Link href="/inspection" className="hx-btn hx-btn-primary">
                {h.cta} <Icon name="arrowRight" size={19} strokeWidth={2.4} />
              </Link>
              <a className="hx-call" href={business.phoneHref}>
                <span className="hx-ring" aria-hidden="true"><Icon name="phone" size={17} /></span>
                <span>{h.callLabel}<strong>{business.phone}</strong></span>
              </a>
            </div>

            <ul className="hx-pills">
              <li className="hx-pill">
                <span className="hx-pill-ico hx-pill-g" aria-hidden="true"><GoogleG size={19} /></span>
                <span><b>{rating} <Stars label={h.fiveStars} /></b><small>{t.reviews}</small></span>
              </li>
              <li className="hx-pill">
                <span className="hx-pill-ico" aria-hidden="true"><Icon name="roof" size={18} /></span>
                <span><b>{t.roofs}</b><small>{t.roofsSub}</small></span>
              </li>
              <li className="hx-pill">
                <span className="hx-pill-ico hx-pill-ok" aria-hidden="true"><Icon name="shieldCheck" size={18} /></span>
                <span><b>{t.licensed}</b><small>{t.licensedSub}</small></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quote card + credentials strip */}
      <section className="hx-below">
        <QuoteForm />
        <ul className="hx-wrap hx-seals" aria-label={t.label}>
          <li className="hx-seal">
            <span className="hx-badge hx-badge-gaf" aria-hidden="true">GAF</span>
            <span><b>{t.gaf}</b><small>{t.gafSub}</small></span>
          </li>
          <li className="hx-seal">
            <span className="hx-badge hx-badge-ten" aria-hidden="true">10<small>{t.years}</small></span>
            <span><b>{t.warranty}</b><small>{t.warrantySub}</small></span>
          </li>
          <li className="hx-seal">
            <span className="hx-badge hx-badge-ok" aria-hidden="true"><Icon name="shieldCheck" size={24} /></span>
            <span><b>{t.licensed}</b><small>{t.licensedSub}</small></span>
          </li>
          <li className="hx-seal">
            <span className="hx-badge" aria-hidden="true"><Icon name="roof" size={24} /></span>
            <span><b>{t.roofs}</b><small>{t.roofsSub}</small></span>
          </li>
          <li className="hx-seal">
            <span className="hx-badge hx-badge-g" aria-hidden="true"><GoogleG size={24} /></span>
            <span><b>Google {rating}</b><Stars label={h.fiveStars} /></span>
          </li>
        </ul>
      </section>
    </>
  )
}
