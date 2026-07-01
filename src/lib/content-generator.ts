import Anthropic from '@anthropic-ai/sdk'
import { SearchQuery } from './search-console'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a senior SEO content strategist and writer for Los Angeles Check Cashing, a trusted financial services business with three LA locations (Sherman Oaks, La Cienega, Canoga Park) that has been serving the community since 2004.

Your voice is:
- Authoritative but approachable — you know financial services inside out
- Local and specific — always grounded in Los Angeles, real neighborhoods, real situations
- Practical and direct — readers need real help, not fluff
- Empathetic — many customers are unbanked or underbanked; treat them with dignity
- Never condescending, never preachy

Writing rules:
- Every post must target a specific keyword naturally throughout
- H2 and H3 subheadings break up the content
- Include a clear intro, body with 4-6 sections, and a conclusion with a CTA to visit or call
- Mention at least one specific LA location naturally in the content
- Include the first-time customer offer (50% off first check cashed) where appropriate
- Phone number for calls: (213) 800-2920
- Word count: 800-1200 words
- Tone: confident, helpful, human — not AI-sounding

Return ONLY valid JSON in this exact format:
{
  "title": "Post title (60-70 chars, includes target keyword)",
  "slug": "url-friendly-slug-matching-title",
  "excerpt": "Meta description / excerpt (150-160 chars, includes keyword)",
  "body": "Full post body in HTML (use <h2>, <h3>, <p>, <ul>, <li> tags)"
}`

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export interface GeneratedPost {
  title: string
  slug: string
  excerpt: string
  bodyHtml: string
  keyword: string
}

export async function generatePost(opportunity: SearchQuery): Promise<GeneratedPost> {
  const prompt = `Write an SEO-optimized blog post for Los Angeles Check Cashing targeting this keyword opportunity:

Keyword: "${opportunity.query}"
Search impressions (last 90 days): ${opportunity.impressions}
Current average position: ${opportunity.position}
Current CTR: ${opportunity.ctr}%

This keyword gets significant impressions but we're not ranking well enough — a strong, focused post targeting this exact query will move us up.

Write the post now. Remember to naturally use the keyword and related terms throughout.`

  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip markdown code fences if present, then extract JSON
  const stripped = text.replace(/```(?:json)?\n?/g, '').trim()
  const jsonMatch = stripped.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error(`No JSON in Claude response for "${opportunity.query}". Raw: ${stripped.slice(0, 500)}`)

  const parsed = JSON.parse(jsonMatch[0])

  return {
    title: parsed.title,
    slug: parsed.slug || slugify(parsed.title),
    excerpt: parsed.excerpt,
    bodyHtml: parsed.body,
    keyword: opportunity.query,
  }
}
