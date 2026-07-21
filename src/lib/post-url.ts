// Canonical post URLs.
//
// WordPress post dates were migrated by parsing "YYYY-MM-DD HH:MM:SS" with
// `new Date(...)`, which treats a bare datetime as LOCAL time. The migration ran
// in America/Los_Angeles, so every stored timestamp is the true Pacific publish
// time expressed in UTC. Rendering it back in Pacific reproduces the original
// WordPress URL exactly -- rendering it in UTC (Vercel's default) shifts any post
// published after 4pm PT forward by one day and orphans the ranked URL.
//
// Always build post paths through here. Never use getFullYear/getMonth/getDate,
// which resolve against the server timezone.
const SITE_TZ = 'America/Los_Angeles'

const partsFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: SITE_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Y/M/D of a timestamp as seen in the site's home timezone. */
export function postDateParts(publishedAt: string) {
  // en-CA formats as YYYY-MM-DD, so the parts come out already zero-padded.
  const [year, month, day] = partsFormatter.format(new Date(publishedAt)).split('-')
  return { year, month, day }
}

/** Canonical path for a post, e.g. /2020/08/19/check-cash-it/ */
export function postPath(slug: string, publishedAt: string) {
  const { year, month, day } = postDateParts(publishedAt)
  return `/${year}/${month}/${day}/${slug}/`
}

/** Canonical absolute URL for a post. */
export function postUrl(slug: string, publishedAt: string, baseUrl: string) {
  return baseUrl.replace(/\/$/, '') + postPath(slug, publishedAt)
}

function truncateAtWord(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:]+$/, '') + '…'
}

/**
 * A real meta description for a post. The WP migration fell back to using the
 * title as the excerpt whenever the source excerpt was empty, so most posts
 * carry a "description" that just repeats the title -- useless for search
 * snippets. When the excerpt is missing or is just the title, derive a
 * description from the post body instead.
 */
export function postDescription(
  post: { excerpt?: string; title?: string; body?: any[]; bodyHtml?: string },
  max = 155,
): string {
  const title = (post.title || '').trim()
  const excerpt = (post.excerpt || '').trim()
  if (excerpt && excerpt !== title) return truncateAtWord(excerpt, max)

  let text = ''
  if (Array.isArray(post.body)) {
    text = post.body
      .filter((b) => b?._type === 'block' && Array.isArray(b.children))
      .map((b) => b.children.map((c: any) => c?.text || '').join(''))
      .join(' ')
  }
  if (!text && post.bodyHtml) {
    text = post.bodyHtml.replace(/<[^>]+>/g, ' ')
  }
  text = text.replace(/\s+/g, ' ').trim()
  return truncateAtWord(text || excerpt || title, max)
}

/** Human-readable date, also rendered in the site's home timezone. */
export function formatPostDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString('en-US', {
    timeZone: SITE_TZ,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
