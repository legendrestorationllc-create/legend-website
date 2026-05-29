'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CtaBand } from '@/components/CtaBand'
import { Icon, type IconName } from '@/components/Icon'
import { business } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

const CHIP_ICONS: IconName[] = ['lock', 'star', 'trophy']

export function AboutContent() {
  const { lang } = useT()
  const a = copy[lang].aboutPage

  return (
    <>
      {/* Header */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy) 60%, var(--navy3) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-lg relative py-16 text-center md:py-20">
          <span className="badge" style={{ background: 'rgba(232,64,28,.15)', color: 'var(--orange)' }}>{a.badge}</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-sora text-4xl font-extrabold text-white md:text-5xl" style={{ fontWeight: 900 }}>{a.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: 'rgba(255,255,255,.75)' }}>{a.sub}</p>
        </div>
      </section>

      {/* Daniel */}
      <section className="section">
        <motion.div {...fadeUp} className="container-lg grid items-center gap-10 md:grid-cols-2">
          <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', aspectRatio: '1 / 1' }}>
            <Image src="/daniel.jpg" alt="Daniel Rivera, founder of Legend Restoration LLC" fill sizes="(max-width: 768px) 100vw, 520px" style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
          </div>
          <div>
            <p className="eyebrow">{a.founderEyebrow}</p>
            <h2 className="section-title mt-2">{a.founderName}</h2>
            <p className="section-sub mt-4">{a.founderP1}</p>
            <p className="section-sub mt-4">{a.founderP2}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {a.chips.map((chip, i) => (
                <span key={chip} className="inline-flex items-center gap-1.5 font-sora" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 999, padding: '0.375rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--navy2)' }}>
                  <Icon name={CHIP_ICONS[i]} size={15} style={{ color: 'var(--orange)' }} /> {chip}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={business.phoneHref} className="btn-secondary"><Icon name="phone" size={17} /> {business.phone}</a>
              <a href={`mailto:${business.email}`} className="btn-secondary"><Icon name="mail" size={17} /> {a.emailUs}</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{a.valuesEyebrow}</p>
            <h2 className="section-title mt-2">{a.valuesTitle}</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <motion.div key={v.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }} className="card p-6">
                <span className="inline-flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: 'rgba(232,64,28,.1)', color: 'var(--orange)' }}>
                  <Icon name={v.icon as IconName} size={24} />
                </span>
                <h3 className="mt-3 font-sora text-base font-bold text-navy2">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <motion.div {...fadeUp} className="container-lg grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">{a.crewEyebrow}</p>
            <h2 className="section-title mt-2">{a.crewTitle}</h2>
            <p className="section-sub mt-4">{a.crewP}</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-navy2">
              {a.crewPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <Icon name="check" size={18} strokeWidth={2.5} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }} /> {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', aspectRatio: '4 / 3' }}>
            <Image src="/team.jpg" alt="The Legend Restoration roofing crew in Connecticut" fill sizes="(max-width: 768px) 100vw, 520px" style={{ objectFit: 'cover' }} />
          </div>
        </motion.div>
      </section>

      <CtaBand title={a.ctaTitle} subtitle={a.ctaSub} />
    </>
  )
}
