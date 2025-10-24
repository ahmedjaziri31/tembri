'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function MaintenancePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>Site Temporarily Unavailable | Maison Elaris</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#336b62]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9b8075]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#336b62] to-[#9b8075] rounded-2xl flex items-center justify-center shadow-2xl">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Service
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#336b62] to-[#9b8075]">
              Unavailable
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
            This website is currently undergoing maintenance. We apologize for any inconvenience.
          </p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 mt-1">
                <svg 
                  className="w-6 h-6 text-[#336b62]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-heading font-semibold text-lg mb-2">
                  We&apos;ll Be Back Soon
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our website is currently being updated. Please check back later for access to our full services and content.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-gray-400 text-sm">
            <p className="mb-2">Need immediate assistance?</p>
            <a 
              href="mailto:contact@maisonelaris.com" 
              className="text-[#336b62] hover:text-[#9b8075] transition-colors duration-300 font-medium"
            >
              contact@maisonelaris.com
            </a>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Maison Elaris. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#336b62]/50 to-transparent"></div>
      </div>
    </>
  )
}
