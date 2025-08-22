'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../components/ui/loading-button'
import { ArrowLeft, Save, Users, ChevronDown, Plus, X } from 'lucide-react'
import { crmApi } from '../../../../../lib/api'

interface Customer {
  _id: string
  type?: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  displayName?: string
  email?: string
  phone?: string
  addresses?: any[]
  status?: 'lead' | 'prospect' | 'customer' | 'inactive' | 'lost'
  source?: string
  assignedTo?: any
  tags?: string[]
  priority?: string
  lifecycle?: { 
    stage?: string
    lastContact?: string
    nextContact?: string
    contactFrequency?: string
  }
  value?: { 
    estimatedValue?: number
    currency?: string
  }
  engagement?: { 
    totalActivities?: number
  }
  industry?: string
  companySize?: string
  createdAt?: string
  updatedAt?: string
  notes?: string
}

interface CustomerFormData {
  type: 'individual' | 'company'
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
  addresses: Array<{
    type: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isPrimary: boolean
  }>
  industry: string
  companySize: string
  source: string
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  lifecycle: {
    stage: string
    nextContact: string
    contactFrequency: string
  }
  value: {
    estimatedValue: string
    currency: string
  }
  notes: string
}

export default function EditCustomerPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params?.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [newTag, setNewTag] = useState('')
  
  const [formData, setFormData] = useState<CustomerFormData>({
    type: 'individual',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    addresses: [{
      type: 'office',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isPrimary: true
    }],
    industry: '',
    companySize: '',
    source: 'website',
    tags: [],
    priority: 'medium',
    lifecycle: {
      stage: 'awareness',
      nextContact: '',
      contactFrequency: 'weekly'
    },
    value: {
      estimatedValue: '',
      currency: 'USD'
    },
    notes: ''
  })

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsFetching(true)
      setError(null)
      try {
        const response = await crmApi.getById(customerId)
        if (response.success && response.data) {
          const foundCustomer = (response.data as {customer: Customer}).customer
          setCustomer(foundCustomer)
          setFormData({
            type: foundCustomer.type || 'individual',
            firstName: foundCustomer.firstName || '',
            lastName: foundCustomer.lastName || '',
            companyName: foundCustomer.companyName || '',
            email: foundCustomer.email || '',
            phone: foundCustomer.phone || '',
            addresses: foundCustomer.addresses && foundCustomer.addresses.length > 0 
              ? foundCustomer.addresses 
              : [{
                  type: 'office',
                  street: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: '',
                  isPrimary: true
                }],
            industry: foundCustomer.industry || '',
            companySize: foundCustomer.companySize || '',
            source: foundCustomer.source || 'website',
            tags: foundCustomer.tags || [],
            priority: (foundCustomer.priority as 'low' | 'medium' | 'high' | 'urgent') || 'medium',
            lifecycle: {
              stage: foundCustomer.lifecycle?.stage || 'awareness',
              nextContact: foundCustomer.lifecycle?.nextContact ? foundCustomer.lifecycle.nextContact.split('T')[0] : '',
              contactFrequency: foundCustomer.lifecycle?.contactFrequency || 'weekly'
            },
            value: {
              estimatedValue: foundCustomer.value?.estimatedValue?.toString() || '',
              currency: foundCustomer.value?.currency || 'USD'
            },
            notes: foundCustomer.notes || ''
          })
        } else {
          setError('Customer not found')
          router.push('/dashboard/crm')
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load customer')
        router.push('/dashboard/crm')
      } finally {
        setIsFetching(false)
      }
    }

    if (customerId) {
      fetchCustomer()
    }
  }, [customerId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Prepare data for API
      const customerData = {
        type: formData.type,
        firstName: formData.type === 'individual' ? formData.firstName : undefined,
        lastName: formData.type === 'individual' ? formData.lastName : undefined,
        companyName: formData.type === 'company' ? formData.companyName : undefined,
        email: formData.email,
        phone: formData.phone,
        addresses: formData.addresses.filter(addr => addr.city || addr.state), // Only include non-empty addresses
        industry: formData.type === 'company' ? formData.industry : undefined,
        companySize: formData.type === 'company' ? formData.companySize : undefined,
        source: formData.source,
        tags: formData.tags,
        priority: formData.priority,
        lifecycle: {
          stage: formData.lifecycle.stage,
          nextContact: formData.lifecycle.nextContact ? new Date(formData.lifecycle.nextContact).toISOString() : undefined,
          contactFrequency: formData.lifecycle.contactFrequency
        },
        value: {
          estimatedValue: parseFloat(formData.value.estimatedValue) || 0,
          currency: formData.value.currency
        },
        notes: formData.notes
      }

      const response = await crmApi.update(customerId, customerData)
      if (response.success) {
      router.push('/dashboard/crm')
      } else {
        setError((response as {error?: {message: string}})?.error?.message || 'Failed to update customer')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update customer')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        return {
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value
          }
        }
      }
      return {
        ...prev,
        [field]: value
      }
    })
  }

  const handleAddressChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => 
        i === index ? { ...addr, [field]: value } : addr
      )
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
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading Customer...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading customer...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isFetching || !customer) {
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Customer</h1>
          </div>
        </div>

        {/* Loading State */}
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-500 dark:text-gray-400">Loading customer data...</span>
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
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Customer</h1>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">Customer Type *</Label>
                  <div className="relative mt-1">
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.type === 'individual' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="TechCorp Solutions"
                        required
                        className="mt-1"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contact@company.com"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.addresses[0]?.city || ''}
                      onChange={(e) => handleAddressChange(0, 'city', e.target.value)}
                      placeholder="New York"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.addresses[0]?.state || ''}
                      onChange={(e) => handleAddressChange(0, 'state', e.target.value)}
                      placeholder="NY"
                      className="mt-1"
                    />
                  </div>
                </div>

                {formData.type === 'company' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        placeholder="Technology"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <div className="relative mt-1">
                        <select
                          id="companySize"
                          value={formData.companySize}
                          onChange={(e) => handleInputChange('companySize', e.target.value)}
                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
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
                  <Label htmlFor="priority">Priority</Label>
                  <div className="relative mt-1">
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
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
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social-media">Social Media</option>
                      <option value="email-campaign">Email Campaign</option>
                      <option value="cold-outreach">Cold Outreach</option>
                      <option value="event">Event</option>
                      <option value="manual">Manual Entry</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lifecycle.stage">Lifecycle Stage</Label>
                  <div className="relative mt-1">
                    <select
                      id="lifecycle.stage"
                      value={formData.lifecycle.stage}
                      onChange={(e) => handleInputChange('lifecycle.stage', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="awareness">Awareness</option>
                      <option value="interest">Interest</option>
                      <option value="consideration">Consideration</option>
                      <option value="purchase">Purchase</option>
                      <option value="retention">Retention</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="value.currency">Currency</Label>
                  <div className="relative mt-1">
                    <select
                      id="value.currency"
                      value={formData.value.currency}
                      onChange={(e) => handleInputChange('value.currency', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="AED">AED (د.إ)</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="value.estimatedValue">Estimated Value</Label>
                  <Input
                    id="value.estimatedValue"
                    type="number"
                    value={formData.value.estimatedValue}
                    onChange={(e) => handleInputChange('value.estimatedValue', e.target.value)}
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
                  <Label htmlFor="lifecycle.nextContact">Next Contact Date</Label>
                  <Input
                    id="lifecycle.nextContact"
                    type="date"
                    value={formData.lifecycle.nextContact}
                    onChange={(e) => handleInputChange('lifecycle.nextContact', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lifecycle.contactFrequency">Contact Frequency</Label>
                  <div className="relative mt-1">
                    <select
                      id="lifecycle.contactFrequency"
                      value={formData.lifecycle.contactFrequency}
                      onChange={(e) => handleInputChange('lifecycle.contactFrequency', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Interactions:</span>
                  <span>{customer.engagement?.totalActivities || 0} activities</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{customer.updatedAt ? new Date(customer.updatedAt).toLocaleDateString() : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Contact:</span>
                  <span>{customer.lifecycle?.lastContact ? new Date(customer.lifecycle.lastContact).toLocaleDateString() : '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="capitalize">{customer.status || 'lead'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Priority:</span>
                  <span className="capitalize">{customer.priority || 'medium'}</span>
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
                  isLoading={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Customer
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
 