import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TitleSync } from '@/components/TitleSync'
import { JsonLd, localBusinessSchema } from '@/components/JsonLd'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <TitleSync />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
