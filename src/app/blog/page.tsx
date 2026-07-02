import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { sanityFetch } from '@/sanity/client'
import { getAllPostsQuery } from '@/sanity/queries'
import PostCard from '@/components/post-card'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Check Cashing Tips & Resources | Blog',
  description: 'Helpful articles about check cashing, currency exchange, money management, and financial tips in Los Angeles.',
  alternates: { canonical: 'https://www.losangelescheckcashing.com/blog/' },
}

export default async function BlogPage() {
  const posts = await sanityFetch<any[]>(getAllPostsQuery) || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Check Cashing Tips & Resources</h1>
      <p className="text-xl text-gray-600 mb-10">Helpful guides on managing your finances, understanding check cashing, and making the most of financial services in Los Angeles.</p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => <PostCard key={post.slug.current} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">No articles yet. Check back soon for financial tips and resources.</p>
          <a href="tel:2138002920" className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
            <Phone size={16} />
            Questions? Call (213) 800-2920
          </a>
        </div>
      )}
      <div className="md:hidden h-16" />
    </div>
  )
}
