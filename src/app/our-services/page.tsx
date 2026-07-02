import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { services } from '@/lib/services'
import ServiceCard from '@/components/service-card'

export const metadata: Metadata = {
  title: 'Our Services — Check Cashing, Currency Exchange & More',
  description: 'Los Angeles Check Cashing offers check cashing, currency exchange, notary services, MoneyGram transfers, money orders, and prepaid cards at 3 LA locations.',
  alternates: { canonical: 'https://www.losangelescheckcashing.com/our-services/' },
}

const serviceDetails = [
  {
    id: 'check-cashing',
    title: 'Check Cashing',
    body: `Have a check? We can most likely cash it. Bring in your check and a valid government-issued photo ID and we'll get cash in your hand — fast. We cash payroll checks, government checks, tax refund checks, insurance checks, personal checks, and more.\n\nOur fees are competitive and posted clearly at each location. First-time customers save 50% on their first check cashed — just mention this offer when you come in.\n\nNo bank account needed. No appointment necessary. Just walk in.`,
  },
  {
    id: 'currency-exchange',
    title: 'Currency Exchange',
    body: `We exchange most major global currencies at all 3 Los Angeles Check Cashing locations. Whether you're arriving from abroad or heading out of the country, we make currency exchange simple and straightforward.\n\nBring in your foreign currency and we'll exchange it at competitive rates. No appointment needed. Call ahead to confirm your currency is available.`,
  },
  {
    id: 'notary-services',
    title: 'Notary Services',
    body: `Need a document notarized in Los Angeles? Our certified notaries are available at our locations. We can notarize a wide range of documents including affidavits, powers of attorney, loan documents, and more.\n\nNotary availability varies — please call your nearest location to confirm hours and schedule your visit. Walk-ins welcome when the notary is available.`,
  },
  {
    id: 'moneygram',
    title: 'MoneyGram Money Transfers',
    body: `Send money quickly and reliably with MoneyGram at any of our 3 Los Angeles locations. MoneyGram lets you send funds domestically to any state or internationally to countries around the world.\n\nRecipients can pick up cash at thousands of MoneyGram agent locations globally. Whether you're sending money to family or paying a bill, MoneyGram at LA Check Cashing makes it easy and fast.`,
  },
  {
    id: 'money-orders',
    title: 'Money Orders',
    body: `Money orders are a safe, widely accepted alternative to personal checks or cash for paying bills, rent, and more. Purchase a money order at any of our 3 Los Angeles Check Cashing locations.\n\nMoney orders are traceable and can be replaced if lost or stolen, making them a secure payment option. Come in with cash and we'll issue your money order on the spot.`,
  },
  {
    id: 'prepaid-cards',
    title: 'Prepaid Credit/Debit Cards',
    body: `A prepaid debit card is a convenient, flexible way to use your cash without carrying it around. Load funds onto your card and use it anywhere major debit or credit cards are accepted — in stores, online, and at ATMs.\n\nPrepaid cards are customizable and great for budgeting, shopping online, or giving as gifts. Available at all 3 Los Angeles Check Cashing locations.`,
  },
]

export default function OurServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Services</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Los Angeles Check Cashing provides a full suite of financial services at 3 convenient LA locations. No bank account required.
      </p>

      {/* Services overview grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map(s => <ServiceCard key={s.id} service={s} />)}
      </div>

      {/* Detailed service sections */}
      <div className="space-y-16">
        {serviceDetails.map(detail => (
          <section key={detail.id} id={detail.id} className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{detail.title}</h2>
            {detail.body.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
            ))}
          </section>
        ))}
      </div>

      {/* Coupon */}
      <div className="mt-16 p-8 rounded-lg text-center border-2" style={{ borderColor: '#1B5E20', backgroundColor: '#E8F5E9' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">50% Off Your First Check</h2>
        <p className="text-gray-600 mb-6">First-time customers get 50% off check cashing fees. Mention this offer when you visit.</p>
        <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
          <Phone size={18} />
          (213) 800-2920
        </a>
      </div>

      <div className="md:hidden h-16" />
    </div>
  )
}
