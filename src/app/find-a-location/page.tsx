import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { locations } from '@/lib/locations'
import LocationCard from '@/components/location-card'

export const metadata: Metadata = {
  title: 'Find a Check Cashing Location Near You in Los Angeles',
  description: 'Find the nearest Los Angeles Check Cashing location. We have 3 locations: Sherman Oaks, La Cienega (West LA), and Canoga Park.',
}

export default function FindALocationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find a Check Cashing Location Near You</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Los Angeles Check Cashing has 3 locations throughout the greater Los Angeles area. Whether you're in the San Fernando Valley or West LA, there's a location near you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {locations.map(loc => <LocationCard key={loc.slug} location={loc} />)}
      </div>
      <div className="rounded-lg p-8 text-center" style={{ backgroundColor: '#E8F5E9' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Not Sure Which Location to Visit?</h2>
        <p className="text-gray-600 mb-6">Call our main line and we'll help you find the most convenient location for you.</p>
        <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white text-lg" style={{ backgroundColor: '#1B5E20' }}>
          <Phone size={18} />
          (213) 800-2920
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
