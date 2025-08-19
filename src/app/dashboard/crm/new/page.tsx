'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'
import { LoadingButton } from '../../../../components/ui/loading-button'
import { ArrowLeft, Save, Users, ChevronDown, Plus, X } from 'lucide-react'

interface CustomerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  location: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  source: 'website' | 'referral' | 'social-media' | 'email-campaign' | 'cold-outreach' | 'event'
  dealValue: string
  currency: string
  assignedTo: string
  tags: string[]
  nextFollowUp: string
  notes: string
}

export default function NewCustomerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    location: '',
    status: 'new',
    source: 'website',
    dealValue: '',
    currency: 'USD',
    assignedTo: 'Jaziri Ahmed',
    tags: [],
    nextFollowUp: '',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would make your API call to create the customer
      console.log('Creating customer:', {
        ...formData,
        dealValue: parseFloat(formData.dealValue) || 0,
        interactionsCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0]
      })

      // Navigate back to CRM list
      router.push('/dashboard/crm')
    } catch (error) {
      console.error('Error creating customer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
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
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Lead</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Smith"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john.smith@company.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="New York, NY"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="TechCorp Solutions"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Chief Technology Officer"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Add Tag</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="e.g., Enterprise, High Priority, Tech"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <Label>Customer Tags</Label>
                    <div className="space-y-2">
                      {formData.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="flex-1 text-sm">{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTag(index)}
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

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional information about this lead/customer..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <div className="relative mt-1">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="new" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">New</option>
                      <option value="contacted" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Contacted</option>
                      <option value="qualified" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Qualified</option>
                      <option value="proposal" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Proposal</option>
                      <option value="negotiation" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Negotiation</option>
                      <option value="closed-won" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Closed Won</option>
                      <option value="closed-lost" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Closed Lost</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="source">Lead Source</Label>
                  <div className="relative mt-1">
                    <select
                      id="source"
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="website" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Website</option>
                      <option value="referral" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Referral</option>
                      <option value="social-media" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Social Media</option>
                      <option value="email-campaign" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Email Campaign</option>
                      <option value="cold-outreach" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Cold Outreach</option>
                      <option value="event" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Event</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                    placeholder="Sales representative"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
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
                      <option value="AED" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">AED (د.إ)</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dealValue">Potential Deal Value</Label>
                  <Input
                    id="dealValue"
                    type="number"
                    value={formData.dealValue}
                    onChange={(e) => handleInputChange('dealValue', e.target.value)}
                    placeholder="50000"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow-up</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
                  <Input
                    id="nextFollowUp"
                    type="date"
                    value={formData.nextFollowUp}
                    onChange={(e) => handleInputChange('nextFollowUp', e.target.value)}
                    className="mt-1"
                  />
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
                  Create Lead
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
 