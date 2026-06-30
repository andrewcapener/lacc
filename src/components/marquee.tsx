export default function Marquee({ items, dark = false }: { items: string[], dark?: boolean }) {
  const repeated = [...items, ...items]
  return (
    <div className={`overflow-hidden border-y ${dark ? 'border-white/10 bg-[#0A0A0A]' : 'border-[#D4D4D4] bg-[#F7F5F2]'}`}>
      <div className="marquee-track py-4">
        {repeated.map((item, i) => (
          <span key={i} className={`flex items-center gap-6 px-6 text-xs font-bold tracking-widest uppercase whitespace-nowrap ${dark ? 'text-white/30' : 'text-[#6B7280]'}`}>
            {item}
            <span className={`w-1 h-1 inline-block ${dark ? 'bg-white/20' : 'bg-[#0C3B1E]'}`} style={{ borderRadius: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
