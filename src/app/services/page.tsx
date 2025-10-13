'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function ServicesPage() {
  // State for expanded services
  const [expandedService, setExpandedService] = useState<number | null>(null)

  // Refs for animations
  const heroSectionRef = useRef<HTMLElement>(null)
  const topTextRef = useRef<HTMLHeadingElement>(null)
  const bottomTextRef = useRef<HTMLHeadingElement>(null)
  const contactButtonRef = useRef<HTMLButtonElement>(null)
  const backgroundShapeRef = useRef<HTMLDivElement>(null)
  
  // Service expansion refs
  const service1ContentRef = useRef<HTMLDivElement>(null)
  const service2ContentRef = useRef<HTMLDivElement>(null)
  const service3ContentRef = useRef<HTMLDivElement>(null)
  const service4ContentRef = useRef<HTMLDivElement>(null)
  const service5ContentRef = useRef<HTMLDivElement>(null)

  // Why Choose section refs
  const whyChooseSectionRef = useRef<HTMLElement>(null)
  const chooseImageRef = useRef<HTMLDivElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Card data for sticky animation
  const cardData = [
    {
      id: 1,
      number: "01",
      title: "Integrated by Design",
      description: "Our model eliminates silos. We blend strategy, creative, and media from the start, delivering better outcomes and faster speed-to-market."
    },
    {
      id: 2,
      number: "02", 
      title: "Tech-Forward Thinking",
      description: "We don't just use media platforms—we build on them. Our internal tools, AI copilots, and predictive dashboards give clients an unfair advantage in a crowded marketplace."
    },
    {
      id: 3,
      number: "03",
      title: "Strategy Meets Craft", 
      description: "We're a consultancy, a content studio, a performance lab driven by the belief that good strategy deserves great execution."
    },
    {
      id: 4,
      number: "04",
      title: "Proven Across Verticals",
      description: "From global launches for tech giants to wellness growth campaigns, our work spans industries and consistently drives measurable results."
    },
    {
      id: 5,
      number: "05",
      title: "Built for a Borderless World",
      description: "We work across markets and languages, with culturally aware teams fluent in localization and platform-native nuances."
    }
  ]

  // Text cycling data
  const textCycles = [
    { top: "INTEGRATED", bottom: "MEDIA SOLUTIONS" },
    { top: "DATA-LED", bottom: "PERFORMANCE" },
    { top: "CREATIVE", bottom: "IMPACT" }
  ]

  // Handle service click with animation
  const handleServiceClick = (serviceNumber: number) => {
    const isExpanding = expandedService !== serviceNumber
    const contentRef = serviceNumber === 1 ? service1ContentRef : 
                      serviceNumber === 2 ? service2ContentRef : 
                      serviceNumber === 3 ? service3ContentRef : 
                      serviceNumber === 4 ? service4ContentRef :
                      serviceNumber === 5 ? service5ContentRef : null
    
    if (contentRef?.current) {
      if (isExpanding) {
        // Expand animation
        setExpandedService(serviceNumber)
        gsap.fromTo(contentRef.current, 
          { opacity: 0, height: 0, y: -20 },
          { 
            opacity: 1, 
            height: 'auto', 
            y: 0,
            duration: 0.6, 
            ease: "power2.out",
            onComplete: () => {
              gsap.set(contentRef.current, { height: 'auto' })
            }
          }
        )
      } else {
        // Collapse animation
        gsap.to(contentRef.current, {
          opacity: 0,
          height: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setExpandedService(null)
          }
        })
      }
    } else {
      // Fallback without animation
      setExpandedService(expandedService === serviceNumber ? null : serviceNumber)
    }
  }

  // Hero section animations - runs once
  useGSAP(() => {
    if (!topTextRef.current || !bottomTextRef.current || !contactButtonRef.current || !backgroundShapeRef.current) return

    // Set initial states
    gsap.set([topTextRef.current, bottomTextRef.current, contactButtonRef.current], {
      opacity: 0,
      y: 50
    })

    gsap.set(backgroundShapeRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -10
    })

    // Initial entrance animation
    const entranceTl = gsap.timeline({ delay: 0.5 })
    
    entranceTl
      .to(backgroundShapeRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power2.out"
      })
      .to([topTextRef.current, bottomTextRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to(contactButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.2")

    // Text cycling animation
    let currentIndex = 0
    
    const startCycling = () => {
      const cycleTl = gsap.timeline({ repeat: -1, delay: 3 })
      
      textCycles.forEach((_, index) => {
        cycleTl.to([topTextRef.current, bottomTextRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % textCycles.length
            const nextText = textCycles[currentIndex]
            if (topTextRef.current && bottomTextRef.current) {
              topTextRef.current.textContent = nextText.top
              bottomTextRef.current.textContent = nextText.bottom
            }
          }
        }, index * 4)
        .to([topTextRef.current, bottomTextRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, index * 4 + 0.5)
      })
    }

    // Start cycling after entrance animation
    entranceTl.call(startCycling)

    // Continuous subtle floating animation for background shape
    gsap.to(backgroundShapeRef.current, {
      rotation: 2,
      scale: 1.02,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Choose image floating animation
    if (chooseImageRef.current) {
      gsap.to(chooseImageRef.current, {
        y: -15,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    // Cleanup
    return () => {
      gsap.killTweensOf([backgroundShapeRef.current, chooseImageRef.current, topTextRef.current, bottomTextRef.current, contactButtonRef.current])
    }
  }, { dependencies: [] })

  // Sticky card animation - separate from expandedService to prevent re-initialization
  useGSAP(() => {
    if (!whyChooseSectionRef.current || !stickyContainerRef.current) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    const cardElements = cardRefs.current.filter(Boolean)
    const totalCards = cardElements.length

    if (cardElements.length === 0 || totalCards <= 1) return

    // Kill all existing ScrollTriggers for this container to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === stickyContainerRef.current) {
        trigger.kill(true)
      }
    })

    // Reset all cards to initial state
    cardElements.forEach((card, index) => {
      if (card) {
        // First clear any previous animations
        gsap.killTweensOf(card)
        // Then set initial position
        gsap.set(card, { 
          y: index === 0 ? "0%" : "100%", 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          force3D: true // Force GPU acceleration for better performance
        })
      }
    })

    // Calculate scroll distance
    const endValue = window.innerHeight * (totalCards - 1) * 1.5

    // Create scroll timeline for sticky cards
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainerRef.current,
        start: "top top",
        end: `+=${endValue}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
        id: "sticky-cards" // Add ID for easier debugging
      }
    })

    // Animate each card transition
    for (let i = 0; i < totalCards - 1; i++) {
      const currentCard = cardElements[i]
      const nextCard = cardElements[i + 1]
      const position = i / (totalCards - 1)

      if (currentCard && nextCard) {
        // Current card scales down and rotates
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1 / (totalCards - 1),
            ease: "power2.inOut"
          },
          position
        )

        // Next card slides up
        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1 / (totalCards - 1),
            ease: "power2.inOut"
          },
          position
        )
      }
    }

    // Refresh ScrollTrigger after a short delay to ensure proper setup
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    // Add window resize handler to refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      clearTimeout(refreshTimeout)
      window.removeEventListener('resize', handleResize)
      
      // Kill the specific ScrollTrigger for sticky cards
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === "sticky-cards" || trigger.trigger === stickyContainerRef.current) {
          trigger.kill(true)
        }
      })
      
      // Kill the timeline
      scrollTimeline.kill()
      
      // Reset all card positions to default
      cardElements.forEach((card) => {
        if (card) {
          gsap.set(card, { clearProps: "transform,opacity" })
        }
      })
    }
  }, { dependencies: [] })

  // Service expansion animation - separate effect for expandedService changes
  useGSAP(() => {
    // Initialize service content animation states
    const contentRefs = [
      service1ContentRef,
      service2ContentRef,
      service3ContentRef,
      service4ContentRef,
      service5ContentRef
    ]

    contentRefs.forEach((ref, index) => {
      if (ref.current) {
        gsap.set(ref.current, { 
          height: expandedService === (index + 1) ? 'auto' : 0,
          opacity: expandedService === (index + 1) ? 1 : 0 
        })
      }
    })
  }, { dependencies: [expandedService] })

  return (
    <>
      <Head>
        <title>Services | Strategy, Creative, Media, Retail & Analytics | Maison Elaris</title>
        <meta name="description" content="End-to-end IMC: brand strategy, design systems, content, media planning/buying, retail media, analytics, MMM, and experimentation—engineered for profitable growth." />
        <meta name="keywords" content="integrated marketing services, media planning and buying, retail media services, analytics and MMM, brand strategy" />
        <meta property="og:title" content="Services | Strategy, Creative, Media, Retail & Analytics | Maison Elaris" />
        <meta property="og:description" content="End-to-end IMC: brand strategy, design systems, content, media planning/buying, retail media, analytics, MMM, and experimentation—engineered for profitable growth." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services | Strategy, Creative, Media, Retail & Analytics | Maison Elaris" />
        <meta name="twitter:description" content="End-to-end IMC: brand strategy, design systems, content, media planning/buying, retail media, analytics, MMM, and experimentation—engineered for profitable growth." />
        <link rel="canonical" href="https://www.maisonelaris.com/services" />
      </Head>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <Header />
      
      {/* Main Content */}
      <main className="relative pt-0">
        {/* Hero Section */}
        <section ref={heroSectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-4">
          {/* Background Shape - Fixed Position */}
          <div 
            ref={backgroundShapeRef}
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
          >
            <Image
              src="/services/backwriting.webp"
              alt=""
              width={800}
              height={800}
              className="w-full h-full max-w-6xl max-h-6xl object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            {/* Main Text */}
            <div className="mb-12">
              <h1 
                ref={topTextRef}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-heading font-bold leading-none mb-0"
                style={{ color: '#336b62' }}
              >
                INTEGRATED
              </h1>
              <h2 
                ref={bottomTextRef}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-heading font-bold leading-none text-white"
              >
                MEDIA SOLUTIONS
              </h2>
            </div>

            {/* Contact Button */}
            <Link href="/connect/general-inquiries">
              <button 
                ref={contactButtonRef}
                className="bg-[#336b62] hover:bg-[#9b8075] text-white px-8 py-4 rounded-lg transition-all duration-300 font-body font-medium text-lg transform hover:scale-105 hover:shadow-2xl"
              >
                CONTACT US
              </button>
            </Link>
          </div>
        </section>

        {/* Explore Our Services Section */}
        <section className="relative py-16 lg:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
                <span style={{ color: '#336b62' }}>EXPLORE </span>
                <span className="text-white">OUR SERVICES</span>
                    </h2>
            </div>

            {/* Services Cards */}
            <div className="space-y-12 lg:space-y-20">
              
              {/* First Card - Image Left, Text Right */}
              <div className="bg-white/5 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="relative w-full max-w-md">
                      <Image
                        src="/services/image1.webp"
                        alt="Think Bigger"
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="text-center lg:text-left">
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed">
                      At Maison Elaris, marketing is a connected system. We unite media, creative, and data to design work that meets people where they are—across markets—delivering ideas that are distinctive, measurable, and built for compounding growth at scale with rigor, accountability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Card - Text Left, Image Right */}
              <div className="bg-white/5 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  
                  {/* Text Content */}
                  <div className="text-center lg:text-left order-2 lg:order-1">
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed mb-8">
                      Our services are designed to help you win in the new age of media, whether you&apos;re launching a product, scaling globally, or reimagining brand engagement. With capabilities spanning content creation to performance marketing and retail media, we help you build influence, drive demand, and shape culture.
                    </p>
                    
                    {/* Need Help Button */}
                    <Link href="/connect">
                      <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-8 py-4 rounded-lg transition-all duration-300 font-body font-medium text-lg transform hover:scale-105 hover:shadow-2xl">
                        NEED HELP ?
                      </button>
                    </Link>
                  </div>
                  
                  {/* Image */}
                  <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                    <div className="relative w-full max-w-md">
                      <Image
                        src="/services/image2.webp"
                        alt="Megaphone Services"
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="relative py-16 lg:py-24 bg-black">
          {/* Services List - Full Width Lines */}
          <div className="space-y-0">
            
            {/* Service 01 */}
            <div className="border-t border-white/20">
              <div 
                className="py-6 lg:py-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                onClick={() => handleServiceClick(1)}
              >
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    01
                  </span>
                    <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold flex-1">
                    STRATEGIC MEDIA PLANNING & BUYING
                  </h3>
                    <div className="text-white text-2xl">
                      {expandedService === 1 ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content for Service 01 */}
              {expandedService === 1 && (
                <div ref={service1ContentRef} className="bg-white/5 border-t border-white/10 overflow-hidden">
                  <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      
                      {/* Side Card Image - Hidden on mobile */}
                      <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-[220px]">
                          <Image
                            src="/card.webp"
                            alt="Strategic Media Planning"
                            width={220}
                            height={275}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <h4 className="text-[#336b62] text-xl lg:text-2xl font-heading font-bold mb-6">
                          Maximize Your Investments Across Every Touchpoint
                        </h4>
                        
                        <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
                          We design data-driven media strategies rooted in deep audience understanding and modern platform fluency. Our approach combines human insight and machine intelligence to architect full-funnel plans — from awareness to performance.
                        </p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Includes:</h5>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Omnichannel media planning (Digital, Offline, CTV, OOH)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Programmatic & platform-specific execution (Google, Meta, TikTok, Amazon, etc.)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Budget optimization & pacing intelligence</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Brand lift, attention, and outcome measurement</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Perfect for:</h5>
                          <p className="text-gray-300">
                            Global campaigns, performance-driven growth, and high-velocity launches.
                          </p>
                        </div>
                        
                        <Link href="/connect/general-inquiries">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium">
                            CONTACT US
                          </button>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service 02 */}
            <div className="border-t border-white/20">
              <div 
                className="py-6 lg:py-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                onClick={() => handleServiceClick(2)}
              >
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    02
                  </span>
                    <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold flex-1">
                    CREATIVE CONTENT DEVELOPMENT<br />& STORYTELLING
                  </h3>
                    <div className="text-white text-2xl">
                      {expandedService === 2 ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content for Service 02 */}
              {expandedService === 2 && (
                <div ref={service2ContentRef} className="bg-white/5 border-t border-white/10 overflow-hidden">
                  <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      
                      {/* Side Card Image - Hidden on mobile */}
                      <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-[220px]">
                          <Image
                            src="/card.webp"
                            alt="Creative Content Development"
                            width={220}
                            height={275}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <h4 className="text-[#336b62] text-xl lg:text-2xl font-heading font-bold mb-6">
                          Craft Narratives That Convert & Content That Travels
                        </h4>
                        
                        <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
                          We blend brand identity with audience intent to produce emotionally resonant and platform-native content. From high-concept campaigns to always-on assets, our creative is designed to stop thumbs and start conversations.
                        </p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Includes:</h5>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Video, image, and animation production</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Platform-first content for Meta, TikTok, YouTube, DOOH</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>UGC + branded storytelling</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Creator strategy and influencer integration</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Visual systems for global campaign consistency</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Perfect for:</h5>
                          <p className="text-gray-300">
                            Beauty, fashion, FMCG, and consumer tech brands seeking creative consistency across regions.
                          </p>
                        </div>
                        
                        <Link href="/connect/general-inquiries">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium">
                            CONTACT US
                          </button>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service 03 */}
            <div className="border-t border-white/20">
              <div 
                className="py-6 lg:py-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                onClick={() => handleServiceClick(3)}
              >
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    03
                  </span>
                    <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold flex-1">
                    DATA-DRIVEN MARKETING & AUDIENCE<br />INTELLIGENCE
                  </h3>
                    <div className="text-white text-2xl">
                      {expandedService === 3 ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content for Service 03 */}
              {expandedService === 3 && (
                <div ref={service3ContentRef} className="bg-white/5 border-t border-white/10 overflow-hidden">
                  <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      
                      {/* Side Card Image - Hidden on mobile */}
                      <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-[220px]">
                          <Image
                            src="/card.webp"
                            alt="Data-driven Marketing"
                            width={220}
                            height={275}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <h4 className="text-[#336b62] text-xl lg:text-2xl font-heading font-bold mb-6">
                           Your Brand&apos;s Sharpest Tool Is Knowing Who, When, And Why.
                        </h4>
                        
                        <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
                          From first-party enrichment to lookalike modeling, we transform data into decisions. Our analytics team integrates platform insights with custom dashboards and machine learning signals to find and activate the audiences that matter most.
                        </p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Includes:</h5>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Audience segmentation & persona development</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Cross-platform performance analytics</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Custom dashboards and business intelligence (GA4, Looker, Power BI)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Marketing mix modeling & budget reallocation</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Perfect for:</h5>
                          <p className="text-gray-300">
                            Brands aiming to scale sustainably or decode campaign ROI.
                          </p>
                        </div>
                        
                        <Link href="/connect/general-inquiries">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium">
                            CONTACT US
                          </button>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service 04 */}
            <div className="border-t border-white/20">
              <div 
                className="py-6 lg:py-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                onClick={() => handleServiceClick(4)}
              >
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    04
                  </span>
                    <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold flex-1">
                    DIGITAL TRANSFORMATION &<br />CONSULTANCY
                  </h3>
                    <div className="text-white text-2xl">
                      {expandedService === 4 ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content for Service 04 */}
              {expandedService === 4 && (
                <div ref={service4ContentRef} className="bg-white/5 border-t border-white/10 overflow-hidden">
                  <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      
                      {/* Side Card Image - Hidden on mobile */}
                      <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-[220px]">
                          <Image
                            src="/card.webp"
                            alt="Digital Transformation"
                            width={220}
                            height={275}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <h4 className="text-[#336b62] text-xl lg:text-2xl font-heading font-bold mb-6">
                          Bridge Brand Vision With Technology-Driven Marketing Execution
                        </h4>
                        
                        <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
                          Maison Elaris guides businesses through transformation integrating modern media, martech, and measurement. From tech stack audits to innovation sprints, we partner with clients on the journey toward scalable, future-facing ecosystems.
                        </p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Includes:</h5>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Martech & data architecture consulting</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Performance media transformation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>CRM strategy & implementation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>AI + automation frameworks for campaign management</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Retail, CRM, CDP, and analytics stack alignment</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Perfect for:</h5>
                          <p className="text-gray-300">
                            Organizations scaling internal teams or replatforming tech capabilities.
                          </p>
                        </div>
                        
                        <Link href="/connect/general-inquiries">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium">
                            CONTACT US
                          </button>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service 05 */}
            <div className="border-t border-white/20">
              <div 
                className="py-6 lg:py-8 cursor-pointer hover:bg-white/5 transition-all duration-300"
                onClick={() => handleServiceClick(5)}
              >
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    05
                  </span>
                    <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold flex-1">
                    RETAIL MEDIA & COMMERCE STRATEGY
                  </h3>
                    <div className="text-white text-2xl">
                      {expandedService === 5 ? '−' : '+'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content for Service 05 */}
              {expandedService === 5 && (
                <div ref={service5ContentRef} className="bg-white/5 border-t border-white/10 overflow-hidden">
                  <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      
                      {/* Side Card Image - Hidden on mobile */}
                      <div className="hidden lg:flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-[220px]">
                          <Image
                            src="/card.webp"
                            alt="Retail Media & Commerce"
                            width={220}
                            height={275}
                            className="w-full h-auto object-contain rounded-2xl"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="order-1 lg:order-2">
                        <h4 className="text-[#336b62] text-xl lg:text-2xl font-heading font-bold mb-6">
                          Turn Shelf Space Into Screen Space.
                        </h4>
                        
                        <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
                          In a world where every touchpoint is shoppable, we help brands navigate and master retail media networks — from Amazon to Carrefour. We build performance-driven commerce strategies integrated across media, shelf, and content.
                        </p>
                        
                        <div className="mb-6">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Includes:</h5>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Amazon Ads, Walmart Connect, Carrefour, TikTok Shop, Lazada, Shopee</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Content-to-cart pathways across social + e-commerce</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>DSP management, feed optimization</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Offline & retail attribution integrations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#336b62] mt-1">•</span>
                              <span>Promotion calendar alignment</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mb-8">
                          <h5 className="text-white text-lg font-heading font-bold mb-4">Perfect for:</h5>
                          <p className="text-gray-300">
                            FMCG, beauty, electronics, and DTC brands leveraging retailer ecosystems.
                          </p>
                        </div>
                        
                        <Link href="/connect/general-inquiries">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium">
                            CONTACT US
                          </button>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom border */}
            <div className="border-t border-white/20"></div>
          </div>
        </section>

        {/* Why Clients Choose Section */}
        <section ref={whyChooseSectionRef} className="relative bg-black min-h-screen">
          {/* Section Title */}
          <div className="text-center py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
                <span className="text-white">WHY CLIENTS </span>
                <div 
                  ref={chooseImageRef}
                  className="inline-block mx-2 relative top-4"
                >
                  <Image
                    src="/services/choose.webp"
                    alt="Choose"
                    width={300}
                    height={80}
                    className="object-contain w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto"
                  />
                </div>
                <br />
                <span className="text-white">MAISON ELARIS</span>
              </h2>
            </div>
          </div>

          {/* Sticky Cards Container */}
          <div ref={stickyContainerRef} className="sticky-cards relative flex h-screen w-full items-center justify-center overflow-hidden p-4 lg:p-8">
            <div className="relative h-[80%] w-full max-w-2xl overflow-hidden rounded-3xl">
              {cardData.map((card, index) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 lg:p-12 flex flex-col justify-center"
                  style={{ zIndex: index + 1 }}
                >
                  {/* Card Number Badge */}
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-[#336b62] rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-white text-2xl font-bold">{card.number}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white text-3xl lg:text-4xl font-heading font-bold mb-8 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed max-w-xl">
                      {card.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center mt-8 gap-2">
                    {cardData.map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === index ? 'bg-[#336b62] w-8' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book Call Now Button */}
          <div className="text-center py-8 -mt-14">
            <div className="max-w-7xl mx-auto px-6">
              <a href="https://calendly.com/hello-maisonelaris" target="_blank" rel="noopener noreferrer">
                <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-12 py-4 rounded-full transition-all duration-300 font-body font-medium text-lg transform hover:scale-105 hover:shadow-2xl">
                  Book Call Now!
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="section relative bg-black py-24 lg:py-32 overflow-hidden">
          {/* Background Decorative Shapes */}
          <div className="absolute inset-0">
            <Image
              src="/shape.webp"
              alt=""
              width={700}
              height={700}
              className="bg-shape-1 absolute top-1 -right-50 rotate-12 opacity-60 filter brightness-150"
            />
            <Image
              src="/shape.webp"
              alt=""
              width={600}
              height={600}
              className="bg-shape-2 absolute bottom-0 -left-40 -rotate-12 opacity-50 filter brightness-150"
            />
          </div>
          
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
                  <Link href="/connect">
                    <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                      GET IN CONTACT
                    </button>
                  </Link>
                  <Link href="/contact/careers">
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