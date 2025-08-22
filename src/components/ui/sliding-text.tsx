'use client'

import { cn } from '../../lib/utils'

interface SlidingTextProps {
  texts: string[]
  className?: string
  duration?: number
}

export function SlidingText({ 
  texts, 
  className, 
  duration = 30 
}: SlidingTextProps) {
  return (
    <div className="w-full overflow-hidden relative py-8">
      {/* First sliding row */}
      <div
        className={cn(
          "flex whitespace-nowrap animate-slide-left",
          className
        )}
        style={{ 
          '--duration': `${duration}s`
        } as React.CSSProperties}
      >
        {/* Repeat texts multiple times for seamless loop */}
        {Array.from({ length: 6 }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex shrink-0">
            {texts.map((text, textIndex) => (
              <div
                key={`${repeatIndex}-${textIndex}`}
                className={cn(
                  "font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]",
                  "mr-12 sm:mr-16 lg:mr-20 xl:mr-24",
                  "opacity-80 hover:opacity-100 transition-opacity duration-500"
                )}
                style={{
                  textShadow: '0 0 80px rgba(16, 185, 129, 0.4), 0 0 40px rgba(255, 255, 255, 0.1)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a3f3a3 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {text.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Second sliding row (opposite direction for visual interest) */}
      <div
        className={cn(
          "flex whitespace-nowrap animate-slide-left mt-4 lg:mt-8",
          className
        )}
        style={{ 
          '--duration': `${duration + 10}s`,
          animationDirection: 'reverse'
        } as React.CSSProperties}
      >
        {Array.from({ length: 6 }).map((_, repeatIndex) => (
          <div key={`second-${repeatIndex}`} className="flex shrink-0">
            {texts.map((text, textIndex) => (
              <div
                key={`second-${repeatIndex}-${textIndex}`}
                className={cn(
                  "font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]",
                  "mr-12 sm:mr-16 lg:mr-20 xl:mr-24",
                  "opacity-60 hover:opacity-80 transition-opacity duration-500"
                )}
                style={{
                  textShadow: '0 0 60px rgba(16, 185, 129, 0.3), 0 0 30px rgba(255, 255, 255, 0.05)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                  background: 'linear-gradient(135deg, #ffffff40 0%, #a3f3a340 50%, #ffffff40 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {text.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
