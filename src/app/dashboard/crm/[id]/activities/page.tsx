'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Badge } from '../../../../../components/ui/badge'
import { 
  ArrowLeft,
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  FileText,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Building,
  ChevronDown,
  Plus,
  Activity as ActivityIcon,
  Edit,
  Trash2,
  CheckCircle,
  Target
} from 'lucide-react'
import { crmApi } from '../../../../../lib/api'
import { ActivityDetailsModal } from '../../../../../components/ui/activity-details-modal'
import { OverlayDropdown } from '../../../../../components/ui/overlay-dropdown'

interface Activity {
  _id: string
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'quote'
  title: string
  description: string
  scheduledAt?: string
  completedAt?: string
  duration?: number
  outcome?: 'successful' | 'unsuccessful' | 'rescheduled' | 'no-answer'
  followUp?: {
    required: boolean
    notes?: string
  }
  createdBy?: any
  status: 'completed' | 'scheduled' | 'cancelled'
  createdAt?: string
}

interface Customer {
  _id: string
  type?: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  displayName?: string
  email?: string
  phone?: string
  status?: string
}

export default function CustomerActivitiesPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params?.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterOutcome, setFilterOutcome] = useState<string>('all')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedActivity, setSelectedActivity] = useState<(Activity & {customerId: string}) | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Fetch customer data
        const customerResponse = await crmApi.getById(customerId)
        if (customerResponse.success && customerResponse.data) {
          setCustomer(customerResponse.data as Customer)
        } else {
          setError('Customer not found')
          return
        }

        // Fetch activities data with filters
        const params: Record<string, string> = {}
        if (filterType !== 'all') params.type = filterType
        if (filterStatus !== 'all') params.status = filterStatus
        
        const activitiesResponse = await crmApi.getActivities(customerId, params)
        if (activitiesResponse.success) {
          setActivities((activitiesResponse.data as any)?.activities || [])
        } else {
          // Activities might not exist yet - that's ok
          setActivities([])
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    if (customerId) {
      fetchData()
    }
  }, [customerId, filterType, filterStatus])

  // Filter activities based on search and additional filters (client-side)
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesOutcome = filterOutcome === 'all' || activity.outcome === filterOutcome
    
    return matchesSearch && matchesOutcome
  })

  // Pagination logic
  const totalItems = filteredActivities.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex)

  const activityTypes = ['all', 'call', 'email', 'meeting', 'note', 'task', 'deal', 'quote']
  const statuses = ['all', 'pending', 'completed', 'overdue', 'cancelled']
  const outcomes = ['all', 'successful', 'unsuccessful', 'rescheduled', 'no-answer']

  // Export functionality
  const exportActivities = () => {
    const csvHeaders = ['Type', 'Title', 'Description', 'Outcome', 'Date', 'Duration', 'Created By']
    const csvData = filteredActivities.map(activity => [
      activity.type,
      activity.title,
      activity.description,
      activity.outcome || '',
      formatDate(activity.scheduledAt || activity.completedAt || activity.createdAt || ''),
      activity.duration ? `${activity.duration} minutes` : '',
      activity.createdBy?.firstName && activity.createdBy?.lastName 
        ? `${activity.createdBy.firstName} ${activity.createdBy.lastName}`
        : 'System'
    ])

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `activities-${customer?.displayName || 'customer'}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Modal functions
  const openModal = (activity: Activity) => {
    setSelectedActivity({ ...activity, customerId })
    setIsModalOpen(true)
    setActiveDropdown(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedActivity(null)
  }

  // Refresh activities
  const refreshActivities = async () => {
    try {
      const params: Record<string, string> = {}
      if (filterType !== 'all') params.type = filterType
      if (filterStatus !== 'all') params.status = filterStatus
      
      const activitiesResponse = await crmApi.getActivities(customerId, params)
      if (activitiesResponse.success) {
        setActivities((activitiesResponse.data as any)?.activities || [])
      }
    } catch (err: unknown) {
      console.error('Failed to refresh activities:', err)
    }
  }

  // Mark activity as completed
  const markAsCompleted = async (activityId: string) => {
    try {
      const updateData: any = {
        status: 'completed',
        completedAt: new Date().toISOString()
      }
      
      // Also update task status if it's a task type activity
      const activity = activities.find(a => a._id === activityId)
      if (activity?.type === 'task') {
        updateData.task = { status: 'completed' }
      }
      
      const response = await crmApi.updateActivity(activityId, updateData)
      if (response.success) {
        await refreshActivities()
        setActiveDropdown(null)
      } else {
        throw new Error((response as any)?.error?.message || 'Update failed')
      }
    } catch (error) {
      console.error('Failed to mark as completed:', error)
      alert('Failed to mark activity as completed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Delete activity
  const deleteActivity = async (activityId: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        const response = await crmApi.deleteActivity(activityId)
        if (response.success) {
          await refreshActivities()
          setActiveDropdown(null)
        } else {
          throw new Error((response as any)?.error?.message || 'Delete failed')
        }
      } catch (error) {
        console.error('Failed to delete activity:', error)
        alert('Failed to delete activity: ' + (error instanceof Error ? error.message : 'Unknown error'))
      }
    }
  }



  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-blue-500" />
      case 'email': return <Mail className="w-4 h-4 text-green-500" />
      case 'meeting': return <Video className="w-4 h-4 text-purple-500" />
      case 'note': return <FileText className="w-4 h-4 text-gray-500" />
      case 'task': return <Clock className="w-4 h-4 text-orange-500" />
      case 'deal': return <Target className="w-4 h-4 text-red-500" />
      case 'quote': return <Building className="w-4 h-4 text-indigo-500" />
      default: return <ActivityIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      weekday: 'short'
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

  if (isLoading) {
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
            <ActivityIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading activities...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!customer) {
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
          <ActivityIcon className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Customer Activities</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {customer.displayName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Unknown'} • {customer.companyName || '—'} • {customer.email || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {filteredActivities.length} Activities
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track all interactions and communications
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={exportActivities}
              variant="outline" 
              className="bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={() => router.push(`/dashboard/crm/${customerId}/activities/new`)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Type:</span>
            </div>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All</option>
                {activityTypes.slice(1).map(type => (
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
            
            <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Outcome:</span>
            </div>
            <div className="relative">
              <select
                value={filterOutcome}
                onChange={(e) => setFilterOutcome(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All</option>
                {outcomes.slice(1).map(outcome => (
                  <option 
                    key={outcome} 
                    value={outcome}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {outcome.charAt(0).toUpperCase() + outcome.slice(1).replace('-', ' ')}
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
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedActivities.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <ActivityIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No activities found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No activities recorded for this customer yet
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedActivities.map(activity => (
                    <tr key={activity._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                              {activity.description}
                            </div>
                            {activity.duration && (
                              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Duration: {activity.duration} minutes
                              </div>
                            )}
                            {activity.outcome && (
                              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                Outcome: {activity.outcome}
                              </div>
                            )}
                            {activity.followUp?.notes && (
                              <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                Follow-up: {activity.followUp.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(activity.scheduledAt || activity.completedAt || activity.createdAt || '')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(activity.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {activity.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {activity.createdBy?.firstName && activity.createdBy?.lastName 
                          ? `${activity.createdBy.firstName} ${activity.createdBy.lastName}`
                          : 'System'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <OverlayDropdown
                          isOpen={activeDropdown === activity._id}
                          onToggle={() => setActiveDropdown(activeDropdown === activity._id ? null : activity._id)}
                          onClose={() => setActiveDropdown(null)}
                        >
                          <button 
                            onClick={() => {
                              openModal(activity)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button 
                            onClick={() => {
                              router.push(`/dashboard/crm/${customerId}/activities/${activity._id}/edit`)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Activity
                          </button>
                          <button 
                            onClick={() => {
                              markAsCompleted(activity._id)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Completed
                          </button>
                          <button 
                            onClick={() => {
                              deleteActivity(activity._id)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </OverlayDropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedActivities.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} activities
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

      {/* Activity Details Modal */}
      <ActivityDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        activity={selectedActivity}
      />
    </div>
  )
}
 