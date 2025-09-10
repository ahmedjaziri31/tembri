'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollVideoSection from '../../components/ScrollVideoSection'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* What We Do Hero Section */}
        <section className="py-20 lg:py-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-8 leading-tight">
                What We Do
              </h1>
              <p className="text-[#336b62] text-lg lg:text-xl xl:text-2xl font-secondary font-medium tracking-wide max-w-4xl mx-auto">
                Integrated Solutions. Creative Impact. Data-led Performance
              </p>
            </div>

            {/* Introduction Section */}
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left Column - Introduction Header */}
                <div className="lg:col-span-4">
                  <div className="relative">
                    <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
                      INTRODUCTION
                    </h2>
                    {/* Underline */}
                    <div className="w-20 h-0.5 bg-[#336b62]"></div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8">
                  <div className="space-y-6 text-lg lg:text-xl font-body font-light leading-relaxed text-gray-300">
                    <p>
                      At Maison Elaris, we believe modern marketing requires more than just campaigns — it demands convergence. We operate at the intersection of media, creativity, and data, helping brands connect with audiences in meaningful, measurable, and intelligently orchestrated ways.
                    </p>
                    <p>
                      Our services are designed to help you win in the new age of media — whether you're launching a product, scaling globally, or reimagining brand engagement. With capabilities spanning content creation to performance marketing and retail media, we help you build influence, drive demand, and shape culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Void Section - Spacing */}
        <section className="py-32 lg:py-48 bg-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Empty section for spacing */}
            <div className="h-32 lg:h-48"></div>
          </div>
        </section>

        {/* Scroll-Controlled Video Animation Section */}
        <ScrollVideoSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
