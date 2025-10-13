/**
 * Image Optimization Utilities for Next.js
 * Provides helpers for better image loading performance
 */

// Generate blur placeholder for images
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a1a" offset="20%" />
      <stop stop-color="#2d2d2d" offset="50%" />
      <stop stop-color="#1a1a1a" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a1a" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

// Generate blur data URL for placeholder
export const getBlurDataURL = (w: number = 700, h: number = 475) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
}

// Image sizes for responsive loading
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  hero: { width: 1920, height: 1080 },
  fullscreen: { width: 2560, height: 1440 },
}

// Responsive sizes string for different breakpoints
export const responsiveSizes = {
  full: '100vw',
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw',
  half: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw',
  third: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quarter: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  logo: '(max-width: 640px) 120px, (max-width: 1024px) 150px, 200px',
}

// Priority images - should be loaded immediately
export const priorityImages = [
  '/logo.webp',
  '/home/logo2.webp',
  // Add your hero/above-fold images here
]

// Image quality settings
export const imageQuality = {
  thumbnail: 60,
  standard: 75,
  high: 85,
  maximum: 95,
}

// Preload critical images
export const preloadImage = (src: string, priority: 'high' | 'low' = 'high') => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.fetchPriority = priority
    document.head.appendChild(link)
  }
}

// Check if image should use priority loading
export const shouldUsePriority = (src: string) => {
  return priorityImages.some(img => src.includes(img))
}

