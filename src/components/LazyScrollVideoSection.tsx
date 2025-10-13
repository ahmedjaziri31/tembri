'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load ScrollVideoSection (uses GSAP ScrollTrigger)
const ScrollVideoSection = dynamic(() => import('./ScrollVideoSection'), {
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse text-white">Loading Video Section...</div>
    </div>
  ),
  ssr: false, // Disable SSR for GSAP component
})

export default ScrollVideoSection as ComponentType<any>

