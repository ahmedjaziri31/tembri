'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import { LoadingButton } from '../../../../components/ui/loading-button'
import { ArrowLeft, Save, Briefcase, ChevronDown, Plus, X } from 'lucide-react'

interface PositionFormData {
  title: string
  description: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  level: 'entry' | 'mid' | 'senior' | 'lead'
  status: 'open' | 'closed' | 'paused'
  salaryMin: string
  salaryMax: string
  currency: string
  requirements: string[]
  benefits: string[]
}

export default function NewPositionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newRequirement, setNewRequirement] = useState('')
  const [newBenefit, setNewBenefit] = useState('')
  
  const [formData, setFormData] = useState<PositionFormData>({
    title: '',
    description: '',
    department: '',
    location: '',
    type: 'full-time',
    level: 'mid',
    status: 'open',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    requirements: [],
    benefits: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would make your API call to create the position
      console.log('Creating position:', {
        ...formData,
        salary: {
          min: parseInt(formData.salaryMin),
          max: parseInt(formData.salaryMax),
          currency: formData.currency
        },
        applicantsCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      })

      // Navigate back to careers list
      router.push('/dashboard/careers')
    } catch (error) {
      console.error('Error creating position:', error)
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

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Position</h1>
        </div>
      </div>

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
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Remote, New York, NY"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Add Requirement</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="e.g., 3+ years of React experience"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.requirements.length > 0 && (
                  <div className="space-y-2">
                    <Label>Requirements List</Label>
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="flex-1 text-sm">{req}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(index)}
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
                  <Label htmlFor="type">Employment Type</Label>
                  <div className="relative mt-1">
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="full-time" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Full Time</option>
                      <option value="part-time" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Part Time</option>
                      <option value="contract" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Contract</option>
                      <option value="internship" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="level">Experience Level</Label>
                  <div className="relative mt-1">
                    <select
                      id="level"
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="entry" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Entry Level</option>
                      <option value="mid" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Mid Level</option>
                      <option value="senior" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Senior Level</option>
                      <option value="lead" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Lead/Principal</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="relative mt-1">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="open" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Open</option>
                      <option value="paused" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Paused</option>
                      <option value="closed" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Closed</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
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

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Position
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
 