'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollAnimationOptions {
  /** Threshold for when to start fade in animation (0-1, relative to viewport height) */
  fadeInThreshold?: number
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) {
  const {
    fadeInThreshold = 0.9  // Very early - trigger when element is only 10% down the viewport
  } = options

  const elementRef = useRef<T>(null)
  const [animationClass, setAnimationClass] = useState('')
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate if element is in viewport for fade in
      const elementTop = rect.top
      const elementBottom = rect.bottom
      
      // Element enters viewport from bottom - trigger very early
      const fadeInPoint = windowHeight * (1 - fadeInThreshold)
      const shouldFadeIn = elementTop <= fadeInPoint && elementBottom > 0
      
      // Only animate once
      if (shouldFadeIn && !hasAnimated) {
        setAnimationClass('animate__animated animate__fadeInDown animate__slow')
        setIsVisible(true)
        setHasAnimated(true)
        // Remove animation class after it completes to avoid conflicts
        setTimeout(() => setAnimationClass(''), 2000)
      }
      // Keep visible after animation
      else if (hasAnimated) {
        setIsVisible(true)
      }
      // Hide initially until animation triggers
      else {
        setIsVisible(false)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    // Initial call to set correct state
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [fadeInThreshold, hasAnimated])

  return {
    ref: elementRef,
    animationClass,
    isVisible
  }
}