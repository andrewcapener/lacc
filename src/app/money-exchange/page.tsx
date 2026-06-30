import type { Metadata } from 'next'
import { Phone, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Currency Exchange in Los Angeles | Money Exchange',
  description: 'Exchange foreign currency at Los Angeles Check Cashing. We exchange most global currencies at our 3 LA locations: Sherman Oaks, La Cienega, and Canoga Park.',
}

export default function MoneyExchangePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
          <RefreshCw style={{ color: '#1B5E20' }} />
        </div>
        <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#2E7D32' }}>Currency Exchange</span>
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Currency Exchange in Los Angeles</h1>
      <p className="text-xl text-gray-600 mb-10">
        Los Angeles Check Cashing exchanges most major global currencies at our 3 Los Angeles area locations. Fast, competitive, no appointment needed.
      </p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What We Exchange</h2>
          <p>We exchange most major world currencies including Euros, British Pounds, Canadian Dollars, Mexican Pesos, Japanese Yen, Chinese Yuan, and many more. Call ahead to confirm your currency is in stock at your nearest location.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Bring your foreign currency and a valid photo ID to any of our 3 locations.</li>
            <li>We'll provide you with the current exchange rate.</li>
            <li>Walk out with US dollars (or your desired currency) in hand.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Los Angeles Check Cashing for Currency Exchange?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Competitive exchange rates</li>
            <li>No bank account required</li>
            <li>3 convenient Los Angeles locations</li>
            <li>Fast, walk-in service — no appointment needed</li>
            <li>Friendly, bilingual staff (English and Spanish)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Currency Exchange Locations</h2>
          <div className="grid gap-4 mt-4">
            {[
              { name: 'Sherman Oaks', address: '15030 Ventura Blvd. #20', phone: '(818) 461-9191', tel: '8184619191' },
              { name: 'La Cienega', address: '8506 W. 3rd Street, Los Angeles', phone: '(310) 652-8100', tel: '3106528100' },
              { name: 'Canoga Park', address: '9015 DeSoto Ave.', phone: '(818) 700-0490', tel: '8187000490' },
            ].map(loc => (
              <div key={loc.name} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{loc.name}</p>
                  <p className="text-sm text-gray-600">{loc.address}</p>
                </div>
                <a href={`tel:${loc.tel}`} className="font-medium" style={{ color: '#1B5E20' }}>{loc.phone}</a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 p-6 rounded-lg border-2 text-center" style={{ borderColor: '#1B5E20' }}>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Exchange Currency?</h3>
        <p className="text-gray-600 mb-4">Call us first to confirm your currency is available at your nearest location.</p>
        <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
          <Phone size={16} />
          (213) 800-2920
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
