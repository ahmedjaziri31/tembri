'use client'

import { useRef } from 'react'
import Head from 'next/head'
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
  
  // Refs for three-column impact section
  const threeColumnSectionRef = useRef<HTMLDivElement>(null)
  
  // Refs for designing impact column
  const designingTextRef = useRef<HTMLDivElement>(null)
  const impactTextRef = useRef<HTMLDivElement>(null)
  const designingImpactDescRef = useRef<HTMLDivElement>(null)
  
  // Refs for powered by creativity column
  const poweredTextRef = useRef<HTMLDivElement>(null)
  const creativityTextRef = useRef<HTMLDivElement>(null)
  const creativityDescRef = useRef<HTMLDivElement>(null)
  
  // Refs for craft at every level column
  const craftTextRef = useRef<HTMLDivElement>(null)
  const levelTextRef = useRef<HTMLDivElement>(null)
  const craftDescRef = useRef<HTMLDivElement>(null)
  
  // Refs for story section
  const storyLeftTextRef = useRef<HTMLDivElement>(null)
  const storyRightTextRef = useRef<HTMLDivElement>(null)
  const storyImage1Ref = useRef<HTMLDivElement>(null)
  const storyImage2Ref = useRef<HTMLDivElement>(null)
  
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

  // GSAP scroll animations for full-screen impact sections
  useGSAP(() => {
    if (designingTextRef.current && impactTextRef.current && threeColumnSectionRef.current) {
      gsap.registerPlugin(ScrollTrigger)

      // Full-width animation distance (matching "FROM EUROPE/MIDDLE EAST/TO ASIA" section)
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
      const isDesktop = window.innerWidth >= 1024 && window.innerWidth < 1440
      const distance = isMobile ? 300 : isTablet ? 350 : isDesktop ? 400 : 500

      // Get all sections within the container
      const sections = threeColumnSectionRef.current.querySelectorAll('section')
      
      // Section 1: DESIGNING IMPACT
      if (sections[0] && designingTextRef.current && impactTextRef.current) {
        // Set initial positions
        gsap.set(designingTextRef.current, { x: -distance })
        gsap.set(impactTextRef.current, { x: distance })

        // DESIGNING - Left to Right
        gsap.to(designingTextRef.current, {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[0],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // IMPACT - Right to Left
        gsap.to(impactTextRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[0],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // Animate description
        if (designingImpactDescRef.current) {
          gsap.set(designingImpactDescRef.current, { opacity: 0, y: 50 })
          gsap.to(designingImpactDescRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sections[0],
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          })
        }
      }

      // Section 2: POWERED BY CREATIVITY
      if (sections[1] && poweredTextRef.current && creativityTextRef.current) {
        // Set initial positions
        gsap.set(poweredTextRef.current, { x: -distance })
        gsap.set(creativityTextRef.current, { x: distance })

        // POWERED BY - Left to Right
        gsap.to(poweredTextRef.current, {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[1],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // CREATIVITY - Right to Left
        gsap.to(creativityTextRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[1],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // Animate description
        if (creativityDescRef.current) {
          gsap.set(creativityDescRef.current, { opacity: 0, y: 50 })
          gsap.to(creativityDescRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sections[1],
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          })
        }
      }

      // Section 3: CRAFT AT EVERY LEVEL
      if (sections[2] && craftTextRef.current && levelTextRef.current) {
        // Set initial positions
        gsap.set(craftTextRef.current, { x: -distance })
        gsap.set(levelTextRef.current, { x: distance })

        // CRAFT AT - Left to Right
        gsap.to(craftTextRef.current, {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[2],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // EVERY LEVEL - Right to Left
        gsap.to(levelTextRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sections[2],
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })

        // Animate description
        if (craftDescRef.current) {
          gsap.set(craftDescRef.current, { opacity: 0, y: 50 })
          gsap.to(craftDescRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sections[2],
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          })
        }
      }
    }
  }, { dependencies: [] })

  // Animation for Story section
  useGSAP(() => {
    if (storyLeftTextRef.current && storyRightTextRef.current && storyImage1Ref.current && storyImage2Ref.current) {
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
    <>
      <Head>
        <title>About Maison Elaris | Global Integrated Marketing Communications Agency</title>
        <meta name="description" content="We blend brand craft with enterprise media and analytics. Leadership with network pedigree, startup agility, and delivery across Europe, MENA & APAC." />
        <meta name="keywords" content="about maison elaris, integrated marketing communications, global agency leadership, creative media data" />
        <meta property="og:title" content="About Maison Elaris | Global Integrated Marketing Communications Agency" />
        <meta property="og:description" content="We blend brand craft with enterprise media and analytics. Leadership with network pedigree, startup agility, and delivery across Europe, MENA & APAC." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Maison Elaris | Global Integrated Marketing Communications Agency" />
        <meta name="twitter:description" content="We blend brand craft with enterprise media and analytics. Leadership with network pedigree, startup agility, and delivery across Europe, MENA & APAC." />
        <link rel="canonical" href="https://www.maisonelaris.com/about" />
      </Head>
      <div className="min-h-screen bg-black text-white">
        {/* Header - Absolutely positioned to overlay background */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Main Content */}
      <main className="relative">
        {/* Video Hero Section */}
        <section className="relative w-full h-screen overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/about/rend.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Optional Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* CTA Button - Bottom Left */}
          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20">
            <Link href="/work">
              <button className="group flex items-center gap-3 bg-white/90 hover:bg-white backdrop-blur-sm text-black px-6 py-3 lg:px-8 lg:py-4 rounded-full font-body font-medium text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span>See Our Work</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
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
                        src="/about/circel.webp"
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
                Business Growth is under pressure. Signal loss, walled-off gardens and clutter make attention scarce; spray-and-pray no longer works. Brands need precision, speed and ideas that travel globally.
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
                  Maison Elaris was created to answer that reality. We unite strategy, creativity, and data to close gaps between spend and impact. With multi-disciplinary talent, we design work to reach people and move business.
        </p>
      </div>

              {/* Right Image - Centered with left text */}
              <div ref={storyImage1Ref} className="flex justify-center lg:justify-end">
                <Image
                  src="/about/image1.webp"
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
                  src="/about/image2.webp"
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
                  Growth is earned, not shouted. We fuse stories with product truth, service design and media that scale. Craft moves fast, but human taste ensures real relevance and results and fairness.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Full Screen Impact Sections */}
        <div ref={threeColumnSectionRef} className="relative">
          {/* Section 1: DESIGNING IMPACT */}
          <section className="relative min-h-screen bg-black overflow-hidden w-full flex items-center justify-center py-16 sm:py-20">
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
              <div ref={designingImpactDescRef} className="text-center max-w-4xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
                <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-body leading-relaxed">
                  We don&apos;t just market; we engineer demand. We don&apos;t design; we build systems where ideas data and media compound. Tools assist; humans own judgment—so growth is brand-safe, measurable and built to last.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: POWERED BY CREATIVITY */}
          <section className="relative min-h-screen bg-black overflow-hidden w-full flex items-center justify-center py-16 sm:py-20">
            <div className="w-full">
              {/* POWERED BY - Left to Right */}
              <div className="relative mb-6 overflow-hidden w-full">
                <div ref={poweredTextRef} className="whitespace-nowrap w-full">
                  <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-white block w-full text-center">
                    POWERED BY
                  </span>
                </div>
              </div>
              
              {/* CREATIVITY - Right to Left */}
              <div className="relative mb-12 overflow-hidden w-full">
                <div ref={creativityTextRef} className="whitespace-nowrap w-full">
                  <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-transparent stroke-2 stroke-[#336b62] block w-full text-center"
                        style={{ WebkitTextStroke: '3px #336b62', color: 'transparent' }}>
                    CREATIVITY
                  </span>
                </div>
              </div>
              
              {/* Description Text */}
              <div ref={creativityDescRef} className="text-center max-w-4xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
                <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-body leading-relaxed">
                  A team of creators, strategists, and visionaries who believe 
                  the future of growth lies in authenticity, creativity, 
                  and connection.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: CRAFT AT EVERY LEVEL */}
          <section className="relative min-h-screen bg-black overflow-hidden w-full flex items-center justify-center py-16 sm:py-20">
            <div className="w-full">
              {/* CRAFT AT - Left to Right */}
              <div className="relative mb-6 overflow-hidden w-full">
                <div ref={craftTextRef} className="whitespace-nowrap w-full">
                  <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-white block w-full text-center">
                    CRAFT AT
                  </span>
                </div>
              </div>
              
              {/* EVERY LEVEL - Right to Left */}
              <div className="relative mb-12 overflow-hidden w-full">
                <div ref={levelTextRef} className="whitespace-nowrap w-full">
                  <span className="text-8xl lg:text-9xl xl:text-[12rem] font-heading font-bold text-transparent stroke-2 stroke-[#336b62] block w-full text-center"
                        style={{ WebkitTextStroke: '3px #336b62', color: 'transparent' }}>
                    EVERY LEVEL
                  </span>
                </div>
              </div>
              
              {/* Description Text */}
              <div ref={craftDescRef} className="text-center max-w-4xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
                <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-body leading-relaxed">
                  We build with our clients, not just for them, sharing knowledge, 
                  staying transparent, and holding ourselves accountable every 
                  step of the way.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Where Minds Unite Section */}
        <section className="relative px-6 lg:px-8 overflow-hidden py-16 lg:py-20">
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Where Minds Unite Image - Bigger on larger screens */}
            <div ref={mindsUniteImageRef} className="mb-8 lg:mb-12">
                <Image
                src="/about/wheremindsunite.webp"
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
                At Maison Elaris, the best ideas win. A borderless collective—strategy, creative, tech &amp; analytics as one team. Diverse minds, purpose, and standards; no boundaries, only outcomes.
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
                src="/about/1vision.webp"
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
                src="/about/planet.webp"
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
                Presence matters. We work where culture moves—Paris, London, Dubai, Singapore, and beyond—so insight, and execution stay close to people. One day a strategy sprint; the next, a cross-timezone review. Agile, collaborative, precise.
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
                src="/about/partner.webp"
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
        <section className="bg-black py-12 lg:py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-[#f5e6d3] text-3xl lg:text-4xl xl:text-5xl font-heading font-bold leading-tight mb-6">
                OUR VERIFIED PARTNERS
              </h2>
              <p className="text-gray-300 text-lg lg:text-xl font-body font-light max-w-4xl mx-auto leading-relaxed">
                Trusted partnerships with industry leaders to deliver exceptional results
              </p>
            </div>

            {/* Partner Logos - Responsive Single Line on Desktop */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E1.png"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E3.png.svg"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E4.png"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E5.png"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E6.png"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/Partner%20Logos/E7.png"
                  alt="Partner Logo"
                  width={1120}
                  height={360}
                  className="w-auto h-48 md:h-56 lg:h-64 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
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
    </>
  )
} 