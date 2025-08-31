'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

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
          <Link href="/" className="font-heading text-2xl tracking-wider">
            <span className="text-sm block mb-1 font-secondary">MAISON</span>
            <span className="text-xl font-bold">ELARIS</span>
          </Link>
        </div>

        {/* Absolutely Centered Menu Button */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
            <Link href="/contact" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body text-sm">
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
            <div className="text-white text-3xl font-heading tracking-wider">
              <span className="text-lg block mb-2 font-secondary">MAISON</span>
              <span className="text-2xl font-bold">ELARIS</span>
            </div>
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            <Link 
              href="/" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              ABOUT US
            </Link>
            <Link 
              href="/work" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Our Work
            </Link>
            <Link 
              href="/contact" 
              className="text-white text-2xl hover:text-[#ffe9c7] transition-colors duration-300 font-body"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Slide-Up Navigation Menu */}
      <div
        className={`fixed inset-0 z-[70] transition-all duration-500 ease-out ${
          isSlideMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={toggleSlideMenu}
        ></div>
        
        {/* Slide Menu Content */}
        <div 
          className={`absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-b border-white/10 transition-transform duration-500 ease-out ${
            isSlideMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Navigation Menu */}
          <div className="px-6 pt-24 pb-8">
            <nav className="max-w-2xl mx-auto text-center">
              <div className="space-y-4">
                <Link 
                  href="/" 
                  className="block text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Home
                </Link>
                
                <Link 
                  href="/about" 
                  className="block text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  About Us
                </Link>
                
                <Link 
                  href="/work" 
                  className="block text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Our Work
                </Link>
                
                <Link 
                  href="/contact" 
                  className="block text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
                  onClick={toggleSlideMenu}
                >
                  Contact
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
