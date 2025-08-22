import React from 'react'
import { Button } from './button'
import { cn } from '../../lib/utils'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  isLoading = false, 
  loadingText, 
  children, 
  disabled,
  className,
  ...props 
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      className={cn(className)}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {loadingText || children}
        </div>
      ) : (
        children
      )}
    </Button>
  )
}