'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, business } from '@/lib/site'
import { copy } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { useT } from '@/providers/LanguageProvider'

// Top bar (white, scrolls away) + sticky navy menu split around the hanging logo tab.
// Styles: .hx-* in app/globals.css.
export function Header() {
  const { lang } = useT()
  const c = copy[lang]
  const h = c.header
  const WA_HREF = `${business.whatsappHref}?text=${encodeURIComponent(h.waText)}`
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false) }, [pathname])

  const navLabel = (href: string) =>
    ({ '/': c.nav.home, '/services': c.nav.services, '/service-areas': c.nav.serviceAreas, '/projects': c.nav.projects, '/about': c.nav.about, '/contact': c.nav.contact } as Record<string, string>)[href] ?? href

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const navLink = (item: (typeof NAV)[number]) => {
    const active = isActive(item.href)
    return (
      <Link key={item.href} href={item.href} className={`hx-lk${active ? ' is-on' : ''}`} aria-current={active ? 'page' : undefined}>
        {navLabel(item.href)}
      </Link>
    )
  }

  return (
    <>
      {/* Top bar */}
      <div className="hx-topbar" role="region" aria-label={h.help}>
        <div className="hx-wrap">
          <div className="hx-tb">
            <span className="hx-tb-i hx-tb-help">{h.help}</span>
            <a className="hx-tb-i" href={business.phoneHref}>
              <Icon name="phone" size={15} /><strong>{business.phone}</strong>
            </a>
            <span className="hx-tb-sep" aria-hidden="true" />
            <a className="hx-tb-i hx-tb-wa" href={WA_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" size={15} /><span>WhatsApp</span>
            </a>
          </div>
          <div className="hx-tb">
            <a className="hx-tb-i hx-tb-mail" href={`mailto:${business.email}`}>
              <Icon name="mail" size={15} />{business.email}
            </a>
            <span className="hx-tb-sep hx-tb-sep2" aria-hidden="true" />
            <span className="hx-tb-i"><Icon name="chat" size={15} />{h.spanish}</span>
          </div>
        </div>
      </div>

      {/* Navy menu (sticky) */}
      <header className={`hx-nav${scrolled ? ' is-scrolled' : ''}`}>
        <nav className="hx-wrap hx-nav-in" aria-label={h.navLabel}>
          <div className="hx-menu">
            <a className="hx-nav-ico" href={business.phoneHref} aria-label={`${c.cta.call} ${business.phone}`}>
              <Icon name="phone" size={19} />
            </a>
            {NAV.slice(0, 3).map(navLink)}
          </div>

          <Link href="/" className="hx-logo-tab" aria-label={h.homeLabel}>
            <span className="hx-logo-edge" aria-hidden="true" />
            <span className="hx-logo-face">
              <Image src="/logo.jpg" alt="Legend Restoration LLC" width={748} height={221} priority sizes="(max-width: 640px) 146px, 206px" />
            </span>
          </Link>

          <div className="hx-menu hx-menu-r">
            {NAV.slice(3).map(navLink)}
            <a className="hx-btn-nav" href={WA_HREF} target="_blank" rel="noopener noreferrer">
              {c.cta.freeInspection} <Icon name="arrowRight" size={16} />
            </a>
            <button
              type="button"
              className={`hx-burger${open ? ' is-open' : ''}`}
              aria-label={open ? h.closeMenu : h.openMenu}
              aria-expanded={open}
              aria-controls="hx-mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile / tablet menu */}
        {open && (
          <nav id="hx-mobile-menu" className="hx-mnav" aria-label={h.mobileNav}>
            <div className="hx-wrap">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className={`hx-mnav-lk${isActive(item.href) ? ' is-on' : ''}`} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {navLabel(item.href)}
                </Link>
              ))}
              <a href={business.phoneHref} className="hx-mnav-lk hx-mnav-phone">
                <Icon name="phone" size={17} /> {business.phone}
              </a>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 w-full">
                {c.cta.freeInspection}
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
