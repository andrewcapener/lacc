'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MapPin, Phone } from 'lucide-react'

const links = [
  { label: 'Locations', href: '/locations/' },
  { label: 'Services', href: '/our-services/' },
  { label: 'Money Exchange', href: '/money-exchange/' },
  { label: 'Blog', href: '/blog/' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#D4D4D4]">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="https://www.losangelescheckcashing.com/wp-content/uploads/2014/06/logo_retina1.png"
              alt="Los Angeles Check Cashing"
              width={200}
              height={36}
              className="h-7 md:h-8 w-auto object-contain"
              unoptimized
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-bold tracking-widest uppercase text-[#0A0A0A] hover:text-[#0C3B1E] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:2138002920"
              className="text-xs font-bold tracking-widest uppercase text-white bg-[#0C3B1E] px-6 py-3 hover:bg-[#1A5C32] transition-colors"
            >
              (213) 800-2920
            </a>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:2138002920"
              className="flex items-center gap-1.5 bg-[#0C3B1E] text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5"
              aria-label="Call us"
            >
              <Phone size={12} />
              Call
            </a>
            <button
              className="p-2.5 text-[#0A0A0A] border border-[#D4D4D4]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-white border-t border-[#D4D4D4]">
            <div className="px-5 py-2 divide-y divide-[#F0F0F0]">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between py-4 text-sm font-bold tracking-widest uppercase text-[#0A0A0A]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                  <span className="text-[#D4D4D4]">→</span>
                </Link>
              ))}
              <Link
                href="/se-habla-espanol/"
                className="flex items-center justify-between py-4 text-sm font-bold tracking-widest uppercase text-[#0C3B1E]"
                onClick={() => setOpen(false)}
              >
                Se Habla Español
                <span className="text-[#0C3B1E]/40">→</span>
              </Link>
            </div>

            {/* Location quick-access */}
            <div className="border-t border-[#D4D4D4] px-5 py-5 bg-[#F7F5F2]">
              <p className="text-xs font-bold tracking-widest uppercase text-[#6B7280] mb-3 flex items-center gap-1.5">
                <MapPin size={11} /> Locations
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Sherman Oaks', tel: '8184619191', phone: '(818) 461-9191' },
                  { name: 'La Cienega', tel: '3106528100', phone: '(310) 652-8100' },
                  { name: 'Canoga Park', tel: '8187000490', phone: '(818) 700-0490' },
                ].map(loc => (
                  <a
                    key={loc.tel}
                    href={`tel:${loc.tel}`}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-bold text-[#0A0A0A]">{loc.name}</span>
                    <span className="text-sm text-[#0C3B1E] font-bold">{loc.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile sticky bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2">
        <a
          href="tel:2138002920"
          className="flex items-center justify-center gap-2 py-4 bg-[#0C3B1E] text-white font-bold text-xs tracking-widest uppercase border-r border-white/20"
        >
          <Phone size={13} />
          Call Now
        </a>
        <Link
          href="/find-a-location/"
          className="flex items-center justify-center gap-2 py-4 bg-[#0A0A0A] text-white font-bold text-xs tracking-widest uppercase"
        >
          <MapPin size={13} />
          Directions
        </Link>
      </div>
    </>
  )
}
