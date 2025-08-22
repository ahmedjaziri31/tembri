'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../../components/ui/card'
import { Button } from '../../../../../../../components/ui/button'
import { Input } from '../../../../../../../components/ui/input'
import { Label } from '../../../../../../../components/ui/label'
import { Textarea } from '../../../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../../../components/ui/loading-button'
import { ArrowLeft, Save, Activity, ChevronDown, Plus, X } from 'lucide-react'
import { crmApi } from '../../../../../../../lib/api'

interface Customer {
  _id: string
  type?: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  displayName?: string
  email?: string
  phone?: string
}

interface ActivityData {
  _id: string
  customerId: string
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'quote'
  subtype?: string
  title: string
  description?: string
  outcome?: 'successful' | 'unsuccessful' | 'rescheduled' | 'no-answer'
  scheduledAt?: string
  completedAt?: string
  duration?: number
  communication?: {
    direction?: 'inbound' | 'outbound'
    channel?: 'phone' | 'email' | 'sms' | 'video' | 'in-person'
    subject?: string
  }
  task?: {
    status?: 'pending' | 'completed' | 'overdue' | 'cancelled'
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    dueDate?: string
    category?: string
  }
  followUp?: {
    required?: boolean
    dueDate?: string
    notes?: string
  }
  participants?: Array<{
    name: string
    email: string
    role: 'organizer' | 'attendee' | 'presenter'
  }>
  createdAt?: string
  updatedAt?: string
}

interface ActivityFormData {
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal' | 'quote'
  subtype: string
  title: string
  description: string
  outcome: 'successful' | 'unsuccessful' | 'rescheduled' | 'no-answer'
  scheduledAt: string
  duration: string
  communication: {
    direction: 'inbound' | 'outbound'
    channel: 'phone' | 'email' | 'sms' | 'video' | 'in-person'
    subject: string
  }
  task: {
    status: 'pending' | 'completed' | 'overdue' | 'cancelled'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    dueDate: string
    category: string
  }
  followUp: {
    required: boolean
    dueDate: string
    notes: string
  }
  participants: Array<{
    name: string
    email: string
    role: 'organizer' | 'attendee' | 'presenter'
  }>
}

export default function EditActivityPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params?.id as string
  const activityId = params?.activityId as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [activity, setActivity] = useState<ActivityData | null>(null)

  const [formData, setFormData] = useState<ActivityFormData>({
    type: 'call',
    subtype: 'outbound',
    title: '',
    description: '',
    outcome: 'successful',
    scheduledAt: '',
    duration: '',
    communication: {
      direction: 'outbound',
      channel: 'phone',
      subject: ''
    },
    task: {
      status: 'pending',
      priority: 'medium',
      dueDate: '',
      category: ''
    },
    followUp: {
      required: false,
      dueDate: '',
      notes: ''
    },
    participants: []
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      setError(null)
      
      try {
        // Fetch customer data
        const customerResponse = await crmApi.getById(customerId)
        if (customerResponse.success && customerResponse.data) {
          const foundCustomer = (customerResponse.data as {customer: Customer}).customer
          setCustomer(foundCustomer)
        } else {
          setError('Customer not found')
          router.push('/dashboard/crm')
          return
        }

        // Fetch activity data
        const activityResponse = await crmApi.getActivity(activityId)
        if (activityResponse.success && activityResponse.data) {
          const foundActivity = (activityResponse.data as any)?.activity
          
          if (foundActivity) {
            setActivity(foundActivity)
            
            // Preload form data
            setFormData({
              type: foundActivity.type || 'call',
              subtype: foundActivity.subtype || 'outbound',
              title: foundActivity.title || '',
              description: foundActivity.description || '',
              outcome: foundActivity.outcome || 'successful',
              scheduledAt: foundActivity.scheduledAt ? new Date(foundActivity.scheduledAt).toISOString().slice(0, 16) : '',
              duration: foundActivity.duration?.toString() || '',
              communication: {
                direction: foundActivity.communication?.direction || 'outbound',
                channel: foundActivity.communication?.channel || 'phone',
                subject: foundActivity.communication?.subject || ''
              },
              task: {
                status: foundActivity.task?.status || 'pending',
                priority: foundActivity.task?.priority || 'medium',
                dueDate: foundActivity.task?.dueDate ? new Date(foundActivity.task.dueDate).toISOString().split('T')[0] : '',
                category: foundActivity.task?.category || ''
              },
              followUp: {
                required: foundActivity.followUp?.required || false,
                dueDate: foundActivity.followUp?.dueDate ? new Date(foundActivity.followUp.dueDate).toISOString().split('T')[0] : '',
                notes: foundActivity.followUp?.notes || ''
              },
              participants: foundActivity.participants || []
            })
          } else {
            setError('Activity not found')
            router.push(`/dashboard/crm/${customerId}/activities`)
            return
          }
        } else {
          setError('Failed to load activity')
          router.push(`/dashboard/crm/${customerId}/activities`)
          return
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        router.push(`/dashboard/crm/${customerId}/activities`)
      } finally {
        setIsFetching(false)
      }
    }

    if (customerId && activityId) {
      fetchData()
    }
  }, [customerId, activityId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Prepare data for API
      const activityData = {
        type: formData.type,
        subtype: formData.subtype,
        title: formData.title,
        description: formData.description,
        outcome: formData.outcome,
        scheduledAt: formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : undefined,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        communication: {
          direction: formData.communication.direction,
          channel: formData.communication.channel,
          subject: formData.communication.subject || undefined
        },
        task: formData.type === 'task' ? {
          status: formData.task.status,
          priority: formData.task.priority,
          dueDate: formData.task.dueDate ? new Date(formData.task.dueDate).toISOString() : undefined,
          category: formData.task.category || undefined
        } : undefined,
        followUp: formData.followUp.required ? {
          required: true,
          dueDate: formData.followUp.dueDate ? new Date(formData.followUp.dueDate).toISOString() : undefined,
          notes: formData.followUp.notes || undefined
        } : { required: false },
        participants: formData.participants.map(p => ({
          name: p.name,
          email: p.email,
          role: p.role
        }))
      }

      const response = await crmApi.updateActivity(activityId, activityData)
      if (response.success) {
        router.push(`/dashboard/crm/${customerId}/activities`)
      } else {
        setError((response as {error?: {message: string}})?.error?.message || 'Failed to update activity')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update activity')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '', role: 'attendee' }]
    }))
  }

  const removeParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }))
  }

  const updateParticipant = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
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
            <Activity className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Activity</h1>
          </div>
        </div>

        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-500 dark:text-gray-400">Loading activity data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!customer || !activity) {
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
          <Activity className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Activity</h1>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Activity Type *</Label>
                    <div className="relative mt-1">
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="meeting">Meeting</option>
                        <option value="note">Note</option>
                        <option value="task">Task</option>
                        <option value="deal">Deal</option>
                        <option value="quote">Quote</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subtype">Subtype</Label>
                    <div className="relative mt-1">
                      <select
                        id="subtype"
                        value={formData.subtype}
                        onChange={(e) => handleInputChange('subtype', e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="inbound">Inbound</option>
                        <option value="outbound">Outbound</option>
                        <option value="follow-up">Follow-up</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Follow-up call about proposal"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description of the activity..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledAt">Scheduled Date & Time</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="30"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Details */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="communication.direction">Direction</Label>
                    <div className="relative mt-1">
                      <select
                        id="communication.direction"
                        value={formData.communication.direction}
                        onChange={(e) => handleInputChange('communication.direction', e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="inbound">Inbound</option>
                        <option value="outbound">Outbound</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="communication.channel">Channel</Label>
                    <div className="relative mt-1">
                      <select
                        id="communication.channel"
                        value={formData.communication.channel}
                        onChange={(e) => handleInputChange('communication.channel', e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="video">Video</option>
                        <option value="in-person">In-Person</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {(formData.communication.channel === 'email' || formData.type === 'email') && (
                  <div>
                    <Label htmlFor="communication.subject">Subject</Label>
                    <Input
                      id="communication.subject"
                      value={formData.communication.subject}
                      onChange={(e) => handleInputChange('communication.subject', e.target.value)}
                      placeholder="Email subject line"
                      className="mt-1"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="outcome">Outcome</Label>
                  <div className="relative mt-1">
                    <select
                      id="outcome"
                      value={formData.outcome}
                      onChange={(e) => handleInputChange('outcome', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="successful">Successful</option>
                      <option value="unsuccessful">Unsuccessful</option>
                      <option value="rescheduled">Rescheduled</option>
                      <option value="no-answer">No Answer</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Details (if type is task) */}
            {formData.type === 'task' && (
              <Card>
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task.status">Status</Label>
                      <div className="relative mt-1">
                        <select
                          id="task.status"
                          value={formData.task.status}
                          onChange={(e) => handleInputChange('task.status', e.target.value)}
                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="overdue">Overdue</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="task.priority">Priority</Label>
                      <div className="relative mt-1">
                        <select
                          id="task.priority"
                          value={formData.task.priority}
                          onChange={(e) => handleInputChange('task.priority', e.target.value)}
                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task.dueDate">Due Date</Label>
                      <Input
                        id="task.dueDate"
                        type="date"
                        value={formData.task.dueDate}
                        onChange={(e) => handleInputChange('task.dueDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task.category">Category</Label>
                      <Input
                        id="task.category"
                        value={formData.task.category}
                        onChange={(e) => handleInputChange('task.category', e.target.value)}
                        placeholder="e.g., Follow-up, Documentation"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.participants.map((participant, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <Label htmlFor={`participant-name-${index}`}>Name</Label>
                      <Input
                        id={`participant-name-${index}`}
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`participant-email-${index}`}>Email</Label>
                      <Input
                        id={`participant-email-${index}`}
                        type="email"
                        value={participant.email}
                        onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`participant-role-${index}`}>Role</Label>
                      <div className="relative mt-1">
                        <select
                          id={`participant-role-${index}`}
                          value={participant.role}
                          onChange={(e) => updateParticipant(index, 'role', e.target.value)}
                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="organizer">Organizer</option>
                          <option value="attendee">Attendee</option>
                          <option value="presenter">Presenter</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeParticipant(index)}
                        className="mt-1 text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addParticipant}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Participant
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Follow-up */}
            <Card>
              <CardHeader>
                <CardTitle>Follow-up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="followUp.required"
                    checked={formData.followUp.required}
                    onChange={(e) => handleInputChange('followUp.required', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <Label htmlFor="followUp.required" className="text-sm">
                    Require follow-up
                  </Label>
                </div>

                {formData.followUp.required && (
                  <>
                    <div>
                      <Label htmlFor="followUp.dueDate">Follow-up Due Date</Label>
                      <Input
                        id="followUp.dueDate"
                        type="date"
                        value={formData.followUp.dueDate}
                        onChange={(e) => handleInputChange('followUp.dueDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="followUp.notes">Follow-up Notes</Label>
                      <Textarea
                        id="followUp.notes"
                        value={formData.followUp.notes}
                        onChange={(e) => handleInputChange('followUp.notes', e.target.value)}
                        placeholder="Notes for follow-up..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Updating...' : 'Update Activity'}
                </LoadingButton>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="w-full"
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


