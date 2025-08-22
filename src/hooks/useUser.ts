import { useState, useEffect } from 'react'
import { authApi, getStoredUser } from '../lib/api'

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  status: string
  profileImage?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  socialLinks?: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async (forceRefresh = false) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Always try to get fresh data from API first
      const response = await authApi.getProfile()
      if (response.success && response.data?.user) {
        setUser(response.data.user)
        // Update stored user data with fresh data
        const { setStoredUser } = await import('../lib/api')
        setStoredUser(response.data.user)
        return response.data.user
      } else {
        // Only use stored data if API fails and we're not forcing refresh
        if (!forceRefresh) {
          const storedUser = getStoredUser()
          if (storedUser) {
            const userWithDefaults = { ...storedUser, status: 'active' } as User
            setUser(userWithDefaults)
            return userWithDefaults
          }
        }
        setError('No user data available')
        return null
      }
    } catch (err: any) {
      console.error('Failed to fetch user:', err)
      // Try stored user as fallback only if not forcing refresh
      if (!forceRefresh) {
        const storedUser = getStoredUser()
        if (storedUser) {
          const userWithDefaults = { ...storedUser, status: 'active' } as User
          setUser(userWithDefaults)
          return userWithDefaults
        }
      }
      setError(err.message || 'Failed to load user data')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = () => {
    return fetchUser()
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return {
    user,
    isLoading,
    error,
    refreshUser,
    setUser
  }
}
