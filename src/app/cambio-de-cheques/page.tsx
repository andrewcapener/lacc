import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import { locations } from '@/lib/locations'
import { generateFaqSchema } from '@/lib/faq'

export const metadata: Metadata = {
  title: 'Cambio de Cheques en Los Ángeles — Rápido y Sin Cuenta Bancaria',
  description: 'Cambie su cheque en cualquiera de nuestras 3 sucursales en Los Ángeles: Sherman Oaks, La Cienega y Canoga Park. Solo traiga su cheque y una identificación con foto. 50% de descuento en su primer cheque.',
  alternates: { canonical: 'https://www.losangelescheckcashing.com/cambio-de-cheques/' },
}

const faqs = [
  {
    question: '¿Qué necesito para cambiar un cheque?',
    answer: 'Solo su cheque y una identificación oficial con foto (licencia de conducir, identificación estatal o pasaporte). No necesita cuenta bancaria ni cita.',
  },
  {
    question: '¿Qué tipos de cheques cambian?',
    answer: 'Cambiamos cheques de nómina, cheques del gobierno, reembolsos de impuestos, cheques de seguros, cheques personales y más.',
  },
  {
    question: '¿Cuánto cuesta cambiar un cheque?',
    answer: 'Nuestras tarifas son competitivas y están publicadas claramente en cada sucursal. Los clientes nuevos reciben 50% de descuento en su primer cheque.',
  },
  {
    question: '¿Cuál es el horario?',
    answer: 'Lunes a sábado de 9:00 AM a 6:00 PM, y domingo de 10:00 AM a 4:00 PM, en las tres sucursales.',
  },
]

const otherServices = [
  'Cambio de divisas (moneda extranjera)',
  'Envíos de dinero con MoneyGram',
  'Giros postales (money orders)',
  'Tarjetas de débito prepagadas',
  'Servicios de notario (llame para confirmar disponibilidad)',
]

export default function CambioDeChequesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(faqs)) }} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-sm font-semibold mb-2" style={{ color: '#2E7D32' }}>Se Habla Español</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cambio de Cheques en Los Ángeles</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          ¿Tiene un cheque? Lo más probable es que podamos cambiarlo. Visite cualquiera de nuestras 3 sucursales en Los Ángeles con su cheque y una identificación con foto, y salga con efectivo en la mano. Sin cuenta bancaria, sin cita, sin esperas.
        </p>

        <div className="space-y-10 max-w-2xl">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Cheques Que Cambiamos</h2>
            <p className="text-gray-600 leading-relaxed">
              Cambiamos cheques de nómina, cheques del gobierno, reembolsos de impuestos, cheques de seguros, cheques personales y más. Si tiene un cheque, tráigalo — casi seguro que podemos convertirlo en efectivo al instante.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Atención en Español</h2>
            <p className="text-gray-600 leading-relaxed">
              Nuestro equipo lo atiende en español en las tres sucursales. Servimos a la comunidad de Los Ángeles desde 2004 con un servicio rápido, honesto y con tarifas claras publicadas en cada sucursal.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Otros Servicios</h2>
            <ul className="text-gray-600 space-y-2">
              {otherServices.map(s => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: '#1B5E20' }} />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* FAQs */}
        <section className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqs.map(f => (
              <div key={f.question} className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-gray-900 mb-2">{f.question}</h3>
                <p className="text-gray-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestras 3 Sucursales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {locations.map(loc => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">50% de Descuento en Su Primer Cheque</h2>
          <p className="text-gray-600 mb-6">Clientes nuevos reciben 50% de descuento en la tarifa de su primer cheque. Mencione esta oferta cuando nos visite.</p>
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
