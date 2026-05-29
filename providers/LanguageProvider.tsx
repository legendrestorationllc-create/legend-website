'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '@/lib/translations'
import type { Lang, Translations } from '@/lib/translations'

interface LangCtx {
  lang: Lang
  t: Translations
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: translations.en,
})

// Auto-detects the visitor's language — no manual toggle.
// SSR + first client render are English (matches server HTML → no hydration mismatch);
// immediately after mount we switch based on navigator.language:
//   starts with 'es' → Spanish · otherwise → English (default fallback).
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const nav = navigator.language?.toLowerCase() ?? ''
    setLang(nav.startsWith('es') ? 'es' : 'en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useT = () => useContext(LanguageContext)
