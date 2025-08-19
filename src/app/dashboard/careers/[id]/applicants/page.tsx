'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
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
  MapPin,
  FileText,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  X,
  Star,
  ChevronDown,
  User,
  GraduationCap,
  Building,
  AlertCircle
} from 'lucide-react'
import { careersApi } from '../../../../../lib/api'

interface Application {
  _id: string
  careerId: string
  applicant: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    location?: string
    currentTitle?: string
    experience?: {
      years: number
      description: string
    }
    education?: {
      degree: string
      school: string
      year: number
    }
  }
  documents?: {
    resume?: {
      url: string
      filename: string
    }
    coverLetter?: string
  }
  responses?: any[]
  status: 'submitted' | 'under-review' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  stage: string
  timeline: any[]
  evaluation?: {
    overallRating?: number
    skills?: any[]
    notes?: string
  }
  createdAt: string
  updatedAt: string
}

interface Position {
  _id: string
  title: string
  department: string
  location: {
    type: string
    city?: string
    state?: string
  }
  status: string
}

export default function ApplicantsPage() {
  const router = useRouter()
  const params = useParams()
  const positionId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [position, setPosition] = useState<Position | null>(null)
  const [allApplications, setAllApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [apiTotal, setApiTotal] = useState(0)

  const fetchData = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Fetch position details and all applications (client-side filter + pagination)
      const [positionResponse, applicationsResponse] = await Promise.all([
        careersApi.getById(positionId),
        careersApi.getApplications(positionId, { page: 1, limit: 1000 })
      ])
      
      if (positionResponse.success && applicationsResponse.success) {
        setPosition(positionResponse.data.career)
        setAllApplications(applicationsResponse.data.applications || [])
        setApiTotal(applicationsResponse.pagination?.total || (applicationsResponse.data.applications?.length ?? 0))
      } else {
        setError(positionResponse.error?.message || applicationsResponse.error?.message || 'Failed to fetch data')
      }
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (positionId) {
      fetchData()
    }
  }, [positionId])

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    setIsUpdating(applicationId)
    try {
      const response = await careersApi.updateApplicationStatus(applicationId, {
        status: newStatus,
        notes: `Status changed to ${newStatus}`
      })
      
      if (response.success) {
        // Refresh data to get updated applications
        await fetchData()
        setActiveDropdown(null)
      } else {
        setError(response.error?.message || 'Failed to update status')
      }
    } catch (error: any) {
      console.error('Error updating status:', error)
      setError(error.message || 'Failed to update status')
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    
    setIsUpdating(applicationId)
    try {
      const response = await careersApi.deleteApplication(applicationId)
      
      if (response.success) {
        // Refresh data to get updated applications
        await fetchData()
        setActiveDropdown(null)
      } else {
        setError(response.error?.message || 'Failed to delete application')
      }
    } catch (error: any) {
      console.error('Error deleting application:', error)
      setError(error.message || 'Failed to delete application')
    } finally {
      setIsUpdating(null)
    }
  }

  // Client-side filtering
  const filteredApplications = allApplications.filter((application) => {
    const matchesStatus = filterStatus === 'all' || application.status === filterStatus as any
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch = !term || (
      `${application.applicant.firstName} ${application.applicant.lastName}`.toLowerCase().includes(term) ||
      (application.applicant.email || '').toLowerCase().includes(term) ||
      (application.applicant.currentTitle || '').toLowerCase().includes(term)
    )
    return matchesStatus && matchesSearch
  })

  // Calculate pagination from filtered
  const totalItems = filteredApplications.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startIndex = Math.min((currentPage - 1) * itemsPerPage, Math.max(0, totalItems - 1))
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

  const statuses = ['all', 'submitted', 'under-review', 'shortlisted', 'interviewing', 'offered', 'hired', 'rejected']

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'under-review': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'shortlisted': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'interviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'offered': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'hired': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4 text-blue-500" />
      case 'under-review': return <Eye className="w-4 h-4 text-purple-500" />
      case 'shortlisted': return <Star className="w-4 h-4 text-indigo-500" />
      case 'interviewing': return <Calendar className="w-4 h-4 text-yellow-500" />
      case 'offered': return <Mail className="w-4 h-4 text-orange-500" />
      case 'hired': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected': return <X className="w-4 h-4 text-red-500" />
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

  const renderStars = (rating?: number) => {
    if (!rating) return null
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating}/5)</span>
      </div>
    )
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
            <User className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading applicants...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!position) {
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
          <User className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applicants</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {position.title} • {position.department} • {position.location.city ? `${position.location.city}, ${position.location.state}` : position.location.type}
            </p>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {apiTotal} Candidates
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review and manage job applications
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
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
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setCurrentPage(1) // Reset to first page on filter
                }}
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
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No applicants found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterStatus !== 'all' ? 'No applications match your search criteria' : 'No applications received for this position yet'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedApplications.map(application => (
                    <tr key={application._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {application.applicant.firstName[0]}{application.applicant.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {application.applicant.firstName} {application.applicant.lastName}
                              </div>
                              {getStatusIcon(application.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {application.applicant.email}
                            </div>
                            {application.applicant.location && (
                              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {application.applicant.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {application.applicant.experience?.years ? `${application.applicant.experience.years} years` : 'Not specified'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                          {application.applicant.education ? `${application.applicant.education.degree}, ${application.applicant.education.school}` : 'Not specified'}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {application.applicant.currentTitle || 'No title specified'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(application.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {application.status.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(application.evaluation?.overallRating)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(application.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === application._id ? null : application._id)
                            }}
                            className="p-1"
                            disabled={isUpdating === application._id}
                          >
                            {isUpdating === application._id ? (
                              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </Button>
                          {activeDropdown === application._id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </button>
                                {application.documents?.resume && (
                                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                  </button>
                                )}
                                <button className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                                  className="flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Star className="w-4 h-4 mr-2" />
                                  Shortlist
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(application._id, 'hired')}
                                  className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Hired
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(application._id, 'rejected')}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </button>
                                <div className="border-t border-gray-100 dark:border-gray-600 my-1"></div>
                                <button 
                                  onClick={() => handleDeleteApplication(application._id)}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Delete Application
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

          {/* Pagination: keep visible even if single page when there are results */}
          {filteredApplications.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {endIndex} of {totalItems} applicants
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
    </div>
  )
}
 