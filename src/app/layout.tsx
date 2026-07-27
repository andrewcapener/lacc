import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

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
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Los Angeles Check Cashing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Los Angeles Check Cashing | 3 LA Locations',
    description: '3 Los Angeles Check Cashing Locations. 50% off your first check cashed.',
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://www.losangelescheckcashing.com/#organization",
  "name": "Los Angeles Check Cashing",
  "telephone": "(213) 800-2920",
  "url": "https://www.losangelescheckcashing.com",
  "description": "3 Los Angeles Check Cashing Locations to serve your check cashing needs.",
  "areaServed": "Los Angeles, CA",
  "numberOfLocations": 3,
  "priceRange": "$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Check",
  "sameAs": [
    "https://maps.google.com/?q=15030+Ventura+Blvd+Sherman+Oaks+CA+91403",
    "https://maps.google.com/?q=8506+W+3rd+Street+Los+Angeles+CA+90048",
    "https://maps.google.com/?q=9015+DeSoto+Ave+Canoga+Park+CA+91304",
  ],
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
        {GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
