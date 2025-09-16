'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSlideMenuOpen, setIsSlideMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSlideMenu = () => {
    setIsSlideMenuOpen(!isSlideMenuOpen)
  }

  // Close slide menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSlideMenuOpen(false)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* iPhone-Inspired Header */}
      <header className="relative z-50 flex items-center p-6 lg:p-8">
        {/* Logo */}
        <div className="text-white">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="Maison Elaris"
              width={180}
              height={90}
              className="h-16 lg:h-20 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu Button */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <button
            onClick={toggleSlideMenu}
            className="group flex flex-col items-center space-y-2 py-2 px-4 rounded-full hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle navigation menu"
          >
            <div className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300 font-body">
              Menu
            </div>
            <div className={`h-0.5 bg-white/60 group-hover:bg-white rounded-full transition-all duration-300 ${isSlideMenuOpen ? 'w-16' : 'w-20'}`}></div>
          </button>
        </div>

        {/* Right Navigation */}
        <div className="ml-auto flex items-center space-x-8">
                           {/* Desktop Navigation */}
                 <div className="hidden lg:flex items-center space-x-8">
                   <Link href="/about" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body text-sm">
                     About Us
                   </Link>
                  <Link href="/connect" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body text-sm">
                    Contact
                  </Link>
                 </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2"
            aria-label="Toggle mobile menu"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
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
            <Image
              src="/logo.png"
              alt="Maison Elaris"
              width={200}
              height={100}
              className="h-20 w-auto object-contain"
            />
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            <Link 
              href="/work" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Our Work
            </Link>
            <Link 
              href="/services" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link 
              href="/location" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Location
            </Link>
            <Link 
              href="/connect" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              href="/news" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              News
            </Link>
          </nav>
        </div>
      </div>

      {/* Slide-Up Navigation Menu - Desktop Only */}
      <div
        className={`fixed inset-0 z-[70] transition-all duration-500 ease-out hidden lg:block ${
          isSlideMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop with Progressive Blur */}
        <div 
          className={`absolute inset-0 bg-black/30 transition-all duration-500 ease-out ${
            isSlideMenuOpen ? 'backdrop-blur-sm' : 'backdrop-blur-none'
          }`}
          onClick={toggleSlideMenu}
          style={{
            backdropFilter: isSlideMenuOpen ? 'blur(4px)' : 'blur(0px)',
            transition: 'backdrop-filter 500ms ease-out, background-color 500ms ease-out'
          }}
        ></div>
        
        {/* Slide Menu Content with Progressive Blur */}
        <div 
          className={`absolute top-0 left-0 right-0 bg-black/20 border-b border-white/10 transition-all duration-500 ease-out ${
            isSlideMenuOpen ? 'translate-y-0 backdrop-blur-sm' : '-translate-y-full backdrop-blur-none'
          }`}
          style={{
            backdropFilter: isSlideMenuOpen ? 'blur(4px)' : 'blur(0px)',
            transition: 'transform 500ms ease-out, backdrop-filter 500ms ease-out, background-color 500ms ease-out'
          }}
        >
          {/* Navigation Menu */}
          <div className="px-6 pt-24 pb-8">
            <nav className="max-w-5xl mx-auto text-center">
              <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                <Link 
                  href="/work" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Our Work
                </Link>
                
                <Link 
                  href="/services" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Services
                </Link>
                
                <Link 
                  href="/about" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  About Us
                </Link>
                
                <Link 
                  href="/location" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Location
                </Link>
                
                <Link 
                  href="/connect" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Contact
                </Link>
                
                <Link 
                  href="/news" 
                  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  News
                </Link>
              </div>
            </nav>
            
            {/* Close Indicator at End of Menu */}
            <div className={`flex justify-center mt-12 transition-all duration-500 ${isSlideMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={toggleSlideMenu}
                className="group flex flex-col items-center space-y-2 py-4 px-6 rounded-full hover:bg-white/10 transition-all duration-300"
                aria-label="Close navigation menu"
              >
                <div className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300 font-body">
                  Close
                </div>
                <div className="h-0.5 w-16 bg-white/60 group-hover:bg-white rounded-full transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
