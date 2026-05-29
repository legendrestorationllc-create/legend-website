'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CtaBand } from '@/components/CtaBand'
import { Faq } from '@/components/Faq'
import { Icon, type IconName } from '@/components/Icon'
import { SERVICE_AREAS } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

const IMAGES = ['/project1.jpg', '/project2.jpg', '/worker1.jpg', '/project3.jpg']

export function ServicesContent() {
  const { lang } = useT()
  const c = copy[lang]
  const p = c.servicesPage

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

      {/* Service detail sections */}
      <section className="section">
        <div className="container-lg flex flex-col gap-16">
          {c.services.map((s, i) => (
            <motion.div key={s.slug} {...fadeUp} id={s.slug} className="grid items-center gap-8 scroll-mt-24 md:grid-cols-2">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <span className="inline-flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy3) 100%)', color: '#fff' }}>
                  <Icon name={s.icon as IconName} size={28} />
                </span>
                <h2 className="section-title mt-4">{s.title}</h2>
                <p className="section-sub mt-3">{s.body}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-navy2">
                      <Icon name="check" size={18} strokeWidth={2.5} style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href="/inspection" className="btn-primary mt-7">{p.getInspection}</Link>
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', aspectRatio: '4 / 3' }}>
                  <Image
                    src={IMAGES[i % IMAGES.length]}
                    alt={`${s.title} — Connecticut — Legend Restoration`}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{p.processEyebrow}</p>
            <h2 className="section-title mt-2">{p.processTitle}</h2>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((step, i) => (
              <motion.div key={step.step} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <div className="relative mx-auto flex items-center justify-center" style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy3) 100%)', boxShadow: '0 8px 24px rgba(27,42,107,.25)' }}>
                  <span className="font-sora" style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{step.step}</span>
                </div>
                <h3 className="mt-5 font-sora text-base font-bold text-navy2">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section">
        <div className="container-lg text-center">
          <p className="eyebrow">{p.coverageEyebrow}</p>
          <h2 className="section-title mt-2">{p.coverageTitle}</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {SERVICE_AREAS.map((city) => (
              <span key={city} className="badge badge-navy">{city}, CT</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">{p.faqTitle}</h2>
          </div>
          <div className="mt-10"><Faq items={c.faqs} /></div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
