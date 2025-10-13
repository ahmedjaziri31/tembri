import type { NextConfig } from 'next'

// Bundle analyzer (install with: npm install --save-dev @next/bundle-analyzer)
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config: NextConfig) => config

const nextConfig: NextConfig = {
  /* Performance optimizations */
  
  // Enable experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled - requires 'critters' package
    optimizePackageImports: ['lucide-react', 'gsap', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
  },
  
  // Reduce JavaScript bundle size
  modularizeImports: {
    'gsap': {
      transform: 'gsap/{{ member }}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },

  // Optimize images and assets
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/webp', 'image/avif'], // Modern formats for better compression
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    
    // Allowed remote image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
    
    // Responsive image breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // SVG support with security
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Loader configuration for static export (if needed)
    // loader: 'default', // or 'custom', 'imgix', 'cloudinary', 'akamai'
  },

  // Compress responses
  compress: true,

  // Bundle analyzer (enable in development if needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },

  // Headers for better caching and performance
  async headers() {
    return [
      {
        // Cache static images for 1 year
        source: '/:all*.(webp|jpg|jpeg|png|gif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache home assets
        source: '/home/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Performance headers for all pages
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

// Apply bundle analyzer if enabled
export default withBundleAnalyzer(nextConfig)
