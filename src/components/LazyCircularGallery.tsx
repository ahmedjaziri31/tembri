'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load CircularGallery component (uses OGL - WebGL library)
const CircularGallery = dynamic(() => import('./CircularGallery'), {
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-black">
      <div className="animate-pulse text-white">Loading Gallery...</div>
    </div>
  ),
  ssr: false, // Disable SSR for WebGL component
})

export default CircularGallery as ComponentType<any>

