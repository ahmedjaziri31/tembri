import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-black text-white w-full z-10">
      {/* Main Footer Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 sm:mb-16">
          {/* Left Side - Brand and Contact */}
          <div className="mb-8 sm:mb-12 lg:mb-0 w-full lg:w-auto">
            <div className="mb-6 sm:mb-8">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Maison Elaris"
                  width={240}
                  height={120}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                />
              </Link>
            </div>
            
            {/* Main Contact */}
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
              <a href="mailto:hello@maisonelaris.com" className="hover:text-white transition-colors break-all sm:break-normal block cursor-pointer">hello@maisonelaris.com</a>
              <a href="tel:+33186760010" className="hover:text-white transition-colors block cursor-pointer">+33 1 86 76 00 10 (Paris HQ)</a>
              <p className="hover:text-white transition-colors text-xs sm:text-sm">Mon–Fri | 9:00 – 18:00 CET</p>
            </div>

            {/* PR & Partnerships */}
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <p className="font-medium text-gray-300">PR & Partnerships</p>
              <a href="mailto:partnerships@maisonelaris.com" className="hover:text-white transition-colors break-all sm:break-normal block cursor-pointer">partnerships@maisonelaris.com</a>
            </div>
          </div>

          {/* Right Side - Navigation & Locations */}
          <div className="flex flex-col space-y-6 sm:space-y-8 w-full lg:w-auto">
            {/* Navigation */}
            <div className="flex flex-col space-y-4 sm:space-y-6 text-lg sm:text-xl lg:text-2xl text-left lg:text-right">
              <Link href="/" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">Home</Link>
              <Link href="/about" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">ABOUT US</Link>
              <Link href="/work" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">OUR WORK</Link>
              <Link href="/connect" className="text-white hover:text-[#ffe9c7] transition-colors duration-300 font-body">Contact</Link>
            </div>

            {/* Global Locations */}
            <div className="text-left lg:text-right">
              <p className="font-medium text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Our Global Presence</p>
              <div className="space-y-1 text-xs text-gray-400">
                <p>London • Dubai HQ • Doha</p>
                <p>Singapore • Jakarta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 sm:pt-12 border-t border-gray-700">
          {/* Copyright */}
          <div className="mb-4 sm:mb-6 lg:mb-0">
            <p className="text-xs sm:text-sm text-gray-400">Tembri rights / 2025</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 sm:space-x-8 text-xs sm:text-sm">
            <a href="https://linkedin.com/company/maison-elaris" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="https://www.instagram.com/maiisonelaris/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</a>
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
