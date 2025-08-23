'use client'

import { useState, useMemo, memo } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

const HomePage = memo(function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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

      {/* Navigation Header */}
      <header className="relative z-50 flex items-center justify-between p-6 lg:p-8">
        {/* Logo */}
        <div className="text-white">
          <div className="font-heading text-2xl tracking-wider">
            <span className="text-sm block mb-1 font-secondary">MAISON</span>
            <span className="text-xl font-bold">ELARIS</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">
            Home
          </a>
          <a href="#about" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">
            ABOUT US
          </a>
          <a href="#projects" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">
            Projects
          </a>
          <a href="#contact" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        {/* Additional Navigation Items */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="#about-us" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 text-sm font-body">
            À Propos De Nous
          </a>
          <a href="#contact" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 text-sm font-body">
            Contact
          </a>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 bg-black ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleMenu()
          }}
          className="absolute top-6 right-6 text-white p-2 z-20 bg-black/20 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Mobile Menu Content */}
        <div className="flex flex-col items-center justify-center h-full space-y-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-white text-3xl font-heading tracking-wider">
              <span className="text-lg block mb-2 font-secondary">MAISON</span>
              <span className="text-2xl font-bold">ELARIS</span>
            </div>
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            <a 
              href="#home" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              ABOUT US
            </a>
            <a 
              href="#projects" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </nav>

          <div className="flex flex-col items-center space-y-4 mt-8">
            <a 
              href="#about-us" 
              className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              À Propos De Nous
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

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
              <h2 className="text-white text-4xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight">
                LATEST<br />PROJECTS
              </h2>
            </div>
            <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
              See What We Do
            </button>
          </div>


        </div>
      </section>
    </div>
  )
})

export default HomePage