'use client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Image from 'next/image'

export default function FollowUsPage() {
  const locations = [
    {
      id: 'dubai',
      name: 'Dubai HQ',
      address: 'DMCC, Unit No. 30-01-5980, Jumeirah Lakes Tower, Dubai, United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=1200&fit=crop'
    },
    {
      id: 'london', 
      name: 'London',
      address: 'Greenside House, 50 Station Road, London N22 7DE',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=1200&fit=crop'
    },
    {
      id: 'doha',
      name: 'Doha', 
      address: '17th Floor, Office 16, Tornado Tower, West Bay, Doha, Qatar',
      image: 'https://images.unsplash.com/photo-1580676616842-c8b8e2b5a2b2?w=800&h=1200&fit=crop'
    },
    {
      id: 'singapore',
      name: 'Singapore',
      address: '71 Robinson Road, Singapore 068895',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=1200&fit=crop'
    },
    {
      id: 'jakarta',
      name: 'Jakarta',
      address: 'Noble House, Jl. Prof.Dr. Satrio Jl. Mega Kuningan Barat Kav E 4.2, Daerah Khusus Ibukota Jakarta 12950, Indonesia',
      image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=1200&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Our Global Locations Section */}
        <section className="pt-32 py-20 px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white mb-8">
                OUR GLOBAL<br />
                LOCATIONS
              </h2>
            </div>

            {/* Locations Grid */}
            <div className="space-y-6">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="relative group overflow-hidden rounded-3xl aspect-[16/9] lg:aspect-[21/9] cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Background Image */}
                  <Image
                    src={location.image}
                    alt={`${location.name} cityscape`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                  
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                    {/* Location Name */}
                    <div className="flex-1 flex items-end">
                      <h3 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white leading-tight">
                        {location.name}
                      </h3>
                    </div>
                    
                    {/* Address */}
                    <div className="mt-4 max-w-2xl">
                      <p className="text-sm lg:text-base text-white/90 font-body leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#336b62]/20 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
