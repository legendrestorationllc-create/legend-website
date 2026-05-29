'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CtaBand } from '@/components/CtaBand'
import { GALLERY } from '@/lib/site'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

export function ProjectsContent() {
  const { lang } = useT()
  const c = copy[lang]
  const p = c.projectsPage

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

      {/* Gallery — 6 clean cards: photo + service type only */}
      <section className="section">
        <div className="container-lg">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{p.galleryEyebrow}</p>
            <h2 className="section-title mt-2">{p.galleryTitle}</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, i) => {
              const title = p.galleryTypes[item.type]
              return (
                <motion.figure key={item.img} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }} className="card card-hover overflow-hidden">
                  <div className="relative" style={{ aspectRatio: '4 / 3' }}>
                    <Image src={item.img} alt={`${title} — Legend Restoration Connecticut`} fill sizes="(max-width: 768px) 100vw, 380px" style={{ objectFit: 'cover' }} priority={i < 3} />
                  </div>
                  <figcaption className="p-5 text-center">
                    <h3 className="font-sora text-base font-bold text-navy2">{title}</h3>
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand title={p.ctaTitle} subtitle={p.ctaSub} />
    </>
  )
}
