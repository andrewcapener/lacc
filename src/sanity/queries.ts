export const getAllPostsQuery = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage
}`

export const getPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  bodyHtml,
  categories
}`

export const getRecentPostsQuery = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [0...$count] {
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage
}`

export const getAllPostsForSitemapQuery = `*[_type == "post" && publishedAt <= now()] {
  slug,
  publishedAt
}`
