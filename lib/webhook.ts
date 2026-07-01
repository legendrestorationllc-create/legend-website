import type { SimState } from '@/types/simulator'

export interface LeadPayload {
  lead_id: string
  etapa: string
  nombre: string
  telefono: string
  direccion: string
  es_dueno: string
  lat: number | null
  lng: number | null
  señales: string[]
  conocia_ct: string
  probabilidad: string
  resultado: string
  timestamp: string
  fuente: 'legend-landing'
}

// Webhook de Google Sheets (Apps Script). Se puede sobreescribir con la env var en Vercel.
const SHEETS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_SHEETS_WEBHOOK ||
  'https://script.google.com/macros/s/AKfycbx2CYWDHHzcub0biK54CGKNUGvHz5Gy0WXMC1Q5kY5VP0TvrhRAkrTfqdCCq3-GXw7n/exec'

function buildPayload(state: SimState & { result?: string | null; stage?: string }): LeadPayload {
  const probability = state.roof === 'yes' ? '97%' : '93%'
  const esDueno = state.owner === 'yes' ? 'Sí' : state.owner === 'no' ? 'No' : 'No respondió'
  return {
    lead_id: state.leadId ?? '',
    etapa: state.stage ?? 'completo',
    nombre: state.name,
    telefono: state.phone,
    direccion: state.address,
    es_dueno: esDueno,
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

// Mapea los IDs del formulario a texto legible para el correo.
const SIGN_LABELS: Record<string, string> = {
  s1: 'Manchas de humedad en el techo o cielo raso',
  s2: 'Corrientes de aire frío sin razón aparente',
  s3: 'Facturas de energía más altas de lo normal',
  s4: 'Moho visible en el techo',
}
// La pregunta 2 es sobre la edad del techo (¿más de 15 años?).
const KNEW_LABELS: Record<string, string> = {
  yes: 'Techo de más de 15 años',
  no: 'Techo más nuevo (menos de 15 años)',
  heard: 'No está seguro de la edad del techo',
}

// Construye los campos legibles + un mensaje completo y organizado del lead.
function buildLeadFields(payload: LeadPayload) {
  const senales = payload.señales.length
    ? payload.señales.map((id) => SIGN_LABELS[id] ?? id).join(', ')
    : 'Ninguna seleccionada'
  const techo = KNEW_LABELS[payload.conocia_ct] ?? payload.conocia_ct
  const mapa = payload.lat && payload.lng
    ? `https://www.google.com/maps?q=${payload.lat},${payload.lng}`
    : ''
  let fecha = payload.timestamp
  try {
    fecha = new Date(payload.timestamp).toLocaleString('es-US', { timeZone: 'America/New_York' })
  } catch {}
  const mensaje = [
    `🏠 NUEVO LEAD (${payload.etapa.toUpperCase()}) — Legend Restoration`,
    payload.lead_id ? `ID: ${payload.lead_id}` : '',
    '',
    `Nombre: ${payload.nombre}`,
    `Teléfono: ${payload.telefono}`,
    `Dueño de casa: ${payload.es_dueno}`,
    `Dirección de la propiedad: ${payload.direccion || 'No proporcionada (lead parcial)'}`,
    mapa ? `Ver en mapa: ${mapa}` : '',
    '',
    `Sobre su techo: ${techo}`,
    `Probabilidad de calificar: ${payload.probabilidad}`,
    '',
    `Recibido: ${fecha} (hora de Connecticut)`,
    'Fuente: Landing / Inspección',
  ].filter(Boolean).join('\n')
  return { senales, techo, mapa, fecha, mensaje }
}

async function sendEmailJS(payload: LeadPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) return

  const f = buildLeadFields(payload)
  const { default: emailjs } = await import('emailjs-com')
  await emailjs.send(serviceId, templateId, {
    to_email: 'legendrestorationllc@gmail.com',
    subject: `Nuevo lead [${payload.etapa}]: ${payload.nombre} · ${payload.telefono}`,
    // Campos individuales (por si tu plantilla los usa uno por uno):
    nombre: payload.nombre,
    telefono: payload.telefono,
    direccion: payload.direccion || 'No proporcionada',
    mapa: f.mapa || 'No disponible',
    senales: f.senales,
    techo: f.techo,
    probabilidad: payload.probabilidad,
    fecha: f.fecha,
    // Mensaje completo ya formateado (con esto solo, la plantilla {{mensaje}} ya trae todo):
    mensaje: f.mensaje,
  }, publicKey)
}

async function sendSheets(payload: LeadPayload): Promise<void> {
  const url = SHEETS_WEBHOOK_URL
  if (!url) return
  const f = buildLeadFields(payload)
  // text/plain evita el preflight CORS (Apps Script no responde OPTIONS). El doPost lee el JSON igual.
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, senales_texto: f.senales, techo_texto: f.techo, mapa: f.mapa, mensaje: f.mensaje }),
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

export async function sendLead(state: SimState & { result?: string | null; stage?: string }): Promise<void> {
  const payload = buildPayload(state)
  // El lead PARCIAL (sin dirección) es una red de seguridad silenciosa: se guarda en
  // Sheet/CRM pero NO envía correo, para no llenar tu bandeja. El correo llega UNA sola
  // vez, con el lead COMPLETO. Dedupe por lead_id si quieres una sola fila en la Sheet.
  const tasks = payload.etapa === 'parcial'
    ? [sendSheets(payload), sendGHL(payload)]
    : [sendEmailJS(payload), sendSheets(payload), sendGHL(payload)]
  const results = await Promise.allSettled(tasks)
  if (results.length > 0 && results.every(r => r.status === 'rejected')) {
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
  return emailjsOk || !!SHEETS_WEBHOOK_URL || !!process.env.NEXT_PUBLIC_GHL_WEBHOOK
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
  const url = SHEETS_WEBHOOK_URL
  if (!url) return
  await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
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
