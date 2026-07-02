import type { Metadata } from 'next'
import { Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Se Habla Español — Cambio de Cheques en Los Angeles',
  description: 'Los Angeles Check Cashing — Se habla español. Cambio de cheques, cambio de divisas, giros de MoneyGram y más en 3 ubicaciones en Los Angeles.',
  alternates: { canonical: 'https://www.losangelescheckcashing.com/se-habla-espanol/' },
}

export default function SeHablaEspanolPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-4" style={{ backgroundColor: '#1B5E20' }}>
        Se Habla Español
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Se Habla Español</h1>
      <p className="text-xl text-gray-600 mb-2">Cambio de Cheques en Los Angeles</p>
      <p className="text-xl text-gray-600 mb-10">Check Cashing in Los Angeles</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestros Servicios / Our Services</h2>
          <ul className="space-y-3 text-gray-700">
            {[
              { es: 'Cambio de Cheques', en: 'Check Cashing' },
              { es: 'Cambio de Divisas', en: 'Currency Exchange' },
              { es: 'Servicios Notariales', en: 'Notary Services' },
              { es: 'Transferencias MoneyGram', en: 'MoneyGram Money Transfers' },
              { es: 'Giros Postales', en: 'Money Orders' },
              { es: 'Tarjetas Prepagadas', en: 'Prepaid Debit Cards' },
            ].map(s => (
              <li key={s.en} className="flex flex-col border-b border-gray-100 pb-2">
                <span className="font-semibold">{s.es}</span>
                <span className="text-sm text-gray-500">{s.en}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">50% de Descuento en su Primer Cheque</h2>
          <p className="text-gray-600 mb-4">
            Los clientes nuevos reciben 50% de descuento en el cobro de su primer cheque. Solo mencione esta oferta cuando visite cualquiera de nuestras 3 ubicaciones.
          </p>
          <p className="text-gray-600 mb-6">
            New customers receive 50% off the fee for cashing their first check. Just mention this offer when you visit any of our 3 locations.
          </p>
          <a href="tel:2138002920" className="flex items-center gap-2 w-full justify-center py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
            <Phone size={18} />
            Llame / Call (213) 800-2920
          </a>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestras Ubicaciones / Our Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Sherman Oaks', address: '15030 Ventura Blvd. #20\nSherman Oaks, CA 91403', phone: '(818) 461-9191', tel: '8184619191' },
          { name: 'La Cienega', address: '8506 W. 3rd Street\nLos Angeles, CA 90048', phone: '(310) 652-8100', tel: '3106528100' },
          { name: 'Canoga Park', address: '9015 DeSoto Ave.\nCanoga Park, CA 91304', phone: '(818) 700-0490', tel: '8187000490' },
        ].map(loc => (
          <div key={loc.name} className="border border-gray-200 p-4 rounded-lg">
            <p className="font-bold text-gray-900 mb-2">{loc.name}</p>
            <p className="text-sm text-gray-600 flex items-start gap-1 mb-2">
              <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#1B5E20' }} />
              <span className="whitespace-pre-line">{loc.address}</span>
            </p>
            <a href={`tel:${loc.tel}`} className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#1B5E20' }}>
              <Phone size={14} />
              {loc.phone}
            </a>
          </div>
        ))}
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
