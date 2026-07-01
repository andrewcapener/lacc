export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getKeywordOpportunities } from '@/lib/search-console'
import { generatePost } from '@/lib/content-generator'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'juerato0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[LACC Cron] Starting SEO post generation...')

    const opportunities = await getKeywordOpportunities()
    if (opportunities.length === 0) {
      return NextResponse.json({ message: 'No keyword opportunities found' })
    }
    console.log(`[LACC Cron] Found ${opportunities.length} keyword opportunities`)

    const existingSlugs = await sanity.fetch<string[]>(`*[_type == "post"].slug.current`)
    const fresh = opportunities.filter(o => {
      const slug = o.query.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return !existingSlugs.some(s => s.includes(slug.slice(0, 20)))
    })

    const targets = fresh.slice(0, 2)
    console.log(`[LACC Cron] Targeting: ${targets.map(t => t.query).join(', ')}`)

    const results = []
    for (let i = 0; i < targets.length; i++) {
      const opportunity = targets[i]
      console.log(`[LACC Cron] Generating post for: "${opportunity.query}"`)

      const post = await generatePost(opportunity)

      const publishDate = new Date()
      publishDate.setDate(publishDate.getDate() + i * 14)

      const doc = {
        _type: 'post',
        _id: `auto-${Date.now()}-${i}`,
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        publishedAt: publishDate.toISOString(),
        excerpt: post.excerpt,
        bodyHtml: post.bodyHtml,
      }

      await sanity.createOrReplace(doc)
      console.log(`[LACC Cron] Published: "${post.title}"`)
      results.push({ title: post.title, slug: post.slug, keyword: post.keyword, publishDate: publishDate.toISOString() })
    }

    return NextResponse.json({
      success: true,
      postsGenerated: results.length,
      posts: results,
    })
  } catch (err: any) {
    console.error('[LACC Cron] Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
