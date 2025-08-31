'use client'

import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
                LET'S CONNECT
              </h1>
              <p className="text-[#336b62] text-xl lg:text-2xl font-heading font-medium mb-8">
                Careers
              </p>
              
              {/* Back Button */}
              <Link href="/connect">
                <button className="bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-3 rounded-full transition-colors duration-300 font-body font-medium mb-8">
                  Back To Contact
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* What It's Like to Work With Us Section */}
        <section className="py-20 px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Title */}
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  WHAT IT'S LIKE TO<br />
                  WORK WITH US
                </h2>
                <div className="w-20 h-1 bg-white mt-6"></div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-lg lg:text-xl text-white font-body mb-6">
                    We believe great work is built on :
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="text-white mt-2">•</div>
                      <div>
                        <p className="text-white font-body">
                          <strong>Autonomy and accountability :</strong> We trust our people to lead with initiative.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-white mt-2">•</div>
                      <div>
                        <p className="text-white font-body">
                          <strong>Borderless collaboration :</strong> Our culture transcends office walls and time zones.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="text-white mt-2">•</div>
                      <div>
                        <p className="text-white font-body">
                          <strong>Craft and curiosity :</strong> Whether you're in strategy, design, media, or data — we expect depth and foster continuous learning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-white font-body leading-relaxed">
                    We're not a traditional agency. We're a collective of thinkers, builders, and storytellers, 
                    shaping what's next in media, content, and commerce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 px-6 lg:px-8 relative">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to bottom, #000000 0%, #336b62 33%, #336b62 67%, #000000 100%)'
            }}
          ></div>
          <div className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Title */}
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  WHY JOIN US
                </h2>
                <div className="w-20 h-1 bg-white mt-6"></div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-white mt-2">✦</div>
                    <div>
                      <p className="text-white font-body">
                        <strong>Hybrid + Global Work Culture</strong><br />
                        Work with multicultural teams across markets while enjoying flexible setups.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-white mt-2">✦</div>
                    <div>
                      <p className="text-white font-body">
                        <strong>Mentorship & Learning Culture</strong><br />
                        We offer access to workshops, platform certifications, and internal knowledge sharing sessions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-white mt-2">✦</div>
                    <div>
                      <p className="text-white font-body">
                        <strong>Creative Freedom, Real Impact</strong><br />
                        You'll work directly with global brands and have a voice in the room — whether junior or senior.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-white mt-2">✦</div>
                    <div>
                      <p className="text-white font-body">
                        <strong>Competitive Packages</strong><br />
                        Our benefits are designed to reflect your worth and help you grow — personally and professionally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="py-20 px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Title */}
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
                  HOW TO APPLY
                </h2>
                <div className="w-20 h-1 bg-white mt-6"></div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-white font-body text-lg mb-8">
                    We're always open to meeting great minds.
                  </p>

                  <p className="text-white font-body text-lg mb-6">
                    To apply for an open role or express interest, please reach out at :
                  </p>

                  <div className="mb-8">
                    <a 
                      href="mailto:careers@maisonelaris.com" 
                      className="text-white font-body text-xl underline hover:text-[#ffe9c7] transition-colors duration-300"
                    >
                      careers@maisonelaris.com
                    </a>
                  </div>

                  <p className="text-white font-body text-lg">
                    Or visit our LinkedIn page for real-time openings.
                  </p>
                </div>

                <div className="pt-6">
                  <a 
                    href="https://www.linkedin.com/company/maisonelaris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-3 rounded-full transition-colors duration-300 font-body font-medium"
                  >
                    Visit LinkedIn Page
                  </a>
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
