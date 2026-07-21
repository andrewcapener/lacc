/**
 * WordPress → Sanity migration script
 * Usage: node scripts/migrate-wp.mjs
 *
 * Reads the WP XML export, converts posts to Sanity documents,
 * and uploads them via the Sanity mutations API.
 */

import { readFileSync } from 'fs'
import { createClient } from '@sanity/client'
import { XMLParser } from 'fast-xml-parser'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'

// ── Config ──────────────────────────────────────────────────────
const WP_XML = '/Users/andrewcapener/Dropbox/Los Angeles Check Cashing/-losangelescheckcashing.WordPress.2026-06-30.xml'
const PROJECT_ID = 'juerato0'
const DATASET = 'production'
const API_TOKEN = process.env.SANITY_API_TOKEN

if (!API_TOKEN) {
  console.error('❌  Set SANITY_API_TOKEN in your environment before running.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: API_TOKEN,
  useCdn: false,
})

// ── Sanity schema for block conversion ─────────────────────────
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }] }],
    },
  ],
})
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(f => f.name === 'body').type

// ── Parse XML ───────────────────────────────────────────────────
console.log('📖  Reading WordPress export...')
let raw = readFileSync(WP_XML, 'utf8')
// Strip PHP warnings before the XML declaration
raw = raw.slice(raw.indexOf('<?xml'))

const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
  parseTagValue: false,
  isArray: (name) => ['item', 'category'].includes(name),
})
const parsed = parser.parse(raw)
const items = parsed?.rss?.channel?.item ?? []

// ── Filter to published posts ───────────────────────────────────
const posts = items.filter(item => {
  const type = item['wp:post_type']?.__cdata ?? item['wp:post_type']
  const status = item['wp:status']?.__cdata ?? item['wp:status']
  return type === 'post' && status === 'publish'
})

console.log(`✅  Found ${posts.length} published posts\n`)

// ── Convert HTML → Portable Text ────────────────────────────────
function htmlToPortableText(html) {
  if (!html || html.trim() === '') return []
  try {
    const dom = new JSDOM('')
    return htmlToBlocks(html, blockContentType, {
      parseHtml: (h) => new dom.window.DOMParser().parseFromString(h, 'text/html'),
    })
  } catch {
    // Fallback: wrap as a single paragraph
    const clean = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    return clean ? [{ _type: 'block', _key: 'fallback', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text: clean, marks: [] }] }] : []
  }
}

// ── Build Sanity documents ───────────────────────────────────────
// Interpret a WordPress local datetime as Pacific and return a true UTC ISO
// string, independent of the machine running this script.
function wpDateToISO(dateStr) {
  const m = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/)
  if (!m) return new Date(dateStr).toISOString()
  const [, y, mo, d, h, mi, s] = m
  // Start from the naive instant read as UTC, then subtract Pacific's offset at
  // that moment (handles PST/PDT correctly across the whole archive).
  const naiveUTC = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s)
  const asPacific = new Date(naiveUTC).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  const offset = new Date(naiveUTC).getTime() - new Date(asPacific + ' UTC').getTime()
  return new Date(naiveUTC + offset).toISOString()
}

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

const docs = posts.map(post => {
  const title = post.title?.__cdata ?? post.title ?? 'Untitled'
  const rawSlug = post['wp:post_name']?.__cdata ?? post['wp:post_name'] ?? ''
  const slug = rawSlug || slugify(title)
  const dateStr = post['wp:post_date']?.__cdata ?? post['wp:post_date'] ?? ''
  // WP exports "YYYY-MM-DD HH:MM:SS" with no zone; these are America/Los_Angeles
  // wall-clock times. `new Date(str)` would read them in whatever zone this script
  // runs in, which silently shifts the post's date -- and therefore its URL.
  const publishedAt = dateStr ? wpDateToISO(dateStr) : new Date().toISOString()
  const htmlContent = post['content:encoded']?.__cdata ?? post['content:encoded'] ?? ''
  const excerpt = post['excerpt:encoded']?.__cdata ?? post['excerpt:encoded'] ?? ''

  const body = htmlToPortableText(htmlContent)

  return {
    _type: 'post',
    _id: `wp-post-${post['wp:post_id']?.__cdata ?? post['wp:post_id'] ?? slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    publishedAt,
    excerpt: excerpt.replace(/<[^>]+>/g, '').trim() || title,
    body,
  }
})

// ── Upload in batches ────────────────────────────────────────────
const BATCH = 20
let success = 0, failed = 0

console.log(`🚀  Uploading ${docs.length} posts to Sanity in batches of ${BATCH}...\n`)

for (let i = 0; i < docs.length; i += BATCH) {
  const batch = docs.slice(i, i + BATCH)
  const transaction = client.transaction()
  batch.forEach(doc => transaction.createOrReplace(doc))

  try {
    await transaction.commit()
    success += batch.length
    process.stdout.write(`   ${success}/${docs.length} uploaded...\r`)
  } catch (err) {
    console.error(`\n❌  Batch ${i / BATCH + 1} failed:`, err.message)
    failed += batch.length
  }
}

console.log(`\n\n✅  Done! ${success} posts imported, ${failed} failed.`)
console.log(`🔗  View at: https://juerato0.sanity.studio/`)
