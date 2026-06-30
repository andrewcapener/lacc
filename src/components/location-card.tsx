import Link from 'next/link'
import { Location } from '@/lib/locations'

export default function LocationCard({ location, index, showMap = false }: {
  location: Location
  index?: number
  showMap?: boolean
}) {
  const mapQuery = encodeURIComponent(`${location.address}, ${location.city}, ${location.state} ${location.zip}`)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`
  const mapsUrl = `https://maps.google.com/maps?q=${mapQuery}`

  return (
    <div className="flex flex-col border border-[#D4D4D4] hover:border-[#0C3B1E] transition-colors">
      {showMap && (
        <div className="w-full h-48 bg-[#EEF4F0] overflow-hidden">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${location.name}`}
          />
        </div>
      )}
      <div className="p-7 flex flex-col gap-5 flex-1">
        {index !== undefined && (
          <p className="text-xs font-bold tracking-widest uppercase text-[#0C3B1E]">
            Location 0{index + 1}
          </p>
        )}
        <div>
          <h3 className="text-xl font-bold text-[#0A0A0A]">{location.name}</h3>
          <p className="text-sm text-[#6B7280] mt-1.5 leading-relaxed">
            {location.address}<br />
            {location.city}, {location.state} {location.zip}
          </p>
        </div>
        <a
          href={`tel:${location.tel}`}
          className="text-2xl font-bold text-[#0C3B1E] hover:text-[#1A5C32] transition-colors tracking-tight font-serif"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {location.phone}
        </a>
        <div className="flex gap-3 mt-auto pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-xs font-bold tracking-widest uppercase text-center border border-[#D4D4D4] px-3 py-3 hover:border-[#0C3B1E] hover:text-[#0C3B1E] transition-colors"
          >
            Get Directions
          </a>
          <Link
            href={`/locations/${location.slug}/`}
            className="flex-1 text-xs font-bold tracking-widest uppercase text-center bg-[#0C3B1E] text-white px-3 py-3 hover:bg-[#1A5C32] transition-colors"
          >
            Location Details
          </Link>
        </div>
      </div>
    </div>
  )
}
