'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CtaBand } from '@/components/CtaBand'
import { Faq } from '@/components/Faq'
import { Icon, type IconName } from '@/components/Icon'
import { GALLERY } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

export function HomeContent() {
  const { lang } = useT()
  const c = copy[lang]

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, var(--navy) 60%, var(--navy3) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,64,28,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,54,144,.45) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container-lg relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="badge" style={{ background: 'rgba(232,64,28,.15)', color: 'var(--orange)' }}>{c.hero.badge}</span>
            <h1 className="mt-5 font-sora text-4xl font-extrabold leading-tight text-white md:text-5xl" style={{ fontWeight: 900 }}>
              {c.hero.title}{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--orange) 0%, #f5a623 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {c.hero.highlight}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,.75)' }}>{c.hero.sub}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'rgba(255,255,255,.75)' }}>
              {c.hero.bullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={16} strokeWidth={2.5} style={{ color: 'var(--orange)' }} /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {/* Split CTA — navy "time" half + orange "action" half, one unified button */}
              <Link
                href="/inspection"
                aria-label={`${c.hero.ctaLeft} — ${c.hero.ctaRight}`}
                className="flex w-full flex-col overflow-hidden rounded-xl transition-transform hover:-translate-y-0.5 sm:inline-flex sm:w-auto sm:flex-row"
                style={{ boxShadow: 'var(--shadow-orange)' }}
              >
                <span className="flex items-center justify-center gap-2 px-6 py-4 font-sora text-sm font-bold text-white" style={{ background: 'var(--navy)' }}>
                  <Icon name="clock" size={18} /> {c.hero.ctaLeft}
                </span>
                <span className="flex items-center justify-center gap-2 px-6 py-4 font-sora text-sm font-bold text-white" style={{ background: 'var(--orange)' }}>
                  {c.hero.ctaRight} <Icon name="arrowRight" size={18} />
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 60px rgba(0,0,0,.35)', aspectRatio: '4 / 3' }}>
              <Image
                src="/hero-roof.jpg"
                alt="Completed roof replacement by Legend Restoration in Connecticut"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <div style={{ background: 'rgba(255,255,255,.04)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div className="container-lg flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm" style={{ color: 'rgba(255,255,255,.7)' }}>
            {c.trust.map((item) => (
              <span key={item.text} className="inline-flex items-center gap-2">
                <Icon name={item.icon as IconName} size={18} style={{ color: 'var(--orange)' }} /> {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — navy band, like the landing */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy2) 0%, var(--navy) 100%)', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
        <div className="container-lg grid grid-cols-2 gap-8 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <motion.div key={s.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="text-center">
              <div className="font-sora" style={{ fontWeight: 900, fontSize: 'clamp(2.25rem, 5vw, 3rem)', color: 'var(--orange)', lineHeight: 1 }}>{s.value}</div>
              <div className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,.7)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.servicesSection.eyebrow}</p>
            <h2 className="section-title mt-2">{c.servicesSection.title}</h2>
            <p className="section-sub mx-auto mt-3 max-w-xl">{c.servicesSection.sub}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((s, i) => (
              <motion.div key={s.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }} className="card card-hover p-6">
                <span className="inline-flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy3) 100%)', color: '#fff' }}>
                  <Icon name={s.icon as IconName} size={26} />
                </span>
                <h3 className="mt-4 font-sora text-lg font-bold text-navy2">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                <Link href={`/services#${s.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: 'var(--orange)' }}>
                  {c.servicesSection.learnMore}<span className="sr-only"> — {s.title}</span> <Icon name="arrowRight" size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.whySection.eyebrow}</p>
            <h2 className="section-title mt-2">{c.whySection.title}</h2>
            <p className="section-sub mx-auto mt-3 max-w-xl">{c.whySection.sub}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.why.map((w, i) => (
              <motion.div key={w.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="card p-6">
                <span className="inline-flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: 'rgba(232,64,28,.1)', color: 'var(--orange)' }}>
                  <Icon name={w.icon as IconName} size={24} />
                </span>
                <h3 className="mt-3 font-sora text-base font-bold text-navy2">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.processSection.eyebrow}</p>
            <h2 className="section-title mt-2">{c.processSection.title}</h2>
          </motion.div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((p, i) => (
              <motion.div key={p.step} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <div className="relative mx-auto flex items-center justify-center" style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy3) 100%)', boxShadow: '0 8px 24px rgba(27,42,107,.25)' }}>
                  <span className="font-sora" style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{p.step}</span>
                  <span className="absolute font-sora" style={{ top: -6, right: -6, width: 24, height: 24, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                </div>
                <h3 className="mt-5 font-sora text-base font-bold text-navy2">{p.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-muted">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">{c.projectsPreview.eyebrow}</p>
              <h2 className="section-title mt-2">{c.projectsPreview.title}</h2>
            </div>
            <Link href="/projects" className="btn-secondary">{c.projectsPreview.viewAll}</Link>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.slice(0, 3).map((item, i) => {
              const title = c.projectsPage.galleryTypes[item.type]
              return (
                <motion.div key={item.img} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="card card-hover overflow-hidden">
                  <div className="relative" style={{ aspectRatio: '4 / 3' }}>
                    <Image src={item.img} alt={`${title} — Legend Restoration Connecticut`} fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-sora text-base font-bold text-navy2">{title}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.testimonialsSection.eyebrow}</p>
            <h2 className="section-title mt-2">{c.testimonialsSection.title}</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.testimonials.map((t, i) => (
              <motion.figure key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="card p-7">
                <div className="flex gap-1" style={{ color: '#f59e0b' }} role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, si) => <Icon key={si} name="star" size={18} />)}
                </div>
                <blockquote className="mt-4 text-sm italic leading-relaxed text-navy2">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex items-center justify-center font-sora" style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy3) 100%)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>{t.initials}</span>
                  <span>
                    <span className="block font-sora text-sm font-bold text-navy2">{t.name}</span>
                    <span className="block text-xs text-muted">{t.city}</span>
                  </span>
                  <span className="badge badge-green ml-auto" style={{ fontSize: '0.625rem' }}>{c.testimonialsSection.verified}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--off)' }}>
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.faqSection.eyebrow}</p>
            <h2 className="section-title mt-2">{c.faqSection.title}</h2>
          </motion.div>
          <div className="mt-10">
            <Faq items={c.faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
