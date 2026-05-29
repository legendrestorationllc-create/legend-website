'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

// Draggable before/after comparison slider. Mobile-first: works with touch and mouse.
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
}) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border-2 border-border bg-light select-none"
      style={{ aspectRatio: '4 / 3', cursor: 'ew-resize', touchAction: 'none' }}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX) }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After (full) */}
      <Image src={after} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 600px" style={{ objectFit: 'cover' }} />
      <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white">{afterLabel}</span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: ref.current?.offsetWidth ?? '100%' }}>
          <Image src={before} alt={beforeAlt} fill sizes="(max-width: 768px) 100vw, 600px" style={{ objectFit: 'cover' }} />
        </div>
        <span className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white">{beforeLabel}</span>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 z-20" style={{ left: `calc(${pos}% - 1px)`, width: 2, background: 'var(--orange)' }}>
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg" style={{ background: 'var(--orange)' }}>
          ⇄
        </div>
      </div>
    </div>
  )
}
