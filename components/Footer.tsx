'use client'

import Link from 'next/link'
import Image from 'next/image'
import { NAV, business, SERVICE_AREAS, FOOTER_CITIES } from '@/lib/site'
import { copy } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { useT } from '@/providers/LanguageProvider'

export function Footer() {
  const { lang } = useT()
  const c = copy[lang]
  const year = 2026

  const navLabel = (href: string) =>
    ({ '/': c.nav.home, '/services': c.nav.services, '/service-areas': c.nav.serviceAreas, '/projects': c.nav.projects, '/about': c.nav.about, '/contact': c.nav.contact } as Record<string, string>)[href] ?? href

  return (
    <footer style={{ background: 'var(--navy2)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
      <div className="container-lg py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="inline-flex items-center rounded-full bg-white px-2 py-1">
              <Image src="/logo.jpg" alt="Legend Restoration LLC" height={28} width={102} sizes="102px" style={{ objectFit: 'contain', width: 'auto', height: 28 }} />
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.5)' }}>
              {c.footer.brandDesc}
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 font-sora text-sm font-bold uppercase tracking-wider text-white">{c.footer.companyTitle}</h3>
            <ul className="flex flex-col gap-2.5">
              {NAV.filter((n) => n.href !== '/').map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm" style={{ color: 'rgba(255,255,255,.6)' }}>{navLabel(n.href)}</Link>
                </li>
              ))}
              <li><Link href="/inspection" className="text-sm" style={{ color: 'rgba(255,255,255,.6)' }}>{c.cta.freeInspection}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-sora text-sm font-bold uppercase tracking-wider text-white">{c.footer.servicesTitle}</h3>
            <ul className="flex flex-col gap-2.5">
              {c.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-sm" style={{ color: 'rgba(255,255,255,.6)' }}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-4 font-sora text-sm font-bold uppercase tracking-wider text-white">{c.footer.serviceAreasTitle}</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_CITIES.map((city) => (
                <li key={city}>
                  <Link href="/service-areas" className="text-sm" style={{ color: 'rgba(255,255,255,.6)' }}>{city}, CT</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-sora text-sm font-bold uppercase tracking-wider text-white">{c.footer.contactTitle}</h3>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,.6)' }}>
              <li><a href={business.phoneHref} className="inline-flex items-center gap-2"><Icon name="phone" size={15} /> {business.phone}</a></li>
              <li><a href={`mailto:${business.email}`} className="inline-flex items-center gap-2"><Icon name="mail" size={15} /> {business.email}</a></li>
              <li className="inline-flex items-center gap-2"><Icon name="pin" size={15} /> {c.footer.location}</li>
            </ul>
          </div>
        </div>

        {/* Service areas (SEO) */}
        <div className="mt-10 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,.62)' }}>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,.8)' }}>{c.footer.serviceAreasLabel}</span>{' '}
            {SERVICE_AREAS.map((city) => `${city}, CT`).join(' · ')}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,.35)' }}>
            © {year} {business.legalName}. {c.footer.rights}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,.35)' }}>
            {c.footer.licensed}
          </p>
        </div>
      </div>
    </footer>
  )
}
