'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ArticlesSection from '../../components/ArticlesSection'
import Image from 'next/image'
import Link from 'next/link'

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Newsroom Hero Section */}
        <section className="py-20 lg:py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 leading-tight">
                NEWSROOM
              </h1>
              <p className="text-[#336b62] text-lg lg:text-xl font-secondary font-medium tracking-wide">
                MAISON ELARIS
              </p>
            </div>

            {/* Featured Article Section */}
            <div className="w-[90%] mx-auto">
              <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-3xl">
                {/* Full Width Background Image */}
                <Image
                  src="/news/image.png"
                  alt="Creative Trends 2025"
                  fill
                  className="object-cover"
                  priority
                />
              
              {/* Content - All Bottom Left */}
              <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-10 space-y-6">
                {/* Read Article Button - Rounded */}
                <div>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-300 font-body font-medium backdrop-blur-sm border border-white/20">
                    READ ARTICLE
                  </button>
                </div>
                
                {/* Main Title with Underline */}
                <div>
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight max-w-2xl">
                    CREATIVE TRENDS 2025
                  </h2>
                  {/* Underline */}
                  <div className="w-32 lg:w-40 h-0.5 bg-white mt-4"></div>
                </div>
                
                {/* Download Button */}
                <div>
                  <Link href="#" download>
                    <button className="text-white font-body font-medium text-sm lg:text-base hover:text-gray-200 transition-colors duration-300">
                      DOWNLOAD PDF
                    </button>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <ArticlesSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
