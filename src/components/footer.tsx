import Link from 'next/link'
import Image from 'next/image'

const locations = [
  { name: 'Sherman Oaks', address: '15030 Ventura Blvd. #20', city: 'Sherman Oaks, CA 91403', phone: '(818) 461-9191', tel: '8184619191', slug: 'sherman-oaks-check-cashing' },
  { name: 'La Cienega', address: '8506 W. 3rd Street', city: 'Los Angeles, CA 90048', phone: '(310) 652-8100', tel: '3106528100', slug: 'la-cienega-check-cashing' },
  { name: 'Canoga Park', address: '9015 DeSoto Ave.', city: 'Canoga Park, CA 91304', phone: '(818) 700-0490', tel: '8187000490', slug: 'canoga-park-check-cashing' },
]

const services = [
  { title: 'Check Cashing', href: '/our-services/' },
  { title: 'Currency Exchange', href: '/money-exchange/' },
  { title: 'Notary Services', href: '/our-services/' },
  { title: 'MoneyGram Transfers', href: '/our-services/' },
  { title: 'Money Orders', href: '/our-services/' },
  { title: 'Prepaid Cards', href: '/our-services/' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0C3B1E] text-white">
      {/* Offer strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-bold tracking-widest uppercase text-white/50">
            First-time customers: 50% off your first check cashed
          </p>
          <a
            href="tel:2138002920"
            className="text-xs font-bold tracking-widest uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-[#0C3B1E] transition-colors whitespace-nowrap"
          >
            Call to Claim
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_1fr_1fr] gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Image
            src="https://www.losangelescheckcashing.com/wp-content/uploads/2014/06/logo_retina1.png"
            alt="Los Angeles Check Cashing"
            width={180}
            height={32}
            className="h-8 w-auto object-contain brightness-0 invert"
            unoptimized
          />
          <a href="tel:2138002920" className="text-lg font-bold text-white hover:text-white/70 transition-colors tracking-tight">
            (213) 800-2920
          </a>
          <p className="text-xs text-white/40 leading-relaxed">
            3 locations serving Los Angeles since 2004.
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Services</p>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s.title}>
                <Link href={s.href} className="text-sm text-white/60 hover:text-white transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* All 3 locations */}
        {locations.map(loc => (
          <div key={loc.name}>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">{loc.name}</p>
            <p className="text-sm text-white/60 leading-relaxed mb-1">{loc.address}</p>
            <p className="text-sm text-white/60 leading-relaxed mb-4">{loc.city}</p>
            <a href={`tel:${loc.tel}`} className="text-sm font-bold text-white hover:text-white/70 transition-colors">
              {loc.phone}
            </a>
            <div className="mt-4">
              <Link href={`/locations/${loc.slug}/`} className="text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors">
                Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex flex-wrap gap-6 items-center">
            {[
              { label: 'Accessibility', href: '/accessibility/' },
              { label: 'Privacy', href: '/privacy-policy/' },
              { label: 'Terms', href: '/terms-of-service/' },
              { label: 'Se Habla Español', href: '/se-habla-espanol/' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                {l.label}
              </Link>
            ))}
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Los Angeles Check Cashing
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
