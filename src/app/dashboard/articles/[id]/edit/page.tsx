'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../components/ui/loading-button'
import { ArrowLeft, Save, FileText, ChevronDown, AlertCircle, X, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import { articlesApi } from '../../../../../lib/api'
import Image from 'next/image'

interface Article {
  _id: string
  title: string
  slug: string
  content: string
  description: string
  shortDescription: string
  featuredImage?: string
  author: {
    userId: string
    name: string
    email: string
    details?: {
      _id: string
      firstName: string
      lastName: string
      email: string
      profileImage?: string
    }
  }
  status: 'draft' | 'published' | 'archived'
  category: string
  tags: string[]
  visibility: 'public' | 'private' | 'unlisted'
  featured: boolean
  analytics: {
    views: number
    reads: number
    shares: number
    comments: number
    likes: number
  }
  seo?: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string[]
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params?.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [article, setArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    shortDescription: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    visibility: 'public' as 'public' | 'private' | 'unlisted'
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Helper function to get author name
  const getAuthorName = (author: Article['author']): string => {
    if (author?.name) return author.name
    if (author?.details?.firstName && author?.details?.lastName) {
      return `${author.details.firstName} ${author.details.lastName}`
    }
    return 'Unknown Author'
  }

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return
      
      setIsFetching(true)
      setError(null)
      
      try {
        const response = await articlesApi.getById(articleId)
        
        if (response.success && response.data) {
          // Handle nested article structure from API response
          const fetchedArticle = (response.data as any).article || response.data
          setArticle(fetchedArticle)
          setFormData({
            title: fetchedArticle.title,
            content: fetchedArticle.content,
            description: fetchedArticle.description || '',
            shortDescription: fetchedArticle.shortDescription || '',
            category: fetchedArticle.category,
            tags: Array.isArray(fetchedArticle.tags) ? fetchedArticle.tags.join(', ') : '',
            status: fetchedArticle.status,
            visibility: fetchedArticle.visibility || 'public'
          })
          
          // Set existing image if available
          if (fetchedArticle.featuredImage) {
            setImagePreview(fetchedArticle.featuredImage)
          }
        } else {
          setError('Article not found')
          setTimeout(() => router.push('/dashboard/articles'), 2000)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Failed to load article')
        setTimeout(() => router.push('/dashboard/articles'), 2000)
      } finally {
        setIsFetching(false)
      }
    }

    fetchArticle()
  }, [articleId, router])

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Handle image upload - use uploaded file as base64 or existing image
      const featuredImageUrl = imagePreview || null

      // Prepare updated article data - only send changed fields
      const updateData = {
        title: formData.title.trim(),
        content: formData.content,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        featuredImage: featuredImageUrl,
        status: formData.status,
        visibility: formData.visibility
      }

      // Update article via API
      console.log('Updating article:', articleId, 'with data:', updateData)
      const response = await articlesApi.update(articleId, updateData)
      
      if (response.success) {
        // Navigate back to articles list
        router.push('/dashboard/articles')
      } else {
        throw new Error(response.message || 'Failed to update article')
      }
    } catch (err) {
      console.error('Error updating article:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to update article'
      setError(errorMessage)
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
            <Loader2 className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Error Loading Article</h1>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
          <p className="text-red-600 mt-2">Redirecting to articles list...</p>
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

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

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
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Brief description of the article..."
                    required
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description with HTML content..."
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

                {/* Featured Image Upload */}
                <div>
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  
                  {/* File Upload */}
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload image</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3 relative">
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image
                          src={imagePreview}
                          alt="Featured image preview"
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Handle image load error
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {imageFile ? `File: ${imageFile.name}` : 'Existing image'}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <div className="relative mt-1">
                    <select
                      id="visibility"
                      value={formData.visibility}
                      onChange={(e) => handleInputChange('visibility', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="public" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Public</option>
                      <option value="private" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Private</option>
                      <option value="unlisted" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Unlisted</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
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
                  <span>{getAuthorName(article.author)}</span>
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
                  isLoading={isLoading}
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
 