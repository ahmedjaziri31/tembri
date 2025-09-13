'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap, ScrollTrigger, gsapUtils, animations } from '../lib/gsap'

interface UseGSAPOptions {
  dependencies?: React.DependencyList
  revert?: boolean
}

export function useGSAP(
  callback: (context: { gsap: typeof gsap; utils: typeof gsapUtils; animations: typeof animations }) => void | (() => void),
  options: UseGSAPOptions = {}
) {
  const { dependencies = [], revert = true } = options

  useEffect(() => {
    let cleanup: (() => void) | void

    if (typeof window !== 'undefined') {
      cleanup = callback({ gsap, utils: gsapUtils, animations })
    }

    return () => {
      if (revert && cleanup && typeof cleanup === 'function') {
        cleanup()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export function useGSAPTimeline(dependencies: React.DependencyList = []) {
  const timelineRef = useRef<GSAPTimeline | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      timelineRef.current = gsap.timeline()
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return timelineRef.current
}

export function useGSAPSelector<T extends HTMLElement = HTMLElement>(): [RefObject<T | null>, (selector: string) => HTMLElement | null] {
  const ref = useRef<T | null>(null)

  const getElement = (selector: string) => {
    if (!ref.current) return null
    return ref.current.querySelector(selector) as HTMLElement | null
  }

  return [ref, getElement]
}

export function useScrollTrigger(
  element: RefObject<HTMLElement | null>,
  animation: {
    enter?: gsap.TweenVars;
    leave?: gsap.TweenVars;
    enterBack?: gsap.TweenVars;
    leaveBack?: gsap.TweenVars;
  },
  options: ScrollTrigger.Vars = {}
) {
  useEffect(() => {
    if (!element.current || typeof window === 'undefined') return

    const trigger = ScrollTrigger.create({
      trigger: element.current,
      start: "top 80%",
      end: "bottom 20%",
      ...options,
      onEnter: () => {
        if (animation.enter) {
          gsap.to(element.current, animation.enter)
        }
      },
      onLeave: () => {
        if (animation.leave) {
          gsap.to(element.current, animation.leave)
        }
      },
      onEnterBack: () => {
        if (animation.enterBack) {
          gsap.to(element.current, animation.enterBack)
        }
      },
      onLeaveBack: () => {
        if (animation.leaveBack) {
          gsap.to(element.current, animation.leaveBack)
        }
      }
    })

    return () => trigger.kill()
  }, [element, animation, options])
}

export function useParallax(element: RefObject<HTMLElement | null>, options: {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  scrollTrigger?: ScrollTrigger.Vars;
} = {}) {
  useEffect(() => {
    if (!element.current || typeof window === 'undefined') return

    const { speed = 1, direction = 'vertical' } = options

    const animation = gsap.to(element.current, {
      [direction === 'vertical' ? 'yPercent' : 'xPercent']: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        ...options.scrollTrigger
      }
    })

    return () => {
      animation.kill()
    }
  }, [element, options])
}

export function useMagneticEffect<T extends HTMLElement>(element: RefObject<T | null>, intensity: number = 0.3) {
  useEffect(() => {
    if (!element.current) return

    const el = element.current
    let cleanup: (() => void) | undefined

    if (typeof window !== 'undefined') {
      cleanup = gsapUtils.magneticEffect(el)
    }

    return cleanup
  }, [element, intensity])
}

export function useStaggerAnimation<T extends HTMLElement>(
  elements: RefObject<T | null>,
  selector: string,
  animation: {
    from?: gsap.TweenVars;
    to: gsap.TweenVars;
    stagger?: number;
    duration?: number;
    ease?: string;
  },
  trigger: RefObject<HTMLElement | null> | null = null
) {
  useEffect(() => {
    if (!elements.current || typeof window === 'undefined') return

    const items = elements.current.querySelectorAll(selector)
    if (!items.length) return

    gsap.set(items, animation.from || { opacity: 0, y: 50 })

    const triggerElement = trigger?.current || elements.current

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => {
        gsap.to(items, {
          ...animation.to,
          stagger: animation.stagger || 0.1,
          duration: animation.duration || 1,
          ease: animation.ease || "power2.out"
        })
      }
    })

    return () => scrollTrigger.kill()
  }, [elements, selector, animation, trigger])
}

// Hook for text animations
export function useTextAnimation<T extends HTMLElement>(element: RefObject<T | null>, type: 'chars' | 'words' = 'chars') {
  useEffect(() => {
    if (!element.current || typeof window === 'undefined') return

    const chars = type === 'chars' 
      ? gsapUtils.splitText(element.current)
      : gsapUtils.splitWords(element.current)

    gsap.set(chars, { opacity: 0, y: 50, rotationX: -90 })

    const scrollTrigger = ScrollTrigger.create({
      trigger: element.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.05,
          ease: "back.out(1.7)"
        })
      }
    })

    return () => scrollTrigger.kill()
  }, [element, type])
}

export default useGSAP
