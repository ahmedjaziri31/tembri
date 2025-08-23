import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Performance optimizations */
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },

  // Optimize images and assets
  images: {
    unoptimized: false, // Enable Vercel's image optimization
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Compress responses
  compress: true,

  // Optimize fonts
  optimizeFonts: true,

  // Bundle analyzer (enable in development if needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/home/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
}

export default nextConfig
