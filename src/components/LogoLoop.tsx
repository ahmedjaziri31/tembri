'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import './LogoLoop.css'

interface Logo {
  src: string
  alt: string
  width?: number
  height?: number
}

interface LogoLoopProps {
  logos: Logo[]
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export default function LogoLoop({
  logos,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: LogoLoopProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    // Set CSS custom properties for animation
    scrollElement.style.setProperty('--scroll-speed', `${speed}s`)
    scrollElement.style.setProperty('--scroll-direction', direction === 'left' ? 'scroll-left' : 'scroll-right')
  }, [speed, direction])

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className={`logo-loop ${className}`}>
      <div 
        ref={scrollRef}
        className={`logo-loop__track ${pauseOnHover ? 'logo-loop__track--pause-on-hover' : ''}`}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="logo-loop__item"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 140}
              height={logo.height || 70}
              className="logo-loop__image"
              style={{ 
                width: 'auto', 
                height: '180px',
                maxWidth: '280px',
                objectFit: 'contain'
              }}
              sizes="(max-width: 768px) 120px, 160px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
