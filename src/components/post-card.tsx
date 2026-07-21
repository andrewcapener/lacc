import Link from 'next/link'
import { postPath, formatPostDate } from '@/lib/post-url'

interface PostCardProps {
  post: {
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt?: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  const href = postPath(post.slug.current, post.publishedAt)
  return (
    <article className="border border-gray-200 p-6 rounded-lg hover:border-green-700 transition-colors">
      <time className="text-sm text-gray-500">{formatPostDate(post.publishedAt)}</time>
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
