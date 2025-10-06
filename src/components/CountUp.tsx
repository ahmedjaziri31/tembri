'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  trigger?: boolean
}

export default function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  trigger = false
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!numberRef.current || hasAnimated || !trigger) return

    const obj = { value: 0 }
    
    gsap.to(obj, {
      value: end,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberRef.current) {
          const displayValue = obj.value.toFixed(decimals)
          numberRef.current.textContent = `${prefix}${displayValue}${suffix}`
        }
      },
      onComplete: () => {
        setHasAnimated(true)
      }
    })
  }, [end, duration, prefix, suffix, decimals, trigger, hasAnimated])

  return (
    <span ref={numberRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

