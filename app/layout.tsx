import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import { SITE_URL, business } from '@/lib/site'
import { LanguageProvider } from '@/providers/LanguageProvider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Legend Restoration | Insurance-Approved Roofing in Connecticut',
    template: '%s | Legend Restoration LLC',
  },
  description: business.description,
  applicationName: business.name,
  keywords: [
    'roofing Connecticut',
    'CT roofing contractor',
    'insurance roof replacement Connecticut',
    'storm damage roof CT',
    'hail damage roof Connecticut',
    'free roof inspection CT',
    'roof replacement deductible',
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: business.name,
    title: 'Legend Restoration | Insurance-Approved Roofing in Connecticut',
    description: business.description,
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legend Restoration | Insurance-Approved Roofing in Connecticut',
    description: business.description,
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/logo.svg', apple: '/logo.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSans.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
