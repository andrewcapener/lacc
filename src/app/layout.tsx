import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'Los Angeles Check Cashing | 3 LA Locations',
    template: '%s | Los Angeles Check Cashing',
  },
  description: '3 Los Angeles Check Cashing Locations. Sherman Oaks, La Cienega, and Canoga Park. Fast service, honest fees. 50% off your first check cashed.',
  keywords: ['check cashing', 'Los Angeles', 'Sherman Oaks', 'La Cienega', 'Canoga Park', 'currency exchange', 'money orders', 'MoneyGram'],
  openGraph: {
    title: 'Los Angeles Check Cashing | 3 LA Locations',
    description: '3 Los Angeles Check Cashing Locations. 50% off your first check cashed.',
    url: 'https://www.losangelescheckcashing.com',
    siteName: 'Los Angeles Check Cashing',
    locale: 'en_US',
    type: 'website',
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Los Angeles Check Cashing",
  "telephone": "(213) 800-2920",
  "url": "https://www.losangelescheckcashing.com",
  "description": "3 Los Angeles Check Cashing Locations to serve your check cashing needs.",
  "areaServed": "Los Angeles, CA",
  "numberOfLocations": 3,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
