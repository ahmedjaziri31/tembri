'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function ScrollVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showText, setShowText] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)
  const [showThirdText, setShowThirdText] = useState(false)
  const [showFourthText, setShowFourthText] = useState(false)
  const [showFifthText, setShowFifthText] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    
    if (!video || !section) return

    // Preload video
    video.preload = 'metadata'
    
    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height
      
      // Check if section has started entering viewport (start fade when section top reaches bottom of screen)
      const sectionStarted = rect.top <= windowHeight
      setShowVideo(sectionStarted)
      
      // Check if we're in the video section (section is visible and controlling scroll)
      const inVideoSection = rect.top <= 0 && rect.bottom > windowHeight
      
      if (inVideoSection) {
        // Calculate how far we've scrolled through the section
        const scrolledDistance = Math.abs(rect.top)
        const totalScrollDistance = sectionHeight - windowHeight
        const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollDistance))
        
        // Map progress to video timeline (0-36 seconds)
        const videoTime = progress * 36
        
        // Update video current time
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          video.currentTime = videoTime
        }
        
        // Show first text between 5-7 seconds
        setShowText(videoTime >= 5 && videoTime <= 7)
        
        // Show second text between 12-14 seconds
        setShowSecondText(videoTime >= 12 && videoTime <= 14)
        
        // Show third text between 18-20 seconds
        setShowThirdText(videoTime >= 18 && videoTime <= 20)
        
        // Show fourth text between 25-27 seconds
        setShowFourthText(videoTime >= 25 && videoTime <= 27)
        
        // Show fifth text between 32-34 seconds
        setShowFifthText(videoTime >= 32 && videoTime <= 34)
      } else if (rect.top > 0) {
        // Section hasn't started yet
        setShowText(false)
        setShowSecondText(false)
        setShowThirdText(false)
        setShowFourthText(false)
        setShowFifthText(false)
        if (video.readyState >= 2) {
          video.currentTime = 0
        }
      } else {
        // Section has passed
        setShowText(false)
        setShowSecondText(false)
        setShowThirdText(false)
        setShowFourthText(false)
        setShowFifthText(false)
        if (video.readyState >= 2) {
          video.currentTime = 36
        }
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[500vh] overflow-hidden" // 500vh to allow for full video scroll control
    >
      {/* Background Video - Only show when section starts */}
      <div 
        className={`fixed top-0 left-0 h-screen w-full z-10 transition-opacity duration-500 ${
          showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        >
          <source src="/services/animation maison elaris.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Text Overlay - Shows at 5s, hides at 7s */}
        <div 
          className={`absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-16 transition-opacity duration-500 z-20 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl text-white text-left">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-8 leading-tight">
              Maximize Your Investments Across Every Touchpoint.
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-body font-light leading-relaxed">
                We design data-driven media strategies rooted in deep audience understanding and modern platform fluency. Our approach combines human insight and machine intelligence to architect full-funnel plans — from awareness to performance.
              </p>
              
              {/* Includes Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Includes:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Omnichannel media planning (Digital, Offline, CTV, OOH)</li>
                  <li>• Programmatic & platform-specific execution (Google, Meta, TikTok, Amazon, etc.)</li>
                  <li>• Budget optimization & pacing intelligence</li>
                  <li>• Brand lift, attention, and outcome measurement</li>
                </ul>
              </div>
              
              {/* Perfect For Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Global campaigns, performance-driven growth, and high-velocity launches.</li>
                </ul>
              </div>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#ffe9c7] hover:bg-white text-[#336b62] px-8 py-4 rounded-full transition-colors duration-300 font-body font-bold text-lg">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Second Text Overlay - Shows at 12s, hides at 14s */}
        <div 
          className={`absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-16 transition-opacity duration-500 z-20 ${
            showSecondText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl text-white text-left">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-8 leading-tight">
              Craft Narratives That Convert And Content That Travels.
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-body font-light leading-relaxed">
                We blend brand identity with audience intent to produce emotionally resonant and platform-native content. From high-concept campaigns to always-on assets, our creative is designed to stop thumbs and start conversations.
              </p>
              
              {/* Includes Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Includes:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Video, image, and animation production</li>
                  <li>• Platform-first content for Meta, TikTok, YouTube, DOOH</li>
                  <li>• UGC & branded storytelling</li>
                  <li>• Creator strategy and influencer integration</li>
                  <li>• Visual systems for global campaign consistency</li>
                </ul>
              </div>
              
              {/* Perfect For Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Beauty, fashion, FMCG, and consumer tech brands seeking creative consistency across regions.</li>
                </ul>
              </div>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#ffe9c7] hover:bg-white text-[#336b62] px-8 py-4 rounded-full transition-colors duration-300 font-body font-bold text-lg">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Third Text Overlay - Shows at 18s, hides at 20s */}
        <div 
          className={`absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-16 transition-opacity duration-500 z-20 ${
            showThirdText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl text-white text-left">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-8 leading-tight">
              Your Brand&apos;s Sharpest Tool Is Knowing Who, When, And Why.
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-body font-light leading-relaxed">
                From first-party enrichment to lookalike modeling, we transform data into decisions. Our analytics team integrates platform insights with custom dashboards and machine learning signals to find and activate audiences that matter most.
              </p>
              
              {/* Includes Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Includes:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Audience segmentation & persona development</li>
                  <li>• Cross-platform performance analytics</li>
                  <li>• Custom dashboards and business intelligence (GA4, Looker, Power BI)</li>
                  <li>• Marketing mix modeling & budget reallocation</li>
                </ul>
              </div>
              
              {/* Perfect For Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Brands aiming to scale sustainably or decode campaign ROI.</li>
                </ul>
              </div>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#ffe9c7] hover:bg-white text-[#336b62] px-8 py-4 rounded-full transition-colors duration-300 font-body font-bold text-lg">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Text Overlay - Shows at 25s, hides at 27s */}
        <div 
          className={`absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-16 transition-opacity duration-500 z-20 ${
            showFourthText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl text-white text-left">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-8 leading-tight">
              Bridge Brand Vision With Technology-Driven Marketing Execution
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-body font-light leading-relaxed">
                Maison Elaris guides businesses through transformation — integrating modern media, martech, and measurement. From tech stack audits to innovation sprints, we partner with clients on the journey toward scalable, future-facing ecosystems.
              </p>
              
              {/* Includes Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Includes:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Martech & data architecture consulting</li>
                  <li>• Performance media transformation</li>
                  <li>• In-housing strategy and training</li>
                  <li>• AI + automation frameworks for campaign management</li>
                  <li>• Retail, CRM, CDP, and analytics stack alignment</li>
                </ul>
              </div>
              
              {/* Perfect For Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Organizations scaling internal teams or replatforming tech capabilities.</li>
                </ul>
              </div>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#ffe9c7] hover:bg-white text-[#336b62] px-8 py-4 rounded-full transition-colors duration-300 font-body font-bold text-lg">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fifth Text Overlay - Shows at 32s, hides at 34s */}
        <div 
          className={`absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-16 transition-opacity duration-500 z-20 ${
            showFifthText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl text-white text-left">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-8 leading-tight">
              Turn Shelf Space Into Screen Space.
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-body font-light leading-relaxed">
                In a world where every touchpoint is shoppable, we help brands navigate and master retail media networks — from Amazon to Carrefour. We build performance-driven commerce strategies integrated across media, shelf, and content.
              </p>
              
              {/* Includes Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Includes:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• Amazon Ads, Walmart Connect, Carrefour, TikTok Shop, Lazada, Shopee</li>
                  <li>• Content-to-cart pathways across social + eCommerce</li>
                  <li>• DSP management, feed optimization</li>
                  <li>• Offline & retail attribution integrations</li>
                  <li>• Promotion calendar alignment</li>
                </ul>
              </div>
              
              {/* Perfect For Section */}
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Perfect for:</h3>
                <ul className="space-y-2 text-lg font-body">
                  <li>• FMCG, beauty, electronics, and DTC brands leveraging retailer ecosystems.</li>
                </ul>
              </div>
              
              {/* Contact Button */}
              <div className="pt-4">
                <Link href="/contact">
                  <button className="bg-[#ffe9c7] hover:bg-white text-[#336b62] px-8 py-4 rounded-full transition-colors duration-300 font-body font-bold text-lg">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
