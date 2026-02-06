/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force trailing slash consistency
  trailingSlash: false,

  // Redirect non-www to www (canonical URL)
  async redirects() {
    return [
      // Redirect non-www to www in production
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'dinnerdecisionmaker.com',
          },
        ],
        destination: 'https://www.dinnerdecisionmaker.com/:path*',
        permanent: true,
      },
    ]
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
