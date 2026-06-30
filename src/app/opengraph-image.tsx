import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Los Angeles Check Cashing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0C3B1E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top: Est. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            Los Angeles, CA · Est. 2004
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'white', fontSize: '80px', lineHeight: 1, fontWeight: 400 }}>
            Los Angeles
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '80px', lineHeight: 1, fontWeight: 400 }}>
            Check Cashing
          </div>
        </div>

        {/* Bottom: locations + offer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            {['Sherman Oaks', 'La Cienega', 'Canoga Park'].map(loc => (
              <div key={loc} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{loc}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: 'white',
            color: '#0C3B1E',
            padding: '12px 24px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}>
            50% Off First Check
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
