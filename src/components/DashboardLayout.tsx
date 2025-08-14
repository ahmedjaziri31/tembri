'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useStore } from '../store/useStore'
import { ProfileDropdown } from './ProfileDropdown'
import { NotificationsPanel } from './NotificationsPanel'
import { ContactSupport } from './ContactSupport'
import { 
  Home, 
  User, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  FileText,
  Briefcase,
  Users,
  Mail
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Articles', href: '/dashboard/articles', icon: FileText },
  { name: 'Careers', href: '/dashboard/careers', icon: Briefcase },
  { name: 'CRM', href: '/dashboard/crm', icon: Users },
  { name: 'Newsletter', href: '/dashboard/newsletter', icon: Mail },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
]

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useStore()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarMinimized, setSidebarMinimized] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Handle hydration and authentication check
  useEffect(() => {
    setMounted(true)
    
    // Check authentication
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      setIsAuthenticated(true)
    } else {
      // Redirect to login if not authenticated
      router.push('/auth/login')
    }
  }, [router])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    // Redirect to login
    router.push('/auth/login')
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
    setNotificationsOpen(false) // Close notifications when opening profile
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
    setProfileDropdownOpen(false) // Close profile when opening notifications
  }

  const closeAllDropdowns = () => {
    setProfileDropdownOpen(false)
    setNotificationsOpen(false)
  }

  // Close dropdowns when navigating to a new page
  useEffect(() => {
    closeAllDropdowns()
  }, [pathname])

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted and authenticated
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen">
        <div className="bg-background text-foreground">
          {/* Loading skeleton - Fixed sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50">
            <div className="h-16 border-b border-gray-200 flex items-center px-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
            </div>
          </div>
          {/* Loading skeleton - Main content */}
          <div className="lg:ml-64 flex flex-col min-h-screen">
            <header className="bg-white border-b border-gray-200 h-16">
              <div className="h-full flex items-center justify-between px-8">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-8 bg-gray-50">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-4"></div>
              <div className="grid grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 ${sidebarMinimized ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}>
          {/* Sidebar header */}
          <div className={`flex items-center justify-between h-16 ${sidebarMinimized ? 'px-2' : 'px-6'} border-b border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center">
              {!sidebarMinimized && (
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Maison Elaris
                </h1>
              )}
              {sidebarMinimized && (
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SF</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Minimize/Expand button - hidden on mobile */}
              <button
                onClick={() => setSidebarMinimized(!sidebarMinimized)}
                className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={sidebarMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
              >
                {sidebarMinimized ? (
                  <Menu className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
              {/* Mobile close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation - Scrollable area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <nav className={`py-6 ${sidebarMinimized ? 'px-1' : 'px-3'}`}>
              <div className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center ${sidebarMinimized ? 'justify-center px-2 py-3' : 'px-3 py-2'} rounded-lg text-sm font-medium transition-colors group relative ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                      title={sidebarMinimized ? item.name : undefined}
                    >
                      <Icon className={`w-5 h-5 ${!sidebarMinimized ? 'mr-3' : ''}`} />
                      {!sidebarMinimized && item.name}
                      {/* Tooltip for minimized state */}
                      {sidebarMinimized && (
                        <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* User section - Fixed at bottom */}
          <div className={`flex-shrink-0 ${sidebarMinimized ? 'p-2' : 'p-4'} border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900`}>
            {!sidebarMinimized ? (
              <>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">SF</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Jaziri Ahmed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ahmedjaziri41@gmail.com</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start text-gray-600 dark:text-gray-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SF</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-8 h-8 p-0 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 group relative"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  {/* Tooltip for logout button */}
                  <div className="absolute right-10 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Sign out
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className={`flex-1 flex flex-col min-h-screen ${sidebarMinimized ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300`}>
          {/* Top header */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-gray-600 mr-4"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                {/* Search bar */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative"
                    onClick={toggleNotifications}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                  <NotificationsPanel 
                    isOpen={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                  />
                </div>

                {/* Theme toggle */}
                <Button 
                  onClick={toggleTheme}
                  variant="outline"
                  size="sm"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </Button>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    <span className="text-white text-sm font-medium">SF</span>
                  </button>
                  <ProfileDropdown 
                    isOpen={profileDropdownOpen}
                    onClose={() => setProfileDropdownOpen(false)}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>

        {/* Floating Contact Support */}
        <ContactSupport />
      </div>
    </div>
  )
}
 