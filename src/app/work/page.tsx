'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Our Projects Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-8">
                OUR PROJECTS
              </h1>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                   {/* Project Card 1 */}
              <Link href="/work/1">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project1.png"
                    alt="Athlete Engine - Under Armour Campaign"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>

              {/* Project Card 2 */}
              <Link href="/work/2">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project2.png"
                    alt="Moments that Matter - McDonald's Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>

              {/* Project Card 3 */}
              <Link href="/work/3">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project3.png"
                    alt="Digital Bloom - Swiss Arabian Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>

              {/* Project Card 4 */}
              <Link href="/work/4">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project4.png"
                    alt="Performance Meets Prestige - Estée Lauder Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>

              {/* Project Card 5 */}
              <Link href="/work/5">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project5.png"
                    alt="Wellness in Motion - NIVEA + Eucerin Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>

              {/* Project Card 6 */}
              <Link href="/work/6">
                <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <Image
                    src="/work/project6.png"
                    alt="Scaling with Signal - Samsung Campaign"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Connect CTA Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Background Shapes */}
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
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
