'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, business } from '@/lib/site'
import { copy } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { useT } from '@/providers/LanguageProvider'

export function Header() {
  const { lang } = useT()
  const c = copy[lang]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false) }, [pathname])

  const navLabel = (href: string) =>
    ({ '/': c.nav.home, '/services': c.nav.services, '/service-areas': c.nav.serviceAreas, '/projects': c.nav.projects, '/about': c.nav.about, '/contact': c.nav.contact } as Record<string, string>)[href] ?? href

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        background: scrolled ? 'rgba(17,29,74,0.97)' : 'var(--navy2)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(255,255,255,${scrolled ? '.08' : '0'})`,
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.2)' : 'none',
      }}
    >
      <div className="container-lg flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" aria-label="Legend Restoration — Home" className="flex items-center shrink-0">
          <span className="flex items-center rounded-full bg-white px-2.5 py-1">
            <Image
              src="/logo.jpg"
              alt="Legend Restoration LLC"
              height={40}
              width={146}
              priority
              sizes="146px"
              style={{ objectFit: 'contain', width: 'auto', height: 40 }}
            />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline font-dm text-sm font-medium transition-colors"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,.7)' }}
              >
                {navLabel(item.href)}
              </Link>
            )
          })}
          <a href={business.phoneHref} className="inline-flex items-center gap-1.5 font-sora text-sm font-bold" style={{ color: '#ffffff' }}>
            <span aria-hidden style={{ fontSize: '0.95rem' }}>☎</span> {business.phone}
          </a>
          <Link href="/inspection" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            {c.cta.freeInspection}
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="flex flex-col gap-1.5 p-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-white transition-transform" style={{ transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <span className="block h-0.5 w-6 bg-white transition-opacity" style={{ opacity: open ? 0 : 1 }} />
            <span className="block h-0.5 w-6 bg-white transition-transform" style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden" style={{ background: 'var(--navy2)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div className="container-lg flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 font-dm text-base font-medium"
                style={{ color: 'rgba(255,255,255,.85)', borderBottom: '1px solid rgba(255,255,255,.06)' }}
              >
                {navLabel(item.href)}
              </Link>
            ))}
            <a href={business.phoneHref} className="inline-flex items-center gap-2 py-3 font-dm text-base" style={{ color: 'rgba(255,255,255,.7)' }}>
              <Icon name="phone" size={17} /> {business.phone}
            </a>
            <Link href="/inspection" className="btn-primary mt-3 w-full">
              {c.cta.freeInspection}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
