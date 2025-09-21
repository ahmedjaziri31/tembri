'use client'

import { useRef } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function AboutPage() {
  // Refs for image animations
  const planetImageRef = useRef<HTMLDivElement>(null)
  const partnerImageRef = useRef<HTMLDivElement>(null)
  const planetTextRef = useRef<HTMLDivElement>(null)
  
  // Refs for text scroll animations
  const europeTextRef = useRef<HTMLDivElement>(null)
  const middleEastTextRef = useRef<HTMLDivElement>(null)
  const asiaTextRef = useRef<HTMLDivElement>(null)
  const textSectionRef = useRef<HTMLElement>(null)
  
  // Ref for 1 vision section
  const visionImageRef = useRef<HTMLDivElement>(null)
  const visionTextRef = useRef<HTMLDivElement>(null)
  
  // Ref for where minds unite section
  const mindsUniteImageRef = useRef<HTMLDivElement>(null)
  const mindsUniteTextRef = useRef<HTMLDivElement>(null)
  
  // Refs for designing impact section
  const designingTextRef = useRef<HTMLDivElement>(null)
  const impactTextRef = useRef<HTMLDivElement>(null)
  const designingImpactSectionRef = useRef<HTMLElement>(null)
  const designingImpactDescRef = useRef<HTMLDivElement>(null)
  
  // Refs for story section
  const storyLeftTextRef = useRef<HTMLDivElement>(null)
  const storyRightTextRef = useRef<HTMLDivElement>(null)
  const storyImage1Ref = useRef<HTMLDivElement>(null)
  const storyImage2Ref = useRef<HTMLDivElement>(null)
  const fleshArrowRef = useRef<HTMLDivElement>(null)
  
  // Refs for unlocking growth section
  const unlockingTitleRef = useRef<HTMLDivElement>(null)
  const growthCircleRef = useRef<HTMLDivElement>(null)
  const unlockingDescRef = useRef<HTMLDivElement>(null)

  // Casual floating animation for planet image
  useGSAP(() => {
    if (planetImageRef.current) {
      // Gentle floating animation for planet
      gsap.to(planetImageRef.current, {
        y: -8,
        rotation: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Subtle scale animation on hover for planet
      const handleMouseEnter = () => {
        gsap.to(planetImageRef.current, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      const handleMouseLeave = () => {
        gsap.to(planetImageRef.current, {
          scale: 1,
          rotation: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }

      // Add hover event listeners
      planetImageRef.current.addEventListener('mouseenter', handleMouseEnter)
      planetImageRef.current.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup function
      return () => {
        if (planetImageRef.current) {
          planetImageRef.current.removeEventListener('mouseenter', handleMouseEnter)
          planetImageRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, { dependencies: [] })

  // Simple animation for partner image
  useGSAP(() => {
    if (partnerImageRef.current) {
      // Gentle floating animation for partner
      gsap.to(partnerImageRef.current, {
        y: -5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5 // Slight delay to make it different from planet
      })
    }
  }, { dependencies: [] })

  // Scroll-triggered animation for planet text
  useGSAP(() => {
    if (planetTextRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial state - hidden
      gsap.set(planetTextRef.current, {
        opacity: 0,
        y: 30
      })

      // Animate when scrolling into view
      gsap.to(planetTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: planetTextRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, { dependencies: [] })

  // Horizontal scroll animation for text lines
  useGSAP(() => {
    if (europeTextRef.current && middleEastTextRef.current && asiaTextRef.current && textSectionRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial positions
      gsap.set(europeTextRef.current, { x: -400 })
      gsap.set(middleEastTextRef.current, { x: 400 })
      gsap.set(asiaTextRef.current, { x: -400 })

      // FROM EUROPE - Left to Right
      gsap.to(europeTextRef.current, {
        x: 400,
        ease: "none",
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      // MIDDLE EAST - Right to Left
      gsap.to(middleEastTextRef.current, {
        x: -400,
        ease: "none",
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: 1
        }
      })

      // TO ASIA - Left to Right
      gsap.to(asiaTextRef.current, {
        x: 400,
        ease: "none",
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: "top bottom",
          end: "bottom top", 
          scrub: 1
        }
      })
    }
  }, { dependencies: [] })

  // Animation for 1 Vision section
  useGSAP(() => {
    if (visionImageRef.current && visionTextRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial states
      gsap.set(visionImageRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30
      })

      gsap.set(visionTextRef.current, {
        opacity: 0,
        y: 20
      })

      // Animate image when scrolling into view
      gsap.to(visionImageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: visionImageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate text after image
      gsap.to(visionTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: visionImageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, { dependencies: [] })

  // Animation for Where Minds Unite section
  useGSAP(() => {
    if (mindsUniteImageRef.current && mindsUniteTextRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial states
      gsap.set(mindsUniteImageRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20
      })

      gsap.set(mindsUniteTextRef.current, {
        opacity: 0,
        y: 30
      })

      // Animate image when scrolling into view
      gsap.to(mindsUniteImageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mindsUniteImageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      // Animate text after image
      gsap.to(mindsUniteTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: mindsUniteImageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, { dependencies: [] })

  // Horizontal scroll animation for designing impact text
  useGSAP(() => {
    if (designingTextRef.current && impactTextRef.current && designingImpactSectionRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial positions
      gsap.set(designingTextRef.current, { x: -300 })
      gsap.set(impactTextRef.current, { x: 300 })

      // DESIGNING - Left to Right
      gsap.to(designingTextRef.current, {
        x: 300,
        ease: "none",
        scrollTrigger: {
          trigger: designingImpactSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      // IMPACT - Right to Left
      gsap.to(impactTextRef.current, {
        x: -300,
        ease: "none",
        scrollTrigger: {
          trigger: designingImpactSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

      // Animate description text when scrolling into view
      gsap.set(designingImpactDescRef.current, {
        opacity: 0,
        y: 30
      })

      gsap.to(designingImpactDescRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: designingImpactDescRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, { dependencies: [] })

  // Animation for Story section
  useGSAP(() => {
    if (storyLeftTextRef.current && storyRightTextRef.current && storyImage1Ref.current && storyImage2Ref.current && fleshArrowRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial states
      gsap.set([storyLeftTextRef.current, storyRightTextRef.current], {
        opacity: 0,
        y: 30
      })

      gsap.set([storyImage1Ref.current, storyImage2Ref.current], {
        opacity: 0,
        scale: 0.9,
        y: 20
      })

      gsap.set(fleshArrowRef.current, {
        opacity: 0,
        scale: 0.8
      })

      // Animate elements when scrolling into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyLeftTextRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(storyLeftTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(storyImage1Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(fleshArrowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .to(storyImage2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(storyRightTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")
    }
  }, { dependencies: [] })

  // Animation for Unlocking Growth section
  useGSAP(() => {
    if (unlockingTitleRef.current && growthCircleRef.current && unlockingDescRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Set initial states
      gsap.set(unlockingTitleRef.current, {
        opacity: 0,
        y: 30
      })

      gsap.set(growthCircleRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      })

      gsap.set(unlockingDescRef.current, {
        opacity: 0,
        y: 20
      })

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: unlockingTitleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      tl.to(unlockingTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(growthCircleRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to(unlockingDescRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.3")
    }
  }, { dependencies: [] })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Absolutely positioned to overlay background */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Empty spacer */}
        <section className="relative px-6 lg:px-8 overflow-hidden pt-20 pb-4">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Empty spacer for header */}
          </div>
        </section>

        {/* Unlocking True Growth Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-8 lg:py-12">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Maison Elaris Subtitle */}
            <div className="mb-8">
              <p className="text-[#336b62] text-lg lg:text-xl font-heading font-medium tracking-wider uppercase">
                MAISON ELARIS
              </p>
            </div>

            {/* Main Title with Circle */}
            <div ref={unlockingTitleRef} className="relative mb-12 lg:mb-16">
              <div className="relative inline-block">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  UNLOCKING<br />
                  TRUE <span className="relative inline-block">
                    GROWTH
                    {/* Circle Image Behind GROWTH */}
                    <div ref={growthCircleRef} className="absolute -inset-4 lg:-inset-6">
                  <Image
                        src="/about/circel.png"
                        alt="Growth circle"
                        width={300}
                        height={150}
                        className="w-full h-auto object-contain"
                  />
                </div>
                  </span>
                </h2>
              </div>
              </div>

            {/* Description Text */}
            <div ref={unlockingDescRef} className="max-w-4xl mx-auto">
              <p className="text-gray-300 text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                In today&apos;s world, clients are desperate for growth. But the old levers of generating growth — endless ads, generic campaigns, and one-size-fits-all strategies, aren&apos;t working anymore.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Growth & Stories */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-16 lg:py-20">
          <div className="relative max-w-7xl mx-auto">
            
            {/* First Row - Left text with Right image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
              {/* Left Text */}
              <div ref={storyLeftTextRef} className="lg:pr-8">
                <p className="text-white text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                  We were born from this very frustration. We saw brands pushing harder, spending more, yet struggling to truly connect with the people who matter most: their audience. So, we set out to build something different.
        </p>
      </div>

              {/* Right Image - Centered with left text */}
              <div ref={storyImage1Ref} className="flex justify-center lg:justify-end">
                <Image
                  src="/about/image1.png"
                  alt="People connecting"
                  width={400}
                  height={300}
                  className="w-full max-w-md h-auto object-contain rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>

            {/* Second Row - Left image with Right text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Image - Centered with right text */}
              <div ref={storyImage2Ref} className="flex justify-center lg:justify-start order-2 lg:order-1">
                <Image
                  src="/about/image2.png"
                  alt="What's your story?"
                  width={400}
                  height={300}
                  className="w-full max-w-md h-auto object-contain rounded-lg shadow-xl"
                  priority
                />
            </div>

              {/* Right Text */}
              <div ref={storyRightTextRef} className="lg:pl-8 order-1 lg:order-2">
                <p className="text-white text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                  At our core, we believe{' '}
                  <span className="text-[#336b62] font-bold text-2xl lg:text-3xl xl:text-4xl">GROWTH</span>{' '}
                  is no longer about shouting louder, but about telling{' '}
                  <span className="text-[#336b62] font-bold text-2xl lg:text-3xl xl:text-4xl">STORIES</span>{' '}
                  that resonate, creating experiences that matter, and building strategies that inspire action.
                </p>
              </div>
            </div>

            {/* Curved Arrow - Flesh Image - Between the two rows */}
            <div ref={fleshArrowRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 z-10 pointer-events-none">
                <Image
                src="/about/flesh.png"
                alt="Connection arrow"
                width={200}
                height={150}
                className="w-32 lg:w-48 h-auto object-contain opacity-80"
              />
            </div>
          </div>
        </section>

        {/* Designing Impact Section */}
        <section ref={designingImpactSectionRef} className="relative py-20 bg-black overflow-hidden w-full">
          <div className="w-full">
            {/* DESIGNING - Left to Right */}
            <div className="relative mb-6 overflow-hidden w-full">
              <div ref={designingTextRef} className="whitespace-nowrap w-full">
                <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-white block w-full text-center">
                  DESIGNING
                    </span>
              </div>
            </div>

            {/* IMPACT - Right to Left */}
            <div className="relative mb-12 overflow-hidden w-full">
              <div ref={impactTextRef} className="whitespace-nowrap w-full">
                <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-transparent stroke-2 stroke-[#336b62] block w-full text-center"
                      style={{ WebkitTextStroke: '3px #336b62', color: 'transparent' }}>
                  IMPACT
                    </span>
              </div>
            </div>

            {/* Description Text */}
            <div ref={designingImpactDescRef} className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-gray-300 text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                We don&apos;t just market, we craft narratives. We don&apos;t just design, we create impact. And we don&apos;t just chase growth, we help our clients grow in ways that are meaningful, sustainable, and unforgettable.
                </p>
              </div>
          </div>
        </section>

        {/* Where Minds Unite Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-16 lg:py-20">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Where Minds Unite Image - Bigger on larger screens */}
            <div ref={mindsUniteImageRef} className="mb-8 lg:mb-12">
                <Image
                src="/about/wheremindsunite.png"
                alt="Where Minds Unite - Maison Elaris"
                width={900}
                height={450}
                className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl h-auto object-contain mx-auto opacity-95"
                priority
                />
              </div>
            
            {/* Where Minds Unite Text - Animated on scroll */}
            <div ref={mindsUniteTextRef} className="max-w-4xl mx-auto">
              <p className="text-gray-300 text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                At Maison Elaris, we believe brilliant work happens when diverse minds unite around a shared purpose. That&apos;s why we&apos;ve built a borderless collective, a team without boundaries,
              </p>
            </div>
          </div>
        </section>

        {/* 1 Vision Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-16 lg:py-20">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* 1 Vision Image - Smaller */}
            <div ref={visionImageRef} className="mb-6 lg:mb-8">
              <Image
                src="/about/1vision.png"
                alt="1 Vision - to create ideas that travel and impact that lasts"
                width={600}
                height={300}
                className="w-full max-w-2xl h-auto object-contain mx-auto opacity-95"
                priority
              />
              </div>

            {/* Vision Text - Animated on scroll */}
            <div ref={visionTextRef} className="max-w-3xl mx-auto">
              <p className="text-gray-300 text-lg lg:text-xl xl:text-2xl font-body leading-relaxed">
                to create ideas that travel<br />
                and impact that lasts.
              </p>
            </div>
          </div>
        </section>

        {/* From Europe Middle East To Asia Section */}
        <section ref={textSectionRef} className="relative py-20 bg-black overflow-hidden w-full">
          <div className="w-full">
            {/* FROM EUROPE - Left to Right */}
            <div className="relative mb-6 overflow-hidden w-full">
              <div ref={europeTextRef} className="whitespace-nowrap w-full">
                <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-transparent stroke-2 stroke-[#336b62] block w-full text-center" 
                      style={{ WebkitTextStroke: '3px #336b62', color: 'transparent' }}>
                      FROM EUROPE
                    </span>
              </div>
            </div>

            {/* MIDDLE EAST - Right to Left */}
            <div className="relative mb-6 overflow-hidden w-full">
              <div ref={middleEastTextRef} className="whitespace-nowrap w-full">
                <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-white block w-full text-center">
                      MIDDLE EAST
                    </span>
              </div>
            </div>

            {/* TO ASIA - Left to Right */}
            <div className="relative mb-12 overflow-hidden w-full">
              <div ref={asiaTextRef} className="whitespace-nowrap w-full">
                <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-transparent stroke-2 stroke-[#336b62] block w-full text-center"
                      style={{ WebkitTextStroke: '3px #336b62', color: 'transparent' }}>
                      TO ASIA
                    </span>
                </div>
              </div>
          </div>
        </section>

        {/* Planet Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-12 lg:py-16">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Planet Image */}
            <div ref={planetImageRef} className="mb-6 lg:mb-8">
              <Image
                src="/about/planet.png"
                alt="Planet"
                width={600}
                height={600}
                className="w-full max-w-2xl h-auto object-contain mx-auto opacity-95"
                priority
              />
            </div>

            {/* Planet Text - Animated on scroll */}
            <div ref={planetTextRef} className="max-w-4xl mx-auto">
              <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed">
                Our presence keeps us close to culture, talent, and consumers. 
                Some day&apos;s it&apos;s a strategy sprint in Amsterdam, other days a creative review across 
                time zones, but always with the same spirit: agile, collaborative, and precise.
        </p>
      </div>
          </div>
        </section>

        {/* Partner Image Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-8 lg:py-12">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Partner Image - Smaller */}
            <div ref={partnerImageRef} className="mb-4">
              <Image
                src="/about/partner.png"
                alt="Partner"
                width={600}
                height={300}
                className="w-full max-w-2xl h-auto object-contain mx-auto opacity-95"
                priority
              />
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-black py-8 lg:py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-4xl">
                <Image
                  src="/partners/partners.png"
                  alt="Our Partners"
                  width={1200}
                  height={400}
                  className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
          {/* Content Container with Transparent Card */}
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Subtitle */}
                <p className="text-[#336b62] text-sm lg:text-base font-secondary font-medium tracking-wider mb-6 uppercase">
                  Connect With Us
                </p>
                
                {/* Main Heading */}
                <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight mb-8">
                  CREATE TOMORROW,<br />
                  TOGETHER
                </h2>
                
                {/* Description */}
                <p className="text-gray-300 text-lg lg:text-xl font-body font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                  Every idea we share and every step we take moves us closer to a future we&apos;re proud to shape.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/connect/general-inquiries">
                    <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                      GET IN CONTACT
                    </button>
                  </Link>
                  <Link href="/connect/careers">
                    <button className="bg-transparent border-2 border-[#336b62] hover:bg-[#336b62] text-[#336b62] hover:text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                      VIEW CAREERS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
} 