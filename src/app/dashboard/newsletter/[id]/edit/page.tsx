'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../components/ui/card'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Textarea } from '../../../../../components/ui/textarea'
import { LoadingButton } from '../../../../../components/ui/loading-button'
import { ArrowLeft, Save, Mail, ChevronDown, Plus, X, Send, Clock } from 'lucide-react'

interface Newsletter {
  id: string
  title: string
  subject: string
  previewText: string
  content: string
  status: 'draft' | 'scheduled' | 'sent' | 'archived'
  type: 'promotional' | 'newsletter' | 'announcement' | 'welcome' | 'event'
  recipientCount: number
  openRate?: number
  clickRate?: number
  scheduledDate?: string
  scheduledTime?: string
  sentDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

interface NewsletterFormData {
  title: string
  subject: string
  previewText: string
  content: string
  status: 'draft' | 'scheduled'
  type: 'promotional' | 'newsletter' | 'announcement' | 'welcome' | 'event'
  scheduledDate: string
  scheduledTime: string
  tags: string[]
}

export default function EditNewsletterPage() {
  const router = useRouter()
  const params = useParams()
  const newsletterId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null)
  const [newTag, setNewTag] = useState('')
  
  const [formData, setFormData] = useState<NewsletterFormData>({
    title: '',
    subject: '',
    previewText: '',
    content: '',
    status: 'draft',
    type: 'newsletter',
    scheduledDate: '',
    scheduledTime: '',
    tags: []
  })

  // Mock data - replace with actual API call
  const mockNewsletter: Newsletter = {
    id: newsletterId,
    title: 'Monthly Product Update - January 2024',
    subject: '🚀 Exciting New Features This Month!',
    previewText: 'Discover the latest features and improvements we\'ve shipped...',
    content: `<h1>Monthly Product Update - January 2024</h1>

<p>Hi there!</p>

<p>We've been busy this month shipping some amazing new features and improvements based on your feedback. Here's what's new:</p>

<h2>🚀 New Features</h2>
<ul>
  <li><strong>Advanced Dashboard Analytics</strong> - Get deeper insights into your data</li>
  <li><strong>Team Collaboration Tools</strong> - Work better together with your team</li>
  <li><strong>Mobile App Updates</strong> - Improved performance and new features</li>
</ul>

<h2>🔧 Improvements</h2>
<ul>
  <li>Faster page loading times</li>
  <li>Better search functionality</li>
  <li>Enhanced security measures</li>
</ul>

<p>We're always working to make your experience better. Have feedback or suggestions? Reply to this email - we read every message!</p>

<p>Best regards,<br>
The Product Team</p>`,
    status: 'draft',
    type: 'newsletter',
    recipientCount: 1250,
    scheduledDate: '2024-01-20',
    scheduledTime: '10:00',
    createdBy: 'Jaziri Ahmed',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-15',
    tags: ['Product Updates', 'Monthly', 'Features']
  }

  useEffect(() => {
    const fetchNewsletter = async () => {
      setIsFetching(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Find newsletter by ID - replace with actual API call
        const foundNewsletter = mockNewsletter
        
        if (foundNewsletter) {
          // Don't allow editing sent newsletters content, only archived ones
          if (foundNewsletter.status === 'sent') {
            router.push('/dashboard/newsletter')
            return
          }
          
          setNewsletter(foundNewsletter)
          setFormData({
            title: foundNewsletter.title,
            subject: foundNewsletter.subject,
            previewText: foundNewsletter.previewText,
            content: foundNewsletter.content,
            status: foundNewsletter.status === 'scheduled' ? 'scheduled' : 'draft',
            type: foundNewsletter.type,
            scheduledDate: foundNewsletter.scheduledDate || '',
            scheduledTime: foundNewsletter.scheduledTime || '',
            tags: foundNewsletter.tags
          })
        } else {
          // Newsletter not found, redirect to newsletter list
          router.push('/dashboard/newsletter')
        }
      } catch (error) {
        console.error('Error fetching newsletter:', error)
        router.push('/dashboard/newsletter')
      } finally {
        setIsFetching(false)
      }
    }

    if (newsletterId) {
      fetchNewsletter()
    }
  }, [newsletterId, router])

  const handleSubmit = async (e: React.FormEvent, action: 'save' | 'send' | 'schedule') => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let finalStatus: 'draft' | 'scheduled' | 'sent' = 'draft'
      if (action === 'send') finalStatus = 'sent'
      if (action === 'schedule') finalStatus = 'scheduled'
      
      // Here you would make your API call to update the newsletter
      console.log('Updating newsletter:', {
        ...formData,
        id: newsletterId,
        status: finalStatus,
        updatedAt: new Date().toISOString().split('T')[0],
        ...(action === 'send' && { sentDate: new Date().toISOString().split('T')[0] }),
        ...(action === 'schedule' && { 
          scheduledDate: formData.scheduledDate,
          scheduledTime: formData.scheduledTime 
        })
      })

      // Navigate back to newsletter list
      router.push('/dashboard/newsletter')
    } catch (error) {
      console.error('Error updating newsletter:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof NewsletterFormData, value: string) => {
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

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
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
            <Mail className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Loading Newsletter...</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading newsletter...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!newsletter) {
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
          <Mail className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Newsletter</h1>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Newsletter Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Monthly Product Update - January 2024"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Internal title for organization and tracking</p>
                </div>

                <div>
                  <Label htmlFor="subject">Email Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="🚀 Exciting New Features This Month!"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">The subject line that subscribers will see in their inbox</p>
                </div>

                <div>
                  <Label htmlFor="previewText">Preview Text</Label>
                  <Input
                    id="previewText"
                    value={formData.previewText}
                    onChange={(e) => handleInputChange('previewText', e.target.value)}
                    placeholder="Discover the latest features and improvements we've shipped..."
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Preview text shown in email clients (usually 50-100 characters)</p>
                </div>

                <div>
                  <Label htmlFor="content">Newsletter Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Write your newsletter content here. You can use HTML for formatting..."
                    rows={12}
                    required
                    className="mt-1 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Full newsletter content. HTML formatting is supported.</p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags & Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Add Tag</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="e.g., Monthly, Product Updates, Promotion"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <Label>Newsletter Tags</Label>
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
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">Newsletter Type</Label>
                  <div className="relative mt-1">
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="newsletter" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Newsletter</option>
                      <option value="promotional" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Promotional</option>
                      <option value="announcement" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Announcement</option>
                      <option value="welcome" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Welcome</option>
                      <option value="event" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Event</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Newsletter Status</Label>
                  <div className="relative mt-1">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <option value="draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Save as Draft</option>
                      <option value="scheduled" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Schedule for Later</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            {formData.status === 'scheduled' && (
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="scheduledDate">Send Date</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                      min={getTomorrowDate()}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="scheduledTime">Send Time</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Time in your local timezone</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Newsletter Info */}
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Status:</span>
                  <span className="capitalize font-medium">{newsletter.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>{new Date(newsletter.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{new Date(newsletter.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created By:</span>
                  <span>{newsletter.createdBy}</span>
                </div>
                {newsletter.recipientCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Recipients:</span>
                    <span>{newsletter.recipientCount.toLocaleString()}</span>
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
                  type="button"
                  loading={isLoading}
                  onClick={(e) => handleSubmit(e, 'save')}
                  variant="outline"
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </LoadingButton>

                {formData.status === 'scheduled' ? (
                  <LoadingButton
                    type="button"
                    loading={isLoading}
                    onClick={(e) => handleSubmit(e, 'schedule')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!formData.scheduledDate}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Update Schedule
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    type="button"
                    loading={isLoading}
                    onClick={(e) => handleSubmit(e, 'send')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </LoadingButton>
                )}
                
                <Button
                  type="button"
                  variant="ghost"
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
 