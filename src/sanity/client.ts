const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'juerato0'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const isConfigured = true

let _client: any = null

async function getClient() {
  if (!isConfigured) return null
  if (_client) return _client
  const { createClient } = await import('@sanity/client')
  _client = createClient({
    projectId: projectId!,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    perspective: 'published',
  })
  return _client
}

export async function urlFor(source: any): Promise<string> {
  if (!isConfigured) return ''
  const c = await getClient()
  if (!c) return ''
  const { default: imageUrlBuilder } = await import('@sanity/image-url')
  return imageUrlBuilder(c).image(source).url()
}

export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T | null> {
  if (!isConfigured) return null
  try {
    const c = await getClient()
    if (!c) return null
    return await c.fetch(query, params || {}) as T
  } catch {
    return null
  }
}
