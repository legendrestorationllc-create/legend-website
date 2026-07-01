import { SITE_URL, business, social, SERVICE_AREAS, FAQS } from '@/lib/site'

// Renders a JSON-LD <script> block. Server component — emitted in static HTML for crawlers.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema is build-time constant data; safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// RoofingContractor is a recognized subtype of LocalBusiness — ideal for a CT roofing company.
// `areas` defaults to the core service areas; pages can pass a wider list (e.g. all 50 cities).
export function localBusinessSchema(areas: string[] = SERVICE_AREAS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    telephone: business.phoneHref.replace('tel:', ''),
    email: business.email,
    image: `${SITE_URL}/og-image.svg`,
    logo: `${SITE_URL}/logo-legend.png`,
    priceRange: business.priceRange,
    foundingDate: String(business.foundingYear),
    address: {
      '@type': 'PostalAddress',
      addressRegion: business.regionCode,
      addressCountry: business.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: [
      { '@type': 'State', name: 'Connecticut' },
      ...areas.map((city) => ({ '@type': 'City', name: `${city}, CT` })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [social.facebook, social.instagram, social.google].filter(Boolean),
    knowsLanguage: ['en', 'es'],
    slogan: business.tagline,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: String(business.rating.count),
      bestRating: '5',
      worstRating: '1',
    },
  }
}

// Per-service Service schema (used on /services/[slug] pages).
export function serviceDetailSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name: `${name} — Connecticut`,
    description,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'State', name: 'Connecticut' },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[] = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Roof replacement & insurance claim assistance',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'State', name: 'Connecticut' },
    description: business.description,
  }
}
