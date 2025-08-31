'use client'

import { useMemo, memo } from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage = memo(function HomePage() {

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

        {/* Tagline - Bottom */}
        <div className="pb-8 lg:pb-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-body font-light tracking-wider whitespace-nowrap overflow-hidden">
              WHERE STRATEGY MEETS STORY. POWERED BY DATA. DRIVEN BY VISION.
            </p>
          </div>
        </div>
      </main>

      {/* Latest Projects Section */}
      <section className="relative z-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <p className="text-[#ffe9c7] text-sm lg:text-base font-secondary font-light tracking-wider mb-2">
                CREATIONS
              </p>
              <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight">
                LATEST<br />PROJECTS
              </h2>
            </div>
            <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
              See What We Do
            </button>
          </div>


        </div>
      </section>

      {/* Contact Us CTA Section */}
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
              <p className="text-[#336b62] text-sm lg:text-base font-secondary font-medium tracking-wider mb-6 uppercase">
                Contact Us
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
                <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                  GET IN CONTACT
                </button>
                <button className="bg-transparent border-2 border-[#336b62] hover:bg-[#336b62] text-[#336b62] hover:text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                  VIEW CAREERS
                </button>
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