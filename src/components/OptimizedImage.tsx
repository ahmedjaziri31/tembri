'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { getBlurDataURL, shouldUsePriority, imageQuality } from '@/lib/image-optimization'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /**
   * Enable blur placeholder while loading
   * @default true
   */
  enableBlur?: boolean
  
  /**
   * Image quality (1-100)
   * @default 75
   */
  quality?: number
  
  /**
   * Show loading skeleton
   * @default false
   */
  showSkeleton?: boolean
}

/**
 * Optimized Image Component
 * 
 * Wrapper around Next.js Image with:
 * - Automatic blur placeholders
 * - Loading states
 * - Priority detection
 * - Quality optimization
 * 
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/hero.webp"
 *   alt="Hero Image"
 *   width={1920}
 *   height={1080}
 *   priority // For above-fold images
 * />
 * ```
 */
export default function OptimizedImage({
  src,
  alt,
  enableBlur = true,
  quality = imageQuality.standard,
  showSkeleton = false,
  priority,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Auto-detect if image should be priority
  const shouldBePriority = priority ?? shouldUsePriority(src as string)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width: props.width, height: props.height }}
      >
        <span className="text-gray-400 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{ width: props.width, height: props.height }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        quality={quality}
        priority={shouldBePriority}
        placeholder={enableBlur ? 'blur' : 'empty'}
        blurDataURL={enableBlur ? getBlurDataURL() : undefined}
        onLoad={handleLoadingComplete}
        onError={handleError}
        className={`
          ${className}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
        `}
        {...props}
      />
    </div>
  )
}

