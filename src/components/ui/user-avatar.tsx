import React from 'react'
import { User } from 'lucide-react'
import { cn } from '../../lib/utils'

interface UserAvatarProps {
  firstName?: string
  lastName?: string
  profileImage?: string
  email?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-32 h-32 text-2xl'
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  firstName = '', 
  lastName = '', 
  profileImage = '', 
  size = 'md',
  className 
}) => {
  const getInitials = (first: string, last: string) => {
    if (!first && !last) return ''
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
  }

  const initials = getInitials(firstName, lastName)
  const sizeClass = sizeClasses[size]

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="Profile"
        className={cn(
          'rounded-full object-cover border-2 border-white shadow-sm dark:border-gray-800',
          sizeClass,
          className
        )}
      />
    )
  }

  return (
    <div className={cn(
      'rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm',
      sizeClass,
      className
    )}>
      {initials ? (
        <span className="font-medium">{initials}</span>
      ) : (
        <User className={size === 'xl' ? 'w-12 h-12' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      )}
    </div>
  )
}
