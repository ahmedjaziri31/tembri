import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical } from 'lucide-react'
import { Button } from './button'

interface OverlayDropdownProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  children: React.ReactNode
  className?: string
  trigger?: React.ReactNode
  disabled?: boolean
}

export function OverlayDropdown({ 
  isOpen, 
  onToggle, 
  onClose, 
  children, 
  className = '',
  trigger,
  disabled = false
}: OverlayDropdownProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const calculatePosition = () => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const dropdownHeight = 200 // Approximate max height
    const dropdownWidth = 192 // w-48 = 192px

    // Calculate if dropdown should appear above or below
    const spaceBelow = windowHeight - rect.bottom
    const spaceAbove = rect.top

    let top: number
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      // Show above
      top = rect.top - dropdownHeight + window.scrollY
    } else {
      // Show below
      top = rect.bottom + 4 + window.scrollY
    }

    // Calculate horizontal position (align to right edge of trigger)
    let left = rect.right - dropdownWidth + window.scrollX
    
    // Ensure it stays within viewport
    if (left < 8) {
      left = 8 + window.scrollX
    }
    if (left + dropdownWidth > windowWidth - 8) {
      left = windowWidth - dropdownWidth - 8 + window.scrollX
    }

    setPosition({ top, left })
  }

  useEffect(() => {
    if (isOpen) {
      calculatePosition()
      
      const handleResize = () => calculatePosition()
      const handleScroll = () => calculatePosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        // Check if click is inside dropdown
        const dropdown = document.querySelector('[data-overlay-dropdown]')
        if (!dropdown?.contains(event.target as Node)) {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  // Close on escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const dropdownElement = isOpen ? (
    <div
      data-overlay-dropdown
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 999999
      }}
      className={`w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  ) : null

  return (
    <>
      {trigger ? (
        <div 
          ref={triggerRef as any}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onToggle()
          }}
        >
          {trigger}
        </div>
      ) : (
        <Button
          ref={triggerRef}
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="p-1"
          disabled={disabled}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      )}
      {typeof window !== 'undefined' && dropdownElement && createPortal(dropdownElement, document.body)}
    </>
  )
}
