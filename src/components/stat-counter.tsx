'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function StatCounter({ end, suffix = '', prefix = '', label, duration = 1800 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    const steps = 60
    const increment = end / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [visible, end, duration])

  const display = end >= 1000000
    ? (count >= 1000000 ? `${Math.floor(count / 1000000)}M` : '0')
    : count.toLocaleString()

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <p className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-white tabular-nums">
        {prefix}{display}{suffix}
      </p>
      <p className="font-mono text-[10px] tracking-widest uppercase text-white/30">{label}</p>
    </div>
  )
}
