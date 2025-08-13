import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  // Configure for production
  output: 'standalone',

  // Optimize images and assets
  images: {
    unoptimized: true,
  },
}

export default nextConfig
