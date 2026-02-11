'use client'

import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import LogoLoop from '../../components/LogoLoop'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap, gsapUtils } from '../../lib/gsap'

export default function WorkPage() {
  // Animation state
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const introRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Company logos for partners section
  const companyLogos = [
  { src: "/companies/cityscape-qatar.webp", alt: "Cityscape Qatar" },
  { src: "/companies/homesrus.webp", alt: "HomesRUs" },
  { src: "/companies/daiso.webp", alt: "Daiso" },
  { src: "/companies/dfc.webp", alt: "DFC" },
  { src: "/companies/mcd.webp", alt: "McDonald's" },
  { src: "/companies/kfc.webp", alt: "KFC" },
  { src: "/companies/toyota.webp", alt: "Toyota" },
  { src: "/companies/honda.webp", alt: "Honda" },
  { src: "/companies/lg.webp", alt: "LG" },
  { src: "/companies/samsung.webp", alt: "Samsung" },
  { src: "/companies/hitachi.webp", alt: "Hitachi" },
  /*{ src: "/companies/pg.webp", alt: "P&G" },*/
  { src: "/companies/pepsico.webp", alt: "PepsiCo" },
  { src: "/companies/vodafone.webp", alt: "Vodafone" },
  { src: "/companies/citi.webp", alt: "Citi" },
  { src: "/companies/hsbc.webp", alt: "HSBC" },
  { src: "/companies/marriott.webp", alt: "Marriott" },
  /*{ src: "/companies/vfs-global.webp", alt: "VFS Global" },*/
  ];

  // GSAP Animation for intro quote
  useGSAP(() => {
    if (!introRef.current || !quoteRef.current || !contentRef.current) return

    // Set initial states
    gsap.set(introRef.current, { opacity: 1 })
    gsap.set(contentRef.current, { opacity: 0 })
    
    // Split the quote text into words for animation
    const words = gsapUtils.splitWords(quoteRef.current)
    
    // Responsive animation settings based on screen size and orientation
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    const isLandscape = window.innerWidth > window.innerHeight
    const isSmallScreen = window.innerWidth < 480
    
    // Adjust animation settings for different screen sizes and orientations
    const animationSettings = {
      staggerDelay: isSmallScreen ? 0.1 : isMobile ? 0.08 : isTablet ? 0.06 : 0.05,
      holdDuration: isSmallScreen ? 3.0 : isMobile ? 2.8 : 2.5,
      yOffset: isSmallScreen ? 20 : isMobile ? 30 : 50,
      rotationX: isSmallScreen ? -5 : isMobile ? -10 : -20,
      // Adjust for landscape mobile
      ...(isMobile && isLandscape && {
        staggerDelay: 0.06,
        holdDuration: 2.3,
        yOffset: 25
      })
    }
    
    // Create timeline for the intro animation
    const tl = gsap.timeline({
      onComplete: () => {
        setShowContent(true)
        setShowIntro(false)
      }
    })

    // Animate quote words in with responsive settings
    tl.fromTo(words, 
      { opacity: 0, y: animationSettings.yOffset, rotationX: animationSettings.rotationX },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.8, 
        stagger: animationSettings.staggerDelay,
        ease: "back.out(1.7)" 
      }
    )
    // Hold the quote for a responsive moment
    .to({}, { duration: animationSettings.holdDuration })
    // Fade out the quote with responsive stagger
    .to(words, { 
      opacity: 0, 
      y: isSmallScreen ? -15 : isMobile ? -20 : -30, 
      duration: 0.6, 
      stagger: isSmallScreen ? 0.04 : isMobile ? 0.03 : 0.02,
      ease: "power2.in" 
    })
    // Fade out the intro overlay
    .to(introRef.current, { 
      opacity: 0, 
      duration: 0.5,
      ease: "power2.in" 
    })
    // Fade in the main content
    .to(contentRef.current, { 
      opacity: 1, 
      duration: 0.8,
      ease: "power2.out" 
    }, "-=0.3")

    return () => tl.kill()
  })

  return (
    <>
      <Head>
        <title>Our Work | Global IMC Case Studies & Growth Playbooks</title>
        <meta name="description" content="Campaigns and platforms across brand, performance, and retail media. Explore creative automation, MMM, and AI workflows delivering network-grade results worldwide." />
        <meta name="keywords" content="marketing case studies, integrated campaigns, retail media results, creative automation, marketing mix modeling" />
        <meta property="og:title" content="Our Work | Global IMC Case Studies & Growth Playbooks" />
        <meta property="og:description" content="Campaigns and platforms across brand, performance, and retail media. Explore creative automation, MMM, and AI workflows delivering network-grade results worldwide." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Work | Global IMC Case Studies & Growth Playbooks" />
        <meta name="twitter:description" content="Campaigns and platforms across brand, performance, and retail media. Explore creative automation, MMM, and AI workflows delivering network-grade results worldwide." />
        <link rel="canonical" href="https://www.maisonelaris.com/work" />
      </Head>
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Quote Intro Overlay */}
      {showIntro && (
        <div 
          ref={introRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen overflow-hidden"
        >
          <div className="max-w-6xl mx-auto w-full text-center">
            <div className="relative px-4 sm:px-8 md:px-12 lg:px-16">
              {/* Quote marks - Responsive positioning and sizing */}
              <div className="text-[#336b62] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif absolute -top-2 sm:-top-4 md:-top-6 lg:-top-8 -left-2 sm:-left-4 md:-left-6 lg:-left-8 xl:-left-12 opacity-60 leading-none">"</div>
              <div className="text-[#336b62] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif absolute -bottom-2 sm:-bottom-4 md:-bottom-6 lg:-bottom-8 -right-2 sm:-right-4 md:-right-6 lg:-right-8 xl:-right-12 opacity-60 rotate-180 leading-none">"</div>
              
              {/* Quote text - Enhanced responsive typography */}
              <p 
                ref={quoteRef}
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light font-heading text-white leading-relaxed md:leading-relaxed lg:leading-loose italic px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-12 lg:py-16 max-w-5xl mx-auto"
              >
                The logos are familiar, but the journey is not. Discover how Maison Elaris transforms trust from leading brands into unforgettable impact.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header - only show when content is visible */}
      {showContent && <Header />}
      
      {/* Main Content */}
      <div ref={contentRef} className="opacity-0">
        <main className="relative">
        {/* Our Projects Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-8">
                OUR PROJECTS
              </h1>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Project Card 1 - Estée Lauder (Luxury Beauty Leader First) */}
              <Link href="/work/4">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Eucerin tablette paysage.webp"
                    alt="Performance Meets Prestige - Estée Lauder Campaign"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        Estée Lauder
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          UX/UI DESIGN
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          BRANDING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Card 2 - McDonald's (Global Recognition Second) */}
              <Link href="/work/2">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/mcdo.webp"
                    alt="Moments that Matter - McDonald's Campaign"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        McDonald&apos;s
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          DOOH CAMPAIGNS
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          MOBILE MARKETING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Card 3 - NIVEA + Eucerin (Global Skincare Third) */}
              <Link href="/work/5">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS nivea tablette paysage.webp"
                    alt="Wellness in Motion - NIVEA + Eucerin Campaign"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        NIVEA + Eucerin
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          HEALTHCARE MARKETING
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          EDUCATIONAL CONTENT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Card 4 - Samsung (Global Tech Giant) */}
              <Link href="/work/6">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/samsung tablette.webp"
                    alt="Scaling with Signal - Samsung Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        Samsung
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          UX/UI DESIGN
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          BRANDING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Card 5 - Under Armour (Sports Brand) */}
              <Link href="/work/1">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS under armourtablette paysage.webp"
                    alt="Athlete Engine - Under Armour Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        Under Armour
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          E-COMMERCE
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          PERSONALIZATION
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Project Card 6 - Swiss Arabian (Regional/Niche Brand) */}
              <Link href="/work/3">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Swiss Arabian tablette paysage.webp"
                    alt="Digital Bloom - Swiss Arabian Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Project Name - Bottom Left */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading font-bold text-lg lg:text-xl">
                        Swiss Arabian
                      </h3>
                    </div>
                    
                    {/* Tags - Bottom Right */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 text-right">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          UX/UI DESIGN
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                        <span className="text-white font-body font-semibold text-xs lg:text-sm uppercase tracking-wider">
                          PERFORMANCE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="relative z-20 py-16 lg:py-20 bg-black">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-6 text-center mb-12">
            <div>
              <h2 className="text-[#f5e6d3] text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight mb-6">
                BRANDS THAT TRUST US
              </h2>
              <p className="text-white text-lg lg:text-xl font-body font-light max-w-4xl mx-auto leading-relaxed">
                WE WORK WITH THE WORLD&apos;S MOST MEANINGFUL BRANDS, WITH AN ICONIC ROSTER THAT INCLUDES:
              </p>
            </div>
          </div>

          {/* Logo Loop - Full Width */}
          <div className="w-full overflow-hidden mt-16">
            <LogoLoop 
              logos={companyLogos}
              speed={40}
              direction="left"
              pauseOnHover={true}
              className="opacity-80"
            />
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute inset-0">
            <Image
              src="/shape.webp"
              alt=""
              width={700}
              height={700}
              className="absolute top-1 -right-50 rotate-12 opacity-60 filter brightness-150"
            />
            <Image
              src="/shape.webp"
              alt=""
              width={600}
              height={600}
              className="absolute bottom-0 -left-40 -rotate-12 opacity-50 filter brightness-150"
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
                  From global brands to local icons, we partner with businesses to scale ideas into impact.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/connect"><button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
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
        
        {/* Footer - only show when content is visible */}
        {showContent && <Footer />}
      </div>
      </div>
    </>
  )
}
