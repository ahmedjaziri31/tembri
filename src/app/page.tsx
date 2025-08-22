'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Emerald Void Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)",
        }}
      />

      {/* Navigation Header */}
      <header className="relative z-50 flex items-center justify-between p-6 lg:p-8">
        {/* Logo */}
        <div className="text-white">
          <div className="text-2xl font-light tracking-wider">
            <span className="text-sm block mb-1">MAISON</span>
            <span className="text-xl font-bold">ELARIS</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-emerald-300 transition-colors duration-300">
            Home
          </a>
          <a href="#about" className="text-white hover:text-emerald-300 transition-colors duration-300">
            ABOUT US
          </a>
          <a href="#projects" className="text-white hover:text-emerald-300 transition-colors duration-300">
            Projects
          </a>
          <a href="#contact" className="text-white hover:text-emerald-300 transition-colors duration-300">
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
          <a href="#about-us" className="text-white hover:text-emerald-300 transition-colors duration-300 text-sm">
            À Propos De Nous
          </a>
          <a href="#contact" className="text-white hover:text-emerald-300 transition-colors duration-300 text-sm">
            Contact
          </a>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #000000 95%, #072607 100%)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white p-2"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Mobile Menu Content */}
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="text-center mb-8">
            <div className="text-white text-3xl font-light tracking-wider">
              <span className="text-lg block mb-2">MAISON</span>
              <span className="text-2xl font-bold">ELARIS</span>
            </div>
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            <a 
              href="#home" 
              className="text-white text-2xl hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-white text-2xl hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              ABOUT US
            </a>
            <a 
              href="#projects" 
              className="text-white text-2xl hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-white text-2xl hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </nav>

          <div className="flex flex-col items-center space-y-4 mt-8">
            <a 
              href="#about-us" 
              className="text-white hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              À Propos De Nous
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-emerald-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="relative z-20 flex-1 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-7xl mx-auto px-6 text-center">
          {/* Main Hero Text */}
          <div className="space-y-2 mb-16">
            {/* First Row */}
            <div className="flex justify-center items-center space-x-8">
              <h1 
                className="font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
                }}
              >
                MAISON
              </h1>
              <h1 
                className="font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
                }}
              >
                MAISON
              </h1>
            </div>
            
            {/* Second Row */}
            <div className="flex justify-center items-center space-x-8">
              <h1 
                className="font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
                }}
              >
                ELARIS
              </h1>
              <h1 
                className="font-hero text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
                }}
              >
              ELARIS
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <div className="max-w-4xl mx-auto">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wider leading-relaxed">
              WHERE STRATEGY MEETS STORY. POWERED BY DATA. DRIVEN BY VISION.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}