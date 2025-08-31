'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Absolutely positioned to overlay background */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with Green Fade */}
        <section className="relative min-h-screen px-6 lg:px-8 overflow-hidden">
          {/* Green Fade Background - starts from very top */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#013a45] via-[#013a45] to-black"></div>
          
          <div className="relative max-w-7xl mx-auto pt-32">
            {/* Page Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-4 tracking-tight">
                ABOUT US
              </h1>
              <p className="text-[#336b62] text-xl lg:text-2xl font-heading font-medium tracking-wider">
                MAISON ELARIS
              </p>
            </div>

            {/* Content Section */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side - Large Heading with Shape */}
              <div className="relative">
                {/* Decorative Shape Behind Heading */}
                <div className="absolute top-0 left-0 opacity-30 pointer-events-none">
                  <Image
                    src="/about/shape.png"
                    alt="Decorative shape"
                    width={400}
                    height={400}
                    className="w-64 h-64 lg:w-96 lg:h-96"
                    priority
                  />
                </div>
                
                {/* Large Section Heading */}
                <h2 className="relative z-10 text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  UNLOCKING<br />
                  TRUE GROWTH
                </h2>
              </div>

              {/* Right Side - Content Text */}
              <div className="space-y-8">
                <p className="text-lg lg:text-xl text-white/90 font-body leading-relaxed">
                  In today's world, clients are desperate for growth. But the old levers of generating growth — endless ads, generic campaigns, and one-size-fits-all strategies — aren't working anymore. We were born from this very frustration. We saw brands pushing harder, spending more, yet struggling to truly connect with the people who matter most: their audience. So, we set out to build something different.
                </p>
                
                <p className="text-lg lg:text-xl text-white/90 font-body leading-relaxed">
                  At our core, we believe growth is no longer about shouting louder, but about telling stories that resonate, creating experiences that matter, and building strategies that inspire action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Designing Impact Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
                        {/* Infinite Scrolling Text - Right Direction */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-right-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/30">
                      DESIGNING
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Infinite Scrolling Text - Left Direction */}
            <div className="relative mb-12 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-left-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/30">
                      IMPACT
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative">
              {/* Main Content */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-2xl lg:text-3xl xl:text-4xl text-white font-body leading-relaxed">
                  We don't just market, we craft narratives. We don't just design, we create impact. And we don't just chase growth, we help our clients grow in ways that are meaningful, sustainable, and unforgettable.
        </p>
      </div>

              {/* Decorative Shape */}
              <div className="absolute top-0 right-0 lg:right-10 opacity-20 pointer-events-none">
                <Image
                  src="/shape.png"
                  alt="Background decorative shape"
                  width={400}
                  height={400}
                  className="w-64 h-64 lg:w-96 lg:h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Powered by Creativity Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          {/* Teal Gradient Background with fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#336b62] to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto">
                        {/* Infinite Scrolling Text - POWERED BY */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-right-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/40">
                      POWERED BY
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Infinite Scrolling Text - CREATIVITY */}
            <div className="relative mb-12 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-left-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/40">
                      CREATIVITY
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative">
              {/* Main Content */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-2xl lg:text-3xl xl:text-4xl text-white font-body leading-relaxed">
                  A team of creators, strategists, and visionaries who believe the future of growth lies in authenticity, creativity, and connection.
                </p>
              </div>

              {/* Decorative Shape */}
              <div className="absolute top-0 left-0 lg:left-10 opacity-30 pointer-events-none">
                <Image
                  src="/about/shape.png"
                  alt="Background decorative shape"
                  width={400}
                  height={400}
                  className="w-64 h-64 lg:w-96 lg:h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Craft at Every Level Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          {/* Teal Gradient Background with top and bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#013a45] to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto">
            {/* Infinite Scrolling Text - CRAFT AT */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-right-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/40">
                      CRAFT AT
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Infinite Scrolling Text - EVERY LEVEL */}
            <div className="relative mb-12 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-left-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/40">
                      EVERY LEVEL
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative">
              {/* Main Content */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-2xl lg:text-3xl xl:text-4xl text-white font-body leading-relaxed">
                  We build with our clients, not just for them, sharing knowledge, staying transparent, and holding ourselves accountable every step of the way.
                </p>
              </div>

              {/* Decorative Shape */}
              <div className="absolute top-0 right-0 lg:right-10 opacity-30 pointer-events-none">
                <Image
                  src="/shape.png"
                  alt="Background decorative shape"
                  width={400}
                  height={400}
                  className="w-64 h-64 lg:w-96 lg:h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Maison Elaris - Where Minds Unite Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black overflow-hidden">
          
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side - Content Text */}
              <div className="space-y-8">
                <p className="text-xl lg:text-2xl xl:text-3xl text-white font-body leading-relaxed">
                  At Maison Elaris, we believe brilliant work happens when diverse minds unite around a shared purpose. That's why we've built a borderless collective, a team without boundaries, but with one vision: to create ideas that travel and impact that lasts.
                </p>
              </div>

              {/* Right Side - Large Heading */}
              <div className="text-right">
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">
                  MAISON ELARIS<br />
                  <span className="text-4xl lg:text-5xl xl:text-6xl">WHERE MINDS UNITE</span>
                </h2>
                
                {/* Decorative Line */}
                <div className="w-32 h-1 bg-white ml-auto mt-8"></div>
              </div>
            </div>
          </div>
        </section>

        {/* From Europe Middle East To Asia Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Infinite Scrolling Text - FROM EUROPE (Right) */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-right-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/30">
                      FROM EUROPE
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Infinite Scrolling Text - MIDDLE EAST (Left) */}
            <div className="relative mb-6 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-left-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/30">
                      MIDDLE EAST
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Infinite Scrolling Text - TO ASIA (Right) */}
            <div className="relative mb-12 overflow-hidden">
              <div className="flex whitespace-nowrap animate-scroll-right-slow">
                <div className="flex items-center space-x-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white/30">
                      TO ASIA
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="relative">
              {/* Main Content */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-2xl lg:text-3xl xl:text-4xl text-white font-body leading-relaxed">
                  Our presence keeps us close to culture, talent, and consumers. Some days it's a strategy sprint in Amsterdam, other days a creative review across time zones, but always with the same spirit: agile, collaborative, and precise.
        </p>
      </div>

              {/* Decorative Shape */}
              <div className="absolute top-0 left-0 lg:left-10 opacity-20 pointer-events-none">
                <Image
                  src="/about/shape.png"
                  alt="Background decorative shape"
                  width={400}
                  height={400}
                  className="w-64 h-64 lg:w-96 lg:h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Green Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#336b62] to-transparent"></div>
          
          {/* Background Shapes */}
          <div className="absolute inset-0 pointer-events-none">
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
                  Connect With Us
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
                  <Link href="/connect/general-inquiries">
                    <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                      GET IN CONTACT
                    </button>
                  </Link>
                  <Link href="/connect/careers">
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
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
} 