'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Article interface type
interface Article {
  id: number
  title: string
  category: string
  image?: string
  featuredImage?: string
  type: string
  slug?: string
  excerpt?: string
  published_at?: string
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const articlesPerPage = 6

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles')
        }
        
        const data = await response.json()
        
        // Handle the backend response structure: data.data.articles
        const articles = data.data?.articles || data.articles || []
        
        // Set articles
        setArticles(articles)
        
        // Extract unique categories from articles
        const uniqueCategories = Array.from(
          new Set(articles.map((article: Article) => article.category).filter(Boolean))
        ) as string[]
        
        setCategories(["All", ...uniqueCategories])
        setError(null)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Failed to load articles')
        // Fallback to placeholder data in case of error
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
        setCategories(["All", "Product", "Beauty", "Campaign"])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Filter articles based on selected category
  const filteredArticles = selectedFilter === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedFilter)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / articlesPerPage))
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

  return (
    <section className="relative bg-black py-20 lg:py-28 overflow-hidden">
      {/* Background Decorative Shapes with Light Fade Effect */}
      <div className="absolute inset-0">
        {/* Left shape */}
        <Image
          src="/shape.png"
          alt=""
          width={600}
          height={600}
          className="absolute top-0 -left-40 opacity-50 filter brightness-150"
        />
        {/* Right shape */}
        <Image
          src="/shape.png"
          alt=""
          width={700}
          height={700}
          className="absolute bottom-0 -right-50 rotate-12 opacity-60 filter brightness-150"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Light background fade container */}
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
          {/* Subtle inner glow - same as About section */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10">
            {/* Filter Dropdown */}
            <div className="flex justify-start mb-12">
              <div className="relative">
                <select 
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value)
                    setCurrentPage(1) // Reset to page 1 when filter changes
                  }}
                  disabled={loading}
                  className="bg-[#336b62]/80 text-white px-6 py-3 rounded-lg border border-white/20 font-body font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#336b62] appearance-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {categories.map(option => (
                    <option key={option} value={option} className="bg-[#336b62] text-white">
                      {option}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#336b62]"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <p className="text-gray-400">Showing placeholder articles instead.</p>
              </div>
            )}

            {/* Articles Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {currentArticles.map((article) => (
                  <Link key={article.id} href={`/news/${article.slug || article.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#336b62]/40 to-[#2a5751]/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                        {/* Article Image */}
                        <div className="aspect-[4/3] relative">
                        <Image
                          src={article.image || article.featuredImage || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Article Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          {/* Category Badge */}
                          <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
                            {article.category}
                          </span>
                          
                          {/* Title */}
                          <h3 className="text-lg lg:text-xl font-heading font-bold leading-tight group-hover:text-[#ffe9c7] transition-colors duration-300">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && (
              <div className="flex justify-center items-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-body font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[#336b62] text-white hover:bg-[#2a5751]'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-body font-medium transition-all duration-300 ${
                      currentPage === pageNum
                        ? 'bg-[#336b62] text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-body font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[#336b62] text-white hover:bg-[#2a5751]'
                }`}
              >
                Next
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
