'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center">
        <section className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-8 tracking-tight">
              LET'S CONNECT
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-body leading-relaxed max-w-3xl mx-auto">
              We're here to discuss your brand ambitions, partnership ideas, or media inquiries. 
              Whether you're looking to launch a campaign, explore collaboration, or simply say hello — we'd love to hear from you.
            </p>
          </div>

          {/* Contact Menu */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Careers */}
            <div className="border-b border-white/10 last:border-b-0">
              <Link href="/connect/careers" className="block">
                <div className="w-full text-left px-8 py-8 lg:py-10 text-white hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold group-hover:text-[#ffe9c7] transition-colors duration-300">
                      Careers
                    </h2>
                    <div className="text-white/60 group-hover:text-[#ffe9c7] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* General Inquiries */}
            <div className="border-b border-white/10 last:border-b-0">
              <Link href="/connect/general-inquiries" className="block">
                <div className="w-full text-left px-8 py-8 lg:py-10 text-white hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold group-hover:text-[#ffe9c7] transition-colors duration-300">
                      General Inquiries
                    </h2>
                    <div className="text-white/60 group-hover:text-[#ffe9c7] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* PR & Partnerships */}
            <div className="border-b border-white/10 last:border-b-0">
              <Link href="/connect/pr-partnerships" className="block">
                <div className="w-full text-left px-8 py-8 lg:py-10 text-white hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold group-hover:text-[#ffe9c7] transition-colors duration-300">
                      PR & Partnerships
                    </h2>
                    <div className="text-white/60 group-hover:text-[#ffe9c7] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Follow Us */}
            <div className="border-b border-white/10 last:border-b-0">
              <Link href="/connect/follow-us" className="block">
                <div className="w-full text-left px-8 py-8 lg:py-10 text-white hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold group-hover:text-[#ffe9c7] transition-colors duration-300">
                      Follow Us
                    </h2>
                    <div className="text-white/60 group-hover:text-[#ffe9c7] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
