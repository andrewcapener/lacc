/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/services', destination: '/our-services', permanent: true },
      { source: '/services/', destination: '/our-services/', permanent: true },
      { source: '/home-page', destination: '/', permanent: true },
      { source: '/home-page/', destination: '/', permanent: true },
      { source: '/forex', destination: '/money-exchange', permanent: true },
      { source: '/forex/', destination: '/money-exchange/', permanent: true },
      { source: '/category/uncategorized', destination: '/blog', permanent: true },
      { source: '/category/uncategorized/', destination: '/blog/', permanent: true },
    ]
  },
  images: {
    domains: ['cdn.sanity.io', 'www.losangelescheckcashing.com', 'i0.wp.com', 'i1.wp.com', 'i2.wp.com'],
  },
}
module.exports = nextConfig
