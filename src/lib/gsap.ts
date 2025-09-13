import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom easing functions
export const customEase = {
  smooth: "power2.out",
  elastic: "elastic.out(1, 0.3)",
  bounce: "bounce.out",
  back: "back.out(1.7)",
  expo: "expo.out",
  circ: "circ.out"
}

// Animation presets
export const animations = {
  // Hero animations
  heroEntry: {
    duration: 1.5,
    ease: customEase.expo,
    stagger: 0.2
  },
  
  // Logo animations
  logoFloat: {
    duration: 3,
    ease: customEase.smooth,
    repeat: -1,
    yoyo: true
  },
  
  // Text reveals
  textReveal: {
    duration: 1.2,
    ease: customEase.back,
    stagger: 0.1
  },
  
  // Card animations
  cardHover: {
    duration: 0.4,
    ease: customEase.back,
    scale: 1.05,
    rotationY: 10,
    z: 50
  },
  
  // Project stagger
  projectStagger: {
    duration: 1,
    ease: customEase.expo,
    stagger: 0.15,
    scale: 1,
    opacity: 1
  },
  
  // Parallax scroll
  parallax: {
    ease: "none",
    scrollTrigger: {
      scrub: true
    }
  }
}

// Utility functions
export const gsapUtils = {
  // Split text into characters for animation
  splitText: (element: HTMLElement) => {
    const text = element.textContent || ''
    element.innerHTML = ''
    
    return text.split('').map((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.classList.add('char')
      element.appendChild(span)
      return span
    })
  },

  // Split text into words for animation
  splitWords: (element: HTMLElement) => {
    const text = element.textContent || ''
    element.innerHTML = ''
    
    return text.split(' ').map((word) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      span.style.marginRight = '0.25em'
      span.classList.add('word')
      element.appendChild(span)
      return span
    })
  },

  // Create timeline with default settings
  createTimeline: (config = {}) => {
    return gsap.timeline({
      defaults: {
        duration: 1,
        ease: customEase.smooth
      },
      ...config
    })
  },

  // Set initial states for elements
  setInitialState: (elements: gsap.TweenTarget, props: gsap.TweenVars) => {
    gsap.set(elements, props)
  },

  // Animate elements with ScrollTrigger
  animateOnScroll: (element: gsap.TweenTarget, animation: {from?: gsap.TweenVars, to: gsap.TweenVars}, triggerConfig = {}) => {
    return gsap.fromTo(element, 
      animation.from || { opacity: 0, y: 50 },
      {
        ...animation.to,
        scrollTrigger: {
          trigger: element as gsap.DOMTarget,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          ...triggerConfig
        }
      }
    )
  },

  // Create staggered entrance animation
  staggerIn: (elements: gsap.TweenTarget, config = {}) => {
    const defaultConfig = {
      opacity: 0,
      y: 60,
      rotationX: -15,
      duration: 1.2,
      ease: customEase.expo,
      stagger: 0.15
    }
    
    gsap.fromTo(elements, 
      { opacity: 0, y: 60, rotationX: -15 },
      { ...defaultConfig, ...config }
    )
  },

  // Create magnetic effect for buttons
  magneticEffect: (element: HTMLElement) => {
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.3,
        ease: customEase.back
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: customEase.back
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: customEase.smooth
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
    }
  },

  // Create infinite loop animation
  infiniteLoop: (element: gsap.TweenTarget, config = {}) => {
    const defaultConfig = {
      rotation: 360,
      duration: 10,
      ease: "none",
      repeat: -1
    }
    
    return gsap.to(element, { ...defaultConfig, ...config })
  },

  // Refresh ScrollTrigger
  refresh: () => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh()
    }
  },

  // Kill all animations
  killAll: () => {
    gsap.killTweensOf("*")
    if (typeof window !== 'undefined') {
      ScrollTrigger.killAll()
    }
  }
}

export { gsap, ScrollTrigger }
export default gsapUtils
