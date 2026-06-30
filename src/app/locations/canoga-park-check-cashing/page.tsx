import type { Metadata } from 'next'
import { Phone, MapPin, Clock } from 'lucide-react'
import { locations, generateLocalBusinessSchema } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Canoga Park Check Cashing — 9015 DeSoto Ave',
  description: 'Los Angeles Check Cashing in Canoga Park. 9015 DeSoto Ave., Canoga Park CA 91304. Call (818) 700-0490. Check cashing, currency exchange & more.',
}

const loc = locations[2]

const hours = [
  { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
]

export default function CanogaParkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema(loc)) }} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm font-semibold mb-2" style={{ color: '#2E7D32' }}>Canoga Park, CA</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Canoga Park Check Cashing</h1>
        <p className="text-xl text-gray-600 mb-10">Serving the Canoga Park community with fast, friendly check cashing and financial services.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" style={{ color: '#1B5E20' }} />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">9015 DeSoto Ave.<br />Canoga Park, CA 91304</p>
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm mt-1 inline-block font-medium" style={{ color: '#1B5E20' }}>Get Directions &rarr;</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 shrink-0" style={{ color: '#1B5E20' }} />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href={`tel:${loc.tel}`} className="text-gray-600 hover:text-green-800">{loc.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 shrink-0" style={{ color: '#1B5E20' }} />
                <div>
                  <p className="font-semibold text-gray-900">Hours</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    {hours.map(h => (
                      <p key={h.day}><span className="w-24 inline-block">{h.day}:</span> {h.hours}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
              <h3 className="font-bold text-gray-900 mb-3">Services at This Location</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                {['Check Cashing', 'Currency Exchange', 'Notary Services', 'MoneyGram Transfers', 'Money Orders', 'Prepaid Cards'].map(s => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#1B5E20' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="rounded-lg overflow-hidden border border-gray-200 h-72 mb-6">
              <iframe
                src={loc.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Canoga Park Check Cashing Map"
              />
            </div>
            <a href={`tel:${loc.tel}`} className="flex items-center justify-center gap-2 w-full py-4 rounded font-bold text-white text-lg" style={{ backgroundColor: '#1B5E20' }}>
              <Phone size={20} />
              Call {loc.phone}
            </a>
          </div>
        </div>
      </div>
      <div className="md:hidden h-16" />
    </>
  )
}
