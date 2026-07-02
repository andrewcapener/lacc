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

Return your response using ONLY these XML tags, nothing else before or after:
<title>Post title (60-70 chars, includes target keyword)</title>
<slug>url-friendly-slug</slug>
<excerpt>Meta description 150-160 chars</excerpt>
<body>Full HTML post body using h2, h3, p, ul, li tags</body>`

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
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip markdown code fences if present, then extract JSON
  // Extract fields individually — avoids JSON.parse failures from unescaped HTML in body
  const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/)
  const slugMatch = text.match(/<slug>([\s\S]*?)<\/slug>/)
  const excerptMatch = text.match(/<excerpt>([\s\S]*?)<\/excerpt>/)
  const bodyMatch = text.match(/<body>([\s\S]*?)<\/body>/)

  if (!titleMatch || !bodyMatch) throw new Error(`Could not extract fields from Claude response for "${opportunity.query}". Raw: ${text.slice(0, 300)}`)

  const title = titleMatch[1].trim()
  return {
    title,
    slug: slugMatch ? slugMatch[1].trim() : slugify(title),
    excerpt: excerptMatch ? excerptMatch[1].trim() : '',
    bodyHtml: bodyMatch[1].trim(),
    keyword: opportunity.query,
  }
}
