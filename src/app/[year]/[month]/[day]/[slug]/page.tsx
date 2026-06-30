import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { getPostBySlugQuery } from '@/sanity/queries'

export const revalidate = 3600

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: { year: string; month: string; day: string; slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await sanityFetch<any>(getPostBySlugQuery, { slug: params.slug })
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt || '',
    alternates: {
      canonical: `https://www.losangelescheckcashing.com/${params.year}/${params.month}/${params.day}/${params.slug}/`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await sanityFetch<any>(getPostBySlugQuery, { slug: params.slug })
  if (!post) notFound()

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "description": post.excerpt || '',
    "url": `https://www.losangelescheckcashing.com/${params.year}/${params.month}/${params.day}/${params.slug}/`,
    "publisher": {
      "@type": "Organization",
      "name": "Los Angeles Check Cashing",
      "url": "https://www.losangelescheckcashing.com"
    }
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-500">{formattedDate}</time>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-8">{post.title}</h1>
        {post.body && (
          <div className="prose prose-gray max-w-none leading-relaxed">
            <PortableText value={post.body} />
          </div>
        )}
      </article>
      <div className="md:hidden h-16" />
    </>
  )
}
