'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../components/ui/loading-button'
import { careersApi } from '../../../../../lib/api'
import { ArrowLeft, Save, Briefcase, ChevronDown, Plus, X, AlertCircle, CheckCircle } from 'lucide-react'

interface Position {
  _id: string
  title: string
  slug?: string
  description: string
  shortDescription?: string
  department: string
  location: {
    type: string
    city?: string
    state?: string
    country?: string
  }
  employment: {
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
    level: 'entry' | 'mid' | 'senior' | 'executive'
    experience?: string
  }
  compensation: {
    salaryMin: number
    salaryMax: number
    currency: string
    benefits?: string[]
  }
  requirements: {
    skills: string[]
    education?: string
    experience?: string
  }
  status: 'draft' | 'published' | 'paused' | 'closed' | 'filled'
  visibility?: string
  priority?: string
  hiring: {
    positions: number
    filled: number
    pipeline: {
      applied: number
      screening: number
      interview: number
      offer: number
      hired: number
    }
  }
  analytics: {
    views: number
    applications: number
  }
  createdAt: string
  updatedAt: string
  publishedAt?: string
  closedAt?: string
}

interface PositionFormData {
  title: string
  description: string
  shortDescription: string
  department: string
  locationType: string
  locationCity: string
  locationState: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  employmentLevel: 'entry' | 'mid' | 'senior' | 'executive'
  status: 'draft' | 'published' | 'paused' | 'closed' | 'filled'
  salaryMin: string
  salaryMax: string
  currency: string
  skills: string[]
  benefits: string[]
  visibility: string
  priority: string
}

export default function EditPositionPage() {
  const router = useRouter()
  const params = useParams()
  const positionId = params?.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [position, setPosition] = useState<Position | null>(null)
  const [newSkill, setNewSkill] = useState('')
  const [newBenefit, setNewBenefit] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<PositionFormData>({
    title: '',
    description: '',
    shortDescription: '',
    department: '',
    locationType: 'remote',
    locationCity: '',
    locationState: '',
    employmentType: 'full-time',
    employmentLevel: 'mid',
    status: 'draft',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    skills: [],
    benefits: [],
    visibility: 'public',
    priority: 'medium'
  })

  // Fetch position data from API
  useEffect(() => {
    const fetchPosition = async () => {
      if (!positionId) {
        router.push('/dashboard/careers')
        return
      }

      setIsFetching(true)
      setError(null)
      
      try {
        const response = await careersApi.getById(positionId)
        
        console.log('Career edit fetch response:', response)
        
        if (response.success && response.data) {
          const career = (response.data as any).career || (response.data as any)
          setPosition(career)
          
          // Populate form with fetched data
          setFormData({
            title: career.title || '',
            description: career.description || '',
            shortDescription: career.shortDescription || '',
            department: career.department || '',
            locationType: career.location?.type || 'remote',
            locationCity: career.location?.city || '',
            locationState: career.location?.state || '',
            employmentType: career.employment?.type || 'full-time',
            employmentLevel: career.employment?.level || 'mid',
            status: career.status || 'draft',
            salaryMin: career.compensation?.salaryMin?.toString() || '',
            salaryMax: career.compensation?.salaryMax?.toString() || '',
            currency: career.compensation?.currency || 'USD',
            skills: career.requirements?.skills || [],
            benefits: career.compensation?.benefits || [],
            visibility: career.visibility || 'public',
            priority: career.priority || 'medium'
          })
        } else {
          setError('Position not found')
          setTimeout(() => router.push('/dashboard/careers'), 2000)
        }
      } catch (err) {
        console.error('Error fetching position:', err)
        setError(err instanceof Error ? err.message : 'Failed to load position')
        setTimeout(() => router.push('/dashboard/careers'), 2000)
      } finally {
        setIsFetching(false)
      }
    }

      fetchPosition()
  }, [positionId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Prepare update data to match backend schema
      const updateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        department: formData.department.trim(),
        location: {
          type: formData.locationType,
          city: formData.locationCity.trim(),
          state: formData.locationState.trim()
        },
        employment: {
          type: formData.employmentType,
          level: formData.employmentLevel
        },
        compensation: {
          salaryMin: parseInt(formData.salaryMin) || 0,
          salaryMax: parseInt(formData.salaryMax) || 0,
          currency: formData.currency,
          benefits: formData.benefits
        },
        requirements: {
          skills: formData.skills
        },
        status: formData.status,
        visibility: formData.visibility,
        priority: formData.priority
      }
      
      console.log('Updating position with data:', updateData)
      
      const response = await careersApi.update(positionId, updateData)
      
      if (response.success) {
        setSuccessMessage('Position updated successfully!')
        // Navigate back to careers list after a short delay
        setTimeout(() => {
      router.push('/dashboard/careers')
        }, 1500)
      } else {
        setError('Failed to update position')
      }
    } catch (err) {
      console.error('Error updating position:', err)
      setError(err instanceof Error ? err.message : 'Failed to update position')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof PositionFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }))
      setNewBenefit('')
    }
  }

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
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
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading Position...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading position...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !position) {
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
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Position</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Position</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => router.push('/dashboard/careers')}>
              Go Back to Careers
            </Button>
          </div>
        </div>
      </div>
    )
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
          <Briefcase className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Position</h1>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Position Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Full Stack Developer"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Brief summary of the position..."
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="e.g., Engineering, Design, Marketing"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="locationType">Location Type *</Label>
                    <div className="relative mt-1">
                      <select
                        id="locationType"
                        value={formData.locationType}
                        onChange={(e) => handleInputChange('locationType', e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="remote">Remote</option>
                        <option value="onsite">On-site</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="locationCity">City</Label>
                    <Input
                      id="locationCity"
                      value={formData.locationCity}
                      onChange={(e) => handleInputChange('locationCity', e.target.value)}
                      placeholder="e.g., New York"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="locationState">State</Label>
                    <Input
                      id="locationState"
                      value={formData.locationState}
                      onChange={(e) => handleInputChange('locationState', e.target.value)}
                      placeholder="e.g., NY"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Add Skill</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., React, Node.js, TypeScript"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.skills.length > 0 && (
                  <div className="space-y-2">
                    <Label>Skills List</Label>
                    <div className="space-y-2">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="flex-1 text-sm">{skill}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Add Benefit</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="e.g., Health Insurance, Remote Work"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    />
                    <Button type="button" onClick={addBenefit} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.benefits.length > 0 && (
                  <div className="space-y-2">
                    <Label>Benefits List</Label>
                    <div className="space-y-2">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="flex-1 text-sm">{benefit}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBenefit(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Position Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <div className="relative mt-1">
                    <select
                      id="employmentType"
                      value={formData.employmentType}
                      onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="employmentLevel">Experience Level</Label>
                  <div className="relative mt-1">
                    <select
                      id="employmentLevel"
                      value={formData.employmentLevel}
                      onChange={(e) => handleInputChange('employmentLevel', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="relative mt-1">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="paused">Paused</option>
                      <option value="closed">Closed</option>
                      <option value="filled">Filled</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <div className="relative mt-1">
                    <select
                      id="visibility"
                      value={formData.visibility}
                      onChange={(e) => handleInputChange('visibility', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="internal">Internal</option>
                      <option value="private">Private</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <div className="relative mt-1">
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <div className="relative mt-1">
                    <select
                      id="currency"
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="USD" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">USD ($)</option>
                      <option value="EUR" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">EUR (€)</option>
                      <option value="GBP" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">GBP (£)</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="salaryMin">Min Salary</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                      placeholder="50000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax">Max Salary</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                      placeholder="80000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Position Info */}
            <Card>
              <CardHeader>
                <CardTitle>Position Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Applications:</span>
                  <span>{position?.analytics?.applications || 0} candidates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Views:</span>
                  <span>{position?.analytics?.views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Positions Open:</span>
                  <span>{position?.hiring?.positions || 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>{position ? new Date(position.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{position ? new Date(position.updatedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                {position?.publishedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Published:</span>
                    <span>{new Date(position.publishedAt).toLocaleDateString()}</span>
                  </div>
                )}
                {position?.closedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Closed:</span>
                    <span>{new Date(position.closedAt).toLocaleDateString()}</span>
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
                  Update Position
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
 