'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../components/ui/card'
import { Button } from '../../../../../../components/ui/button'
import { Badge } from '../../../../../../components/ui/badge'

import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  GraduationCap,
  Building,
  Star,
  Download,
  User,
  Clock,
  AlertCircle
} from 'lucide-react'
import { careersApi } from '../../../../../../lib/api'

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
  location: string
  type: string
  level: string
  status: string
}

export default function ApplicantViewPage() {
  const router = useRouter()
  const params = useParams()
  const positionId = params?.id as string
  const applicantId = params?.applicantId as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [application, setApplication] = useState<Application | null>(null)
  const [position, setPosition] = useState<Position | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const [positionResponse, applicationsResponse] = await Promise.all([
        careersApi.getById(positionId),
        careersApi.getApplications(positionId, { page: 1, limit: 1000 })
      ])
      
      if (positionResponse.success && applicationsResponse.success) {
        setPosition((positionResponse.data as any)?.career)
        const foundApplication = (applicationsResponse.data as any)?.applications?.find(
          (app: Application) => app._id === applicantId
        )
        if (foundApplication) {
          setApplication(foundApplication)
        } else {
          setError('Applicant not found')
        }
      } else {
        setError((positionResponse.error as any)?.message || (applicationsResponse.error as any)?.message || 'Failed to fetch data')
      }
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [positionId, applicantId])


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'under-review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'shortlisted': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
      case 'interviewing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'offered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'hired': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />
      case 'under-review': return <AlertCircle className="w-4 h-4" />
      case 'shortlisted': return <Star className="w-4 h-4" />
      case 'interviewing': return <User className="w-4 h-4" />
      case 'offered': case 'hired': return <Star className="w-4 h-4" />
      case 'rejected': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const renderStars = (rating?: number) => {
    if (!rating) return <span className="text-gray-400 text-sm">No rating</span>
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
          ({rating}/5)
        </span>
      </div>
    )
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-md">
          Application not found
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {application.applicant.firstName} {application.applicant.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Application for: {position?.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(application.status)} px-3 py-1`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(application.status)}
                {application.status.replace('-', ' ')}
              </div>
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Applicant Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {application.applicant.email}
                    </p>
                  </div>
                </div>
                
                {application.applicant.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {application.applicant.phone}
                      </p>
                    </div>
                  </div>
                )}
                
                {application.applicant.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {application.applicant.location}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Applied</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(application.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              
              {application.applicant.currentTitle && (
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Building className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Title</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {application.applicant.currentTitle}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Experience & Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Experience & Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.applicant.experience && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Experience</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {application.applicant.experience.years} years
                  </p>
                  {application.applicant.experience.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {application.applicant.experience.description}
                    </p>
                  )}
                </div>
              )}
              
              {application.applicant.education && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Education</h4>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {application.applicant.education.degree}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {application.applicant.education.school} • {application.applicant.education.year}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          {application.documents && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.documents.resume && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.documents.resume.filename}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Resume</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Download functionality - currently disabled
                        alert('Download functionality will be implemented later')
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {application.documents.coverLetter && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cover Letter</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {application.documents.coverLetter}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Evaluation (View Only) */}
        <div className="space-y-6">
          {/* Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Overall Rating</p>
                {renderStars(application.evaluation?.overallRating)}
              </div>
              
              {application.evaluation?.notes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Notes</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {application.evaluation.notes}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
