// Clean line-icon set (24x24, stroke = currentColor) used across the marketing site
// in place of emojis. Color/size are controlled by the parent via CSS `color` + `size`.

type IconName =
  | 'roof' | 'claim' | 'storm' | 'siding'
  | 'scale' | 'tag' | 'globe' | 'shield' | 'shieldCheck' | 'bolt' | 'pin'
  | 'phone' | 'mail' | 'clock' | 'check' | 'star' | 'arrowRight'
  | 'trophy' | 'lock' | 'users' | 'document' | 'quote'

const STROKE: Partial<Record<IconName, React.ReactNode>> = {
  roof: <><path d="m3 11 9-7 9 7" /><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" /><path d="M10 21v-6h4v6" /></>,
  claim: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4z" /><path d="m8.5 13 2 2 4-4" /></>,
  storm: <><path d="M12.8 19.6A2 2 0 1 0 14 16H2" /><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" /><path d="M9.8 4.4A2 2 0 1 1 11 8H2" /></>,
  siding: <><path d="M12 3 2 8l10 5 10-5-10-5z" /><path d="m2 13 10 5 10-5" /><path d="m2 18 10 5 10-5" /></>,
  scale: <><path d="M12 3v18" /><path d="M5 21h14" /><path d="M3 7h18" /><path d="M7 7 4 14a3 3 0 0 0 6 0L7 7z" /><path d="M17 7l-3 7a3 3 0 0 0 6 0l-3-7z" /></>,
  tag: <><path d="M11.6 2.6A2 2 0 0 0 10.2 2H4a2 2 0 0 0-2 2v6.2a2 2 0 0 0 .6 1.4l8.8 8.8a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8L11.6 2.6z" /><path d="M7 7h.01" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
  shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11.5 2 2 4-4" /></>,
  bolt: <><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <><path d="M20 6 9 17l-5-5" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22" /><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8" /><path d="M6 2h12v7a6 6 0 0 1-12 0V2z" /></>,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></>,
  quote: <><path d="M6 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6c0 3-1 5-4 6" /><path d="M17 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6c0 3-1 5-4 6" /></>,
}

export function Icon({
  name,
  size = 24,
  strokeWidth = 2,
  className,
  style,
}: {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
}) {
  // The star is the only filled glyph (rating display).
  if (name === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
        <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 19.4 7.5 13l-5-4.3 6.6-.6L12 2z" />
      </svg>
    )
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {STROKE[name]}
    </svg>
  )
}

export type { IconName }
