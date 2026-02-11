'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function SocialMediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll animation hooks for all text elements
  const { ref: socialSubtitleRef, animationClass: socialSubtitleAnimation, isVisible: isSocialSubtitleVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.3
  })
  
  const { ref: socialTitleRef, animationClass: socialTitleAnimation, isVisible: isSocialTitleVisible } = useScrollAnimation<HTMLHeadingElement>({
    fadeInThreshold: 0.3  // Trigger when element is 70% down the viewport - later for better visibility
  })
  
  const { ref: socialDescRef, animationClass: socialDescAnimation, isVisible: isSocialDescVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.3
  })
  
  const { ref: socialIconsRef, animationClass: socialIconsAnimation, isVisible: isSocialIconsVisible } = useScrollAnimation<HTMLDivElement>({
    fadeInThreshold: 0.3
  })

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sectionTop = rect.top
        const sectionHeight = rect.height
        
        // Check if section is in viewport
        const isInView = sectionTop < windowHeight && sectionTop + sectionHeight > 0
        setIsVisible(isInView)
        
        // Calculate scroll progress within the section - faster response
        if (isInView) {
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.8 + sectionHeight)))
          setScrollY(scrollProgress)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getImageTransform = (side: 'left' | 'right', index: number) => {
    if (!isVisible) return 'translate(0, 0) rotate(0deg) scale(1)'
    
    const baseIntensity = scrollY * 250 // Much more dramatic movement to the sides
    const rotationIntensity = scrollY * 20 // Increased rotation effect
    const scaleEffect = 1 + (scrollY * 0.15) // More pronounced scale effect
    
    if (side === 'left') {
      const offsetY = (index % 2) * 15 // Slight stagger for visual interest
      return `translate(${-baseIntensity}px, ${offsetY}px) rotate(${-rotationIntensity}deg) scale(${scaleEffect})`
    } else {
      const offsetY = (index % 2) * -15 // Slight stagger for visual interest
      return `translate(${baseIntensity}px, ${offsetY}px) rotate(${rotationIntensity}deg) scale(${scaleEffect})`
    }
  }

  // Project images data
  const projectImages = [
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS under armourtablette paysage.webp', alt: 'Under Armour Campaign' },
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/mcdonalds.webp', alt: 'McDonald\'s Campaign' },
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Swiss Arabian tablette paysage.webp', alt: 'Swiss Arabian Campaign' },
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Eucerin tablette paysage.webp', alt: 'Estée Lauder Campaign' },
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS nivea tablette paysage.webp', alt: 'NIVEA + Eucerin Campaign' },
    { src: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/samsung tablette.webp', alt: 'Samsung Campaign' }
  ]

  return (
    <section id="social-media" ref={sectionRef} className="relative bg-black py-16 lg:py-24 overflow-hidden">
      <div className="relative h-[800px] lg:h-[900px] w-full">
        {/* Left Side Images */}
        <div className="absolute left-0 top-0 w-5/12 h-full flex flex-col justify-center -space-y-12 px-6">
          {projectImages.slice(0, 3).map((image, index) => (
            <div
              key={`left-${index}`}
              className="relative overflow-hidden rounded-2xl h-80 lg:h-96 transition-all duration-700 ease-out shadow-2xl"
              style={{ 
                transform: getImageTransform('left', index),
                zIndex: 18 - index // Reverse order so top image has highest z-index
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        {/* Right Side Images */}
        <div className="absolute right-0 top-0 w-5/12 h-full flex flex-col justify-center -space-y-12 px-6">
          {projectImages.slice(3, 6).map((image, index) => (
            <div
              key={`right-${index}`}
              className="relative overflow-hidden rounded-2xl h-80 lg:h-96 transition-all duration-700 ease-out shadow-2xl"
              style={{ 
                transform: getImageTransform('right', index),
                zIndex: 18 - index // Reverse order so top image has highest z-index
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        {/* Center Content - Lower z-index so images can overlay it */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white bg-black/70 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl max-w-lg mx-auto">
            <p 
              ref={socialSubtitleRef}
              className={`text-sm lg:text-base font-secondary font-light tracking-wider mb-4 text-[#ffe9c7] ${socialSubtitleAnimation}`}
              style={{ 
                opacity: isSocialSubtitleVisible ? 1 : 0,
                visibility: isSocialSubtitleVisible ? 'visible' : 'hidden'
              }}
            >
              FOLLOW ON
            </p>
            <h2 
              ref={socialTitleRef}
              className={`text-2xl lg:text-3xl xl:text-4xl font-heading font-bold mb-8 ${socialTitleAnimation}`}
              style={{ 
                opacity: isSocialTitleVisible ? 1 : 0,
                visibility: isSocialTitleVisible ? 'visible' : 'hidden'
              }}
            >
              SOCIAL MEDIA
            </h2>
            <p 
              ref={socialDescRef}
              className={`text-gray-300 text-base lg:text-lg font-body font-light mb-8 ${socialDescAnimation}`}
              style={{ 
                opacity: isSocialDescVisible ? 1 : 0,
                visibility: isSocialDescVisible ? 'visible' : 'hidden'
              }}
            >
              Stay connected with our latest creative campaigns, behind-the-scenes content, and industry insights across all our platforms.
            </p>
            
            {/* Social Media Icons */}
            <div 
              ref={socialIconsRef}
              className={`flex justify-center space-x-6 ${socialIconsAnimation}`}
              style={{ 
                opacity: isSocialIconsVisible ? 1 : 0,
                visibility: isSocialIconsVisible ? 'visible' : 'hidden'
              }}
            >
              <a 
                href="https://linkedin.com/company/maison-elaris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/maiisonelaris/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a4.83 4.83 0 0 0-1.744 1.135A4.83 4.83 0 0 0 .42 5.238c-.198.48-.333 1.036-.372 1.866C.01 7.93 0 8.396 0 12.017s.01 4.086.048 4.914c.04.83.174 1.385.372 1.866.196.636.51 1.208 1.135 1.744s1.108.94 1.744 1.135c.48.198 1.036.333 1.866.372.828.04 1.294.048 4.913.048s4.086-.01 4.914-.048c.83-.04 1.385-.174 1.866-.372a4.83 4.83 0 0 0 1.744-1.135 4.83 4.83 0 0 0 1.135-1.744c.198-.48.333-1.036.372-1.866.04-.828.048-1.294.048-4.913s-.01-4.086-.048-4.914c-.04-.83-.174-1.385-.372-1.866a4.83 4.83 0 0 0-1.135-1.744A4.83 4.83 0 0 0 18.238.42c-.48-.198-1.036-.333-1.866-.372C15.544.01 15.076 0 12.017 0zm0 2.16c3.628 0 4.058.01 5.486.048.864.04 1.334.185 1.648.307.414.16.71.354 1.02.664.31.31.504.606.664 1.02.122.314.267.784.307 1.648.04 1.428.048 1.858.048 5.486s-.01 4.058-.048 5.486c-.04.864-.185 1.334-.307 1.648-.16.414-.354.71-.664 1.02-.31.31-.606.504-1.02.664-.314.122-.784.267-1.648.307-1.428.04-1.858.048-5.486.048s-4.058-.01-5.486-.048c-.864-.04-1.334-.185-1.648-.307a2.668 2.668 0 0 1-1.02-.664 2.668 2.668 0 0 1-.664-1.02c-.122-.314-.267-.784-.307-1.648-.04-1.428-.048-1.858-.048-5.486s.01-4.058.048-5.486c.04-.864.185-1.334.307-1.648.16-.414.354-.71.664-1.02.31-.31.606-.504 1.02-.664.314-.122.784-.267 1.648-.307 1.428-.04 1.858-.048 5.486-.048z"/>
                  <path d="M12.017 15.93a3.913 3.913 0 1 1 0-7.826 3.913 3.913 0 0 1 0 7.826zm0-9.958a6.045 6.045 0 1 0 0 12.09 6.045 6.045 0 0 0 0-12.09zm10.675 6.045a1.42 1.42 0 1 1-2.84 0 1.42 1.42 0 0 1 2.84 0z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/maisonelaris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
