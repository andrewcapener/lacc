import { NextRequest, NextResponse } from 'next/server'
import { getKeywordOpportunities } from '@/lib/search-console'
import { generatePost } from '@/lib/content-generator'
import { createClient } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'juerato0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const defaultSchema = Schema.compile({
  name: 'default',
  types: [{ type: 'object', name: 'post', fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }] }] }],
})
const blockContentType = defaultSchema.get('post').fields.find((f: any) => f.name === 'body').type

function htmlToPortableText(html: string) {
  if (!html?.trim()) return []
  const dom = new JSDOM('')
  try {
    return htmlToBlocks(html, blockContentType, {
      parseHtml: (h: string) => new dom.window.DOMParser().parseFromString(h, 'text/html'),
    })
  } catch { return [] }
}

export async function GET(req: NextRequest) {
  // Verify this is a legitimate Vercel cron call
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[LACC Cron] Starting SEO post generation...')

    // 1. Get keyword opportunities from Search Console
    const opportunities = await getKeywordOpportunities()
    if (opportunities.length === 0) {
      return NextResponse.json({ message: 'No keyword opportunities found' })
    }
    console.log(`[LACC Cron] Found ${opportunities.length} keyword opportunities`)

    // 2. Pick top 2 we haven't written about yet
    const existingSlugs = await sanity.fetch<string[]>(`*[_type == "post"].slug.current`)
    const fresh = opportunities.filter(o => {
      const slug = o.query.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return !existingSlugs.some(s => s.includes(slug.slice(0, 20)))
    })

    const targets = fresh.slice(0, 2)
    console.log(`[LACC Cron] Targeting: ${targets.map(t => t.query).join(', ')}`)

    // 3. Generate posts with Claude
    const results = []
    for (let i = 0; i < targets.length; i++) {
      const opportunity = targets[i]
      console.log(`[LACC Cron] Generating post for: "${opportunity.query}"`)

      const post = await generatePost(opportunity)

      // Stagger publish dates — 1st post today, 2nd post in 2 weeks
      const publishDate = new Date()
      publishDate.setDate(publishDate.getDate() + i * 14)

      const doc = {
        _type: 'post',
        _id: `auto-${Date.now()}-${i}`,
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        publishedAt: publishDate.toISOString(),
        excerpt: post.excerpt,
        body: htmlToPortableText(post.bodyHtml),
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
