'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'

export default function LocationPage() {
  const locations = [
    {
      id: 'dubai',
      name: 'Dubai HQ',
      address: 'DMCC, Unit No. 30-01-5980, Jumeirah Lakes Tower, Dubai, United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      mapLink: 'https://maps.app.goo.gl/LFpbEPeURDdW7wsS9?g_st=ipc'
    },
    {
      id: 'london', 
      name: 'London',
      address: 'Greenside House, 50 Station Road, London N22 7DE',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      mapLink: 'https://maps.app.goo.gl/Yi9itwjKYc7ZyFKS9?g_st=ipc'
    },
    {
      id: 'paris',
      name: 'France',
      address: '33 Rue La Fayette, 75009 Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      mapLink: 'https://maps.app.goo.gl/nPk8xkaYcnkiGUih9?g_st=ipc'
    },
    {
      id: 'amsterdam',
      name: 'Netherlands',
      address: 'Wibautstraat 131D, 1091 GL Amsterdam',
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017',
      mapLink: 'https://maps.app.goo.gl/Lfw5WARbKcNdL7o28?g_st=ipc'
    },
    {
      id: 'doha',
      name: 'Doha', 
      address: '17th Floor, Office 16, Tornado Tower, West Bay, Doha, Qatar',
      image: 'https://tse4.mm.bing.net/th/id/OIP.tDvBZ-VqLnnWrQwsZajv6gHaEM?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      mapLink: 'https://maps.google.com?q=Netways,%20Palm%20(B)%20Tower,%2016%20Floor%20-%20Office%20%23%201602,%20Doha,%20Qatar&ftid=0x3e45c4c71e017a7d:0xf96d0348b40be2c6&entry=gps&lucs=,94275411,94284469,94224825,94227247,94227248,94231188,94280568,47071704,47069508,94218641,94280827,94282134,94203019,47084304&g_st=ipc'
    },
    {
      id: 'singapore',
      name: 'Singapore',
      address: '71 Robinson Road, Singapore 068895',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      mapLink: 'https://maps.app.goo.gl/tZmeNwbAaKXai6WD7?g_st=ipc'
    },
    {
      id: 'jakarta',
      name: 'Jakarta',
      address: 'Noble House, Jl. Prof.Dr. Satrio Jl. Mega Kuningan Barat Kav E 4.2, Daerah Khusus Ibukota Jakarta 12950, Indonesia',
      image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
      mapLink: 'https://maps.app.goo.gl/PgovBdtLuX7K4t8Y7?g_st=ipc'
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
                <a
                  key={location.id}
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden rounded-3xl aspect-[16/9] lg:aspect-[21/9] cursor-pointer transition-all duration-500 hover:scale-[1.02] block"
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
                </a>
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
