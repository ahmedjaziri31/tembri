import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-black text-white w-full z-10">
      {/* Main Footer Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Left Side - Brand and Contact */}
          <div className="mb-12 lg:mb-0">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-2 text-white">MAISON</h2>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">ELARIS</h2>
            </div>
            
            {/* Main Contact */}
            <div className="space-y-3 text-base text-gray-300 mb-6">
              <p className="hover:text-white transition-colors">📩 hello@maisonelaris.com</p>
              <p className="hover:text-white transition-colors">📞 +33 1 86 76 00 10 (Paris HQ)</p>
              <p className="hover:text-white transition-colors text-sm">Mon–Fri | 9:00 – 18:00 CET</p>
            </div>

            {/* PR & Partnerships */}
            <div className="space-y-2 text-sm text-gray-400">
              <p className="font-medium text-gray-300">PR & Partnerships</p>
              <p className="hover:text-white transition-colors">📩 partnerships@maisonelaris.com</p>
            </div>
          </div>

          {/* Right Side - Navigation & Locations */}
          <div className="flex flex-col space-y-8">
            {/* Navigation */}
            <div className="flex flex-col space-y-6 text-xl lg:text-2xl text-right">
              <Link href="/" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">Home</Link>
              <Link href="/about" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">ABOUT US</Link>
              <Link href="/work" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">OUR WORK</Link>
                                   <Link href="/contact" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">Contact</Link>
            </div>

            {/* Global Locations */}
            <div className="text-right">
              <p className="font-medium text-gray-300 mb-3 text-sm">Our Global Presence</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>London • Dubai HQ • Doha</p>
                <p>Singapore • Jakarta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-12 border-t border-gray-700">
          {/* Copyright */}
          <div className="mb-6 lg:mb-0">
            <p className="text-sm text-gray-400">Tembri rights / 2025</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-8 text-sm">
            <a href="https://www.linkedin.com/company/maisonelaris" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="https://www.instagram.com/maisonelaris" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</a>
            <a href="https://x.com/maisonelaris" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">X / Twitter</a>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Footer Image */}
      <div className="relative h-32 overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center">
          <div className="flex animate-infinite-scroll">
            <Image
              src="/footer/footer.png"
              alt="Maison Elaris"
              width={800}
              height={128}
              className="h-full object-contain"
            />
            <Image
              src="/footer/footer.png"
              alt="Maison Elaris"
              width={800}
              height={128}
              className="h-full object-contain"
            />
            <Image
              src="/footer/footer.png"
              alt="Maison Elaris"
              width={800}
              height={128}
              className="h-full object-contain"
            />
            <Image
              src="/footer/footer.png"
              alt="Maison Elaris"
              width={800}
              height={128}
              className="h-full object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
