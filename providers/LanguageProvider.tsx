'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '@/lib/translations'
import type { Lang, Translations } from '@/lib/translations'

interface LangCtx {
  lang: Lang
  t: Translations
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
})

// Idioma: 1) elección guardada del usuario (localStorage) → 2) idioma del navegador
// ('es*' → Español, si no → Inglés). SSR y el primer render son Inglés (coincide con el
// HTML del server → sin desajuste de hidratación); tras montar aplicamos la preferencia.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    let saved: string | null = null
    try { saved = window.localStorage.getItem('lang') } catch {}
    if (saved === 'es' || saved === 'en') { setLangState(saved); return }
    const nav = navigator.language?.toLowerCase() ?? ''
    setLangState(nav.startsWith('es') ? 'es' : 'en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { window.localStorage.setItem('lang', l) } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useT = () => useContext(LanguageContext)
