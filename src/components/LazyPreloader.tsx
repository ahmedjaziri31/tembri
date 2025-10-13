'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load Preloader (uses GSAP)
const Preloader = dynamic(() => import('./Preloader'), {
  ssr: false,
})

export default Preloader as ComponentType<any>

