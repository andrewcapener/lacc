import { getGoogleAccessToken } from './google-auth'

const SITE_URL = 'sc-domain:losangelescheckcashing.com'
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'

export interface SearchQuery {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export async function getKeywordOpportunities(): Promise<SearchQuery[]> {
  const token = await getGoogleAccessToken([SCOPE])

  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 90)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ['query'],
        rowLimit: 500,
        orderBy: [{ fieldName: 'impressions', sortOrder: 'DESCENDING' }],
      }),
    }
  )

  if (!res.ok) throw new Error(`Search Console error (${res.status}): ${await res.text()}`)
  const json = await res.json() as { rows?: Array<{ keys: string[]; clicks: number; impressions: number; ctr: number; position: number }> }

  const rows = json.rows ?? []

  // Keyword opportunities: positions 5-30, decent impressions, low CTR
  // These are queries where we rank but aren't capturing clicks — perfect blog targets
  const opportunities = rows
    .map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Math.round(r.ctr * 1000) / 10,
      position: Math.round(r.position * 10) / 10,
    }))
    .filter(r =>
      r.position >= 5 &&
      r.position <= 30 &&
      r.impressions >= 50 &&
      r.query.length > 5 &&
      !r.query.includes('los angeles check cashing') // skip branded
    )
    .sort((a, b) => {
      // Score = impressions × (position penalty) — higher impressions + closer to rank 1 = better
      const scoreA = a.impressions * (1 / a.position)
      const scoreB = b.impressions * (1 / b.position)
      return scoreB - scoreA
    })

  return opportunities.slice(0, 20)
}
