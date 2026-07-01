import Link from 'next/link'
import Image from 'next/image'
import { locations } from '@/lib/locations'
import { services } from '@/lib/services'
import StatCounter from '@/components/stat-counter'
import Marquee from '@/components/marquee'
import { sanityFetch } from '@/sanity/client'
import { getRecentPostsQuery } from '@/sanity/queries'

export const dynamic = 'force-dynamic'

const marqueeItems = [
  'Check Cashing',
  'Currency Exchange',
  'Money Orders',
  'MoneyGram Transfers',
  'Notary Services',
  'Prepaid Cards',
  'Se Habla Español',
  '3 LA Locations',
  'Est. 2004',
  'Open 7 Days',
]

const WP = 'https://www.losangelescheckcashing.com/wp-content/uploads'

export default async function HomePage() {
  const posts = await sanityFetch<any[]>(getRecentPostsQuery, { count: 3 }) || []

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#0C3B1E] text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/la-skyline.png"
            alt="Los Angeles skyline"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        </div>

        {/* Top info bar */}
        <div className="relative z-10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 md:px-8 h-10 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              34.0522° N, 118.2437° W &nbsp;·&nbsp; Los Angeles, CA
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase hidden sm:block">
              Est. 2004 &nbsp;·&nbsp; Licensed &amp; Insured
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">

            {/* Left — headline */}
            <div className="py-14 md:py-20 lg:py-24 lg:pr-20 lg:border-r border-white/10">
              <h1 className="font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] tracking-tight mb-8 md:mb-12">
                Your Check.<br />
                <em className="not-italic text-white/40">Cash in Hand.</em>
              </h1>
              <p className="text-sm md:text-base text-white/50 max-w-lg leading-relaxed mb-10 md:mb-14">
                Three Los Angeles locations. Honest fees, bilingual staff, and twenty years of getting cash into the hands of the people who need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:2138002920"
                  className="inline-flex items-center justify-center bg-white text-[#0C3B1E] font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#EEF4F0] transition-colors"
                >
                  Call (213) 800-2920
                </a>
                <Link
                  href="/our-services/"
                  className="inline-flex items-center justify-center border border-white/25 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-white/60 hover:bg-white/5 transition-colors"
                >
                  50% Off First Check →
                </Link>
              </div>
            </div>

            {/* Right — location data panel */}
            <div className="hidden lg:flex flex-col border-l border-white/10 divide-y divide-white/10">
              {locations.map((loc, i) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}/`}
                  className="group flex flex-col justify-center px-8 py-7 hover:bg-white/5 transition-colors flex-1"
                >
                  <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-1.5">
                    0{i + 1} &nbsp;/&nbsp; {loc.city}
                  </p>
                  <p className="font-bold text-sm text-white mb-1">{loc.address}</p>
                  <p className="text-xs text-white/40 group-hover:text-white/70 transition-colors">{loc.phone}</p>
                </Link>
              ))}
              <a
                href="tel:2138002920"
                className="flex items-center justify-center px-8 py-5 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="font-bold text-xs tracking-widest uppercase text-white/60">First check 50% off — mention online</span>
              </a>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-white/10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Sherman Oaks', val: '(818) 461-9191', href: 'tel:8184619191' },
              { label: 'La Cienega', val: '(310) 652-8100', href: 'tel:3106528100' },
              { label: 'Canoga Park', val: '(818) 700-0490', href: 'tel:8187000490' },
              { label: 'Open 7 Days', val: 'Mon–Sat 9–6 · Sun 10–4', href: '/find-a-location/' },
            ].map(item => (
              <a key={item.label} href={item.href} className="group">
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-0.5">{item.label}</p>
                <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{item.val}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────── */}
      <Marquee items={marqueeItems} />

      {/* ─── STATS ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20 grid grid-cols-3 divide-x divide-white/10">
          <div className="pr-4 md:pr-12">
            <StatCounter end={20} suffix="+" label="Years" />
          </div>
          <div className="px-4 md:px-12">
            <StatCounter end={3} label="Locations" />
          </div>
          <div className="pl-4 md:pl-12">
            <StatCounter end={1000000} suffix="+" label="Checks" />
          </div>
        </div>
      </section>

      {/* ─── PHOTO STRIP ──────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-56 md:h-72">
        <div className="relative overflow-hidden group">
          <Image
            src="/images/la-skyline.png"
            alt="Los Angeles skyline"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#0C3B1E]/50" />
          <p className="absolute bottom-5 left-6 font-mono text-[10px] tracking-widest uppercase text-white/50">Los Angeles, CA</p>
        </div>
        <div className="relative overflow-hidden group border-l border-[#111]">
          <Image
            src="/images/la-palms.png"
            alt="Los Angeles palm trees"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/40" />
          <p className="absolute bottom-5 left-6 font-mono text-[10px] tracking-widest uppercase text-white/50">Est. 2004</p>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {/* Section header */}
          <div className="border-b border-[#D4D4D4] py-10 flex items-end justify-between">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#0A0A0A] leading-none">
              What We Do
            </h2>
            <Link href="/our-services/" className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-[#0C3B1E] border-b border-[#0C3B1E] pb-px hover:opacity-60 transition-opacity">
              All Services →
            </Link>
          </div>

          {/* Service rows */}
          {services.map((s, i) => (
            <div
              key={s.id}
              className="group border-b border-[#D4D4D4] grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_340px] gap-5 md:gap-10 items-start py-8 md:py-10 hover:bg-[#F7F5F2] transition-colors px-0 -mx-0"
            >
              <p className="font-mono text-sm text-[#C8C8C8] pt-1.5 md:pt-2.5 select-none">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-2xl md:text-4xl text-[#0A0A0A] leading-tight pt-1">
                {s.title}
              </h3>
              <p className="hidden md:block text-sm text-[#6B7280] leading-relaxed pt-2.5 pr-4">
                {s.description}
              </p>
            </div>
          ))}

          <div className="py-8 sm:hidden">
            <Link href="/our-services/" className="text-xs font-bold tracking-widest uppercase text-[#0C3B1E] border-b border-[#0C3B1E] pb-px">
              All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_440px]">

          {/* Left — copy */}
          <div className="px-5 md:px-8 py-16 md:py-24 flex flex-col justify-center lg:border-r border-white/10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-8">Our Mission</p>
            <blockquote className="font-display text-4xl md:text-5xl xl:text-6xl text-white leading-[1.05] mb-10">
              "We've been<br />in your shoes."
            </blockquote>
            <p className="text-sm text-white/45 leading-relaxed max-w-md mb-5">
              We pride ourselves on serving the check cashing community of Los Angeles. With decades of experience, we've made it our mission to provide financial services you can rely on — no bank required, no runaround.
            </p>
            <p className="text-sm text-white/45 leading-relaxed max-w-md mb-14">
              Today, with three locations and over a million checks cashed, the Los Angeles Check Cashing name is one of the most trusted in the LA area.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { label: 'You', body: 'Fast cash. Honest fees. No bank required.' },
                { label: 'Us', body: '3 LA locations. Open 7 days. 20 years strong.' },
                { label: 'Together', body: 'Serving our community since 2004.' },
              ].map(item => (
                <div key={item.label}>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/25 mb-2">{item.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — full-bleed city photo with owner inset */}
          <div className="relative min-h-[360px] lg:min-h-0 border-t lg:border-t-0 border-white/10 overflow-hidden">
            <Image
              src="/images/la-city.png"
              alt="Los Angeles"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/55" />

            {/* Owner portrait — bottom left, dark-backed card */}
            <div className="absolute bottom-8 left-8 flex items-end gap-4">
              <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden w-28 shrink-0">
                <Image
                  src="/images/owner.png"
                  alt="Owner, Los Angeles Check Cashing"
                  width={112}
                  height={140}
                  className="object-cover object-top w-full"
                />
              </div>
              <div className="mb-1">
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">Founder</p>
                <p className="text-sm font-bold text-white leading-snug">Los Angeles<br />Check Cashing</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-1">Est. 2004</p>
              </div>
            </div>

            {/* Top-right stat */}
            <div className="absolute top-8 right-8 text-right">
              <p className="font-display text-5xl text-white/20 leading-none">20</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/30">Years in LA</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE (dark) ───────────────────────────────────────── */}
      <Marquee items={['3 Locations', 'Sherman Oaks', 'La Cienega', 'Canoga Park', 'Mon–Sat 9–6', 'Sun 10–4', 'Se Habla Español', 'Fast & Honest']} dark />

      {/* ─── LOCATIONS ────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="border-b border-[#D4D4D4] py-10 flex items-end justify-between">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#0A0A0A] leading-none">
              Find Us
            </h2>
            <Link href="/find-a-location/" className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-[#0C3B1E] border-b border-[#0C3B1E] pb-px hover:opacity-60 transition-opacity">
              Map View →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D4D4D4] border-b border-[#D4D4D4]">
            {locations.map((loc, i) => {
              const mapQuery = encodeURIComponent(`${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`)
              return (
                <div key={loc.slug} className="flex flex-col">
                  {/* Map embed */}
                  <div className="relative h-44 bg-[#E8EFE9] overflow-hidden border-b border-[#D4D4D4]">
                    <iframe
                      src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'grayscale(30%)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map — ${loc.name}`}
                    />
                  </div>

                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#0C3B1E] mb-2">
                        Location 0{i + 1}
                      </p>
                      <h3 className="font-display text-2xl text-[#0A0A0A] leading-tight mb-1">{loc.city}</h3>
                      <p className="text-sm text-[#6B7280]">{loc.address}, {loc.state} {loc.zip}</p>
                    </div>

                    <a
                      href={`tel:${loc.tel}`}
                      className="font-display text-3xl text-[#0C3B1E] hover:text-[#1A5C32] transition-colors leading-none"
                    >
                      {loc.phone}
                    </a>

                    <div className="flex gap-2 mt-auto pt-2">
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs font-bold tracking-widest uppercase py-3 border border-[#D4D4D4] hover:border-[#0C3B1E] hover:text-[#0C3B1E] transition-colors"
                      >
                        Directions
                      </a>
                      <Link
                        href={`/locations/${loc.slug}/`}
                        className="flex-1 text-center text-xs font-bold tracking-widest uppercase py-3 bg-[#0C3B1E] text-white hover:bg-[#1A5C32] transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── OFFER / COUPON ───────────────────────────────────────── */}
      <section className="bg-[#0C3B1E] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — copy */}
            <div className="py-16 md:py-20 lg:pr-20 lg:border-r border-white/10 flex flex-col justify-center">
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-8">
                First-Time Customer Offer
              </p>
              <p className="font-display text-[clamp(4rem,10vw,7rem)] text-white leading-none mb-6">
                50%<br />
                <em className="not-italic text-white/35">off.</em>
              </p>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-10">
                Your first check cashed at any of our three Los Angeles locations. No signup, no fine print. Just mention this page when you walk in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:2138002920"
                  className="inline-flex items-center justify-center bg-white text-[#0C3B1E] font-bold text-xs tracking-widest uppercase px-8 py-4 hover:bg-[#EEF4F0] transition-colors"
                >
                  Call (213) 800-2920
                </a>
                <Link
                  href="/locations/"
                  className="inline-flex items-center justify-center border border-white/25 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 hover:border-white/60 transition-colors"
                >
                  Find a Location
                </Link>
              </div>
              <p className="text-xs text-white/25 mt-6">Valid at all 3 LA locations. One per customer. Not combinable.</p>
            </div>

            {/* Right — coupon image */}
            <div className="hidden lg:flex items-center justify-center p-16 border-l border-white/10">
              <div className="relative">
                <Image
                  src={`${WP}/2023/01/coupon-01.png`}
                  alt="50% off your first check cashed"
                  width={380}
                  height={490}
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
                {/* Decorative corner marks */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/30" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-white/30" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-white/30" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG ─────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="border-b border-[#D4D4D4] py-10 flex items-end justify-between">
              <h2 className="font-display text-5xl md:text-6xl text-[#0A0A0A] leading-none">Resources</h2>
              <Link href="/blog/" className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-[#0C3B1E] border-b border-[#0C3B1E] pb-px hover:opacity-60 transition-opacity">
                All Articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D4D4D4] border-b border-[#D4D4D4]">
              {posts.map((post: any) => {
                const d = new Date(post.publishedAt)
                const href = `/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${post.slug?.current}/`
                return (
                  <Link key={post.slug?.current} href={href} className="group flex flex-col gap-4 p-8 hover:bg-[#F7F5F2] transition-colors">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[#6B7280]">
                      {d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="font-display text-2xl text-[#0A0A0A] leading-tight group-hover:text-[#0C3B1E] transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}
                    <p className="text-xs font-bold tracking-widest uppercase text-[#0C3B1E] mt-auto">Read →</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL PHOTO STRIP ────────────────────────────────────── */}
      <section className="relative h-52 md:h-72 overflow-hidden">
        <Image
          src="/images/la-palms.png"
          alt="Los Angeles palm trees"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0C3B1E]/65 flex flex-col items-center justify-center gap-4">
          <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">Los Angeles, California</p>
          <p className="font-display text-3xl md:text-5xl text-white italic text-center px-6 leading-tight">
            Serving LA since 2004.
          </p>
          <a
            href="tel:2138002920"
            className="mt-2 text-xs font-bold tracking-widest uppercase text-white/60 border-b border-white/30 pb-px hover:text-white hover:border-white transition-colors"
          >
            (213) 800-2920
          </a>
        </div>
      </section>

      {/* Mobile spacer for fixed bottom CTA */}
      <div className="md:hidden h-14" />
    </>
  )
}
