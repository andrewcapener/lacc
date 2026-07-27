import Link from 'next/link'
import { getLocationContent } from '@/lib/location-content'
import { generateFaqSchema } from '@/lib/faq'
import { services } from '@/lib/services'
import { serviceHref } from '@/lib/service-content'

// Neighborhood copy + location FAQs (with FAQPage schema) + service links,
// appended to each location page. Self-contained wrapper so location pages
// only need to drop it in after their main grid.
export default function LocationExtras({ slug }: { slug: string }) {
  const content = getLocationContent(slug)
  if (!content) return null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(content.faqs)) }} />
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <section className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Serving the Neighborhood</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">{content.area}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-2xl">
            {content.faqs.map(f => (
              <div key={f.question} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-gray-900 mb-2">{f.question}</h3>
                <p className="text-gray-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Our Services</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {services.map(s => (
              <li key={s.id}>
                <Link href={serviceHref(s.id)} className="text-sm font-medium hover:underline" style={{ color: '#1B5E20' }}>
                  {s.title} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
