'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set initial states - panels off screen
    gsap.set(topPanelRef.current, {
      y: '-100%'
    })
    gsap.set(bottomPanelRef.current, {
      y: '100%'
    })

    // Animation timeline
    const tl = gsap.timeline()

    // Step 1: Panels close to meet in center (0.8s)
    tl.to([topPanelRef.current, bottomPanelRef.current], {
      y: '0%',
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => {
        // Change preloader background to black when panels meet
        if (preloaderRef.current) {
          preloaderRef.current.style.backgroundColor = '#000000'
        }
      }
    })

    // Step 2: Keep panels closed briefly (0.5s)
    .to({}, { duration: 0.5 })

    // Step 3: Remove preloader instantly to reveal home page
    .call(() => {
      onComplete()
    })

    return () => {
      gsap.killTweensOf([
        topPanelRef.current,
        bottomPanelRef.current,
        preloaderRef.current
      ])
    }
  }, [onComplete])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-white overflow-hidden"
    >
      {/* Top Panel - slightly taller to ensure overlap */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full bg-black"
        style={{ 
          height: 'calc(50% + 2px)',
          transform: 'translateY(-100%)' 
        }}
      />

      {/* Bottom Panel - slightly taller to ensure overlap */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full bg-black"
        style={{ 
          height: 'calc(50% + 2px)',
          transform: 'translateY(100%)' 
        }}
      />
    </div>
  )
}
