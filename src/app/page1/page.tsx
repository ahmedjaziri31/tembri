'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CircularGallery from '../../components/CircularGallery'
import LogoLoop from '../../components/LogoLoop'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { articlesApi } from '../../lib/api'

interface Article {
  id: number
  title: string
  category: string
  image?: string
  type?: string
  slug?: string
  excerpt?: string
  published_at?: string
}

export default function Page1() {
  // State for controlling animation phases
  const [showHeaderFooter, setShowHeaderFooter] = useState(false)
  const [animationsComplete, setAnimationsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  
  // Articles state
  const [articles, setArticles] = useState<Article[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)

  // Project items for circular gallery - Using tablet portrait images with optimized paths
  const projectItems = [
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/under armour   portrait.png", 
      text: "Under Armour",
      width: 768,
      height: 1024
    },
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/samsung.png", 
      text: "Samsung",
      width: 768,
      height: 1024
    },
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/Swiss Arabian  portrait.png", 
      text: "Swiss Arabian",
      width: 768,
      height: 1024
    },
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/mcdo.png", 
      text: "McDonald's",
      width: 768,
      height: 1024
    },
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/Eucerin portrait.png", 
      text: "Eucerin",
      width: 768,
      height: 1024
    },
    { 
      image: "/elaris banners/DIMENSION TABLETTE/768×1024 px (en mode portrait)/nivea portrait.png", 
      text: "Nivea",
      width: 768,
      height: 1024
    }
  ]

  // Company logos for partners section
  const companyLogos = [
    { src: "/companies/640px-hp_logo_2012.svg.png", alt: "HP" },
    { src: "/companies/samsung_logo.svg.png", alt: "Samsung" },
    { src: "/companies/nivea_logo.svg.png", alt: "Nivea" },
    { src: "/companies/dyson-logo-png_seeklogo-498548.png", alt: "Dyson" },
    { src: "/companies/hitachi-logo-2048x868.png", alt: "Hitachi" },
    { src: "/companies/under_armour_logo1.png", alt: "Under Armour" },
    { src: "/companies/eucerin-logo.png", alt: "Eucerin" },
    { src: "/companies/accenture-logo-2020-present.png", alt: "Accenture" },
    { src: "/companies/olay-logo.png", alt: "Olay" },
    { src: "/companies/51r+kopkmll._ac_sl1000_.png", alt: "McDonald's" },
    { src: "/companies/8df4c5_dcc9e0d07bd046ef811598b74df1675d~mv2.png", alt: "Swiss Arabian" }
  ]

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // About section refs
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutSubtitleRef = useRef<HTMLSpanElement>(null)
  const aboutTitleRef = useRef<HTMLHeadingElement>(null)
  const aboutDescRef = useRef<HTMLDivElement>(null)
  const aboutButtonRef = useRef<HTMLButtonElement>(null)

  // Services section refs
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesSubtitleRef = useRef<HTMLParagraphElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const servicesCardRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Social media section refs
  const socialSectionRef = useRef<HTMLElement>(null)

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projectItems.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.onload = resolve
          img.onerror = reject
          img.src = item.image
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.warn('Some images failed to load:', error)
        setImagesLoaded(true) // Continue anyway
      }
    }

    preloadImages()
  }, [projectItems])

  // Fetch articles for news section
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true)
        const response = await articlesApi.getAll()
        
        if (response.success && response.data) {
          // Handle nested articles structure from API response
          const articlesData = (response.data as any).articles || response.data
          setArticles(Array.isArray(articlesData) ? articlesData.slice(0, 3) : []) // Limit to 3 articles
        } else {
          throw new Error('API response not successful')
        }
      } catch (err) {
        console.error('Error fetching articles:', err)
        // Fallback to placeholder data in case of error (same as ArticlesSection.tsx)
        const placeholderArticles = [
          {
            id: 1,
            title: "THE AWESOME PRODUCT ADVENTURE",
            category: "Product",
            image: "/news/image.png",
            type: "article"
          },
          {
            id: 2,
            title: "Reduces irritation in just 1 hour",
            category: "Beauty", 
            image: "/news/image.png",
            type: "article"
          },
          {
            id: 3,
            title: "NIVEA SUN",
            category: "Campaign",
            image: "/news/image.png",
            type: "article"
          }
        ]
        setArticles(placeholderArticles)
      } finally {
        setArticlesLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Main GSAP animation sequence
  useGSAP(() => {
    // Ensure all required elements exist before proceeding
    if (!cardRef.current || !taglineRef.current) return

    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      // Double check elements still exist
      if (!cardRef.current || !taglineRef.current) return

      // Set initial states - everything hidden
      gsap.set([cardRef.current, taglineRef.current, "#bottomText", "#firstSectionGradient"], {
        opacity: 0
      })

      gsap.set(cardRef.current, {
        scale: 0.6,
        rotation: 180
      })

      gsap.set(taglineRef.current, {
        x: -50
      })

      gsap.set("#bottomText", {
        y: 50
      })


       // Create the master timeline
       const masterTimeline = gsap.timeline({
         onComplete: () => {
           setAnimationsComplete(true)
         }
       })

      // Phase 1: Dark overlay fade out (loading complete)
      masterTimeline
        .to(overlayRef.current || {}, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            setIsLoading(false)
          }
        })

        // Phase 2: Card entrance animation + gradient fade in
        .to(cardRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "+=0.2")
        
        .to("#firstSectionGradient", {
          opacity: 0.8,
          duration: 1.5,
          ease: "power2.out"
        }, "-=1.0")
        
        // Phase 3: Card moves to right side + first text appears
        .to(cardRef.current, {
          x: window.innerWidth >= 768 ? 350 : window.innerWidth >= 480 ? 120 : 80,
          y: window.innerWidth >= 768 ? -80 : -40,
          scale: window.innerWidth >= 768 ? 0.75 : 0.85,
          rotation: window.innerWidth >= 768 ? -8 : -4,
          duration: 1.2,
          ease: "power2.inOut"
        }, "+=0.3")
        
        .to(taglineRef.current, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.7")

        // Phase 4: Bottom text appears
        .to("#bottomText", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3")

        // Phase 5: Simple header fade in (faster)
        .to("#stickyHeader", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "+=0.3") // Reduced delay from 0.5s to 0.3s
        
        // Enable scroll right after header appears - much faster
        .call(() => {
          console.log('Enabling scroll - much faster timing')
          setScrollEnabled(true)
          document.body.style.overflow = 'auto'
          document.documentElement.style.overflow = 'auto'
          
          // Setup scroll animations immediately
          setupAboutAnimations()
          setupServicesAnimations()
          setupSocialMediaAnimations()
        }, [], "+=0.1") // Enable scroll just 0.1s after header starts fading in

        // Phase 6: Footer fade in (happens in parallel with scroll enable)
        .call(() => {
          setShowHeaderFooter(true)
        }, [], "+=0.2")
        .to("footer", {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5") // Start footer animation 0.5s earlier

      // Function to setup About section scroll animations
      const setupAboutAnimations = () => {
        if (!aboutSectionRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        // Set initial states - slightly faded but visible
        gsap.set(aboutSubtitleRef.current, {
          opacity: 0.7,
          y: 20
        })

        gsap.set(aboutTitleRef.current, {
          opacity: 0.7,
          y: 30
        })

        const descParagraphs = aboutDescRef.current?.querySelectorAll('p')
        if (descParagraphs) {
          gsap.set(descParagraphs, {
            opacity: 0.7,
            y: 25
          })
        }

        gsap.set(aboutButtonRef.current, {
          opacity: 0.7,
          y: 20
        })

        // About subtitle - smooth fade in
        gsap.to(aboutSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })

        // About title - smooth fade in with slight delay
        gsap.to(aboutTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })

        // Description paragraphs - staggered animation
        if (descParagraphs) {
          gsap.to(descParagraphs, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          })
        }

        // Button - gentle bounce in
        gsap.to(aboutButtonRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.8,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })
      }

      // Function to setup Services section scroll animations
      const setupServicesAnimations = () => {
        if (!servicesSectionRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        // Set initial states - slightly faded but visible
        gsap.set(servicesSubtitleRef.current, {
          opacity: 0.7,
          y: 20
        })

        gsap.set(servicesTitleRef.current, {
          opacity: 0.7,
          y: 30
        })

        gsap.set(servicesCardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1
        })

        // Set initial states for the three service cards (hidden)
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationY: 180
        })

        // Services subtitle - smooth fade in
        gsap.to(servicesSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })

        // Services title - smooth fade in with slight delay
        gsap.to(servicesTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })

        // Services card flip animation sequence
        const flipTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          delay: 0.5
        })

        // Step 1: Flip the main card and fade it out
        flipTimeline
          .to(servicesCardRef.current, {
            rotationY: -90,
            scale: 0.8,
            opacity: 0.3,
            duration: 0.8,
            ease: "power2.inOut"
          })

          // Step 2: Reveal the three service cards with stagger
          .to([card1Ref.current, card2Ref.current, card3Ref.current], {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.7)"
          }, "-=0.4")

          // Step 3: Add subtle floating animation to all cards
          .call(() => {
            gsap.to([card1Ref.current, card2Ref.current, card3Ref.current], {
              y: "random(-10, 10)",
              rotation: "random(-2, 2)",
              duration: "random(3, 5)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.3
            })
          })
      }

      // Function to setup Social Media section scroll animations (Page1 style)
      const setupSocialMediaAnimations = () => {
        if (!socialSectionRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        let scrollY = 0
        let isVisible = false

        // Transform function for page1 style
        const getImageTransform = (side: 'left' | 'right', position: 'top' | 'center' | 'bottom', index: number) => {
          if (!isVisible) return 'translate(0, 0) rotate(0deg) scale(1)'
          
          const baseIntensity = scrollY * 250 // Dramatic movement to the sides
          const rotationIntensity = scrollY * 20 // Rotation effect
          const scaleEffect = 1 + (scrollY * 0.15) // Scale effect
          
          if (side === 'left') {
            const offsetY = (index % 2) * 15 // Slight stagger for visual interest
            return `translate(${-baseIntensity}px, ${offsetY}px) rotate(${-rotationIntensity}deg) scale(${scaleEffect})`
          } else {
            const offsetY = (index % 2) * -15 // Slight stagger for visual interest  
            return `translate(${baseIntensity}px, ${offsetY}px) rotate(${rotationIntensity}deg) scale(${scaleEffect})`
          }
        }

        // Mobile fade-in animation for images when scrolling
        const allImages = ['#socialSamsung', '#socialNivea', '#socialUnderArmour', '#socialEucerin', '#socialMcDonalds', '#socialSwissArabian']
        
        allImages.forEach((selector, index) => {
          gsap.to(selector, {
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: socialSectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: false,
              toggleActions: "play none none reverse"
            }
          })
        })

        // Create the scroll-triggered animation for page1 style
        ScrollTrigger.create({
          trigger: socialSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: () => {
            const rect = socialSectionRef.current!.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const sectionTop = rect.top
            const sectionHeight = rect.height
            
            // Check if section is in viewport
            isVisible = sectionTop < windowHeight && sectionTop + sectionHeight > 0
            
            // Calculate scroll progress within the section - faster response
            if (isVisible) {
              scrollY = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.8 + sectionHeight)))
              
              // Only apply transform effects on desktop (lg breakpoint and above)
              if (window.innerWidth >= 1024) {
                // Apply transforms - left side images move left
                const leftImages = ['#socialSamsung', '#socialNivea', '#socialUnderArmour']
                leftImages.forEach((selector, index) => {
                  const element = document.querySelector(selector) as HTMLElement
                  if (element) {
                    element.style.transform = getImageTransform('left', 'center', index)
                    element.style.transition = 'transform 0.1s ease-out'
                  }
                })

                // Right side images move right
                const rightImages = ['#socialEucerin', '#socialMcDonalds', '#socialSwissArabian']
                rightImages.forEach((selector, index) => {
                  const element = document.querySelector(selector) as HTMLElement
                  if (element) {
                    element.style.transform = getImageTransform('right', 'center', index)
                    element.style.transition = 'transform 0.1s ease-out'
                  }
                })
              }
            }
          }
        })
      }


    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer)
    }

  }, { dependencies: [] })

  // Effect to control scrolling during animations
  useEffect(() => {
    if (!scrollEnabled) {
      // Disable scrolling during initial sequence
      console.log('Disabling scroll during animation')
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      // Prevent wheel and touch events during animation
      const preventScroll = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      const preventKeyScroll = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === ' ') {
          e.preventDefault()
        }
      }
      
      // Add event listeners to prevent scrolling
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('keydown', preventKeyScroll)
      
      return () => {
        // Remove event listeners when scroll is enabled
        document.removeEventListener('wheel', preventScroll)
        document.removeEventListener('touchmove', preventScroll)
        document.removeEventListener('keydown', preventKeyScroll)
      }
    } else {
      // Enable scrolling
      console.log('Scroll enabled - ready to scroll!')
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [scrollEnabled])

  // Cleanup effect to ensure scrolling is always restored
  useEffect(() => {
    return () => {
      // Ensure scrolling is always restored when component unmounts
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])


  // Separate effect for continuous floating animation
  useEffect(() => {
    if (animationsComplete && cardRef.current) {
      const floatingAnimation = gsap.to(cardRef.current, {
        y: "+=10",
        rotation: "+=1",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      return () => {
        floatingAnimation.kill()
      }
    }
  }, [animationsComplete])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden bg-black">

      {/* Dark Loading Overlay */}
      {isLoading && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          style={{ opacity: 1 }}
        >
          {/* Optional: Add a subtle loading indicator */}
          <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        </div>
      )}

      {/* Header - Sticky/Fixed positioned */}
      <div 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ opacity: 0 }}
        id="stickyHeader"
      >
        <Header />
      </div>



      {/* Main Content Area */}
      <main className="relative z-20 flex items-center justify-center min-h-screen pt-20">
        {/* Light Gradient Background Effect - Only in First Section */}
        <div 
          id="firstSectionGradient"
          className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#336b62] to-transparent opacity-0"
          style={{
            top: '20%',
            height: '60%'
          }}
        ></div>
        {/* Animated Card */}
        <div
          ref={cardRef}
          className="relative"
        >
          <Image
            src="/Flot.png"
            alt="Maison Elaris Card"
            width={350}
            height={450}
            className="w-48 sm:w-56 md:w-72 lg:w-80 xl:w-88 h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* First Text - Left Side */}
        <div
          ref={taglineRef}
          className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2"
        >
          <div className="max-w-xs sm:max-w-sm md:max-w-md">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight tracking-wide">
              WHERE STRATEGY<br />
              MEETS STORY.
            </h1>
          </div>
        </div>

        {/* Second Text - Bottom Right */}
        <div
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 text-right"
          style={{ opacity: 0 }}
          id="bottomText"
        >
          <div className="max-w-xs sm:max-w-sm md:max-w-lg">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold leading-tight tracking-wide">
              POWERED BY DATA.<br />
              DRIVEN BY VISION.
            </h2>
          </div>
        </div>
      </main>

      {/* Latest Projects Section with Circular Gallery */}
      <section className="relative z-20 py-16 lg:py-24">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight">
                LATEST<br />PROJECTS
              </h2>
            </div>
            <Link href="/projects">
              <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                See What We Do
              </button>
            </Link>
          </div>
        </div>

        {/* Circular Gallery - Full Width */}
        <div className="relative h-[600px] w-full overflow-hidden">
          {!imagesLoaded ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#336b62] mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading projects...</p>
              </div>
            </div>
          ) : (
            <CircularGallery 
              items={projectItems}
              bend={2.5}
              textColor="#ffffff"
              borderRadius={0.08}
              font="bold 28px Inter"
              scrollSpeed={1.0}
              scrollEase={0.05}
            />
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative z-20 py-16 lg:py-20 bg-black">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <div>
            <h2 className="text-[#f5e6d3] text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight mb-6">
              OUR PARTNERS
            </h2>
            <p className="text-white text-lg lg:text-xl font-body font-light max-w-4xl mx-auto leading-relaxed">
              WE WORK WITH THE WORLD&apos;S MOST MEANINGFUL BRANDS, WITH AN ICONIC ROSTER THAT INCLUDES:
            </p>
          </div>
        </div>

        {/* Logo Loop - Full Width */}
        <div className="w-full overflow-hidden mt-16">
          <LogoLoop 
            logos={companyLogos}
            speed={40}
            direction="left"
            pauseOnHover={true}
            className="opacity-80"
          />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="relative z-20 py-20 lg:py-32 bg-black overflow-hidden">
        {/* Background Decorative Shapes - Two Center Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Center Shape */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-60 w-[700px] h-[700px] rotate-12 opacity-40">
            <Image
              src="/shape.png"
              alt=""
              fill
              className="object-contain"
              style={{ filter: 'brightness(0.8) contrast(1.2)' }}
            />
          </div>
          
          {/* Right Center Shape */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-60 w-[700px] h-[700px] -rotate-12 opacity-40">
            <Image
              src="/shape.png"
              alt=""
              fill
              className="object-contain"
              style={{ filter: 'brightness(0.8) contrast(1.2)' }}
            />
          </div>
        </div>

        {/* Content Container with Card Design */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Left Side - About Image */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="w-80 md:w-96 lg:w-[420px] h-auto">
                      <Image
                        src="/about.png"
                        alt="Campaign Ideas - Maison Elaris Creative Process"
                        width={420}
                        height={500}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="text-center lg:text-left">
                  {/* Small Header */}
                  <div className="mb-6">
                    <span ref={aboutSubtitleRef} className="text-[#336b62] text-lg lg:text-xl font-heading font-medium tracking-wider uppercase">
                      ABOUT
                    </span>
                  </div>

                  {/* Main Title */}
                  <h2 ref={aboutTitleRef} className="text-white text-3xl lg:text-4xl xl:text-5xl font-heading font-bold leading-tight mb-8">
                    MAISON ELARIS
                  </h2>

                  {/* Description */}
                  <div ref={aboutDescRef} className="space-y-6 mb-10">
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed">
                      We are Maison Elaris, where clarity meets craft, and ideas thrive through collaboration.
                    </p>
                    
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed">
                      Our borderless collective spans: Europe, the Middle East, and Asia, keeping us close to cultures, talent, and trends that matter.
                    </p>
                    
                    <p className="text-gray-300 text-lg lg:text-xl font-body leading-relaxed">
                      From strategy sprints in Amsterdam to creative reviews across time zones, we work with agility and precision to deliver brilliance without compromise.
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/about">
                      <button ref={aboutButtonRef} className="bg-[#336b62] hover:bg-[#9b8075] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-body font-medium text-lg">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSectionRef} className="relative z-20 py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Section Header */}
          <div className="mb-16 lg:mb-20">
            <p ref={servicesSubtitleRef} className="text-[#336b62] text-lg lg:text-xl font-heading font-medium tracking-wider mb-6 uppercase">
              Services
            </p>
            <h2 ref={servicesTitleRef} className="text-white text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
              The Elaris Edge
            </h2>
          </div>

          {/* Cards Container */}
          <div className="relative flex justify-center min-h-[500px] lg:min-h-[600px]">
            {/* Main Card (initially visible) */}
            <div ref={servicesCardRef} className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm lg:max-w-md">
              <Image
                src="/card.png"
                alt="Maison Elaris Services Card"
                width={400}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Service Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl">
              {/* Card 1 */}
              <div ref={card1Ref} className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/card1.png"
                    alt="Service Card 1"
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div ref={card2Ref} className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/card2.png"
                    alt="Service Card 2"
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div ref={card3Ref} className="flex justify-center">
                <div className="relative w-full max-w-sm">
                  <Image
                    src="/card3.png"
                    alt="Service Card 3"
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Social Media Section */}
              <section ref={socialSectionRef} className="relative z-20 min-h-screen bg-black overflow-hidden flex items-center justify-center px-4 sm:px-6">
                {/* Central Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                  <div className="mb-6 sm:mb-8">
                    <p className="text-[#336b62] text-sm sm:text-base lg:text-xl font-heading font-medium tracking-wider mb-3 sm:mb-4 uppercase">
                      FOLLOW ON
                    </p>
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight mb-6 sm:mb-8">
                      SOCIAL MEDIA
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg xl:text-xl font-body leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
                      Stay connected with Maison Elaris and discover how our borderless creative collective brings clarity and craft to life through innovative storytelling and precision execution.
                    </p>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-4 sm:space-x-6">
                    <a 
                      href="https://www.facebook.com/maisonelaris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#336b62] rounded-full flex items-center justify-center hover:bg-[#9b8075] transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/maisonelaris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#336b62] rounded-full flex items-center justify-center hover:bg-[#9b8075] transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/maisonelaris" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-[#336b62] rounded-full flex items-center justify-center hover:bg-[#9b8075] transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                 {/* Overlay Brand Images - Hidden on mobile, visible on larger screens */}
                 {/* Samsung - Top Left */}
                 <div className="hidden md:block absolute top-6 lg:top-10 left-4 lg:left-16 w-20 md:w-24 lg:w-96 h-16 md:h-20 lg:h-80 z-30 opacity-30 lg:opacity-90" id="socialSamsung">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/Maison elaris samsung.png"
                     alt="Samsung"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* Nivea - Left Side */}
                 <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-2 lg:left-12 w-16 md:w-20 lg:w-88 h-12 md:h-16 lg:h-72 z-30 opacity-30 lg:opacity-90" id="socialNivea">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/MAISON ELARIS NIVEA.png"
                     alt="Nivea"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* Under Armour - Bottom Left */}
                 <div className="hidden md:block absolute bottom-6 lg:bottom-10 left-4 lg:left-16 w-20 md:w-24 lg:w-96 h-16 md:h-20 lg:h-80 z-30 opacity-30 lg:opacity-90" id="socialUnderArmour">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/MAISON ELARIS under armour.png"
                     alt="Under Armour"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* Eucerin - Top Right */}
                 <div className="hidden md:block absolute top-6 lg:top-10 right-4 lg:right-16 w-20 md:w-24 lg:w-96 h-16 md:h-20 lg:h-80 z-30 opacity-30 lg:opacity-90" id="socialEucerin">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/MAISON ELARIS Eucerin.png"
                     alt="Eucerin"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* McDonald's - Bottom Right */}
                 <div className="hidden md:block absolute bottom-6 lg:bottom-10 right-4 lg:right-16 w-20 md:w-24 lg:w-96 h-16 md:h-20 lg:h-80 z-30 opacity-30 lg:opacity-90" id="socialMcDonalds">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/Maison elaris mcdonalds.png"
                     alt="McDonald's"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>

                 {/* Swiss Arabian - Right Side */}
                 <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-2 lg:right-12 w-16 md:w-20 lg:w-88 h-12 md:h-16 lg:h-72 z-30 opacity-30 lg:opacity-90" id="socialSwissArabian">
                   <Image
                     src="/elaris banners/DIMENSION PC 640x512/MAISON ELARIS Swiss Arabian.png"
                     alt="Swiss Arabian"
                     fill
                     className="object-contain rounded-lg shadow-2xl"
                   />
                 </div>
              </section>

              {/* Connect CTA Section */}
              <section className="section relative bg-black py-24 lg:py-32 overflow-hidden">
                {/* Background Decorative Shapes */}
                <div className="absolute inset-0">
                  <Image
                    src="/shape.png"
                    alt=""
                    width={700}
                    height={700}
                    className="bg-shape-1 absolute top-1 -right-50 rotate-12 opacity-60 filter brightness-150"
                  />
                  <Image
                    src="/shape.png"
                    alt=""
                    width={600}
                    height={600}
                    className="bg-shape-2 absolute bottom-0 -left-40 -rotate-12 opacity-50 filter brightness-150"
                  />
                </div>
                
                {/* Content Container with Transparent Card */}
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Subtitle */}
                      <p className="text-[#336b62] text-sm lg:text-base font-secondary font-medium tracking-wider mb-6 uppercase">
                        Connect With Us
                      </p>
                      
                      {/* Main Heading */}
                      <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-heading font-bold leading-tight mb-8">
                        CREATE TOMORROW,<br />
                        TOGETHER
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-lg lg:text-xl font-body font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                        Every idea we share and every step we take moves us closer to a future we&apos;re proud to shape.
                      </p>
                      
                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/connect">
                          <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                            GET IN CONTACT
                          </button>
                        </Link>
                        <Link href="/contact/careers">
                          <button className="bg-transparent border-2 border-[#336b62] hover:bg-[#336b62] text-[#336b62] hover:text-white px-6 py-3 rounded-lg transition-colors duration-300 font-body font-medium">
                            VIEW CAREERS
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* News Section */}
              <section className="section relative py-20 lg:py-32 overflow-hidden">
                {/* Gradient Background Effect - Same as first section */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#336b62] to-transparent opacity-80"></div>
                
                {/* Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                  {/* Section Title */}
                  <div className="text-center mb-16">
                    <h2 className="text-white text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
                      NEWS
                    </h2>
                  </div>

                  {/* News Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {articlesLoading ? (
                      // Loading state - show 3 skeleton cards
                      Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                          <div className="relative h-48 lg:h-56 bg-gray-800 animate-pulse">
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="h-5 bg-gray-700 rounded mb-2 animate-pulse"></div>
                              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Render articles dynamically
                      articles.map((article) => (
                        <div key={article.id} className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                          <div className="relative h-48 lg:h-56">
                            <Image
                              src={article.image || "/news/image.png"}
                              alt={article.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                // Fallback to placeholder on image error
                                const target = e.target as HTMLImageElement
                                target.src = "/news/image.png"
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-white text-lg font-heading font-bold mb-2 line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-gray-300 text-sm font-body line-clamp-2">
                                {article.excerpt || `Latest updates in ${article.category} - Stay informed with our latest developments.`}
                              </p>
                              {article.category && (
                                <span className="inline-block bg-[#336b62] text-white text-xs px-2 py-1 rounded mt-2">
                                  {article.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* View All News Button */}
                  <div className="text-center mt-12">
                    <Link href="/news">
                      <button className="bg-[#336b62] hover:bg-[#9b8075] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-body font-medium text-lg">
                        View All News
                      </button>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Partners Section */}
              <section className="section bg-black py-16 lg:py-24 relative z-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-4xl">
                      <Image
                        src="/partners/partners.png"
                        alt="Our Partners"
                        width={1200}
                        height={400}
                        className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </section>


      {/* Footer - Initially hidden */}
      {showHeaderFooter && <Footer />}
    </div>
  )
}
