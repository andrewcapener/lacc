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

/** Human-readable date, also rendered in the site's home timezone. */
export function formatPostDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString('en-US', {
    timeZone: SITE_TZ,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
