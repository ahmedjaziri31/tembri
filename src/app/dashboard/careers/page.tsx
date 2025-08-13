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
  Eye,
  Calendar,
  MapPin,
  Briefcase,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  ChevronDown
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Position {
  id: string
  title: string
  description: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  level: 'entry' | 'mid' | 'senior' | 'lead'
  status: 'open' | 'closed' | 'paused'
  salary: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  benefits: string[]
  applicantsCount: number
  createdAt: string
  updatedAt: string
  closedAt?: string
}

export default function CareersPage() {
  const router = useRouter()
  
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      description: 'We are looking for an experienced Full Stack Developer to join our dynamic team and help build cutting-edge web applications.',
      department: 'Engineering',
      location: 'Remote',
      type: 'full-time',
      level: 'senior',
      status: 'open',
      salary: {
        min: 80000,
        max: 120000,
        currency: 'USD'
      },
      requirements: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      benefits: ['Health Insurance', 'Remote Work', '401k', 'Unlimited PTO'],
      applicantsCount: 23,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      description: 'Join our design team to create beautiful and intuitive user experiences for our products.',
      department: 'Design',
      location: 'New York, NY',
      type: 'full-time',
      level: 'mid',
      status: 'open',
      salary: {
        min: 65000,
        max: 85000,
        currency: 'USD'
      },
      requirements: ['Figma', 'Adobe Creative Suite', '3+ years experience', 'Portfolio'],
      benefits: ['Health Insurance', 'Design Budget', 'Conference Budget'],
      applicantsCount: 45,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Marketing Intern',
      description: 'Great opportunity for students to gain hands-on experience in digital marketing and content creation.',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'internship',
      level: 'entry',
      status: 'paused',
      salary: {
        min: 20,
        max: 25,
        currency: 'USD'
      },
      requirements: ['Marketing studies', 'Social media knowledge', 'Communication skills'],
      benefits: ['Mentorship', 'Learning opportunities', 'Networking'],
      applicantsCount: 12,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-08'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  // Filter positions based on search and filters
  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         position.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || position.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || position.department === filterDepartment
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  // Pagination logic
  const totalItems = filteredPositions.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPositions = filteredPositions.slice(startIndex, endIndex)

  const departments = Array.from(new Set(positions.map(position => position.department)))
  const statuses = ['all', 'open', 'closed', 'paused']

  const getStatusColor = (status: Position['status']) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 border-green-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Position['status']) => {
    switch (status) {
      case 'open': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'paused': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'closed': return <AlertCircle className="w-4 h-4 text-gray-500" />
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

  const formatSalary = (salary: Position['salary']) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    
    if (salary.min === salary.max) {
      return formatter.format(salary.min)
    }
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`
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

  const handleDeletePosition = () => {
    if (!selectedPosition) return
    
    setPositions(positions.filter(position => position.id !== selectedPosition.id))
    setShowDeleteModal(false)
    setSelectedPosition(null)
  }

  const handleClosePosition = async (position: Position) => {
    setIsProcessing(position.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedPosition: Position = {
        ...position,
        status: 'closed',
        closedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setPositions(prev => prev.map(p => p.id === position.id ? updatedPosition : p))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error closing position:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const handlePausePosition = async (position: Position) => {
    setIsProcessing(position.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedPosition: Position = {
        ...position,
        status: 'paused',
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setPositions(prev => prev.map(p => p.id === position.id ? updatedPosition : p))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error pausing position:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const openDeleteModal = (position: Position) => {
    setSelectedPosition(position)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Briefcase className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Career Management</h1>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Job Positions</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage job openings and track applications
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/careers/new')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Position
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search positions..."
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
                    Position Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Applicants
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
                {paginatedPositions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No positions found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Get started by creating your first job opening
                      </p>
                      <Button onClick={() => router.push('/dashboard/careers/new')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Position
                      </Button>
                    </td>
                  </tr>
                ) : (
                  paginatedPositions.map(position => (
                    <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {position.title}
                              </div>
                              {getStatusIcon(position.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                              {formatSalary(position.salary)} • {position.type} • {position.level}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {position.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className="text-xs">
                          {position.department}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(position.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {position.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900 dark:text-gray-100">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{position.applicantsCount}</span>
                          <span className="text-gray-500">candidates</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(position.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === position.id ? null : position.id)
                            }}
                            className="p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === position.id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/careers/${position.id}/applicants`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Users className="w-4 h-4 mr-2" />
                                  See Applicants ({position.applicantsCount})
                                </button>
                                
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/careers/${position.id}/edit`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                                
                                {position.status === 'open' && (
                                  <button
                                    onClick={() => handlePausePosition(position)}
                                    disabled={isProcessing === position.id}
                                    className="flex items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <Clock className="w-4 h-4 mr-2" />
                                    {isProcessing === position.id ? 'Pausing...' : 'Pause'}
                                  </button>
                                )}
                                
                                {position.status === 'open' && (
                                  <button
                                    onClick={() => handleClosePosition(position)}
                                    disabled={isProcessing === position.id}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    {isProcessing === position.id ? 'Closing...' : 'Close Position'}
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => openDeleteModal(position)}
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
          {paginatedPositions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} positions
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
      {showDeleteModal && selectedPosition && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-modal-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Delete Position
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{selectedPosition.title}"? This action cannot be undone and will remove all associated applicant data.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeletePosition}>
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
 