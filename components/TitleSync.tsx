'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { copy } from '@/lib/content'
import { useT } from '@/providers/LanguageProvider'

// Keeps the browser-tab <title> in sync with the active language on toggle/navigation.
// Server metadata still renders the English title for SSR/SEO; this updates it client-side.
export function TitleSync() {
  const { lang } = useT()
  const pathname = usePathname()

  useEffect(() => {
    const t = copy[lang].titles[pathname]
    if (t) document.title = t
  }, [lang, pathname])

  return null
}
