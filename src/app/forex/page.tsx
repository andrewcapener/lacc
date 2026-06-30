import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Forex & Foreign Currency Exchange in Los Angeles',
  description: 'Foreign currency and forex exchange in Los Angeles at Los Angeles Check Cashing. 3 locations in Sherman Oaks, La Cienega, and Canoga Park.',
}

export default function ForexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Foreign Currency Exchange in Los Angeles</h1>
      <p className="text-xl text-gray-600 mb-10">
        Need to exchange foreign currency in Los Angeles? Los Angeles Check Cashing offers forex and foreign currency exchange at 3 convenient locations.
      </p>
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Foreign Currency Exchange Services</h2>
          <p>Whether you're a traveler returning from abroad or a business with international transactions, Los Angeles Check Cashing makes currency exchange simple. We handle most major global currencies and offer walk-in service at all 3 locations.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Currencies We Exchange</h2>
          <p className="mb-3">We exchange most major world currencies, including but not limited to:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {['Euro (EUR)', 'British Pound (GBP)', 'Canadian Dollar (CAD)', 'Mexican Peso (MXN)', 'Japanese Yen (JPY)', 'Chinese Yuan (CNY)', 'Australian Dollar (AUD)', 'Swiss Franc (CHF)', 'South Korean Won (KRW)'].map(c => (
              <div key={c} className="flex items-center gap-2 py-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1B5E20' }} />
                {c}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">Call ahead to confirm your specific currency is available.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Bank Account Required</h2>
          <p>Unlike traditional banks and credit unions, you don't need an account to exchange currency at Los Angeles Check Cashing. Just bring your foreign currency and a valid ID, and we'll handle the rest.</p>
        </section>
      </div>
      <div className="mt-10 p-4 rounded-lg text-sm" style={{ backgroundColor: '#E8F5E9' }}>
        <p className="text-gray-600">For more information about our currency exchange services, visit our <Link href="/money-exchange/" className="font-semibold underline" style={{ color: '#1B5E20' }}>Money Exchange page</Link>.</p>
      </div>
      <div className="mt-8 text-center">
        <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
          <Phone size={16} />
          Call (213) 800-2920
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
