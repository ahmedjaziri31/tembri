'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Badge } from '../../../../components/ui/badge'
import { 
  ArrowLeft,
  Search,
  Trash2,
  Calendar,
  Users,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Globe,
  MapPin,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  UserCheck,
  UserX
} from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  firstName?: string
  lastName?: string
  status: 'active' | 'unsubscribed' | 'bounced' | 'pending'
  source: 'website' | 'import' | 'api' | 'manual' | 'referral'
  subscribedDate: string
  lastEmailDate?: string
  openRate: number
  clickRate: number
  location?: string
  preferences: string[]
  tags: string[]
}

export default function SubscribersPage() {
  const router = useRouter()
  
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: '1',
      email: 'john.smith@techcorp.com',
      firstName: 'John',
      lastName: 'Smith',
      status: 'active',
      source: 'website',
      subscribedDate: '2024-01-15',
      lastEmailDate: '2024-01-20',
      openRate: 78.5,
      clickRate: 15.2,
      location: 'San Francisco, CA',
      preferences: ['Product Updates', 'Announcements'],
      tags: ['Enterprise', 'High Engagement']
    },
    {
      id: '2',
      email: 'sarah.johnson@designstudio.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      status: 'active',
      source: 'referral',
      subscribedDate: '2024-01-10',
      lastEmailDate: '2024-01-18',
      openRate: 92.3,
      clickRate: 34.7,
      location: 'New York, NY',
      preferences: ['Newsletter', 'Promotions'],
      tags: ['Designer', 'VIP']
    },
    {
      id: '3',
      email: 'mike.chen@startup.io',
      firstName: 'Mike',
      lastName: 'Chen',
      status: 'active',
      source: 'website',
      subscribedDate: '2024-01-08',
      lastEmailDate: '2024-01-19',
      openRate: 45.2,
      clickRate: 8.9,
      location: 'Austin, TX',
      preferences: ['Product Updates'],
      tags: ['Startup', 'Tech']
    },
    {
      id: '4',
      email: 'info@company.com',
      status: 'unsubscribed',
      source: 'import',
      subscribedDate: '2024-01-05',
      lastEmailDate: '2024-01-15',
      openRate: 23.1,
      clickRate: 2.4,
      preferences: [],
      tags: ['Unsubscribed']
    },
    {
      id: '5',
      email: 'bounced@example.com',
      firstName: 'Invalid',
      lastName: 'Email',
      status: 'bounced',
      source: 'api',
      subscribedDate: '2024-01-12',
      openRate: 0,
      clickRate: 0,
      preferences: [],
      tags: ['Bounced']
    },
    {
      id: '6',
      email: 'pending@subscriber.com',
      firstName: 'Pending',
      lastName: 'Confirmation',
      status: 'pending',
      source: 'website',
      subscribedDate: '2024-01-21',
      openRate: 0,
      clickRate: 0,
      preferences: ['Newsletter'],
      tags: ['Pending']
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterSource, setFilterSource] = useState<string>('all')
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Filter subscribers based on search and filters
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.firstName && subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (subscriber.lastName && subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      subscriber.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus
    const matchesSource = filterSource === 'all' || subscriber.source === filterSource
    
    return matchesSearch && matchesStatus && matchesSource
  })

  // Pagination logic
  const totalItems = filteredSubscribers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex)

  const statuses = ['all', 'active', 'unsubscribed', 'bounced', 'pending']
  const sources = ['all', 'website', 'import', 'api', 'manual', 'referral']

  const getStatusColor = (status: Subscriber['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'unsubscribed': return 'bg-red-100 text-red-800 border-red-200'
      case 'bounced': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Subscriber['status']) => {
    switch (status) {
      case 'active': return <UserCheck className="w-4 h-4 text-green-500" />
      case 'unsubscribed': return <UserX className="w-4 h-4 text-red-500" />
      case 'bounced': return <AlertCircle className="w-4 h-4 text-orange-500" />
      case 'pending': return <CheckCircle className="w-4 h-4 text-blue-500" />
      default: return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const getSourceColor = (source: Subscriber['source']) => {
    switch (source) {
      case 'website': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'import': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'api': return 'bg-green-100 text-green-800 border-green-200'
      case 'manual': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'referral': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
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

  const getEngagementLevel = (openRate: number, clickRate: number) => {
    if (openRate >= 70 && clickRate >= 20) return { level: 'High', color: 'text-green-600' }
    if (openRate >= 40 && clickRate >= 10) return { level: 'Medium', color: 'text-yellow-600' }
    if (openRate > 0 || clickRate > 0) return { level: 'Low', color: 'text-orange-600' }
    return { level: 'None', color: 'text-gray-500' }
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

  const handleDeleteSubscriber = () => {
    if (!selectedSubscriber) return
    
    setSubscribers(subscribers.filter(subscriber => subscriber.id !== selectedSubscriber.id))
    setShowDeleteModal(false)
    setSelectedSubscriber(null)
  }

  const openDeleteModal = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  const exportSubscribers = () => {
    // Create CSV content
    const headers = ['Email', 'First Name', 'Last Name', 'Status', 'Source', 'Subscribed Date', 'Location', 'Open Rate', 'Click Rate']
    const csvContent = [
      headers.join(','),
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.firstName || '',
        sub.lastName || '',
        sub.status,
        sub.source,
        sub.subscribedDate,
        sub.location || '',
        sub.openRate.toFixed(1) + '%',
        sub.clickRate.toFixed(1) + '%'
      ].join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Statistics
  const activeCount = subscribers.filter(s => s.status === 'active').length
  const totalCount = subscribers.length
  const avgOpenRate = subscribers.length > 0 ? subscribers.reduce((sum, s) => sum + s.openRate, 0) / subscribers.length : 0
  const avgClickRate = subscribers.length > 0 ? subscribers.reduce((sum, s) => sum + s.clickRate, 0) / subscribers.length : 0

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
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Newsletter Subscribers</h1>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCount.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscribers</p>
                <p className="text-2xl font-bold text-green-600">{activeCount.toLocaleString()}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-purple-600">{avgOpenRate.toFixed(1)}%</p>
              </div>
              <Mail className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Click Rate</p>
                <p className="text-2xl font-bold text-orange-600">{avgClickRate.toFixed(1)}%</p>
              </div>
              <Globe className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {filteredSubscribers.length} Subscribers
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your newsletter subscriber list
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportSubscribers} className="bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search subscribers..."
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
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All Sources</option>
                {sources.slice(1).map(source => (
                  <option 
                    key={source} 
                    value={source}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {source.charAt(0).toUpperCase() + source.slice(1)}
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
                    Subscriber Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status & Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No subscribers found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No subscribers match your current filter criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedSubscribers.map(subscriber => {
                    const engagement = getEngagementLevel(subscriber.openRate, subscriber.clickRate)
                    return (
                      <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(subscriber.status)}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {subscriber.firstName && subscriber.lastName 
                                  ? `${subscriber.firstName} ${subscriber.lastName}`
                                  : subscriber.email
                                }
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {subscriber.email}
                              </div>
                              {subscriber.location && (
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {subscriber.location}
                                </div>
                              )}
                              {subscriber.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {subscriber.tags.slice(0, 2).map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {subscriber.tags.length > 2 && (
                                    <span className="text-xs text-gray-500">+{subscriber.tags.length - 2}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-2">
                            <Badge 
                              className={`${getStatusColor(subscriber.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                            >
                              {subscriber.status}
                            </Badge>
                            <Badge 
                              className={`${getSourceColor(subscriber.source)} text-xs font-medium px-2.5 py-0.5 rounded-full block`}
                            >
                              {subscriber.source}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            <span className={`font-medium ${engagement.color}`}>
                              {engagement.level}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <div>Open: {subscriber.openRate.toFixed(1)}%</div>
                            <div>Click: {subscriber.clickRate.toFixed(1)}%</div>
                          </div>
                          {subscriber.lastEmailDate && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              Last email: {formatDate(subscriber.lastEmailDate)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(subscriber.subscribedDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveDropdown(activeDropdown === subscriber.id ? null : subscriber.id)
                              }}
                              className="p-1"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                            {activeDropdown === subscriber.id && (
                              <div 
                                className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="py-1">
                                  <button
                                    onClick={() => openDeleteModal(subscriber)}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Subscriber
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedSubscribers.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} subscribers
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
      {showDeleteModal && selectedSubscriber && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-modal-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Remove Subscriber
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to remove "{selectedSubscriber.email}" from your subscriber list? This action cannot be undone and they will no longer receive newsletters.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteSubscriber}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 