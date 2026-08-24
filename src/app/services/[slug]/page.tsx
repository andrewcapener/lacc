import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin } from 'lucide-react'
import { servicePages } from '@/lib/service-content'
import { generateFaqSchema } from '@/lib/faq'
import { locations } from '@/lib/locations'

const BASE_URL = 'https://www.losangelescheckcashing.com'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return servicePages.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = servicePages.find(p => p.slug === params.slug)
  if (!page) return { title: 'Service Not Found' }
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${BASE_URL}/services/${page.slug}/` },
  }
}

export default function ServicePage({ params }: PageProps) {
  const page = servicePages.find(p => p.slug === params.slug)
  if (!page) notFound()

  const serviceLocations = page.locationSlugs
    ? locations.filter(l => page.locationSlugs!.includes(l.slug))
    : locations

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.title,
    "provider": { "@id": `${BASE_URL}/#organization` },
    "areaServed": { "@type": "City", "name": "Los Angeles" },
    "url": `${BASE_URL}/services/${page.slug}/`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(page.faqs)) }} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm font-semibold mb-2" style={{ color: '#2E7D32' }}>Los Angeles, CA</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{page.title}</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">{page.intro}</p>

        <div className="space-y-10 max-w-2xl">
          {page.sections.map(s => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        {/* FAQs */}
        <section className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {page.faqs.map(f => (
              <div key={f.question} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-gray-900 mb-2">{f.question}</h3>
                <p className="text-gray-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {serviceLocations.length === locations.length
              ? 'Available at All 3 Locations'
              : `Offered at Our ${serviceLocations[0].name.replace(' Check Cashing', '')} Location`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {serviceLocations.map(loc => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}/`}
                className="border border-gray-200 rounded-lg p-5 hover:border-green-800 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="mt-1 shrink-0" style={{ color: '#1B5E20' }} />
                  <div>
                    <p className="font-bold text-gray-900">{loc.city}</p>
                    <p className="text-sm text-gray-600">{loc.address}</p>
                    <p className="text-sm font-medium mt-2" style={{ color: '#1B5E20' }}>{loc.phone}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coupon CTA */}
        <div className="mt-16 p-8 rounded-lg text-center border-2" style={{ borderColor: '#1B5E20', backgroundColor: '#E8F5E9' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">50% Off Your First Check</h2>
          <p className="text-gray-600 mb-6">First-time customers get 50% off check cashing fees. Mention this offer when you visit.</p>
          <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
            <Phone size={18} />
            (213) 800-2920
          </a>
        </div>
      </div>
      <div className="md:hidden h-16" />
    </>
  )
}
