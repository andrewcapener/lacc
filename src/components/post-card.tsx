import Link from 'next/link'

interface PostCardProps {
  post: {
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt?: string
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function postUrl(slug: string, publishedAt: string) {
  const d = new Date(publishedAt)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `/${y}/${m}/${day}/${slug}/`
}

export default function PostCard({ post }: PostCardProps) {
  const href = postUrl(post.slug.current, post.publishedAt)
  return (
    <article className="border border-gray-200 p-6 rounded-lg hover:border-green-700 transition-colors">
      <time className="text-sm text-gray-500">{formatDate(post.publishedAt)}</time>
      <h3 className="font-bold text-lg text-gray-900 mt-2 mb-2">
        <Link href={href} className="hover:text-green-800 transition-colors">{post.title}</Link>
      </h3>
      {post.excerpt && <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>}
      <Link href={href} className="text-sm font-semibold hover:opacity-80" style={{ color: '#1B5E20' }}>
        Read More &rarr;
      </Link>
    </article>
  )
}
