'use client'

import { useMemo, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SocialMediaSection from '../components/SocialMediaSection'
import AboutSection from '../components/AboutSection'
import CompaniesSection from '../components/CompaniesSection'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const HomePage = memo(function HomePage() {
  // Scroll animation hooks for all text elements
  const { ref: heroTaglineRef, animationClass: heroTaglineAnimation, isVisible: isHeroTaglineVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: creationsSubtitleRef, animationClass: creationsSubtitleAnimation, isVisible: isCreationsSubtitleVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: latestProjectsRef, animationClass: latestProjectsAnimation, isVisible: isLatestProjectsVisible } = useScrollAnimation<HTMLHeadingElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: seeWhatWeDoRef, animationClass: seeWhatWeDoAnimation, isVisible: isSeeWhatWeDoVisible } = useScrollAnimation<HTMLButtonElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: connectSubtitleRef, animationClass: connectSubtitleAnimation, isVisible: isConnectSubtitleVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: connectHeadingRef, animationClass: connectHeadingAnimation, isVisible: isConnectHeadingVisible } = useScrollAnimation<HTMLHeadingElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: connectDescRef, animationClass: connectDescAnimation, isVisible: isConnectDescVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: connectButtonsRef, animationClass: connectButtonsAnimation, isVisible: isConnectButtonsVisible } = useScrollAnimation<HTMLDivElement>({
    fadeInThreshold: 0.1
  })

  // Services section scroll animations
  const { ref: servicesSubtitleRef, animationClass: servicesSubtitleAnimation, isVisible: isServicesSubtitleVisible } = useScrollAnimation<HTMLParagraphElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: servicesTitleRef, animationClass: servicesTitleAnimation, isVisible: isServicesTitleVisible } = useScrollAnimation<HTMLHeadingElement>({
    fadeInThreshold: 0.1
  })
  
  const { ref: servicesCardsRef, animationClass: servicesCardsAnimation, isVisible: isServicesCardsVisible } = useScrollAnimation<HTMLDivElement>({
    fadeInThreshold: 0.1
  })

  // Memoize the logo elements to prevent unnecessary re-renders
  const logoElements = useMemo(() => {
    const logos = []
    for (let i = 0; i < 8; i++) { // Reduced from 12 to 8 for better performance
      logos.push(
        <div key={i} className="flex-shrink-0 mx-8 lg:mx-12">
          <Image 
            src="/home/logo2.png" 
            alt="Maison Elaris" 
            width={256}
            height={256}
            priority={i < 3} // Priority load first 3 images
            fetchPriority={i === 0 ? "high" : "auto"} // High priority for LCP
            className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          />
        </div>
      )
    }
    return logos
  }, [])

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Black Background */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Header */}
      <Header />

      {/* Hero Section with Infinite Scrolling Logos */}
      <main className="relative z-20 flex flex-col justify-between min-h-[calc(100vh-120px)]">
        {/* Infinite Scrolling Logos - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-full mx-auto">
            <div className="w-full overflow-hidden relative py-8">
              {/* Optimized infinite scroll container */}
              <div className="flex animate-infinite-scroll">
                {/* First set of logos */}
                <div className="flex flex-shrink-0">
                  {logoElements}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex flex-shrink-0">
                  {logoElements}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Overlay Image */}
        <div className="absolute inset-0 flex items-start justify-center pt-16 lg:pt-20 z-30 pointer-events-none">
          <div className="relative">
            <Image
              src="/Flot.png"
              alt="Flot Overlay"
              width={500}
              height={500}
              className="w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] object-contain opacity-90 drop-shadow-2xl animate-float"
              priority
            />
          </div>
        </div>

        {/* Tagline - Bottom */}
        <div className="pb-8 lg:pb-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p 
              ref={heroTaglineRef}
              className={`text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-body font-light tracking-wider whitespace-nowrap overflow-hidden ${heroTaglineAnimation}`}
              style={{ 
                opacity: isHeroTaglineVisible ? 1 : 0,
                visibility: isHeroTaglineVisible ? 'visible' : 'hidden'
              }}
            >
              WHERE STRATEGY MEETS STORY. POWERED BY DATA. DRIVEN BY VISION.
            </p>
          </div>
        </div>
      </main>

      {/* Latest Projects Section */}
      <section className="relative z-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <p 
                ref={creationsSubtitleRef}
                className={`text-[#ffe9c7] text-sm lg:text-base font-secondary font-light tracking-wider mb-2 ${creationsSubtitleAnimation}`}
                style={{ 
                  opacity: isCreationsSubtitleVisible ? 1 : 0,
                  visibility: isCreationsSubtitleVisible ? 'visible' : 'hidden'
                }}
              >
                CREATIONS
              </p>
              <h2 
                ref={latestProjectsRef}
                className={`text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight ${latestProjectsAnimation}`}
                style={{ 
                  opacity: isLatestProjectsVisible ? 1 : 0,
                  visibility: isLatestProjectsVisible ? 'visible' : 'hidden'
                }}
              >
                LATEST<br />PROJECTS
              </h2>
            </div>
            <button 
              ref={seeWhatWeDoRef}
              className={`bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium ${seeWhatWeDoAnimation}`}
              style={{ 
                opacity: isSeeWhatWeDoVisible ? 1 : 0,
                visibility: isSeeWhatWeDoVisible ? 'visible' : 'hidden'
              }}
            >
              See What We Do
            </button>
          </div>

          {/* Overlaying Projects Images */}
          <div className="relative flex justify-center items-start pt-4 h-96 lg:h-[500px] xl:h-[600px]">
            {/* Background container for the stacked effect */}
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              
              {/* Project 1 - Back layer (top position) */}
              <div className="absolute top-0 left-0 right-0 z-10">
                <div className="relative w-full h-80 lg:h-96 xl:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/work/project1.png"
                    alt="Project 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </div>

              {/* Project 2 - Middle layer (slightly down) */}
              <div className="absolute top-15 left-0 right-0 z-20">
                <div className="relative w-full h-80 lg:h-96 xl:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src="/work/project2.png"
                    alt="Project 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>

              {/* Project 3 - Front layer (further down) */}
              <div className="absolute top-30 left-0 right-0 z-30">
                <div className="relative w-full h-80 lg:h-96 xl:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/30">
                  <Image
                    src="/work/project3.png"
                    alt="Project 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 rounded-3xl"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-secondary tracking-wider mb-1">FEATURED WORK</p>
                  <h3 className="text-lg font-heading font-bold">Latest Projects</h3>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Companies Section */}
      <CompaniesSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p 
              ref={servicesSubtitleRef}
              className={`text-[#336b62] text-sm lg:text-base font-secondary font-light tracking-wider mb-4 ${servicesSubtitleAnimation}`}
              style={{ 
                opacity: isServicesSubtitleVisible ? 1 : 0,
                visibility: isServicesSubtitleVisible ? 'visible' : 'hidden'
              }}
            >
              Services
            </p>
            <h2 
              ref={servicesTitleRef}
              className={`text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight ${servicesTitleAnimation}`}
              style={{ 
                opacity: isServicesTitleVisible ? 1 : 0,
                visibility: isServicesTitleVisible ? 'visible' : 'hidden'
              }}
            >
              The Elaris Edge
            </h2>
          </div>

          {/* Services Cards */}
          <div 
            ref={servicesCardsRef}
            className={`grid md:grid-cols-3 gap-6 lg:gap-8 ${servicesCardsAnimation}`}
            style={{ 
              opacity: isServicesCardsVisible ? 1 : 0,
              visibility: isServicesCardsVisible ? 'visible' : 'hidden'
            }}
          >
            {/* Card 1 - Integrated Media Strategy & Buying */}
            <div className="relative bg-[#336b62] rounded-3xl p-6 lg:p-8 overflow-hidden">
              {/* Background Shape */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/shape.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-white text-lg lg:text-xl font-heading font-bold mb-4">
                  Integrated Media<br />Strategy & Buying
                </h3>
                
                <ul className="text-white/90 text-sm lg:text-base font-body space-y-2 mb-6">
                  <li>Media planning & buying (Search, Social, Programmatic, Display, Video, DOOH, Retail Media, TV, Radio, Print)</li>
                  <li>Audience insights & targeting</li>
                  <li>Data analytics & measurement</li>
                  <li>Cross-channel performance optimization</li>
                </ul>
                
                <div className="text-white/60 text-6xl lg:text-7xl font-heading font-bold">
                  01
                </div>
              </div>
            </div>

            {/* Card 2 - Creative Development & Storytelling */}
            <div className="relative bg-[#336b62] rounded-3xl p-6 lg:p-8 overflow-hidden">
              {/* Background Shape */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/shape.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-white text-lg lg:text-xl font-heading font-bold mb-4">
                  Creative<br />Development &<br />Storytelling
                </h3>
                
                <ul className="text-white/90 text-sm lg:text-base font-body space-y-2 mb-6">
                  <li>Content creation</li>
                  <li>Brand storytelling</li>
                  <li>Video production</li>
                  <li>E-commerce strategy</li>
                  <li>Engagement-led design</li>
                </ul>
                
                <div className="text-white/60 text-6xl lg:text-7xl font-heading font-bold">
                  02
                </div>
              </div>
            </div>

            {/* Card 3 - Digital Transformation & Consulting */}
            <div className="relative bg-[#336b62] rounded-3xl p-6 lg:p-8 overflow-hidden">
              {/* Background Shape */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="/shape.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-white text-lg lg:text-xl font-heading font-bold mb-4">
                  Digital<br />Transformation<br />& Consulting
                </h3>
                
                <ul className="text-white/90 text-sm lg:text-base font-body space-y-2 mb-6">
                  <li>Digital transformation</li>
                  <li>Martech solution</li>
                  <li>AI integration</li>
                  <li>Tech stack alignment</li>
                  <li>Automation tools</li>
                  <li>Data-driven innovation</li>
                </ul>
                
                <div className="text-white/60 text-6xl lg:text-7xl font-heading font-bold">
                  03
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMediaSection />

              {/* Connect CTA Section */}
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute inset-0">
          <Image
            src="/shape.png"
            alt=""
            width={700}
            height={700}
            className="absolute top-1 -right-50 rotate-12 opacity-60 filter brightness-150"
          />
          <Image
            src="/shape.png"
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
                 <p 
                   ref={connectSubtitleRef}
                   className={`text-[#336b62] text-sm lg:text-base font-secondary font-medium tracking-wider mb-6 uppercase ${connectSubtitleAnimation}`}
                   style={{ 
                     opacity: isConnectSubtitleVisible ? 1 : 0,
                     visibility: isConnectSubtitleVisible ? 'visible' : 'hidden'
                   }}
                 >
                   Connect With Us
                 </p>
              
              {/* Main Heading */}
              <h2 
                ref={connectHeadingRef}
                className={`text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight mb-8 ${connectHeadingAnimation}`}
                style={{ 
                  opacity: isConnectHeadingVisible ? 1 : 0,
                  visibility: isConnectHeadingVisible ? 'visible' : 'hidden'
                }}
              >
                CREATE TOMORROW,<br />
                TOGETHER
              </h2>
              
              {/* Description */}
              <p 
                ref={connectDescRef}
                className={`text-gray-300 text-lg lg:text-xl font-body font-light leading-relaxed mb-12 max-w-3xl mx-auto ${connectDescAnimation}`}
                style={{ 
                  opacity: isConnectDescVisible ? 1 : 0,
                  visibility: isConnectDescVisible ? 'visible' : 'hidden'
                }}
              >
                Every idea we share and every step we take moves us closer to a future we&apos;re proud to shape.
              </p>
              
              {/* CTA Buttons */}
              <div 
                ref={connectButtonsRef}
                className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${connectButtonsAnimation}`}
                style={{ 
                  opacity: isConnectButtonsVisible ? 1 : 0,
                  visibility: isConnectButtonsVisible ? 'visible' : 'hidden'
                }}
              >
                <Link href="/contact/general-inquiries">
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

      {/* Partners Section */}
      <section className="bg-black py-16 lg:py-24 relative z-20">
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

      {/* Footer */}
      <Footer />
    </div>
  )
})

export default HomePage