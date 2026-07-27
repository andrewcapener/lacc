import Link from 'next/link'
import { Service } from '@/lib/services'
import { serviceHref } from '@/lib/service-content'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="border-t border-[#D4D4D4] pt-6 pb-6">
      <p className="text-xs font-bold tracking-widest uppercase text-[#0C3B1E] mb-3">{service.title}</p>
      <p className="text-sm text-[#6B7280] leading-relaxed">{service.description}</p>
      <Link href={serviceHref(service.id)} className="text-xs font-bold tracking-widest uppercase mt-3 inline-block hover:underline" style={{ color: '#1B5E20' }}>
        Learn More &rarr;
      </Link>
    </div>
  )
}
