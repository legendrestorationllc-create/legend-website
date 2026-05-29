'use client'

import Link from 'next/link'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

export default function NotFound() {
  const { lang } = useT()
  const n = copy[lang].notFound
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">{n.code}</p>
      <h1 className="mt-2 font-sora text-3xl font-extrabold text-navy2">{n.title}</h1>
      <p className="mt-3 max-w-md text-muted">{n.sub}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">{n.backHome}</Link>
        <Link href="/inspection" className="btn-secondary">{n.freeInspection}</Link>
      </div>
    </div>
  )
}
