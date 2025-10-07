'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

// Article interface type
interface Article {
  _id: string
  title: string
  slug?: string
  excerpt?: string
  content: string
  featuredImage?: string
  image?: string
  author: {
    name: string
    email?: string
    userId?: string
  }
  category: string
  tags?: string[]
  status: string
  visibility: string
  publishing: {
    publishedAt: string
    lastModifiedAt?: string
  }
  engagement?: {
    views: number
    likes: number
    shares: number
    readTime: number
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
  createdAt: string
  updatedAt: string
}

export default function ArticleDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const articleId = params?.id as string
        
        if (!articleId) {
          throw new Error('Article ID not found')
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article not found')
          } else if (response.status === 400) {
            throw new Error('Invalid article ID')
          } else if (response.status === 500) {
            throw new Error('Server error - please try again later')
          }
          throw new Error('Failed to fetch article')
        }
        
        const data = await response.json()
        
        // Handle backend response structure
        const articleData = data.data?.article || data.article || data
        setArticle(articleData)
        setError(null)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params?.id])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#336b62]"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-heading font-bold mb-6">Article Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">{error || 'The article you are looking for does not exist.'}</p>
            <Link href="/news">
              <button className="bg-[#336b62] hover:bg-[#2a5751] text-white px-8 py-4 rounded-lg transition-colors duration-300 font-body font-medium">
                Back to News
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Format read time
  const readTime = article.engagement?.readTime || Math.ceil(article.content?.split(' ').length / 200) || 5

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="relative">
        {/* Hero Section with Featured Image */}
        <section className="relative py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-6">
            {/* Back to News Link */}
            <div className="mb-8">
              <Link 
                href="/news" 
                className="text-[#336b62] hover:text-white transition-colors duration-300 font-body font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>

            {/* Article Header */}
            <div className="mb-12">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="bg-[#336b62] text-white px-4 py-2 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl lg:text-2xl text-gray-300 font-body leading-relaxed mb-8 max-w-4xl">
                  {article.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 font-body">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>By {article.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(article.publishing.publishedAt || article.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{readTime} min read</span>
                </div>
                {article.engagement?.views && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{article.engagement.views} views</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {(article.featuredImage || article.image) && (
              <div className="relative w-full h-[400px] lg:h-[600px] mb-12 overflow-hidden rounded-2xl">
                <Image
                  src={article.featuredImage || article.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20 lg:pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="article-content">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            <style jsx>{`
              .article-content :global(h1) {
                font-size: 2.5rem;
                font-weight: 700;
                color: #ffffff;
                margin-top: 2rem;
                margin-bottom: 1rem;
                line-height: 1.2;
                font-family: var(--font-heading);
              }
              
              .article-content :global(h2) {
                font-size: 2rem;
                font-weight: 700;
                color: #ffffff;
                margin-top: 1.75rem;
                margin-bottom: 0.875rem;
                line-height: 1.3;
                font-family: var(--font-heading);
              }
              
              .article-content :global(h3) {
                font-size: 1.5rem;
                font-weight: 600;
                color: #ffffff;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                line-height: 1.4;
                font-family: var(--font-heading);
              }
              
              .article-content :global(h4) {
                font-size: 1.25rem;
                font-weight: 600;
                color: #ffffff;
                margin-top: 1.25rem;
                margin-bottom: 0.625rem;
                line-height: 1.5;
              }
              
              .article-content :global(p) {
                font-size: 1.125rem;
                line-height: 1.75;
                color: #d1d5db;
                margin-bottom: 1rem;
              }
              
              .article-content :global(strong),
              .article-content :global(b) {
                font-weight: 700;
                color: #ffffff;
              }
              
              .article-content :global(em),
              .article-content :global(i) {
                font-style: italic;
              }
              
              .article-content :global(u) {
                text-decoration: underline;
              }
              
              .article-content :global(ul) {
                list-style-type: disc;
                margin-left: 2rem;
                margin-bottom: 1rem;
                color: #d1d5db;
              }
              
              .article-content :global(ol) {
                list-style-type: decimal;
                margin-left: 2rem;
                margin-bottom: 1rem;
                color: #d1d5db;
              }
              
              .article-content :global(li) {
                font-size: 1.125rem;
                line-height: 1.75;
                margin-bottom: 0.5rem;
                color: #d1d5db;
              }
              
              .article-content :global(a) {
                color: #336b62;
                text-decoration: underline;
                transition: color 0.3s;
              }
              
              .article-content :global(a:hover) {
                color: #9b8075;
              }
              
              .article-content :global(blockquote) {
                border-left: 4px solid #336b62;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
                font-style: italic;
                color: #9ca3af;
              }
              
              .article-content :global(code) {
                background-color: #1f2937;
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.9em;
                color: #f9fafb;
              }
              
              .article-content :global(pre) {
                background-color: #1f2937;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                margin: 1.5rem 0;
              }
              
              .article-content :global(img) {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1.5rem 0;
              }
              
              .article-content :global([style*="text-align: center"]) {
                text-align: center;
              }
              
              .article-content :global([style*="text-align: right"]) {
                text-align: right;
              }
              
              .article-content :global([style*="text-align: left"]) {
                text-align: left;
              }
              
              /* Font size variations */
              .article-content :global(font[size="1"]) {
                font-size: 0.625rem;
              }
              
              .article-content :global(font[size="2"]) {
                font-size: 0.875rem;
              }
              
              .article-content :global(font[size="3"]) {
                font-size: 1.125rem;
              }
              
              .article-content :global(font[size="4"]) {
                font-size: 1.5rem;
              }
              
              .article-content :global(font[size="5"]) {
                font-size: 2rem;
              }
              
              .article-content :global(font[size="6"]) {
                font-size: 2.5rem;
              }
              
              .article-content :global(font[size="7"]) {
                font-size: 3rem;
              }
            `}</style>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-heading font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
