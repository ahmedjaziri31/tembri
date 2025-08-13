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
  Building
} from 'lucide-react'

interface Applicant {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  appliedAt: string
  status: 'new' | 'reviewed' | 'interviewing' | 'rejected' | 'hired'
  resumeUrl?: string
  coverLetter?: string
  experience: string
  education: string
  skills: string[]
  rating?: number
  notes?: string
}

interface Position {
  id: string
  title: string
  department: string
  location: string
  status: string
}

export default function ApplicantsPage() {
  const router = useRouter()
  const params = useParams()
  const positionId = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [position, setPosition] = useState<Position | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Mock data - in real app, this would come from API
  const mockPosition: Position = {
    id: positionId,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    status: 'open'
  }

  const mockApplicants: Applicant[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      appliedAt: '2024-01-15',
      status: 'new',
      resumeUrl: '/resumes/john-doe.pdf',
      experience: '5 years',
      education: 'BS Computer Science, Stanford University',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
      coverLetter: 'I am excited to apply for this position...',
      rating: 4
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      appliedAt: '2024-01-14',
      status: 'reviewed',
      resumeUrl: '/resumes/sarah-johnson.pdf',
      experience: '7 years',
      education: 'MS Software Engineering, MIT',
      skills: ['React', 'Python', 'Docker', 'Kubernetes', 'MongoDB'],
      rating: 5
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      appliedAt: '2024-01-13',
      status: 'interviewing',
      resumeUrl: '/resumes/michael-chen.pdf',
      experience: '3 years',
      education: 'BS Computer Engineering, UC Berkeley',
      skills: ['Vue.js', 'Express.js', 'Redis', 'GraphQL'],
      rating: 4
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Austin, TX',
      appliedAt: '2024-01-12',
      status: 'rejected',
      resumeUrl: '/resumes/emily-davis.pdf',
      experience: '2 years',
      education: 'BS Information Systems, UT Austin',
      skills: ['JavaScript', 'HTML', 'CSS', 'React'],
      rating: 2
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setPosition(mockPosition)
        setApplicants(mockApplicants)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (positionId) {
      fetchData()
    }
  }, [positionId])

  // Filter applicants based on search and filters
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalItems = filteredApplicants.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedApplicants = filteredApplicants.slice(startIndex, endIndex)

  const statuses = ['all', 'new', 'reviewed', 'interviewing', 'rejected', 'hired']

  const getStatusColor = (status: Applicant['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'reviewed': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'interviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'hired': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Applicant['status']) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4 text-blue-500" />
      case 'reviewed': return <Eye className="w-4 h-4 text-purple-500" />
      case 'interviewing': return <Calendar className="w-4 h-4 text-yellow-500" />
      case 'rejected': return <X className="w-4 h-4 text-red-500" />
      case 'hired': return <CheckCircle className="w-4 h-4 text-green-500" />
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
              {position.title} • {position.department} • {position.location}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {filteredApplicants.length} Candidates
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
                {paginatedApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No applicants found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        No applications received for this position yet
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedApplicants.map(applicant => (
                    <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {applicant.firstName[0]}{applicant.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {applicant.firstName} {applicant.lastName}
                              </div>
                              {getStatusIcon(applicant.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {applicant.email}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {applicant.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {applicant.experience}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                          {applicant.education}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {applicant.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {applicant.skills.length > 3 && (
                            <span className="text-xs text-gray-500">+{applicant.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(applicant.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {applicant.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(applicant.rating)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(applicant.appliedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === applicant.id ? null : applicant.id)
                            }}
                            className="p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === applicant.id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </button>
                                {applicant.resumeUrl && (
                                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                  </button>
                                )}
                                <button className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </button>
                                <button className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Hired
                                </button>
                                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
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
          {paginatedApplicants.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} applicants
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
 