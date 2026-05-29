// Bilingual copy for the marketing site (English + Spanish).
// English is the SEO/default language; Spanish is served via the in-page toggle.
// The English service/why/process/project/FAQ arrays are reused from lib/site.ts
// (single source for the JSON-LD schema); only their Spanish counterparts live here.
// `icon` fields hold Icon component names (see components/Icon.tsx), not emojis.

import type { Lang } from '@/lib/translations'
import {
  SERVICES as SERVICES_EN,
  WHY as WHY_EN,
  PROCESS as PROCESS_EN,
  PROJECTS as PROJECTS_EN,
  FAQS as FAQS_EN,
} from '@/lib/site'

const copyEn = {
  nav: { home: 'Home', services: 'Services', serviceAreas: 'Service Areas', projects: 'Projects', about: 'About', contact: 'Contact' },
  cta: { freeInspection: 'Free Inspection', check: 'Check if I Qualify', call: 'Call' },

  // Bilingual <title> per route — synced client-side on language toggle (see TitleSync).
  titles: {
    '/': 'Insurance-Approved Roofing in Connecticut | Legend Restoration',
    '/services': 'Roofing Services in Connecticut | Legend Restoration',
    '/service-areas': 'Roofing Service Areas in Connecticut | Legend Restoration',
    '/projects': 'Roofing Projects in Connecticut | Legend Restoration',
    '/about': 'About Legend Restoration | Connecticut Roofing',
    '/contact': 'Contact Legend Restoration | Free Roof Inspection',
  } as Record<string, string>,

  hero: {
    badge: '#1 Insurance Roofing in Connecticut',
    title: 'Your insurance can pay for a new roof.',
    highlight: 'You only pay your deductible.',
    sub: 'In Connecticut, storm, hail, and wind damage can qualify for a full roof replacement covered by your homeowner’s insurance. Legend Restoration handles the entire claim — start to finish.',
    bullets: ['Free inspection', 'No upfront cost', 'We speak Spanish'],
    ctaLeft: 'Only 30 seconds',
    ctaRight: "Discover your roof's condition",
  },

  trust: [
    { icon: 'trophy', text: '+500 roofs replaced in CT' },
    { icon: 'star', text: '4.9/5 rating' },
    { icon: 'lock', text: 'Licensed & insured' },
    { icon: 'shield', text: '10-year warranty' },
  ],

  stats: [
    { value: '97%', label: 'of claims approved' },
    { value: '$0', label: 'cost if you don’t qualify' },
    { value: '48h', label: 'response time' },
    { value: '500+', label: 'CT families helped' },
  ],

  servicesSection: {
    eyebrow: 'What we do',
    title: 'Roofing & insurance claims, handled for you',
    sub: 'From the first inspection to your new roof, we manage every step — including the paperwork with your insurer.',
    learnMore: 'Learn more',
  },
  services: SERVICES_EN,

  whySection: {
    eyebrow: 'Why Legend',
    title: 'Connecticut’s insurance roofing specialists',
    sub: 'We know Connecticut’s insurance and matching laws — and we use them to get you the fullest coverage you’re entitled to.',
  },
  why: WHY_EN,

  processSection: { eyebrow: 'Simple process', title: 'From inspection to new roof in 4 steps' },
  process: PROCESS_EN,

  projectsPreview: { eyebrow: 'Recent work', title: 'Connecticut roofs we’ve restored', viewAll: 'View all projects' },
  projects: PROJECTS_EN,

  testimonialsSection: { eyebrow: 'Reviews', title: 'Connecticut homeowners trust Legend', verified: 'Verified' },
  testimonials: [
    { name: 'María González', initials: 'MG', city: 'Bridgeport, CT', text: 'I didn’t know my insurance could pay for everything. Legend handled the entire process and in 3 weeks I had a new roof.' },
    { name: 'Carlos Rodríguez', initials: 'CR', city: 'New Haven, CT', text: 'Very professional. They spoke directly with my insurer and I only had to pay the deductible. The roof turned out perfect.' },
    { name: 'Ana Martínez', initials: 'AM', city: 'Hartford, CT', text: 'The process was super easy. In less than 24 hours they called me, did the inspection, and started the paperwork.' },
  ],

  faqSection: { eyebrow: 'Questions', title: 'Frequently asked questions' },
  faqs: FAQS_EN,

  ctaBand: {
    title: 'See if your roof qualifies — free',
    subtitle: 'A 2-minute check tells you if your insurance can cover a full roof replacement. No cost, no obligation.',
    primary: 'Check if I Qualify',
    call: 'Call',
  },

  servicesPage: {
    badge: 'Connecticut Roofing',
    title: 'Roofing services built around your insurance claim',
    sub: 'Roof replacement, claim assistance, and storm-damage repair — for homeowners across all of Connecticut.',
    getInspection: 'Get a free inspection',
    processEyebrow: 'How it works',
    processTitle: 'Your claim, handled step by step',
    coverageEyebrow: 'Coverage',
    coverageTitle: 'Serving all of Connecticut',
    faqTitle: 'Service FAQs',
  },

  aboutPage: {
    badge: 'About Legend Restoration',
    title: 'A Connecticut roofing team that works for the homeowner',
    sub: 'We founded Legend Restoration to help Connecticut families get the roof their insurance already owes them — without the runaround.',
    founderEyebrow: 'Founder',
    founderName: 'Daniel Rivera',
    founderP1: 'Daniel founded Legend Restoration LLC with a simple goal: make insurance-paid roofing straightforward and fair for Connecticut homeowners. After seeing too many families overwhelmed by claim paperwork — or unaware their roof even qualified — he built a team that handles the entire process on the homeowner’s behalf.',
    founderP2: 'Today, Legend Restoration documents storm and hail damage, negotiates scope with adjusters, and delivers premium roof replacements across the state — so families pay only their deductible.',
    emailUs: 'Email us',
    chips: ['CT Licensed', '4.9/5 Google', '500+ Roofs'],
    valuesEyebrow: 'What we stand for',
    valuesTitle: 'Built on trust and follow-through',
    values: [
      { icon: 'shieldCheck', title: 'Honest assessments', desc: 'If your roof doesn’t qualify, we tell you — no pressure, no cost.' },
      { icon: 'document', title: 'We do the paperwork', desc: 'We handle the claim and the insurer so you don’t have to.' },
      { icon: 'globe', title: 'Bilingual service', desc: 'The whole process available in English and Spanish.' },
      { icon: 'shield', title: 'Quality that lasts', desc: 'Premium materials, certified crews, and a 10-year warranty.' },
    ],
    crewEyebrow: 'Our crew',
    crewTitle: 'A certified team across Connecticut',
    crewP: 'Our licensed and insured crews bring years of New England roofing experience to every project — from the first inspection to the final shingle. We treat every home like our own and stand behind our work with a 10-year warranty.',
    crewPoints: ['Licensed & insured in Connecticut', 'Certified installation crews', 'Bilingual project coordinators'],
    teamCaption: 'Our Connecticut crew',
    projectCaption: 'Completed roof replacement',
    projectBadge: 'Insurance approved',
    ctaTitle: 'Let’s get your roof inspected',
    ctaSub: 'Find out in 2 minutes if your insurance can cover a new roof. Free and no obligation.',
  },

  projectsPage: {
    badge: 'Our Work',
    title: 'Before & after: Connecticut roofs we’ve restored',
    sub: 'Real insurance-approved roof replacements across CT — most homeowners paid only their deductible.',
    hoverEyebrow: 'Hover to reveal',
    hoverTitle: 'Storm damage → brand-new roof',
    galleryEyebrow: 'Project gallery',
    galleryTitle: 'Recent roof replacements',
    galleryTypes: {
      replacement: 'Roof Replacement',
      insurance: 'Insurance Claim Roofing',
      storm: 'Storm Damage Repair',
      architectural: 'Architectural Shingle Roof',
      installation: 'Roof Installation',
      hail: 'Hail Damage Repair',
    } as Record<string, string>,
    before: 'Before',
    after: 'After',
    comparisons: [
      { before: '/worker1.jpg', after: '/project1.jpg', city: 'Hartford, CT', alt: 'Hartford CT roof replacement' },
      { before: '/worker2.jpg', after: '/project2.jpg', city: 'New Haven, CT', alt: 'New Haven CT roof replacement' },
      { before: '/worker3.jpg', after: '/project3.jpg', city: 'Bridgeport, CT', alt: 'Bridgeport CT roof replacement' },
    ],
    ctaTitle: 'Your roof could be next',
    ctaSub: 'Find out in 2 minutes if your insurance covers a full replacement. Free inspection, no obligation.',
  },

  contactPage: {
    badge: 'Get in touch',
    title: 'Free roof inspection — let’s talk',
    sub: 'Tell us about your roof and we’ll check if your insurance can cover it. No cost, no obligation, and we respond fast.',
    formTitle: 'Request your inspection',
    formSub: 'We’ll get back to you within 48 hours.',
    callUs: 'Call us',
    emailLabel: 'Email',
    serviceArea: 'Service area',
    serviceAreaVal: 'All of Connecticut, USA',
    hours: 'Hours',
    hoursVal: 'Mon–Sat · 8:00 AM – 6:00 PM',
    citiesLabel: 'Cities we serve:',
  },

  contactForm: {
    name: 'Name *',
    namePh: 'Your full name',
    phone: 'Phone *',
    phonePh: '(203) 555-0100',
    email: 'Email',
    emailPh: 'you@email.com',
    city: 'City in Connecticut',
    cityPh: 'e.g. Hartford',
    help: 'How can we help?',
    helpPh: 'Tell us about your roof or storm damage…',
    send: 'Send message',
    sending: 'Sending…',
    sentOk: 'Thank you! A Legend expert will contact you within 48 hours.',
    sentErr: 'Something went wrong. Please call us at',
  },

  serviceAreasPage: {
    badge: 'Coverage',
    title: 'We Serve All of Connecticut',
    sub: 'From Hartford to Greenwich — Legend Restoration covers every city in CT.',
    cityCountry: 'Connecticut',
    ctaTitle: 'Don’t see your city? We cover all of Connecticut',
    ctaButton: 'Free Inspection Today',
  },

  footer: {
    brandDesc: 'Insurance-approved roofing across Connecticut. Free inspections — you only pay your deductible.',
    companyTitle: 'Company',
    servicesTitle: 'Services',
    serviceAreasTitle: 'Service Areas',
    contactTitle: 'Contact',
    serviceAreasLabel: 'Service areas:',
    rights: 'All rights reserved.',
    licensed: 'Licensed & insured roofing contractor in Connecticut.',
    location: 'Serving all of Connecticut, USA',
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    sub: 'The page you’re looking for doesn’t exist. Let’s get you back on track.',
    backHome: 'Back home',
    freeInspection: 'Free inspection',
  },
}

type Copy = typeof copyEn

const copyEs: Copy = {
  nav: { home: 'Inicio', services: 'Servicios', serviceAreas: 'Áreas de Servicio', projects: 'Proyectos', about: 'Nosotros', contact: 'Contacto' },
  cta: { freeInspection: 'Inspección Gratis', check: 'Ver si Califico', call: 'Llamar' },

  titles: {
    '/': 'Techos Aprobados por Seguro en Connecticut | Legend Restoration',
    '/services': 'Servicios de Techos en Connecticut | Legend Restoration',
    '/service-areas': 'Áreas de Servicio de Techos en Connecticut | Legend Restoration',
    '/projects': 'Proyectos de Techos en Connecticut | Legend Restoration',
    '/about': 'Sobre Legend Restoration | Techos en Connecticut',
    '/contact': 'Contacta a Legend Restoration | Inspección Gratis',
  } as Record<string, string>,

  hero: {
    badge: '#1 en Techos por Seguro en Connecticut',
    title: 'Tu seguro puede pagar tu techo nuevo.',
    highlight: 'Solo pagas tu deducible.',
    sub: 'En Connecticut, los daños por tormenta, granizo y viento pueden calificar para un reemplazo completo del techo cubierto por tu seguro de propietario. Legend Restoration maneja todo el claim — de principio a fin.',
    bullets: ['Inspección gratuita', 'Sin costo inicial', 'Hablamos español'],
    ctaLeft: 'Solo 30 segundos',
    ctaRight: 'Descubre el estado de tu techo',
  },

  trust: [
    { icon: 'trophy', text: '+500 techos reemplazados en CT' },
    { icon: 'star', text: '4.9/5 de calificación' },
    { icon: 'lock', text: 'Licenciados y asegurados' },
    { icon: 'shield', text: 'Garantía de 10 años' },
  ],

  stats: [
    { value: '97%', label: 'de claims aprobados' },
    { value: '$0', label: 'costo si no calificas' },
    { value: '48h', label: 'tiempo de respuesta' },
    { value: '500+', label: 'familias de CT ayudadas' },
  ],

  servicesSection: {
    eyebrow: 'Qué hacemos',
    title: 'Techos y claims de seguro, gestionados por ti',
    sub: 'Desde la primera inspección hasta tu techo nuevo, manejamos cada paso — incluyendo el papeleo con tu aseguradora.',
    learnMore: 'Más información',
  },
  services: [
    {
      slug: 'roof-replacement',
      icon: 'roof',
      title: 'Reemplazo de Techo',
      short: 'Reemplazo completo del techo con materiales premium y garantía de mano de obra de 10 años.',
      body: 'Remoción total y reemplazo con tejas arquitectónicas diseñadas para el clima de Nueva Inglaterra. Igualamos materiales descontinuados y documentamos cada detalle para que tu claim de seguro se sostenga.',
      points: [
        'Sistemas de tejas arquitectónicas y premium',
        'Igualación de materiales descontinuados (ley de CT)',
        'Remoción total, inspección de la base y reinstalación de flashing',
        'Garantía de mano de obra de 10 años',
      ],
    },
    {
      slug: 'insurance-claims',
      icon: 'claim',
      title: 'Asistencia con el Claim de Seguro',
      short: 'Manejamos todo el claim con tu aseguradora — solo pagas tu deducible.',
      body: 'Desde documentar el daño por tormenta hasta negociar el alcance con el ajustador, nuestro equipo maneja el papeleo de principio a fin. En Connecticut, un daño por tormenta que califica puede significar un reemplazo totalmente cubierto.',
      points: [
        'Inspección y documentación de daños gratis',
        'Comunicación directa con tu ajustador',
        'Justificación del alcance bajo la ley de matching de CT',
        'Solo pagas tu deducible',
      ],
    },
    {
      slug: 'storm-damage',
      icon: 'storm',
      title: 'Reparación de Daños por Tormenta y Granizo',
      short: 'Evaluación y restauración rápida de daños por viento, granizo y tormenta.',
      body: 'Las tormentas de Connecticut causan daños que muchas veces no se ven desde el suelo. Inspeccionamos desde arriba, lo documentamos para tu aseguradora y restauramos tu techo rápido — antes de que pequeñas filtraciones se conviertan en reparaciones mayores.',
      points: [
        'Daños por granizo, viento y caída de árboles',
        'Cubierta de emergencia y protección contra filtraciones',
        'Documentación con fotos y dron',
        'Respuesta en 48 horas',
      ],
    },
    {
      slug: 'siding-exterior',
      icon: 'siding',
      title: 'Siding y Exteriores',
      short: 'Reparación y reemplazo de siding para completar la restauración de tu exterior.',
      body: 'Cuando el daño por tormenta se extiende más allá del techo, también restauramos el siding y las superficies exteriores — manteniendo los materiales consistentes para que todo el proyecto califique en tu claim.',
      points: [
        'Siding de vinil y composite',
        'Daños por tormenta e impacto',
        'Igualación de color y perfil',
        'Coordinado con tu claim del techo',
      ],
    },
  ],

  whySection: {
    eyebrow: 'Por qué Legend',
    title: 'Especialistas en techos por seguro de Connecticut',
    sub: 'Conocemos las leyes de seguro y de matching de Connecticut — y las usamos para conseguirte la cobertura más completa a la que tienes derecho.',
  },
  why: [
    { icon: 'scale', title: 'Ley de Matching de Connecticut', desc: 'Cuando los materiales ya no coinciden, la ley de CT puede exigir reemplazar toda el área afectada — convirtiendo una reparación pequeña en un proyecto totalmente cubierto.' },
    { icon: 'tag', title: 'Sin Costo Inicial', desc: 'La inspección, la documentación y el proceso del claim son completamente gratis. Solo pagas tu deducible.' },
    { icon: 'globe', title: 'Hablamos Español', desc: 'Todo el proceso disponible en inglés y español — sin letra chica, sin confusiones.' },
    { icon: 'shield', title: 'Garantía de 10 Años', desc: 'Cada proyecto está respaldado por una garantía de mano de obra y materiales de 10 años.' },
    { icon: 'bolt', title: 'Respuesta en 48 Horas', desc: 'Un experto en techos responde dentro de 48 horas de tu solicitud — muchas veces el mismo día.' },
    { icon: 'pin', title: 'Locales en Connecticut', desc: 'Atendemos a propietarios en todo Connecticut, desde el condado de Fairfield hasta Hartford.' },
  ],

  processSection: { eyebrow: 'Proceso simple', title: 'De la inspección al techo nuevo en 4 pasos' },
  process: [
    { step: '01', title: 'Inspección Gratis', desc: 'Inspeccionamos tu techo y documentamos cualquier daño por tormenta — sin costo, sin compromiso.' },
    { step: '02', title: 'Presentación del Claim', desc: 'Presentamos y manejamos el claim con tu aseguradora, justificando todo el alcance del trabajo.' },
    { step: '03', title: 'Aprobación', desc: 'Tu aseguradora aprueba la cobertura. Tú confirmas y solo pagas tu deducible.' },
    { step: '04', title: 'Techo Nuevo', desc: 'Nuestro equipo instala tu techo nuevo, respaldado por una garantía de mano de obra de 10 años.' },
  ],

  projectsPreview: { eyebrow: 'Trabajo reciente', title: 'Techos de Connecticut que hemos restaurado', viewAll: 'Ver todos los proyectos' },
  projects: [
    { img: '/project1.jpg', city: 'Hartford, CT', scope: 'Reemplazo completo de techo', detail: 'Techo dañado por granizo reemplazado por completo — la familia solo pagó su deducible.' },
    { img: '/project2.jpg', city: 'New Haven, CT', scope: 'Restauración por daño de tormenta', detail: 'Tejas levantadas por el viento documentadas y aprobadas para cobertura completa.' },
    { img: '/project3.jpg', city: 'Bridgeport, CT', scope: 'Reemplazo por claim de seguro', detail: 'Tejas descontinuadas igualadas bajo la ley de CT para un re-techado completo.' },
    { img: '/worker1.jpg', city: 'Stamford, CT', scope: 'Remoción y re-techado', detail: 'Remoción total, inspección de la base e instalación de tejas premium.' },
    { img: '/worker2.jpg', city: 'Waterbury, CT', scope: 'Techo + flashing', detail: 'Sistema de techo nuevo con valles y penetraciones reinstaladas.' },
    { img: '/worker3.jpg', city: 'Norwalk, CT', scope: 'Instalación del equipo', detail: 'Sistema de tejas arquitectónicas instalado por nuestro equipo certificado.' },
  ],

  testimonialsSection: { eyebrow: 'Reseñas', title: 'Los propietarios de Connecticut confían en Legend', verified: 'Verificado' },
  testimonials: [
    { name: 'María González', initials: 'MG', city: 'Bridgeport, CT', text: 'No sabía que mi seguro podía pagar todo. Legend manejó todo el proceso y en 3 semanas tenía un techo nuevo.' },
    { name: 'Carlos Rodríguez', initials: 'CR', city: 'New Haven, CT', text: 'Muy profesionales. Hablaron directamente con mi aseguradora y solo tuve que pagar el deducible. El techo quedó perfecto.' },
    { name: 'Ana Martínez', initials: 'AM', city: 'Hartford, CT', text: 'El proceso fue súper fácil. En menos de 24 horas me llamaron, hicieron la inspección y empezaron el papeleo.' },
  ],

  faqSection: { eyebrow: 'Preguntas', title: 'Preguntas frecuentes' },
  faqs: [
    { q: '¿De verdad mi seguro puede pagar un reemplazo completo del techo?', a: 'Sí. En Connecticut, el seguro de propietario puede cubrir un reemplazo completo del techo cuando hay daño por tormenta, granizo o viento que califica. Solo pagas tu deducible. Evaluamos tu caso gratis.' },
    { q: '¿Qué pasa si mi techo no califica?', a: 'Si nuestra inspección gratuita determina que tu techo no califica, no hay ningún costo ni compromiso. Simplemente te damos una evaluación honesta.' },
    { q: '¿Cuánto tarda el proceso?', a: 'De la inspección al techo nuevo normalmente toma de 2 a 6 semanas, según la respuesta de tu aseguradora. Manejamos cada paso.' },
    { q: '¿Tengo que hablar con mi aseguradora?', a: 'No necesariamente. Nuestro equipo puede comunicarse directamente con tu aseguradora, manejando la documentación y todo el claim por ti.' },
    { q: '¿Atienden mi ciudad en Connecticut?', a: 'Atendemos a propietarios en todo Connecticut, incluyendo Bridgeport, New Haven, Hartford, Stamford, Waterbury y los pueblos cercanos.' },
    { q: '¿Qué es la ley de matching de Connecticut?', a: 'Si los materiales dañados del techo o siding ya no se pueden igualar, las regulaciones de Connecticut pueden exigir reemplazar toda el área afectada para una apariencia uniforme — lo que puede convertir una reparación pequeña en un reemplazo totalmente cubierto.' },
  ],

  ctaBand: {
    title: 'Mira si tu techo califica — gratis',
    subtitle: 'Una verificación de 2 minutos te dice si tu seguro puede cubrir un reemplazo completo del techo. Sin costo, sin compromiso.',
    primary: 'Ver si Califico',
    call: 'Llamar',
  },

  servicesPage: {
    badge: 'Techos en Connecticut',
    title: 'Servicios de techo diseñados alrededor de tu claim de seguro',
    sub: 'Reemplazo de techo, asistencia con el claim y reparación de daños por tormenta — para propietarios en todo Connecticut.',
    getInspection: 'Solicita una inspección gratis',
    processEyebrow: 'Cómo funciona',
    processTitle: 'Tu claim, manejado paso a paso',
    coverageEyebrow: 'Cobertura',
    coverageTitle: 'Atendemos todo Connecticut',
    faqTitle: 'Preguntas sobre el servicio',
  },

  aboutPage: {
    badge: 'Sobre Legend Restoration',
    title: 'Un equipo de techos de Connecticut que trabaja para el propietario',
    sub: 'Fundamos Legend Restoration para ayudar a las familias de Connecticut a conseguir el techo que su seguro ya les debe — sin vueltas.',
    founderEyebrow: 'Fundador',
    founderName: 'Daniel Rivera',
    founderP1: 'Daniel fundó Legend Restoration LLC con una meta sencilla: hacer que los techos pagados por seguro sean claros y justos para los propietarios de Connecticut. Después de ver a tantas familias abrumadas por el papeleo del claim — o sin saber que su techo siquiera calificaba — formó un equipo que maneja todo el proceso de parte del propietario.',
    founderP2: 'Hoy, Legend Restoration documenta daños por tormenta y granizo, negocia el alcance con los ajustadores y entrega reemplazos de techo premium en todo el estado — para que las familias solo paguen su deducible.',
    emailUs: 'Escríbenos',
    chips: ['Licenciados en CT', '4.9/5 Google', '500+ Techos'],
    valuesEyebrow: 'Lo que defendemos',
    valuesTitle: 'Construido sobre confianza y cumplimiento',
    values: [
      { icon: 'shieldCheck', title: 'Evaluaciones honestas', desc: 'Si tu techo no califica, te lo decimos — sin presión, sin costo.' },
      { icon: 'document', title: 'Hacemos el papeleo', desc: 'Manejamos el claim y a la aseguradora para que tú no tengas que hacerlo.' },
      { icon: 'globe', title: 'Servicio bilingüe', desc: 'Todo el proceso disponible en inglés y español.' },
      { icon: 'shield', title: 'Calidad que dura', desc: 'Materiales premium, equipos certificados y garantía de 10 años.' },
    ],
    crewEyebrow: 'Nuestro equipo',
    crewTitle: 'Un equipo certificado en todo Connecticut',
    crewP: 'Nuestros equipos licenciados y asegurados traen años de experiencia en techos de Nueva Inglaterra a cada proyecto — desde la primera inspección hasta la última teja. Tratamos cada casa como la nuestra y respaldamos nuestro trabajo con una garantía de 10 años.',
    crewPoints: ['Licenciados y asegurados en Connecticut', 'Equipos de instalación certificados', 'Coordinadores de proyecto bilingües'],
    teamCaption: 'Nuestro equipo de Connecticut',
    projectCaption: 'Reemplazo de techo completado',
    projectBadge: 'Aprobado por seguro',
    ctaTitle: 'Inspeccionemos tu techo',
    ctaSub: 'Descubre en 2 minutos si tu seguro puede cubrir un techo nuevo. Gratis y sin compromiso.',
  },

  projectsPage: {
    badge: 'Nuestro Trabajo',
    title: 'Antes y después: techos de Connecticut que hemos restaurado',
    sub: 'Reemplazos de techo reales aprobados por seguro en todo CT — la mayoría de los propietarios solo pagó su deducible.',
    hoverEyebrow: 'Pasa el cursor para revelar',
    hoverTitle: 'Daño por tormenta → techo nuevo',
    galleryEyebrow: 'Galería de proyectos',
    galleryTitle: 'Reemplazos de techo recientes',
    galleryTypes: {
      replacement: 'Reemplazo de Techo',
      insurance: 'Techo por Seguro',
      storm: 'Reparación por Tormenta',
      architectural: 'Techo de Tejas Arquitectónicas',
      installation: 'Instalación de Techo',
      hail: 'Reparación por Granizo',
    } as Record<string, string>,
    before: 'Antes',
    after: 'Después',
    comparisons: [
      { before: '/worker1.jpg', after: '/project1.jpg', city: 'Hartford, CT', alt: 'Reemplazo de techo en Hartford CT' },
      { before: '/worker2.jpg', after: '/project2.jpg', city: 'New Haven, CT', alt: 'Reemplazo de techo en New Haven CT' },
      { before: '/worker3.jpg', after: '/project3.jpg', city: 'Bridgeport, CT', alt: 'Reemplazo de techo en Bridgeport CT' },
    ],
    ctaTitle: 'Tu techo podría ser el próximo',
    ctaSub: 'Descubre en 2 minutos si tu seguro cubre un reemplazo completo. Inspección gratis, sin compromiso.',
  },

  contactPage: {
    badge: 'Contáctanos',
    title: 'Inspección gratis del techo — hablemos',
    sub: 'Cuéntanos sobre tu techo y verificamos si tu seguro puede cubrirlo. Sin costo, sin compromiso, y respondemos rápido.',
    formTitle: 'Solicita tu inspección',
    formSub: 'Te responderemos dentro de 48 horas.',
    callUs: 'Llámanos',
    emailLabel: 'Correo',
    serviceArea: 'Área de servicio',
    serviceAreaVal: 'Todo Connecticut, EE. UU.',
    hours: 'Horario',
    hoursVal: 'Lun–Sáb · 8:00 AM – 6:00 PM',
    citiesLabel: 'Ciudades que atendemos:',
  },

  contactForm: {
    name: 'Nombre *',
    namePh: 'Tu nombre completo',
    phone: 'Teléfono *',
    phonePh: '(203) 555-0100',
    email: 'Correo',
    emailPh: 'tu@correo.com',
    city: 'Ciudad en Connecticut',
    cityPh: 'ej. Hartford',
    help: '¿Cómo podemos ayudarte?',
    helpPh: 'Cuéntanos sobre tu techo o el daño por tormenta…',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sentOk: '¡Gracias! Un experto de Legend te contactará dentro de 48 horas.',
    sentErr: 'Algo salió mal. Por favor llámanos al',
  },

  serviceAreasPage: {
    badge: 'Cobertura',
    title: 'Servimos todo Connecticut',
    sub: 'Desde Hartford hasta Greenwich — Legend Restoration cubre cada ciudad de CT.',
    cityCountry: 'Connecticut',
    ctaTitle: '¿No ves tu ciudad? Cubrimos todo Connecticut',
    ctaButton: 'Inspección Gratis Hoy',
  },

  footer: {
    brandDesc: 'Techos aprobados por seguro en todo Connecticut. Inspecciones gratis — solo pagas tu deducible.',
    companyTitle: 'Empresa',
    servicesTitle: 'Servicios',
    serviceAreasTitle: 'Áreas de Servicio',
    contactTitle: 'Contacto',
    serviceAreasLabel: 'Áreas de servicio:',
    rights: 'Todos los derechos reservados.',
    licensed: 'Contratista de techos licenciado y asegurado en Connecticut.',
    location: 'Atendemos todo Connecticut, EE. UU.',
  },

  notFound: {
    code: '404',
    title: 'Página no encontrada',
    sub: 'La página que buscas no existe. Volvamos al camino correcto.',
    backHome: 'Volver al inicio',
    freeInspection: 'Inspección gratis',
  },
}

export const copy: Record<Lang, Copy> = { en: copyEn, es: copyEs }
