import type { SimState } from '@/types/simulator'

export interface LeadPayload {
  nombre: string
  telefono: string
  direccion: string
  lat: number | null
  lng: number | null
  señales: string[]
  conocia_ct: string
  probabilidad: string
  resultado: string
  timestamp: string
  fuente: 'legend-landing'
}

function buildPayload(state: SimState & { result?: string | null }): LeadPayload {
  const probability = state.roof === 'yes' ? '97%' : '93%'
  return {
    nombre: state.name,
    telefono: state.phone,
    direccion: state.address,
    lat: state.lat,
    lng: state.lng,
    señales: state.signs,
    conocia_ct: state.knew ?? 'no_respuesta',
    probabilidad: probability,
    resultado: state.result ?? 'high',
    timestamp: new Date().toISOString(),
    fuente: 'legend-landing',
  }
}

async function sendEmailJS(payload: LeadPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) return

  const { default: emailjs } = await import('emailjs-com')
  await emailjs.send(serviceId, templateId, {
    to_email: 'legendrestorationllc@gmail.com',
    nombre: payload.nombre,
    telefono: payload.telefono,
    direccion: payload.direccion || 'No proporcionada',
    señales: payload.señales.join(', '),
    conocia_ct: payload.conocia_ct,
    probabilidad: payload.probabilidad,
    timestamp: payload.timestamp,
  }, publicKey)
}

async function sendSheets(payload: LeadPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK
  if (!url) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

async function sendGHL(payload: LeadPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_GHL_WEBHOOK
  if (!url) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: payload.nombre.split(' ')[0],
      lastName: payload.nombre.split(' ').slice(1).join(' ') || '',
      phone: payload.telefono,
      address: payload.direccion,
      tags: ['legend-landing', payload.resultado],
      customField: {
        señales: payload.señales.join(', '),
        probabilidad: payload.probabilidad,
        conocia_ct: payload.conocia_ct,
      },
    }),
  })
}

export async function sendLead(state: SimState & { result?: string | null }): Promise<void> {
  const payload = buildPayload(state)
  const results = await Promise.allSettled([
    sendEmailJS(payload),
    sendSheets(payload),
    sendGHL(payload),
  ])
  const failed = results.filter(r => r.status === 'rejected')
  if (failed.length === results.filter(r => r.status !== 'rejected' || true).length) {
    throw new Error('All lead destinations failed')
  }
}

/* ----------------------------------------------------------------------------
   Marketing-site contact form. Reuses the same lead destinations (EmailJS /
   Google Sheets / GHL) with a contact-shaped payload. If no destination is
   configured, returns { delivered: false } so the UI can fall back to mailto.
   ---------------------------------------------------------------------------- */

export interface ContactInput {
  name: string
  phone: string
  email: string
  city: string
  message: string
}

export interface ContactPayload extends ContactInput {
  timestamp: string
  fuente: 'legend-website'
}

function contactDestinationsConfigured(): boolean {
  const emailjsOk = !!(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  )
  return emailjsOk || !!process.env.NEXT_PUBLIC_SHEETS_WEBHOOK || !!process.env.NEXT_PUBLIC_GHL_WEBHOOK
}

async function contactEmailJS(payload: ContactPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) return
  const { default: emailjs } = await import('emailjs-com')
  await emailjs.send(serviceId, templateId, {
    to_email: 'legendrestorationllc@gmail.com',
    nombre: payload.name,
    telefono: payload.phone,
    email: payload.email || 'No proporcionado',
    direccion: payload.city || 'No proporcionada',
    mensaje: payload.message || '—',
    timestamp: payload.timestamp,
  }, publicKey)
}

async function contactSheets(payload: ContactPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK
  if (!url) return
  await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
}

async function contactGHL(payload: ContactPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_GHL_WEBHOOK
  if (!url) return
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: payload.name.split(' ')[0],
      lastName: payload.name.split(' ').slice(1).join(' ') || '',
      phone: payload.phone,
      email: payload.email,
      city: payload.city,
      tags: ['legend-website', 'contact-form'],
      customField: { mensaje: payload.message },
    }),
  })
}

export async function sendContact(input: ContactInput): Promise<{ delivered: boolean }> {
  const payload: ContactPayload = {
    ...input,
    timestamp: new Date().toISOString(),
    fuente: 'legend-website',
  }
  if (!contactDestinationsConfigured()) return { delivered: false }
  const results = await Promise.allSettled([
    contactEmailJS(payload),
    contactSheets(payload),
    contactGHL(payload),
  ])
  if (!results.some(r => r.status === 'fulfilled')) {
    throw new Error('All contact destinations failed')
  }
  return { delivered: true }
}
