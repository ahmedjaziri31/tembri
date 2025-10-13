'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load LogoLoop (uses GSAP)
const LogoLoop = dynamic(() => import('./LogoLoop'), {
  loading: () => (
    <div className="w-full h-[200px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
  ssr: false,
})

export default LogoLoop as ComponentType<any>

