'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function ServicesPage() {
  // Refs for animations
  const heroSectionRef = useRef<HTMLElement>(null)
  const topTextRef = useRef<HTMLHeadingElement>(null)
  const bottomTextRef = useRef<HTMLHeadingElement>(null)
  const contactButtonRef = useRef<HTMLButtonElement>(null)
  const backgroundShapeRef = useRef<HTMLDivElement>(null)

  // Why Choose section refs
  const whyChooseSectionRef = useRef<HTMLElement>(null)
  const chooseImageRef = useRef<HTMLDivElement>(null)
  const uLineLeftRef = useRef<HTMLDivElement>(null)
  const uLineBottomRef = useRef<HTMLDivElement>(null)
  const uLineRightRef = useRef<HTMLDivElement>(null)
  const point1Ref = useRef<HTMLDivElement>(null)
  const point2Ref = useRef<HTMLDivElement>(null)
  const point3Ref = useRef<HTMLDivElement>(null)
  const point4Ref = useRef<HTMLDivElement>(null)
  const point5Ref = useRef<HTMLDivElement>(null)

  // Text cycling data
  const textCycles = [
    { top: "INTEGRATED", bottom: "SOLUTIONS" },
    { top: "DATA-LED", bottom: "PERFORMANCE" },
    { top: "CREATIVE", bottom: "IMPACT" }
  ]

  // GSAP Animation
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

    // Continuous subtle floating animation for background shape (stays in place)
    gsap.to(backgroundShapeRef.current, {
      rotation: 2,
      scale: 1.02,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Why Choose section animations
    if (whyChooseSectionRef.current && chooseImageRef.current) {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger)
      // Set initial states for path line parts (hidden)
      gsap.set(uLineLeftRef.current, { scaleX: 0, transformOrigin: "left center" }) // Top horizontal grows left to right
      gsap.set(uLineBottomRef.current, { scaleY: 0, transformOrigin: "top center" }) // Vertical grows down
      gsap.set(uLineRightRef.current, { scaleX: 0, transformOrigin: "right center" }) // Bottom horizontal grows right to left

      // Set initial states for points (hidden)
      gsap.set([point1Ref.current, point2Ref.current, point3Ref.current, point4Ref.current, point5Ref.current], {
        opacity: 0,
        y: 30
      })

      // Choose image floating animation
      gsap.to(chooseImageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // U-shaped line animation on scroll - FASTER Progressive U drawing
      ScrollTrigger.create({
        trigger: whyChooseSectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        scrub: 0.1, // Much faster and more responsive
        onUpdate: (self) => {
          const progress = self.progress
          
          // Points 1 & 2 appear first (top row) (0-0.1) - FASTER
          if (progress >= 0) {
            gsap.set([point1Ref.current, point2Ref.current], { 
              opacity: Math.min(progress * 10, 1), 
              y: 30 - (Math.min(progress * 10, 1) * 30)
            })
          }
          
          // Path Part 1: Top horizontal line appears (0.1-0.3) - FASTER
          if (progress >= 0.1) {
            gsap.set(uLineLeftRef.current, { 
              scaleX: Math.min((progress - 0.1) * 5, 1)
            })
          }
          
          // Path Part 2: Right vertical line appears (0.3-0.5) - FASTER
          if (progress >= 0.3) {
            gsap.set(uLineBottomRef.current, { 
              scaleY: Math.min((progress - 0.3) * 5, 1)
            })
          }
          
          // Point 3 appears when vertical line starts (0.35-0.5) - FASTER
          if (progress >= 0.35) {
            gsap.set(point3Ref.current, { 
              opacity: Math.min((progress - 0.35) * 6.67, 1), 
              y: 30 - (Math.min((progress - 0.35) * 6.67, 1) * 30)
            })
          }
          
          // Path Part 3: Bottom horizontal line appears (0.5-0.7) - FASTER
          if (progress >= 0.5) {
            gsap.set(uLineRightRef.current, { 
              scaleX: Math.min((progress - 0.5) * 5, 1)
            })
          }
          
          // Points 4 & 5 appear last (bottom row) (0.6-0.8) - FASTER
          if (progress >= 0.6) {
            gsap.set([point4Ref.current, point5Ref.current], { 
              opacity: Math.min((progress - 0.6) * 5, 1), 
              y: 30 - (Math.min((progress - 0.6) * 5, 1) * 30)
            })
          }
        }
      })
    }

  }, { dependencies: [] })

  return (
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
              src="/services/backwriting.png"
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
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-4"
                style={{ color: '#336b62' }}
              >
                INTEGRATED
              </h1>
              <h2 
                ref={bottomTextRef}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight text-white"
              >
                SOLUTIONS
              </h2>
            </div>

            {/* Contact Button */}
            <Link href="/connect">
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
                        src="/services/image1.png"
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
                      At Maison Elaris, we believe modern marketing requires more than just campaigns, it demands convergence. We operate at the intersection of media, creativity, and data, helping brands connect with audiences in meaningful, measurable, and intelligently orchestrated ways.
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
                        src="/services/image2.png"
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
            <div className="border-t border-white/20 py-6 lg:py-8">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    01
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold">
                    STRATEGIC MEDIA PLANNING & BUYING
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 02 */}
            <div className="border-t border-white/20 py-6 lg:py-8">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    02
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold">
                    CREATIVE CONTENT DEVELOPMENT<br />& STORYTELLING
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 03 */}
            <div className="border-t border-white/20 py-6 lg:py-8">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    03
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold">
                    DATA-DRIVEN MARKETING & AUDIENCE<br />INTELLIGENCE
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 04 */}
            <div className="border-t border-white/20 py-6 lg:py-8">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    04
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold">
                    DIGITAL TRANSFORMATION &<br />CONSULTANCY
                  </h3>
                </div>
              </div>
            </div>

            {/* Service 05 */}
            <div className="border-t border-white/20 py-6 lg:py-8">
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center gap-8">
                  <span className="text-[#336b62] text-2xl lg:text-3xl font-heading font-bold min-w-[60px]">
                    05
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold">
                    RETAIL MEDIA & COMMERCE STRATEGY
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom border */}
            <div className="border-t border-white/20"></div>
          </div>
        </section>

        {/* Why Clients Choose Section */}
        <section ref={whyChooseSectionRef} className="relative py-20 lg:py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Title */}
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
                <span className="text-white">WHY CLIENTS </span>
                <div 
                  ref={chooseImageRef}
                  className="inline-block mx-2 relative top-4"
                >
                  <Image
                    src="/services/choose.png"
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

            {/* Content Grid with U-Shaped Connecting Line */}
            <div className="relative max-w-5xl mx-auto">
              
              {/* Rotated U-Shaped Path Line */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block">
                {/* Top horizontal line: from left content to right edge */}
                <div ref={uLineLeftRef} className="absolute left-1/4 top-32 w-1/2 h-px bg-[#336b62]"></div>
                
                {/* Right vertical line: going down from top horizontal */}
                <div ref={uLineBottomRef} className="absolute right-1/4 top-32 w-px h-40 bg-[#336b62]"></div>
                
                {/* Bottom horizontal line: going back left from bottom of vertical */}
                <div ref={uLineRightRef} className="absolute left-1/4 top-72 w-1/2 h-px bg-[#336b62]"></div>
              </div>

              {/* Content Points Layout */}
              <div className="space-y-0">
                
                {/* Top Row */}
                <div className="grid lg:grid-cols-2 gap-16 mb-16">
                  {/* Point 1 - Integrated by Design (Top Left) */}
                  <div ref={point1Ref} className="text-left">
                    <h3 className="text-white text-xl lg:text-2xl font-heading font-bold mb-4">
                      Integrated by Design
                    </h3>
                    <p className="text-gray-300 text-base font-body leading-relaxed">
                      Our model eliminates silos. We blend strategy, creative, and media from the start, delivering better outcomes and faster speed-to-market.
                    </p>
                  </div>

                  {/* Point 2 - Tech-Forward Thinking (Top Right) */}
                  <div ref={point2Ref} className="text-left">
                    <h3 className="text-white text-xl lg:text-2xl font-heading font-bold mb-4">
                      Tech-Forward Thinking
                    </h3>
                    <div className="border border-white/20 p-4 rounded-lg">
                      <p className="text-gray-300 text-base font-body leading-relaxed">
                        We don&apos;t just use media platforms we build on them. Our internal tools, AI copilots, and predictive dashboards give clients an unfair advantage in a crowded marketplace.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Point */}
                <div className="text-center mb-16">
                  <div ref={point3Ref} className="max-w-md mx-auto">
                    <h3 className="text-white text-xl lg:text-2xl font-heading font-bold mb-4">
                      Strategy Meets Craft
                    </h3>
                    <div className="border border-white/20 p-6 rounded-lg">
                      <p className="text-gray-300 text-base font-body leading-relaxed">
                        We&apos;re a consultancy, a content studio, a performance lab driven by the belief that good strategy deserves great execution.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid lg:grid-cols-2 gap-16">
                  {/* Point 4 - Proven Across Verticals (Bottom Left) */}
                  <div ref={point4Ref} className="text-left">
                    <h3 className="text-white text-xl lg:text-2xl font-heading font-bold mb-4">
                      Proven Across Verticals
                    </h3>
                    <p className="text-gray-300 text-base font-body leading-relaxed">
                      From global launches for tech giants to wellness growth campaigns, our work spans industries and consistently drives measurable results.
                    </p>
                  </div>

                  {/* Point 5 - Built for a Borderless World (Bottom Right) */}
                  <div ref={point5Ref} className="text-left">
                    <h3 className="text-white text-xl lg:text-2xl font-heading font-bold mb-4">
                      Built for a Borderless World
                    </h3>
                    <div className="border border-white/20 p-4 rounded-lg">
                      <p className="text-gray-300 text-base font-body leading-relaxed">
                        We work across markets and languages, with culturally aware teams fluent in localization and platform-native nuances.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Book IOI Now Button */}
            <div className="text-center mt-20">
              <Link href="/connect">
                <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-12 py-4 rounded-full transition-all duration-300 font-body font-medium text-lg transform hover:scale-105 hover:shadow-2xl">
                  BOOK IOI NOW
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="section relative bg-black py-24 lg:py-32 overflow-hidden">
          {/* Background Decorative Shapes */}
          <div className="absolute inset-0">
            <Image
              src="/shape.png"
              alt=""
              width={700}
              height={700}
              className="bg-shape-1 absolute top-1 -right-50 rotate-12 opacity-60 filter brightness-150"
            />
            <Image
              src="/shape.png"
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
  )
}