'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function AboutSection() {
  // Scroll animation hooks for all text elements
  const { ref: aboutSubtitleRef, animationClass: aboutSubtitleAnimation, isVisible: isAboutSubtitleVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.3
  })
  
  const { ref: aboutTitleRef, animationClass: aboutTitleAnimation, isVisible: isAboutTitleVisible } = useScrollAnimation<HTMLHeadingElement>({
    fadeInThreshold: 0.3  // Trigger when element is 70% down the viewport - later for better visibility
  })
  
  const { ref: aboutDescRef, animationClass: aboutDescAnimation, isVisible: isAboutDescVisible } = useScrollAnimation<HTMLDivElement>({
    fadeInThreshold: 0.3
  })
  
  const { ref: aboutButtonRef, animationClass: aboutButtonAnimation, isVisible: isAboutButtonVisible } = useScrollAnimation<HTMLDivElement>({
    fadeInThreshold: 0.3
  })

  return (
    <section className="relative bg-black py-20 lg:py-28 overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0">
        {/* Left shape - rotated to match design */}
        <Image
          src="/home/shape.webp"
          alt=""
          width={600}
          height={600}
          className="absolute top-0 -left-40 opacity-50 filter brightness-150"
        />
        {/* Right shape */}
        <Image
          src="/shape.webp"
          alt=""
          width={700}
          height={700}
          className="absolute bottom-0 -right-50 rotate-12 opacity-60 filter brightness-150"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 shadow-2xl">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Subtitle */}
            <p 
              ref={aboutSubtitleRef}
              className={`text-[#336b62] text-sm lg:text-base font-secondary font-medium tracking-wider mb-6 uppercase ${aboutSubtitleAnimation}`}
              style={{ 
                opacity: isAboutSubtitleVisible ? 1 : 0,
                visibility: isAboutSubtitleVisible ? 'visible' : 'hidden'
              }}
            >
              About
            </p>
            
            {/* Main Heading */}
            <h2 
              ref={aboutTitleRef}
              className={`text-white text-3xl lg:text-4xl xl:text-5xl font-heading font-bold leading-tight mb-8 ${aboutTitleAnimation}`}
              style={{ 
                opacity: isAboutTitleVisible ? 1 : 0,
                visibility: isAboutTitleVisible ? 'visible' : 'hidden'
              }}
            >
              MAISON ELARIS
            </h2>
            
            {/* Description */}
            <div 
              ref={aboutDescRef}
              className={`text-gray-300 text-lg lg:text-xl font-body font-light leading-relaxed mb-12 max-w-4xl mx-auto space-y-4 ${aboutDescAnimation}`}
              style={{ 
                opacity: isAboutDescVisible ? 1 : 0,
                visibility: isAboutDescVisible ? 'visible' : 'hidden'
              }}
            >
              <p>
                We are Maison Elaris, where clarity meets craft, and ideas thrive through collaboration.
              </p>
              <p>
                Our borderless collective spans Europe, the Middle East, and Asia, keeping us close to cultures, talent, and trends that matter. From strategy spints in  Paris to  creative reviews across time zones, we work with agility and precision to deliver brilliance without compromise.
              </p>
            </div>
            
            {/* CTA Button */}
            <div 
              ref={aboutButtonRef}
              className={`flex justify-center ${aboutButtonAnimation}`}
              style={{ 
                opacity: isAboutButtonVisible ? 1 : 0,
                visibility: isAboutButtonVisible ? 'visible' : 'hidden'
              }}
            >
              <Link href="/about">
                <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-body font-medium text-lg">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
