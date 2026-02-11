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
       { src: "/companies/cityscape-qatar.webp", alt: "Cityscape Qatar" },
    { src: "/companies/homesrus.webp", alt: "HomesRUs" },
    { src: "/companies/daiso.webp", alt: "Daiso" },
    { src: "/companies/dfc.webp", alt: "DFC" },
    { src: "/companies/mcd.webp", alt: "McDonald's" },
    { src: "/companies/kfc.webp", alt: "KFC" },
    { src: "/companies/toyota.webp", alt: "Toyota" },
    { src: "/companies/honda.webp", alt: "Honda" },
    { src: "/companies/lg.webp", alt: "LG" },
    { src: "/companies/samsung.webp", alt: "Samsung" },
    { src: "/companies/hitachi.webp", alt: "Hitachi" },
    /*{ src: "/companies/pg.webp", alt: "P&G" },*/
    { src: "/companies/pepsico.webp", alt: "PepsiCo" },
    { src: "/companies/vodafone.webp", alt: "Vodafone" },
    { src: "/companies/citi.webp", alt: "Citi" },
    { src: "/companies/hsbc.webp", alt: "HSBC" },
    { src: "/companies/marriott.webp", alt: "Marriott" },
    /*{ src: "/companies/vfs-global.webp", alt: "VFS Global" }*/
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
