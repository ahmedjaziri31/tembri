import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  // Optimize images and assets
  images: {
    unoptimized: false, // Enable Vercel's image optimization
  },
}

export default nextConfig
