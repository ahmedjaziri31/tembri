'use client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function FollowUsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center">
        <section className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-8 tracking-tight">
              FOLLOW US
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-body leading-relaxed max-w-3xl mx-auto">
              Stay connected with our latest creative campaigns, behind-the-scenes content, and industry insights across all our platforms.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-12 lg:p-16">
              {/* Social Media Icons */}
              <div className="flex justify-center space-x-8 mb-8">
                <a 
                  href="https://www.linkedin.com/company/maisonelaris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/maisonelaris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a4.83 4.83 0 0 0-1.744 1.135A4.83 4.83 0 0 0 .42 5.238c-.198.48-.333 1.036-.372 1.866C.01 7.93 0 8.396 0 12.017s.01 4.086.048 4.914c.04.83.174 1.385.372 1.866.196.636.51 1.208 1.135 1.744s1.108.94 1.744 1.135c.48.198 1.036.333 1.866.372.828.04 1.294.048 4.913.048s4.086-.01 4.914-.048c.83-.04 1.385-.174 1.866-.372a4.83 4.83 0 0 0 1.744-1.135 4.83 4.83 0 0 0 1.135-1.744c.198-.48.333-1.036.372-1.866.04-.828.048-1.294.048-4.913s-.01-4.086-.048-4.914c-.04-.83-.174-1.385-.372-1.866a4.83 4.83 0 0 0-1.135-1.744A4.83 4.83 0 0 0 18.238.42c-.48-.198-1.036-.333-1.866-.372C15.544.01 15.076 0 12.017 0zm0 2.16c3.628 0 4.058.01 5.486.048.864.04 1.334.185 1.648.307.414.16.71.354 1.02.664.31.31.504.606.664 1.02.122.314.267.784.307 1.648.04 1.428.048 1.858.048 5.486s-.01 4.058-.048 5.486c-.04.864-.185 1.334-.307 1.648-.16.414-.354.71-.664 1.02-.31.31-.606.504-1.02.664-.314.122-.784.267-1.648.307-1.428.04-1.858.048-5.486.048s-4.058-.01-5.486-.048c-.864-.04-1.334-.185-1.648-.307a2.668 2.668 0 0 1-1.02-.664 2.668 2.668 0 0 1-.664-1.02c-.122-.314-.267-.784-.307-1.648-.04-1.428-.048-1.858-.048-5.486s.01-4.058.048-5.486c.04-.864.185-1.334.307-1.648.16-.414.354-.71.664-1.02.31-.31.606-.504 1.02-.664.314-.122.784-.267 1.648-.307 1.428-.04 1.858-.048 5.486-.048z"/>
                    <path d="M12.017 15.93a3.913 3.913 0 1 1 0-7.826 3.913 3.913 0 0 1 0 7.826zm0-9.958a6.045 6.045 0 1 0 0 12.09 6.045 6.045 0 0 0 0-12.09zm10.675 6.045a1.42 1.42 0 1 1-2.84 0 1.42 1.42 0 0 1 2.84 0z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/maisonelaris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-[#336b62] hover:bg-[#9b8075] rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

              {/* Platform descriptions */}
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="text-center">
                  <h3 className="text-xl font-heading font-bold text-white mb-4">LinkedIn</h3>
                  <p className="text-gray-300 font-body">Connect with us professionally and stay updated on industry insights, company news, and career opportunities.</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-heading font-bold text-white mb-4">Instagram</h3>
                  <p className="text-gray-300 font-body">Follow our creative journey through behind-the-scenes content, campaign highlights, and visual storytelling.</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-heading font-bold text-white mb-4">X (Twitter)</h3>
                  <p className="text-gray-300 font-body">Join the conversation about the latest trends, industry news, and quick updates from our team.</p>
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
