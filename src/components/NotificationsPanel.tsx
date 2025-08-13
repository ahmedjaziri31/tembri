'use client'

import { Bell, Check, X, Clock, AlertCircle, Info } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Article Published',
    message: 'Your article "Getting Started with Next.js" has been published successfully.',
    type: 'success',
    timestamp: '2 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Career Application Received',
    message: 'A new application has been submitted for the Senior Developer position.',
    type: 'info',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2:00 AM. Expect 30 minutes of downtime.',
    type: 'warning',
    timestamp: '3 hours ago',
    read: true
  },
  {
    id: '4',
    title: 'Newsletter Sent',
    message: 'Your weekly newsletter has been sent to 1,247 subscribers.',
    type: 'success',
    timestamp: '1 day ago',
    read: true
  }
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <Check className="w-4 h-4 text-green-500" />
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
    case 'error':
      return <X className="w-4 h-4 text-red-500" />
    default:
      return <Info className="w-4 h-4 text-blue-500" />
  }
}

const getNotificationBadgeColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'error':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  }
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null

  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Notifications Panel */}
      <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-80">
          {mockNotifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          !notification.read 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {notification.title}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getNotificationBadgeColor(notification.type)}`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {mockNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                // Handle mark all as read
                console.log('Mark all as read')
                onClose()
              }}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </div>
    </>
  )
} 