// Central configuration for the Legend Restoration marketing website.
// Single source of truth for SEO metadata, navigation, contact info, and page content.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://legendrestorationct.com'
).replace(/\/$/, '')

// URL of the existing landing page, embedded as-is at /inspection.
export const INSPECTION_URL =
  process.env.NEXT_PUBLIC_INSPECTION_URL || 'http://localhost:3001'

export const business = {
  name: 'Legend Restoration LLC',
  shortName: 'Legend Restoration',
  legalName: 'Legend Restoration LLC',
  tagline: 'Insurance-Approved Roofing in Connecticut',
  description:
    'Connecticut roofing contractor specializing in insurance-paid roof replacement and storm-damage claims. Free inspections — you only pay your deductible.',
  phone: '(863) 381-5735',
  phoneHref: 'tel:+18633815735',
  smsHref: 'sms:+18633815735',
  whatsappHref: 'https://wa.me/18633815735',
  email: 'legendrestorationllc@gmail.com',
  owner: 'Daniel Rivera',
  region: 'Connecticut',
  regionCode: 'CT',
  country: 'US',
  priceRange: '$$',
  foundingYear: 2022,
  warrantyYears: 10,
  // CT Home Improvement Contractor license. TODO: replace with the real HIC number.
  license: '',
  // Aggregate rating for schema. `count` matches the testimonials shown on-site;
  // TODO: update `count` to the real Google Business Profile review count.
  rating: { value: '4.9', count: 3 },
  // Approximate geographic center of Connecticut (used for LocalBusiness geo schema).
  geo: { lat: 41.6032, lng: -73.0877 },
  hours: 'Mo-Sa 08:00-18:00',
}

export const social = {
  // Add real profile URLs here as they go live (used for schema sameAs).
  facebook: '',
  instagram: '',
  google: '',
}

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Cities served across Connecticut (used in copy + schema areaServed).
export const SERVICE_AREAS = [
  'Hartford', 'New Haven', 'Bridgeport', 'Stamford', 'Waterbury',
  'Norwalk', 'Danbury', 'New Britain', 'West Haven', 'Greenwich',
  'Hamden', 'Meriden', 'Bristol', 'Manchester', 'West Hartford',
  'Milford', 'Stratford', 'East Hartford', 'Middletown', 'Shelton',
  'Torrington', 'Norwich', 'Trumbull', 'Fairfield',
]

// Full 50-city directory shown on the /service-areas page + that page's schema areaServed.
export const ALL_SERVICE_AREAS = [
  'Hartford', 'New Haven', 'Bridgeport', 'Stamford', 'Waterbury',
  'Norwalk', 'Danbury', 'New Britain', 'West Haven', 'Greenwich',
  'Hamden', 'Meriden', 'Bristol', 'Manchester', 'West Hartford',
  'Milford', 'Stratford', 'East Hartford', 'Middletown', 'Shelton',
  'Torrington', 'Norwich', 'Trumbull', 'Fairfield', 'Naugatuck',
  'Glastonbury', 'Enfield', 'Southington', 'Cheshire', 'Vernon',
  'Wallingford', 'New Milford', 'Newington', 'Windsor', 'Branford',
  'Ansonia', 'Derby', 'Seymour', 'Bloomfield', 'East Haven',
  'Orange', 'Wethersfield', 'Rocky Hill', 'Newtown', 'Monroe',
  'Groton', 'Putnam', 'Wilton', 'Darien', 'New Canaan',
]

// Top-10 cities surfaced in the footer "Service Areas" column.
export const FOOTER_CITIES = [
  'Hartford', 'New Haven', 'Bridgeport', 'Stamford', 'Waterbury',
  'Norwalk', 'Danbury', 'Greenwich', 'New Britain', 'West Haven',
]

// Curated projects gallery — 6 visually distinct, impressive Legend Restoration photos.
// No duplicates / same-project angles. `type` maps to a bilingual service label (galleryTypes).
export const GALLERY = [
  { img: '/work-01.jpg', type: 'replacement' },
  { img: '/work-02.jpg', type: 'insurance' },
  { img: '/work-03.jpg', type: 'storm' },
  { img: '/work-05.jpg', type: 'architectural' },
  { img: '/work-07.jpg', type: 'installation' },
  { img: '/work-15.jpg', type: 'hail' },
] as const

export const SERVICES = [
  {
    slug: 'roof-replacement',
    icon: 'roof',
    title: 'Roof Replacement',
    short: 'Full roof replacement with premium materials and a 10-year workmanship warranty.',
    body:
      'Complete tear-off and replacement using architectural shingles built for New England weather. We match discontinued materials and document every detail so your insurance claim holds up.',
    points: [
      'Architectural & premium shingle systems',
      'Discontinued-material matching (CT law)',
      'Full tear-off, decking inspection & re-flashing',
      '10-year workmanship warranty',
    ],
  },
  {
    slug: 'insurance-claims',
    icon: 'claim',
    title: 'Insurance Claim Assistance',
    short: 'We manage the entire claim with your insurer — you only pay your deductible.',
    body:
      'From documenting storm damage to negotiating scope with the adjuster, our team handles the paperwork end to end. In Connecticut, qualifying storm damage can mean a fully covered replacement.',
    points: [
      'Free damage inspection & documentation',
      'Direct communication with your adjuster',
      'Scope justification under CT matching law',
      'You pay only your deductible',
    ],
  },
  {
    slug: 'storm-damage',
    icon: 'storm',
    title: 'Storm & Hail Damage Repair',
    short: 'Wind, hail, and storm-damage assessment and rapid restoration.',
    body:
      'Connecticut storms cause damage that is often invisible from the ground. We inspect from above, document it for your insurer, and restore your roof fast — before small leaks become major repairs.',
    points: [
      'Hail, wind & fallen-tree damage',
      'Emergency tarping & leak protection',
      'Photo & drone documentation',
      '48-hour response time',
    ],
  },
  {
    slug: 'siding-exterior',
    icon: 'siding',
    title: 'Siding & Exterior',
    short: 'Siding repair and replacement to complete your exterior restoration.',
    body:
      'When storm damage extends beyond the roof, we restore siding and exterior surfaces too — keeping materials consistent so the whole project qualifies under your claim.',
    points: [
      'Vinyl & composite siding',
      'Storm & impact damage',
      'Color & profile matching',
      'Coordinated with your roof claim',
    ],
  },
]

export const PROCESS = [
  { step: '01', title: 'Free Inspection', desc: 'We inspect your roof and document any storm damage — no cost, no obligation.' },
  { step: '02', title: 'Claim Filing', desc: 'We file and manage the claim with your insurer, justifying the full scope of work.' },
  { step: '03', title: 'Approval', desc: 'Your insurer approves coverage. You confirm and pay only your deductible.' },
  { step: '04', title: 'New Roof', desc: 'Our crew installs your new roof, backed by a 10-year workmanship warranty.' },
]

export const WHY = [
  { icon: 'scale', title: 'Connecticut Matching Law', desc: 'When materials no longer match, CT law can require replacing the full affected area — turning a small repair into a fully covered project.' },
  { icon: 'tag', title: 'No Upfront Cost', desc: 'Inspection, documentation, and the claim process are completely free. You only pay your deductible.' },
  { icon: 'globe', title: 'We Speak Spanish', desc: 'The entire process available in English and Spanish — no fine print, no confusion.' },
  { icon: 'shield', title: '10-Year Warranty', desc: 'Every project is backed by a 10-year workmanship and materials warranty.' },
  { icon: 'bolt', title: '48-Hour Response', desc: 'A roofing expert responds within 48 hours of your request — often the same day.' },
  { icon: 'pin', title: 'Local to Connecticut', desc: 'We serve homeowners across all of Connecticut, from Fairfield County to Hartford.' },
]

export const PROJECTS = [
  { img: '/project1.jpg', city: 'Hartford, CT', scope: 'Full roof replacement', detail: 'Hail-damaged roof fully replaced — family paid only their deductible.' },
  { img: '/project2.jpg', city: 'New Haven, CT', scope: 'Storm-damage restoration', detail: 'Wind-lifted shingles documented and approved for full coverage.' },
  { img: '/project3.jpg', city: 'Bridgeport, CT', scope: 'Insurance claim replacement', detail: 'Discontinued shingles matched under CT law for a complete re-roof.' },
  { img: '/worker1.jpg', city: 'Stamford, CT', scope: 'Tear-off & re-roof', detail: 'Complete tear-off, decking inspection, and premium shingle install.' },
  { img: '/worker2.jpg', city: 'Waterbury, CT', scope: 'Roof + flashing', detail: 'New roof system with re-flashed valleys and penetrations.' },
  { img: '/worker3.jpg', city: 'Norwalk, CT', scope: 'Crew install', detail: 'Architectural shingle system installed by our certified crew.' },
]

export const FAQS = [
  { q: 'Can my insurance really pay for a full roof replacement?', a: 'Yes. In Connecticut, homeowner insurance can cover a full roof replacement when there is qualifying storm, hail, or wind damage. You only pay your deductible. We evaluate your case for free.' },
  { q: 'What if my roof does not qualify?', a: 'If our free inspection determines your roof does not qualify, there is no cost and no obligation. We simply give you an honest assessment.' },
  { q: 'How long does the process take?', a: 'From inspection to a new roof typically takes 2–6 weeks, depending on your insurer’s response. We manage every step.' },
  { q: 'Do I have to talk to my insurance company?', a: 'Not necessarily. Our team can communicate directly with your insurer, handling the documentation and the entire claim on your behalf.' },
  { q: 'Do you serve my city in Connecticut?', a: 'We serve homeowners across all of Connecticut, including Bridgeport, New Haven, Hartford, Stamford, Waterbury, and surrounding towns.' },
  { q: 'What is the Connecticut matching law?', a: 'If damaged roofing or siding materials can no longer be matched, Connecticut regulations can require replacing the entire affected area for a uniform appearance — which can turn a small repair into a fully covered replacement.' },
]
