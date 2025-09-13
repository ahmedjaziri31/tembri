'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
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
      localisation: 'Global markets',
      type: 'E-COMMERCE',
      date: '2023-Q4',
      service: 'Hyper-personalized product carousels and story ads',
      challenge: 'Under Armour wanted to re-engage lapsed users and boost product discovery.',
      strategy: 'Leverage first-party data and product feeds to launch hyper-personalized product carousels and story ads.',
      execution: [
        'Launched Smart Shopping with product feed + dynamic creatives',
        'Retargeted audiences with workout-based segmentation',
        '"Train with Us" branded video for performance uplift'
      ],
      results: {
        roas: '5.6X ROAS on Meta campaign',
        conversion: '45% reduction in cart abandonment rate',
        reach: '3.2X increase in product page views'
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
      localisation: 'Urban markets',
      type: 'RETAIL MEDIA',
      date: '2023-Q3',
      service: 'DOOH, programmatic media, and geo-targeted mobile campaigns',
      challenge: 'McDonald\'s sought to promote app downloads and mobile ordering in high-footfall areas.',
      strategy: 'Use of DOOH, programmatic media, and geo-targeted mobile campaigns integrated with POS data.',
      execution: [
        'Launched location-aware display & mobile interstitials',
        'Built custom retail media measurement dashboards',
        'Live testing across food delivery platforms'
      ],
      results: {
        roas: '+41% increase in app installs',
        conversion: '12% higher order value through app vs. walk-ins',
        reach: 'Lift in brand recall (+9%) in BLS'
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
      localisation: 'GCC + Global expansion',
      type: 'FRAGRANCE',
      date: '2023-Q3',
      service: 'Multilingual performance site + digital storytelling campaign',
      challenge: 'Build a global digital footprint while retaining regional heritage brand positioning.',
      strategy: 'Launch a multilingual performance site + digital storytelling campaign focused on heritage and modern luxury.',
      execution: [
        'Google Shopping + Search for perfume names',
        'Video ads showing scent rituals, crafted for YouTube & Meta',
        'Built localized e-com landing pages with A/B testing'
      ],
      results: {
        roas: '3.9X global sales increase over 4 months',
        conversion: '2 new markets opened (UK & Malaysia)',
        reach: '16.7M video views in 2.5 months'
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
      localisation: 'Southeast Asia',
      type: 'DIGITAL',
      date: '2023-Q4',
      service: 'Cross-platform programmatic and conversion campaigns',
      challenge: 'Samsung needed to scale online sales during a peak season while maintaining performance across multiple device segments.',
      strategy: 'A cross-platform strategy combining programmatic display, YouTube video sequencing, and product-specific conversion campaigns.',
      execution: [
        'Dynamic creatives tailored by product affinity and retargeting windows',
        'Media orchestration across DV360, Meta, and TikTok',
        'Geo-focus on Southeast Asia with audience clustering from telecom & e-com data'
      ],
      results: {
        roas: '+32% increase in ROAS',
        conversion: '18% reduction in cost-per-conversion',
        reach: '25M impressions across 3 weeks'
      }
    }
  }
}

export default function ProductDetailsPage() {
  const params = useParams()
  const projectId = params?.id as string
  const [backgroundImageExists, setBackgroundImageExists] = useState(false)
  
  const project = projectsData[projectId as keyof typeof projectsData]

  // Check if background image exists
  useEffect(() => {
    const checkBackgroundImage = async () => {
      try {
        const response = await fetch(`/work/project%20${projectId}/background.png`)
        setBackgroundImageExists(response.ok)
      } catch {
        setBackgroundImageExists(false)
      }
    }
    
    if (projectId) {
      checkBackgroundImage()
    }
  }, [projectId])

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

  const backgroundImage = backgroundImageExists 
    ? `/work/project%20${projectId}/background.png`
    : `/work/project${projectId}.png`

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
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-transparent"></div>
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

          {/* Bottom Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center space-y-2 text-white/70">
              <div className="w-px h-16 bg-white/30"></div>
              <div className="text-xs font-body tracking-wider rotate-90 origin-center">
                SCROLL
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="relative py-20 px-6 lg:px-8 bg-black overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-0 w-64 h-32 opacity-30">
            <div className="border-2 border-white/20 rounded-r-full h-full"></div>
          </div>
          <div className="absolute bottom-10 left-0 w-80 h-40 opacity-20">
            <div className="border-2 border-white/20 rounded-r-full h-full transform rotate-12"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Side - Project Information */}
              <div className="space-y-8">
                <div className="mb-12">
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-8 flex items-center">
                     Project Details
                  </h2>
                </div>

                {/* Project Info Grid */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-white font-secondary text-lg">Client</span>
                    <span className="text-gray-300 font-body">{project.details.client}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-white font-secondary text-lg">Localisation</span>
                    <span className="text-gray-300 font-body">{project.details.localisation}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-white font-secondary text-lg">Type</span>
                    <span className="text-gray-300 font-body">{project.details.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <span className="text-white font-secondary text-lg">Date</span>
                    <span className="text-gray-300 font-body">{project.details.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-start border-b border-gray-700 pb-4">
                    <span className="text-white font-secondary text-lg">Service</span>
                    <span className="text-gray-300 font-body text-right max-w-xs">{project.details.service}</span>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="mt-12">
                  <button className="w-full bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-secondary font-medium text-lg">
                    Connect
                  </button>
                </div>
              </div>

              {/* Right Side - Challenge, Strategy, Execution */}
              <div className="space-y-12">
                {/* Challenge */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
                    Challenge :
                  </h3>
                  <div className="w-full h-px bg-white mb-6"></div>
                  <p className="text-gray-300 font-body leading-relaxed">
                    {project.details.challenge}
                  </p>
                </div>

                {/* Strategy */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
                    Strategy :
                  </h3>
                  <div className="w-full h-px bg-white mb-6"></div>
                  <p className="text-gray-300 font-body leading-relaxed">
                    {project.details.strategy}
                  </p>
                </div>

                {/* Execution */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
                    Execution :
                  </h3>
                  <div className="w-full h-px bg-white mb-6"></div>
                  <ul className="space-y-3">
                    {project.details.execution.map((item, index) => (
                      <li key={index} className="text-gray-300 font-body leading-relaxed flex items-start">
                        <span className="text-white mr-3 mt-1.5">•</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Reel Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="/work/reel.png"
                    alt="Campaign Results - Social Media Performance"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Performance Metrics */}
              <div className="space-y-8">
                {/* Dynamic Results Display */}
                {project.details.results && (
                  <>
                    {/* Metric 1 - ROAS */}
                    <div className="space-y-2">
                      <div className="text-lg lg:text-xl font-secondary font-medium text-[#336b62] mb-2">
                        ROAS:
                      </div>
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white leading-tight">
                        {project.details.results.roas}
                      </h3>
                    </div>

                    {/* Metric 2 - Conversion */}
                    <div className="space-y-2">
                      <div className="text-lg lg:text-xl font-secondary font-medium text-[#336b62] mb-2">
                        Conversion Rate:
                      </div>
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white leading-tight">
                        {project.details.results.conversion}
                      </h3>
                    </div>

                    {/* Metric 3 - Reach/Impact */}
                    <div className="space-y-2">
                      <div className="text-lg lg:text-xl font-secondary font-medium text-[#336b62] mb-2">
                        Reach/Impact:
                      </div>
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white leading-tight">
                        {project.details.results.reach}
                      </h3>
                    </div>
                  </>
                )}

                {/* Additional Context */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <p className="text-lg text-gray-300 font-body leading-relaxed">
                    Through strategic implementation and data-driven optimization, 
                    we achieved exceptional performance across all key metrics, 
                    demonstrating measurable business impact and sustained growth for {project.details.client}.
                  </p>
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
