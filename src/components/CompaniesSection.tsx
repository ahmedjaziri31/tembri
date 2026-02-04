'use client'

import { useMemo, memo } from 'react'
import Image from 'next/image'

const CompaniesSection = memo(function CompaniesSection() {
  // Company logos data
  /*const companyLogos = useMemo(() => [
    { src: '/companies/640px-hp_logo_2012.svg.webp', alt: 'HP' },
    { src: '/companies/samsung_logo.svg.webp', alt: 'Samsung' },
    { src: '/companies/nivea_logo.svg.webp', alt: 'Nivea' },
    { src: '/companies/dyson-logo-png_seeklogo-498548.webp', alt: 'Dyson' },
    { src: '/companies/hitachi-logo-2048x868.webp', alt: 'Hitachi' },
    { src: '/companies/under_armour_logo1.webp', alt: 'Under Armour' },
    { src: '/companies/eucerin-logo.webp', alt: 'Eucerin' },
    { src: '/companies/olay-logo.webp', alt: 'Olay' },
    { src: '/companies/accenture-logo-2020-present.webp', alt: 'Accenture' },
    { src: '/companies/8df4c5_dcc9e0d07bd046ef811598b74df1675d~mv2.webp', alt: 'Partner' },
    { src: '/companies/51r+kopkmll._ac_sl1000_.webp', alt: 'Partner' }
  ],*/
      const companyLogos = useMemo(() =>[
      { src: "/companies/logos-01.webp", alt: "Partner Logo 1" },
      { src: "/companies/logos-02.webp", alt: "Partner Logo 2" },
      { src: "/companies/logos-03.webp", alt: "Partner Logo 3" },
      { src: "/companies/logos-04.webp", alt: "Partner Logo 4" },
      { src: "/companies/logos-05.webp", alt: "Partner Logo 5" },
      { src: "/companies/logos-06.webp", alt: "Partner Logo 6" },
      { src: "/companies/logos-07.webp", alt: "Partner Logo 7" },
      { src: "/companies/logos-08.webp", alt: "Partner Logo 8" },
      { src: "/companies/logos-09.webp", alt: "Partner Logo 9" },
      { src: "/companies/logos-10.webp", alt: "Partner Logo 10" },
      { src: "/companies/logos-11.webp", alt: "Partner Logo 11" },
      { src: "/companies/logos-12.webp", alt: "Partner Logo 12" },
      { src: "/companies/logos-13.webp", alt: "Partner Logo 13" },
      { src: "/companies/logos-14.webp", alt: "Partner Logo 14" },
      { src: "/companies/logos-15.webp", alt: "Partner Logo 15" },
      { src: "/companies/logos-16.webp", alt: "Partner Logo 16" },
      { src: "/companies/logos-17.webp", alt: "Partner Logo 17" },
      { src: "/companies/logos-18.webp", alt: "Partner Logo 18" }
        ], [])

  // Memoize the logo elements to prevent unnecessary re-renders
  const logoElements = useMemo(() => {
    return companyLogos.map((logo, index) => (
      <div key={index} className="flex-shrink-0 mx-12 lg:mx-16">
        <Image 
          src={logo.src} 
          alt={logo.alt} 
          width={180}
          height={120}
          priority={index < 4} // Priority load first 4 images
          className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-500 filter grayscale hover:grayscale-0"
        />
      </div>
    ))
  }, [companyLogos])

  return (
    <section className="relative bg-black py-16 lg:py-20 overflow-hidden">
      <div className="w-full max-w-full mx-auto">
        <div className="w-full overflow-hidden relative">
          {/* Infinite scroll container */}
          <div className="flex animate-infinite-scroll">
            {/* First set of logos */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
            {/* Second set for seamless loop */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
            {/* Third set for better continuity */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
            {/* Fourth set for more infinite appearance */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
            {/* Fifth set for smoother transitions */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
            {/* Sixth set for truly infinite feel */}
            <div className="flex flex-shrink-0">
              {logoElements}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default CompaniesSection
