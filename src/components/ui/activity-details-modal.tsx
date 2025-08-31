'use client'

import { useState, useEffect } from 'react'
import { X, Phone, Mail, Calendar, Users, FileText, Clock, Target, CheckCircle, AlertCircle, User } from 'lucide-react'
import { Button } from './button'
import { Badge } from './badge'

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
  createdBy?: {
    firstName?: string
    lastName?: string
    email?: string
  }
  createdAt?: string
  updatedAt?: string
}

interface ActivityDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  activity: ActivityData | null
}

export function ActivityDetailsModal({ isOpen, onClose, activity }: ActivityDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: ActivityData['type']) => {
    switch (type) {
      case 'call': return <Phone className="w-5 h-5 text-blue-500" />
      case 'email': return <Mail className="w-5 h-5 text-green-500" />
      case 'meeting': return <Calendar className="w-5 h-5 text-purple-500" />
      case 'note': return <FileText className="w-5 h-5 text-yellow-500" />
      case 'task': return <CheckCircle className="w-5 h-5 text-orange-500" />
      case 'deal': return <Target className="w-5 h-5 text-red-500" />
      case 'quote': return <FileText className="w-5 h-5 text-indigo-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getOutcomeBadge = (outcome?: string) => {
    switch (outcome) {
      case 'successful':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Successful</Badge>
      case 'unsuccessful':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Unsuccessful</Badge>
      case 'rescheduled':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Rescheduled</Badge>
      case 'no-answer':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">No Answer</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">—</Badge>
    }
  }

  const getTaskStatusBadge = (status?: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Overdue</Badge>
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">—</Badge>
    }
  }

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Urgent</Badge>
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Low</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">—</Badge>
    }
  }

  if (!isVisible || !activity) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-150 ${
            isOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-150 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {getActivityIcon(activity.type)}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activity.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  {activity.subtype && ` • ${activity.subtype.charAt(0).toUpperCase() + activity.subtype.slice(1)}`}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Outcome
                  </label>
                  {getOutcomeBadge(activity.outcome)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {activity.duration ? `${activity.duration} minutes` : '—'}
                  </p>
                </div>
              </div>

              {/* Description */}
              {activity.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    {activity.description}
                  </p>
                </div>
              )}

              {/* Scheduling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activity.scheduledAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Scheduled
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {formatDate(activity.scheduledAt)}
                      </p>
                    </div>
                  </div>
                )}
                {activity.completedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Completed
                    </label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {formatDate(activity.completedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Communication Details */}
              {activity.communication && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Communication
                  </label>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Direction:</span>
                        <p className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                          {activity.communication.direction || '—'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Channel:</span>
                        <p className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                          {activity.communication.channel || '—'}
                        </p>
                      </div>
                    </div>
                    {activity.communication.subject && (
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Subject:</span>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {activity.communication.subject}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Task Details */}
              {activity.task && activity.type === 'task' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Details
                  </label>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Status:</span>
                        <div className="mt-1">
                          {getTaskStatusBadge(activity.task.status)}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Priority:</span>
                        <div className="mt-1">
                          {getPriorityBadge(activity.task.priority)}
                        </div>
                      </div>
                    </div>
                    {activity.task.dueDate && (
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Due Date:</span>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {new Date(activity.task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {activity.task.category && (
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Category:</span>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {activity.task.category}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Follow-up */}
              {activity.followUp?.required && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Follow-up Required
                  </label>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg space-y-2">
                    {activity.followUp.dueDate && (
                      <div>
                        <span className="text-xs text-blue-600 dark:text-blue-400">Due Date:</span>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          {new Date(activity.followUp.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {activity.followUp.notes && (
                      <div>
                        <span className="text-xs text-blue-600 dark:text-blue-400">Notes:</span>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          {activity.followUp.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Participants */}
              {activity.participants && activity.participants.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Participants ({activity.participants.length})
                  </label>
                  <div className="space-y-2">
                    {activity.participants.map((participant, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {participant.email} • {participant.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <span>Created:</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {activity.createdAt ? formatDate(activity.createdAt) : '—'}
                    </p>
                  </div>
                  <div>
                    <span>Created by:</span>
                    <p className="text-gray-900 dark:text-gray-100">
                      {activity.createdBy?.firstName && activity.createdBy?.lastName 
                        ? `${activity.createdBy.firstName} ${activity.createdBy.lastName}`
                        : 'System'
                      }
                    </p>
                  </div>
                  {activity.updatedAt && activity.updatedAt !== activity.createdAt && (
                    <div className="md:col-span-2">
                      <span>Last updated:</span>
                      <p className="text-gray-900 dark:text-gray-100">
                        {formatDate(activity.updatedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



