'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  MoreVertical,
  Filter,
  SortDesc,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  Archive,
  ChevronDown
} from 'lucide-react'
import { useRouter } from 'next/navigation'

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

export default function ArticlesPage() {
  const router = useRouter()
  
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Getting Started with React and TypeScript',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)



  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Pagination logic
  const totalItems = filteredArticles.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  const categories = Array.from(new Set(articles.map(article => article.category)))
  const statuses = ['all', 'draft', 'published', 'archived']

  const getStatusColor = (status: Article['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Article['status']) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'draft': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'archived': return <AlertCircle className="w-4 h-4 text-gray-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  const handleDeleteArticle = () => {
    if (!selectedArticle) return
    
    setArticles(articles.filter(article => article.id !== selectedArticle.id))
    setShowDeleteModal(false)
    setSelectedArticle(null)
  }

  const handlePublishArticle = async (article: Article) => {
    setIsProcessing(article.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedArticle: Article = {
        ...article,
        status: 'published',
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setArticles(prev => prev.map(a => a.id === article.id ? updatedArticle : a))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error publishing article:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const handleArchiveArticle = async (article: Article) => {
    setIsProcessing(article.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedArticle: Article = {
        ...article,
        status: 'archived',
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setArticles(prev => prev.map(a => a.id === article.id ? updatedArticle : a))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error archiving article:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <FileText className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Article Management</h1>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Articles</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage news articles and blog posts
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/articles/new')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Article
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All</option>
                {statuses.slice(1).map(status => (
                  <option 
                    key={status} 
                    value={status}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Article Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedArticles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Get started by creating your first article
                      </p>
                      <Button onClick={() => router.push('/dashboard/articles/new')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Article
                      </Button>
                    </td>
                  </tr>
                ) : (
                  paginatedArticles.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {article.title}
                              </div>
                              {getStatusIcon(article.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                              {article.excerpt}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              By {article.author} • {article.readTime} min read
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(article.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {article.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === article.id ? null : article.id)
                            }}
                            className="p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === article.id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/articles/${article.id}/edit`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                                
                                {article.status === 'draft' && (
                                  <button
                                    onClick={() => handlePublishArticle(article)}
                                    disabled={isProcessing === article.id}
                                    className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    {isProcessing === article.id ? 'Publishing...' : 'Publish'}
                                  </button>
                                )}
                                
                                {article.status === 'published' && (
                                  <button
                                    onClick={() => handleArchiveArticle(article)}
                                    disabled={isProcessing === article.id}
                                    className="flex items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <Archive className="w-4 h-4 mr-2" />
                                    {isProcessing === article.id ? 'Archiving...' : 'Archive'}
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => openDeleteModal(article)}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedArticles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} articles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Show:</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 pr-7 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                  >
                    <option value={5} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">5</option>
                    <option value={10} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">10</option>
                    <option value={20} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">20</option>
                    <option value={50} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300 px-3">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Delete Modal */}
      {showDeleteModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-modal-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Delete Article
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{selectedArticle.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteArticle}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 