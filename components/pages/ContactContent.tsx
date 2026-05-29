'use client'

import { ContactForm } from '@/components/ContactForm'
import { Icon, type IconName } from '@/components/Icon'
import { business, SERVICE_AREAS } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

export function ContactContent() {
  const { lang } = useT()
  const p = copy[lang].contactPage

  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: 'phone', label: p.callUs, value: business.phone, href: business.phoneHref },
    { icon: 'mail', label: p.emailLabel, value: business.email, href: `mailto:${business.email}` },
    { icon: 'pin', label: p.serviceArea, value: p.serviceAreaVal },
    { icon: 'clock', label: p.hours, value: p.hoursVal },
  ]

  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy) 60%, var(--navy3) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-lg relative py-16 text-center md:py-20">
          <span className="badge" style={{ background: 'rgba(232,64,28,.15)', color: 'var(--orange)' }}>{p.badge}</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-sora text-4xl font-extrabold text-white md:text-5xl" style={{ fontWeight: 900 }}>{p.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,.75)' }}>{p.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-lg grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div className="card p-6 md:p-8">
            <h2 className="font-sora text-xl font-extrabold text-navy2">{p.formTitle}</h2>
            <p className="mt-1 text-sm text-muted">{p.formSub}</p>
            <div className="mt-6"><ContactForm /></div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {details.map((d) => {
              const inner = (
                <>
                  <span className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 'var(--radius)', background: 'rgba(232,64,28,.1)', color: 'var(--orange)', flexShrink: 0 }}>
                    <Icon name={d.icon} size={22} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{d.label}</span>
                    <span className="font-sora text-base font-bold text-navy2">{d.value}</span>
                  </span>
                </>
              )
              return d.href ? (
                <a key={d.label} href={d.href} className="card card-hover flex items-center gap-4 p-5">{inner}</a>
              ) : (
                <div key={d.label} className="card flex items-center gap-4 p-5">{inner}</div>
              )
            })}
            <div className="rounded-2xl p-5 text-sm leading-relaxed" style={{ background: 'var(--off)', color: 'var(--muted)' }}>
              <strong className="text-navy2">{p.citiesLabel}</strong>{' '}
              {SERVICE_AREAS.map((city) => `${city}, CT`).join(' · ')}.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
