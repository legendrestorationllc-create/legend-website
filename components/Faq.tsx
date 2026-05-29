'use client'

import { useState } from 'react'

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="card overflow-hidden">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-sora text-base font-bold text-navy2">{item.q}</span>
              <span
                className="shrink-0 text-xl text-orange transition-transform"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-muted">{item.a}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
