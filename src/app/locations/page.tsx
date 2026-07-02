import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { locations, generateLocalBusinessSchema } from '@/lib/locations'
import LocationCard from '@/components/location-card'

export const metadata: Metadata = {
  title: 'Our 3 Los Angeles Check Cashing Locations',
  description: 'Find a Los Angeles Check Cashing location near you. Sherman Oaks, La Cienega, and Canoga Park. Call (213) 800-2920.',
  alternates: { canonical: 'https://www.losangelescheckcashing.com/locations/' },
}

export default function LocationsPage() {
  return (
    <>
      {locations.map(loc => (
        <script key={loc.slug} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema(loc)) }} />
      ))}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our 3 Los Angeles Check Cashing Locations</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          Los Angeles Check Cashing has 3 convenient locations across the greater Los Angeles area. Find the one nearest you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map(loc => <LocationCard key={loc.slug} location={loc} />)}
        </div>
        <div className="mt-12 p-6 rounded-lg text-center" style={{ backgroundColor: '#E8F5E9' }}>
          <p className="text-gray-700 font-semibold mb-2">Questions? Call us anytime.</p>
          <a href="tel:2138002920" className="inline-flex items-center gap-2 font-bold text-xl" style={{ color: '#1B5E20' }}>
            <Phone size={22} />
            (213) 800-2920
          </a>
        </div>
      </div>
      <div className="md:hidden h-16" />
    </>
  )
}
