import Link from 'next/link'

// Contextual internal links for blog posts: match the article's text against
// service keywords so every one of the 250+ posts funnels authority to the
// money pages it's actually about.
const RULES: { pattern: RegExp; title: string; href: string }[] = [
  { pattern: /check.{0,3}cash|cash.{0,3}(a|your|my).{0,3}check|payroll check|government check/i, title: 'Check Cashing', href: '/services/check-cashing/' },
  { pattern: /currency|exchange rate|foreign|peso|euro|yen|pound/i, title: 'Currency Exchange', href: '/money-exchange/' },
  { pattern: /moneygram|money transfer|send money|wire/i, title: 'MoneyGram Money Transfers', href: '/services/moneygram-money-transfers/' },
  { pattern: /money order/i, title: 'Money Orders', href: '/services/money-orders/' },
  { pattern: /notar/i, title: 'Notary Services', href: '/services/notary-services/' },
  { pattern: /prepaid|debit card/i, title: 'Prepaid Debit Cards', href: '/services/prepaid-cards/' },
]

function portableTextToPlain(body: unknown): string {
  if (!Array.isArray(body)) return ''
  return body
    .map((block: any) =>
      Array.isArray(block?.children)
        ? block.children.map((c: any) => c?.text || '').join(' ')
        : ''
    )
    .join(' ')
}

export default function RelatedLinks({ post }: { post: any }) {
  const text = [
    post?.title || '',
    post?.excerpt || '',
    post?.bodyHtml || '',
    portableTextToPlain(post?.body),
  ].join(' ')

  const matches = RULES.filter(r => r.pattern.test(text)).slice(0, 3)
  // Check cashing is the core business — a sensible default when nothing matches.
  const links = matches.length ? matches : [RULES[0]]

  return (
    <aside className="mt-12 p-6 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
      <h2 className="font-bold text-gray-900 mb-4">Related Services</h2>
      <ul className="space-y-2 mb-4">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="font-medium hover:underline" style={{ color: '#1B5E20' }}>
              {l.title} &rarr;
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600">
        Visit any of our three LA locations — no appointment needed.{' '}
        <Link href="/find-a-location/" className="font-medium hover:underline" style={{ color: '#1B5E20' }}>
          Find your nearest location &rarr;
        </Link>
      </p>
    </aside>
  )
}
