'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Send,
  Eye,
  Calendar,
  Users,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  FileText,
  ChevronDown,
  Target,
  BarChart3
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Newsletter {
  id: string
  title: string
  subject: string
  previewText: string
  content: string
  status: 'draft' | 'scheduled' | 'sent' | 'archived'
  type: 'promotional' | 'newsletter' | 'announcement' | 'welcome' | 'event'
  recipientCount: number
  openRate?: number
  clickRate?: number
  scheduledDate?: string
  sentDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export default function NewsletterPage() {
  const router = useRouter()
  
  const [newsletters, setNewsletters] = useState<Newsletter[]>([
    {
      id: '1',
      title: 'Monthly Product Update - January 2024',
      subject: '🚀 Exciting New Features This Month!',
      previewText: 'Discover the latest features and improvements we\'ve shipped...',
      content: 'Complete newsletter content here...',
      status: 'sent',
      type: 'newsletter',
      recipientCount: 1250,
      openRate: 68.5,
      clickRate: 12.3,
      sentDate: '2024-01-15',
      createdBy: 'Jaziri Ahmed',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-15',
      tags: ['Product Updates', 'Monthly']
    },
    {
      id: '2',
      title: 'Black Friday Sale Campaign',
      subject: '🔥 50% OFF Everything - Black Friday Special!',
      previewText: 'Don\'t miss our biggest sale of the year. Limited time offer...',
      content: 'Black Friday promotional content...',
      status: 'scheduled',
      type: 'promotional',
      recipientCount: 2840,
      scheduledDate: '2024-01-25',
      createdBy: 'Jaziri Ahmed',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-14',
      tags: ['Sales', 'Promotion', 'Black Friday']
    },
    {
      id: '3',
      title: 'Welcome Email Series - Part 1',
      subject: 'Welcome to our community! 👋',
      previewText: 'Thank you for joining us. Here\'s everything you need to get started...',
      content: 'Welcome email content with onboarding info...',
      status: 'draft',
      type: 'welcome',
      recipientCount: 0,
      createdBy: 'Jaziri Ahmed',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-13',
      tags: ['Welcome', 'Onboarding']
    },
    {
      id: '4',
      title: 'Security Update Notification',
      subject: '🔒 Important Security Update Required',
      previewText: 'We\'ve implemented new security measures. Please update your account...',
      content: 'Security update announcement content...',
      status: 'sent',
      type: 'announcement',
      recipientCount: 3200,
      openRate: 89.2,
      clickRate: 34.7,
      sentDate: '2024-01-05',
      createdBy: 'Jaziri Ahmed',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-05',
      tags: ['Security', 'Important', 'Update']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  // Filter newsletters based on search and filters
  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = 
      newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.previewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || newsletter.status === filterStatus
    const matchesType = filterType === 'all' || newsletter.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination logic
  const totalItems = filteredNewsletters.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedNewsletters = filteredNewsletters.slice(startIndex, endIndex)

  const statuses = ['all', 'draft', 'scheduled', 'sent', 'archived']
  const types = ['all', 'promotional', 'newsletter', 'announcement', 'welcome', 'event']

  const getStatusColor = (status: Newsletter['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'sent': return 'bg-green-100 text-green-800 border-green-200'
      case 'archived': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Newsletter['status']) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4 text-gray-500" />
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />
      case 'sent': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'archived': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: Newsletter['type']) => {
    switch (type) {
      case 'promotional': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'newsletter': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'announcement': return 'bg-red-100 text-red-800 border-red-200'
      case 'welcome': return 'bg-green-100 text-green-800 border-green-200'
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
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

  const handleDeleteNewsletter = () => {
    if (!selectedNewsletter) return
    
    setNewsletters(newsletters.filter(newsletter => newsletter.id !== selectedNewsletter.id))
    setShowDeleteModal(false)
    setSelectedNewsletter(null)
  }

  const handleSendNewsletter = async (newsletter: Newsletter) => {
    setIsProcessing(newsletter.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedNewsletter: Newsletter = {
        ...newsletter,
        status: 'sent',
        sentDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        // Simulate open/click rates
        openRate: Math.random() * 40 + 50, // 50-90%
        clickRate: Math.random() * 20 + 10  // 10-30%
      }

      setNewsletters(prev => prev.map(n => n.id === newsletter.id ? updatedNewsletter : n))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error sending newsletter:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const handleScheduleNewsletter = async (newsletter: Newsletter) => {
    setIsProcessing(newsletter.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      const updatedNewsletter: Newsletter = {
        ...newsletter,
        status: 'scheduled',
        scheduledDate: tomorrow.toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setNewsletters(prev => prev.map(n => n.id === newsletter.id ? updatedNewsletter : n))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error scheduling newsletter:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const openDeleteModal = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Mail className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Newsletter Management</h1>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Email Campaigns</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create, schedule, and send newsletters to your subscribers
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard/newsletter/subscribers')}
              className="bg-white hover:bg-gray-50"
            >
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </Button>
            <Button onClick={() => router.push('/dashboard/newsletter/new')} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Newsletter
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search newsletters..."
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
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All Types</option>
                {types.slice(1).map(type => (
                  <option 
                    key={type} 
                    value={type}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
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
                    Newsletter Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Recipients & Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedNewsletters.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No newsletters found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Get started by creating your first newsletter campaign
                      </p>
                      <Button onClick={() => router.push('/dashboard/newsletter/new')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Newsletter
                      </Button>
                    </td>
                  </tr>
                ) : (
                  paginatedNewsletters.map(newsletter => (
                    <tr key={newsletter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {getStatusIcon(newsletter.status)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {newsletter.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                              <strong>Subject:</strong> {newsletter.subject}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-lg">
                              {newsletter.previewText}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {newsletter.tags.slice(0, 2).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {newsletter.tags.length > 2 && (
                                <span className="text-xs text-gray-500">+{newsletter.tags.length - 2}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <Badge 
                            className={`${getTypeColor(newsletter.type)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                          >
                            {newsletter.type}
                          </Badge>
                          <Badge 
                            className={`${getStatusColor(newsletter.status)} text-xs font-medium px-2.5 py-0.5 rounded-full block`}
                          >
                            {newsletter.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          {formatNumber(newsletter.recipientCount)} recipients
                        </div>
                        {newsletter.openRate && newsletter.clickRate && (
                          <div className="space-y-1 mt-1">
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {newsletter.openRate.toFixed(1)}% opened
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {newsletter.clickRate.toFixed(1)}% clicked
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {newsletter.status === 'scheduled' && newsletter.scheduledDate ? (
                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <Clock className="w-4 h-4" />
                            {formatDate(newsletter.scheduledDate)}
                          </div>
                        ) : newsletter.status === 'sent' && newsletter.sentDate ? (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            {formatDate(newsletter.sentDate)}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(newsletter.createdAt)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === newsletter.id ? null : newsletter.id)
                            }}
                            className="p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === newsletter.id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                {newsletter.status === 'draft' && (
                                  <>
                                    <button
                                      onClick={() => handleSendNewsletter(newsletter)}
                                      disabled={isProcessing === newsletter.id}
                                      className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                    >
                                      <Send className="w-4 h-4 mr-2" />
                                      {isProcessing === newsletter.id ? 'Sending...' : 'Send Now'}
                                    </button>
                                    <button
                                      onClick={() => handleScheduleNewsletter(newsletter)}
                                      disabled={isProcessing === newsletter.id}
                                      className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                    >
                                      <Clock className="w-4 h-4 mr-2" />
                                      {isProcessing === newsletter.id ? 'Scheduling...' : 'Schedule'}
                                    </button>
                                  </>
                                )}
                                
                                {newsletter.status === 'scheduled' && (
                                  <button
                                    onClick={() => handleSendNewsletter(newsletter)}
                                    disabled={isProcessing === newsletter.id}
                                    className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    {isProcessing === newsletter.id ? 'Sending...' : 'Send Now'}
                                  </button>
                                )}
                                
                                {newsletter.status === 'sent' && (
                                  <button
                                    onClick={() => {
                                      // Navigate to analytics/statistics page
                                      setActiveDropdown(null)
                                    }}
                                    className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                  >
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    View Analytics
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/newsletter/${newsletter.id}/edit`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                                
                                <button
                                  onClick={() => openDeleteModal(newsletter)}
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
          {paginatedNewsletters.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} newsletters
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
      {showDeleteModal && selectedNewsletter && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-modal-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Delete Newsletter
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{selectedNewsletter.title}"? This action cannot be undone and will remove all associated data and analytics.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteNewsletter}>
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
 