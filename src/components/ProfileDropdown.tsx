'use client'

import Link from 'next/link'
import { User, Settings, LogOut } from 'lucide-react'
import { Button } from './ui/button'

interface ProfileDropdownProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

export function ProfileDropdown({ isOpen, onClose, onLogout }: ProfileDropdownProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
        {/* User Info Section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">SF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Jaziri Ahmed
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                ahmedjaziri41@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <Link
            href="/dashboard/profile"
            onClick={onClose}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <User className="w-4 h-4 mr-3" />
            Profile
          </Link>
          
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Link>
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-2">
          <button
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Log out
          </button>
        </div>
      </div>
    </>
  )
}
 