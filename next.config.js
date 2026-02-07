/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force trailing slash consistency
  trailingSlash: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },


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
