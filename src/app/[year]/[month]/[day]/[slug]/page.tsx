import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { getPostBySlugQuery } from '@/sanity/queries'
import { postPath, formatPostDate, postDescription } from '@/lib/post-url'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.losangelescheckcashing.com'

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
    description: postDescription(post),
    alternates: {
      // Always the post's own canonical path, never the requested one -- otherwise
      // every date permutation self-canonicalizes into a duplicate.
      canonical: BASE_URL + postPath(post.slug.current, post.publishedAt),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await sanityFetch<any>(getPostBySlugQuery, { slug: params.slug })
  if (!post) notFound()

  // The lookup is by slug alone, so any date path would otherwise serve this post
  // at 200 and self-canonicalize -- an unbounded duplicate URL space. Send every
  // non-canonical date to the real one with a 301 so signals consolidate.
  const canonicalPath = postPath(post.slug.current, post.publishedAt)
  const requestedPath = `/${params.year}/${params.month}/${params.day}/${params.slug}/`
  if (requestedPath !== canonicalPath) permanentRedirect(canonicalPath)

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "description": post.excerpt || '',
    "url": BASE_URL + canonicalPath,
    "publisher": {
      "@type": "Organization",
      "name": "Los Angeles Check Cashing",
      "url": "https://www.losangelescheckcashing.com"
    }
  }

  const formattedDate = formatPostDate(post.publishedAt)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-500">{formattedDate}</time>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-8">{post.title}</h1>
        {post.body ? (
          <div className="prose prose-gray max-w-none leading-relaxed">
            <PortableText value={post.body} />
          </div>
        ) : post.bodyHtml ? (
          <div
            className="prose prose-gray max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        ) : null}
      </article>
      <div className="md:hidden h-16" />
    </>
  )
}
