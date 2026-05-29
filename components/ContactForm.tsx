'use client'

import { useState } from 'react'
import { business } from '@/lib/site'
import { copy } from '@/lib/content'
import { sendContact } from '@/lib/webhook'
import { Icon } from '@/components/Icon'
import { useT } from '@/providers/LanguageProvider'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export function ContactForm() {
  const { lang } = useT()
  const f = copy[lang].contactForm
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const input = {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      city: String(data.get('city') || ''),
      message: String(data.get('message') || ''),
    }
    setStatus('sending')
    try {
      const { delivered } = await sendContact(input)
      if (!delivered) {
        // No webhook configured yet — fall back to a pre-filled email so no lead is lost.
        const subject = encodeURIComponent(`New roofing inquiry — ${input.name}`)
        const body = encodeURIComponent(
          `Name: ${input.name}\nPhone: ${input.phone}\nEmail: ${input.email}\nCity (CT): ${input.city}\n\nMessage:\n${input.message}`,
        )
        window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`
      }
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-xl border-2 border-border bg-white px-4 py-3 font-dm text-[0.9375rem] text-navy2 outline-none transition-colors focus:border-navy'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy2">{f.name}</label>
          <input id="name" name="name" required className={field} placeholder={f.namePh} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy2">{f.phone}</label>
          <input id="phone" name="phone" required type="tel" className={field} placeholder={f.phonePh} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy2">{f.email}</label>
          <input id="email" name="email" type="email" className={field} placeholder={f.emailPh} />
        </div>
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-navy2">{f.city}</label>
          <input id="city" name="city" className={field} placeholder={f.cityPh} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy2">{f.help}</label>
        <textarea id="message" name="message" rows={4} className={field} placeholder={f.helpPh} />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.send}
      </button>
      {status === 'ok' && (
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--green)' }}>
          <Icon name="check" size={16} strokeWidth={3} /> {f.sentOk}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm" style={{ color: 'var(--orange)' }}>
          {f.sentErr} <a href={business.phoneHref} className="font-semibold underline">{business.phone}</a>.
        </p>
      )}
    </form>
  )
}
