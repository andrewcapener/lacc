import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/client'
import { getAllPostsQuery } from '@/sanity/queries'
import PostCard from '@/components/post-card'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Uncategorized | Blog | Los Angeles Check Cashing',
  description: 'Browse all check cashing articles and financial tips from Los Angeles Check Cashing.',
}

export default async function UncategorizedPage() {
  const posts = await sanityFetch<any[]>(getAllPostsQuery) || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <p className="text-sm text-gray-500 mb-2">
        <Link href="/blog/" className="hover:underline">Blog</Link> / Category
      </p>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Uncategorized</h1>
      <p className="text-gray-600 mb-10">All articles from Los Angeles Check Cashing.</p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => <PostCard key={post.slug.current} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg">No articles in this category yet.</p>
          <Link href="/blog/" className="mt-4 inline-block font-semibold" style={{ color: '#1B5E20' }}>Back to Blog</Link>
        </div>
      )}
      <div className="md:hidden h-16" />
    </div>
  )
}
