'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../components/ui/loading-button'
import { ArrowLeft, Save, FileText, ChevronDown } from 'lucide-react'

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  status: 'draft' | 'published' | 'archived'
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  readTime: number
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [article, setArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  })

  // Mock data - replace with actual API call
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Getting Started with React and TypeScript',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      excerpt: 'Learn the basics of React with TypeScript and best practices for modern web development.',
      author: 'Jaziri Ahmed',
      status: 'published',
      category: 'Technology',
      tags: ['React', 'TypeScript', 'Frontend'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      publishedAt: '2024-01-15',
      readTime: 5
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      excerpt: 'Explore advanced JavaScript patterns and techniques for better code organization.',
      author: 'Jaziri Ahmed',
      status: 'draft',
      category: 'Programming',
      tags: ['JavaScript', 'Patterns', 'Advanced'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      readTime: 8
    },
    {
      id: '3',
      title: 'Building Scalable Web Applications',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      excerpt: 'Best practices for building scalable and maintainable web applications.',
      author: 'Jaziri Ahmed',
      status: 'published',
      category: 'Architecture',
      tags: ['Scalability', 'Web Development', 'Best Practices'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05',
      publishedAt: '2024-01-06',
      readTime: 12
    }
  ]

  useEffect(() => {
    const fetchArticle = async () => {
      setIsFetching(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Find article by ID - replace with actual API call
        const foundArticle = mockArticles.find(a => a.id === articleId)
        
        if (foundArticle) {
          setArticle(foundArticle)
          setFormData({
            title: foundArticle.title,
            content: foundArticle.content,
            excerpt: foundArticle.excerpt,
            category: foundArticle.category,
            tags: foundArticle.tags.join(', '),
            status: foundArticle.status
          })
        } else {
          // Article not found, redirect to articles list
          router.push('/dashboard/articles')
        }
      } catch (error) {
        console.error('Error fetching article:', error)
        router.push('/dashboard/articles')
      } finally {
        setIsFetching(false)
      }
    }

    if (articleId) {
      fetchArticle()
    }
  }, [articleId, router])

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would make your API call to update the article
      console.log('Updating article:', {
        ...formData,
        id: articleId,
        readTime: calculateReadTime(formData.content),
        updatedAt: new Date().toISOString().split('T')[0],
        publishedAt: formData.status === 'published' ? (article?.publishedAt || new Date().toISOString().split('T')[0]) : undefined
      })

      // Navigate back to articles list
      router.push('/dashboard/articles')
    } catch (error) {
      console.error('Error updating article:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isFetching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading Article...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Article</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter article title..."
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the article..."
                    required
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your article content here..."
                    required
                    rows={12}
                    className="mt-1"
                  />
                  {formData.content && (
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated read time: {calculateReadTime(formData.content)} minutes
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="relative mt-1">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Draft</option>
                      <option value="published" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Published</option>
                      <option value="archived" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Archived</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Technology, Programming"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="Comma-separated tags"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article Info */}
            <Card>
              <CardHeader>
                <CardTitle>Article Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Author:</span>
                  <span>{article.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                </div>
                {article.publishedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Published:</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Article
                </LoadingButton>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
 