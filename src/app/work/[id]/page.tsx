'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Image from 'next/image'

// Project data
const projectsData = {
  '1': {
    title: 'Athlete Engine',
    subtitle: 'Under Armour Campaign',
    mission: ['E-COMMERCE OPTIMIZATION', 'PERSONALIZATION', 'RETARGETING'],
    description: 'Under Armour wanted to re-engage lapsed users and boost product discovery.',
    details: {
      client: 'Under Armour',
      localisation: '-',
      type: 'DIGITAL',
      date: '00-00-00',
      service: 'Brand Growth',
      challenge: 'Under Armour wanted to re-engage lapsed users and boost product discovery.',
      strategy: 'Leverage first-party data and product feeds to launch hyper-personalized product carousels and story ads.',
      execution: [
        'Launched Smart Shopping with product feed + dynamic creatives',
        'Retargeted audiences with workout-based segmentation',
        '"Train with Us" branded video for performance uplift'
      ],
      results: {
        roas: '5.6X',
        conversion: '-45%',
        reach: '+3.2X'
      }
    }
  },
  '2': {
    title: 'Moments that Matter',
    subtitle: 'McDonald\'s Campaign',
    mission: ['DOOH CAMPAIGNS', 'MOBILE MARKETING', 'RETAIL MEDIA'],
    description: 'McDonald\'s sought to promote app downloads and mobile ordering in high-footfall areas.',
    details: {
      client: 'McDonald\'s',
      localisation: '-',
      type: 'DIGITAL',
      date: '00-00-00',
      service: 'Brand Growth',
      challenge: 'McDonald\'s sought to promote app downloads and mobile ordering in high-footfall areas.',
      strategy: 'Use of DOOH, programmatic media, and geo-targeted mobile campaigns integrated with POS data.',
      execution: [
        'Launched location-aware display & mobile interstitials',
        'Built custom retail media measurement dashboards',
        'Live testing across food delivery platforms'
      ],
      results: {
        roas: '+41%',
        conversion: '+12%',
        reach: '+9%'
      }
    }
  },
  '3': {
    title: 'Digital Bloom',
    subtitle: 'Swiss Arabian Campaign',
    mission: ['GLOBAL EXPANSION', 'MULTILINGUAL CAMPAIGNS', 'HERITAGE BRANDING'],
    description: 'Build a global digital footprint while retaining regional heritage brand positioning.',
    details: {
      client: 'Swiss Arabian',
      localisation: 'GCC',
      type: 'DIGITAL',
      date: '00-00-00',
      service: 'Brand Growth',
      challenge: 'Build a global digital footprint while retaining regional heritage brand positioning.',
      strategy: 'Launch a multilingual performance site + digital storytelling campaign focused on heritage and modern luxury.',
      execution: [
        'Google Shopping + Search for perfume names',
        'Video ads showing scent rituals, crafted for YouTube & Meta',
        'Built localized e-com landing pages with A/B testing'
      ],
      results: {
        roas: '3.9X',
        conversion: 'Market',
        reach: '16.7M'
      }
    }
  },
  '4': {
    title: 'Performance Meets Prestige',
    subtitle: 'Estée Lauder Campaign',
    mission: ['UX/UI DESIGN', 'BRANDING', 'INFLUENCER MARKETING'],
    description: 'Grow eCommerce revenue across SEA markets without eroding brand equity.',
    details: {
      client: 'Estée Lauder',
      localisation: 'SEA markets',
      type: 'DIGITAL',
      date: '2023-Q1',
      service: 'Meta and TikTok spark ads and UGC',
      challenge: 'Grow eCommerce revenue across SEA markets without eroding brand equity.',
      strategy: 'Pair prestige branding with lower-funnel performance using Meta and TikTok spark ads and UGC',
      execution: [
        'Influencer collaborations with pixel tracking',
        'Beauty-led creatives for skincare routines & value packs',
        'Personalized retargeting with CRM overlays'
      ],
      results: {
        roas: '6.4X ROAS on TikTok',
        conversion: '2.1X higher conversion rate from UGC vs branded videos',
        reach: 'Lift in new customer acquisition by 27%'
      }
    }
  },
  '5': {
    title: 'Wellness in Motion',
    subtitle: 'NIVEA + Eucerin Campaign',
    mission: ['HEALTHCARE MARKETING', 'EDUCATIONAL CONTENT', 'SEARCH OPTIMIZATION'],
    description: 'Educate and activate audiences around skin science and new wellness SKUs.',
    details: {
      client: 'NIVEA + Eucerin',
      localisation: 'Global markets',
      type: 'HEALTHCARE',
      date: '2023-Q2',
      service: 'Long-form content and search & display ads across pharma segments',
      challenge: 'Educate and activate audiences around skin science and new wellness SKUs.',
      strategy: 'Use long-form content, local influencers, and search & display ads across pharma and skincare segments.',
      execution: [
        'Built always-on Google Search campaigns',
        'Launched branded "SkinTalk" YouTube series',
        'Developed product explainer videos in 5 languages'
      ],
      results: {
        roas: '23% increase in dermatologist-recommended clickthroughs',
        conversion: 'Top 3 ranking on product keywords within 2 months',
        reach: '42% increase in pharmacy retail footfall YoY'
      }
    }
  },
  '6': {
    title: 'Scaling with Signal',
    subtitle: 'Samsung Campaign',
    mission: ['PROGRAMMATIC DISPLAY', 'CROSS-PLATFORM STRATEGY', 'PERFORMANCE MARKETING'],
    description: 'Samsung needed to scale online sales during peak season while maintaining performance across multiple device segments.',
    details: {
      client: 'Samsung',
      localisation: '-',
      type: 'DIGITAL',
      date: '00-00-00',
      service: 'Brand Growth',
      challenge: 'Samsung needed to scale online sales during a peak season while maintaining performance across multiple device segments.',
      strategy: 'A cross-platform strategy combining programmatic display, YouTube video sequencing, and product-specific conversion campaigns.',
      execution: [
        'Dynamic creatives tailored by product affinity and retargeting windows',
        'Media orchestration across DV360, Meta, and TikTok',
        'Geo-focus on Southeast Asia with audience clustering from telecom & e-com data'
      ],
      results: {
        roas: '+32%',
        conversion: '-18%',
        reach: '25M'
      }
    }
  }
}

// Mapping project IDs to their corresponding banner images
const projectBannerImages = {
  '1': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS under armourtablette paysage.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/under armour   portrait.png'
  },
  '2': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/mcdo.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/mcdo.png'
  },
  '3': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Swiss Arabian tablette paysage.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/Swiss Arabian  portrait.png'
  },
  '4': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS Eucerin tablette paysage.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/Eucerin portrait.png'
  },
  '5': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/MAISON ELARIS nivea tablette paysage.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/nivea portrait.png'
  },
  '6': {
    landscape: '/elaris banners/DIMENSION TABLETTE/1024×768 px (en mode paysage)/samsung tablette.png',
    portrait: '/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/samsung.png'
  }
}

export default function ProductDetailsPage() {
  const params = useParams()
  const projectId = params?.id as string
  
  const project = projectsData[projectId as keyof typeof projectsData]

  // Fallback if project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-300 font-body">
              The requested project could not be found.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get responsive background images
  const bannerImages = projectBannerImages[projectId as keyof typeof projectBannerImages]
  const landscapeImage = bannerImages?.landscape || `/work/project${projectId}.png`
  const portraitImage = bannerImages?.portrait || `/work/project${projectId}.png`

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header - Positioned absolutely to overlay background */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Images - Responsive */}
          <div className="absolute inset-0 z-0">
            {/* Desktop/Tablet Landscape Image */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={landscapeImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Mobile Portrait Image */}
            <div className="block md:hidden absolute inset-0">
            <Image
                src={portraitImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            </div>
            
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 w-full h-full flex flex-col px-6 lg:px-8 pt-32 pb-16">
            {/* Title and Subtitle - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <div className="mb-8">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-4 leading-none text-left">
                  {project.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 font-body font-light text-left">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-200 font-body font-light leading-relaxed max-w-xl text-left">
                {project.description}
              </p>
            </div>

            {/* Mission Tags - Bottom Right */}
            <div className="absolute bottom-16 right-6 lg:right-8">
              <div className="flex flex-wrap gap-3 justify-end">
                {project.mission.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-secondary font-medium text-white tracking-wider hover:bg-white/30 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Project Details Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Side - Project Information Card */}
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10">
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
                     Project Details
                  </h2>
                </div>

                {/* Project Info Grid */}
                <div className="space-y-5">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700/50">
                    <span className="text-white font-body text-base lg:text-lg">Client</span>
                    <span className="text-gray-300 font-body text-base lg:text-lg">{project.details.client}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700/50">
                    <span className="text-white font-body text-base lg:text-lg">Localisation</span>
                    <span className="text-gray-300 font-body text-base lg:text-lg">{project.details.localisation}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700/50">
                    <span className="text-white font-body text-base lg:text-lg">Type</span>
                    <span className="text-gray-300 font-body text-base lg:text-lg">{project.details.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700/50">
                    <span className="text-white font-body text-base lg:text-lg">Date</span>
                    <span className="text-gray-300 font-body text-base lg:text-lg">{project.details.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-start pb-4">
                    <span className="text-white font-body text-base lg:text-lg">Service</span>
                    <span className="text-gray-300 font-body text-base lg:text-lg text-right max-w-xs">{project.details.service}</span>
                  </div>
                </div>

                {/* Contact US Button */}
                <div className="mt-10">
                  <button className="w-full bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-body font-medium text-lg">
                    Contact US
                  </button>
                </div>
              </div>

              {/* Right Side - Challenge, Strategy, Execution */}
              <div className="space-y-10">
                {/* Challenge */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4" style={{ color: '#5a9f98' }}>
                    Challenge :
                  </h3>
                  <div className="w-full h-px mb-6" style={{ backgroundColor: '#5a9f98' }}></div>
                  <p className="text-gray-300 font-body text-base lg:text-lg leading-relaxed">
                    {project.details.challenge}
                  </p>
                </div>

                {/* Strategy */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4" style={{ color: '#5a9f98' }}>
                    Strategy :
                  </h3>
                  <div className="w-full h-px mb-6" style={{ backgroundColor: '#5a9f98' }}></div>
                  <p className="text-gray-300 font-body text-base lg:text-lg leading-relaxed">
                    {project.details.strategy}
                  </p>
                </div>

                {/* Execution */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4" style={{ color: '#5a9f98' }}>
                    Execution :
                  </h3>
                  <div className="w-full h-px mb-6" style={{ backgroundColor: '#5a9f98' }}></div>
                  <ul className="space-y-3">
                    {project.details.execution.map((item, index) => (
                      <li key={index} className="text-gray-300 font-body text-base lg:text-lg leading-relaxed flex items-start">
                        <span className="mr-3 mt-1.5" style={{ color: '#5a9f98' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results/Performance Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Performance Metrics - Top Section */}
            {project.details.results && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
                {projectId === '1' ? (
                  // Under Armour specific layout
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +3.2X
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">in product page </span>
                        <span style={{ color: '#5a9f98' }} className="font-bold">views</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        -45%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">in cart</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">abandonment rate</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        5.6X
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">ROAS</span>
                        <br className="hidden sm:block" />
                        <span className="text-gray-300">on Meta campaign</span>
                      </p>
                    </div>
                  </>
                ) : projectId === '4' ? (
                  // Estée Lauder specific layout
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        6.4X
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">ROAS </span>
                        <span className="text-gray-300">on TIKTOK</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        2.1X
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">higher </span>
                        <span style={{ color: '#5a9f98' }} className="font-bold">conversion</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">rate </span>
                        <span className="text-gray-300">from UGC&apos;s</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +27%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">new customer</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">acquisition</span>
                      </p>
                    </div>
                  </>
                ) : projectId === '2' ? (
                  // McDonald's specific layout
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +41%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">in </span>
                        <span style={{ color: '#5a9f98' }} className="font-bold">app installs</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +12%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">order value</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">through app</span>
                        <br className="hidden sm:block" />
                        <span className="text-gray-300">vs. walk-ins</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +9%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">in BLS</span>
                      </p>
                    </div>
                  </>
                ) : projectId === '3' ? (
                  // Swiss Arabian specific layout
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        3.9X
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">global sales increase</span>
                        <br className="hidden sm:block" />
                        <span className="text-gray-300">over 4 months</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        Market
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">2 </span>
                        <span style={{ color: '#5a9f98' }} className="font-bold">new markets opened</span>
                        <br className="hidden sm:block" />
                        <span className="text-gray-300">(UK & Malaysia)</span>
                      </p>
                </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        16.7M
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">views </span>
                        <span className="text-gray-300">in 2.5 months</span>
                      </p>
              </div>
                  </>
                ) : projectId === '6' ? (
                  // Samsung specific layout
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        +32%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">increase in </span>
                        <span style={{ color: '#5a9f98' }} className="font-bold">ROAS</span>
                      </p>
                      </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        -18%
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span className="text-gray-300">in cost per</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">conversion</span>
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        25M
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body">
                        <span style={{ color: '#5a9f98' }} className="font-bold">impressions</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: '#5a9f98' }} className="font-bold">across 3 weeks</span>
                      </p>
                      </div>
                  </>
                ) : (
                  // Default layout for other projects
                  <>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        {project.details.results.roas.split(' ')[0]}
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body text-gray-300">
                        {project.details.results.roas.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        {project.details.results.conversion.split(' ')[0]}
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body text-gray-300">
                        {project.details.results.conversion.split(' ').slice(1).join(' ')}
                      </p>
                      </div>
                    <div className="text-center">
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4">
                        {project.details.results.reach.split(' ')[0]}
                      </h3>
                      <p className="text-base sm:text-lg lg:text-xl font-body text-gray-300">
                        {project.details.results.reach.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                  </>
                )}
                </div>
            )}

            {/* Campaign Images */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={projectId === '1' ? '/work/GS.png' : projectId === '2' ? '/work/MC.png' : projectId === '3' ? '/work/SA.png' : projectId === '6' ? '/work/SM.png' : '/work/reel.png'}
                  alt="Campaign Results"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain"
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
