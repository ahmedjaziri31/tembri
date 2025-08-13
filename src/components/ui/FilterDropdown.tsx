'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterOption {
  label: string
  value: string
  selected?: boolean
}

interface FilterDropdownProps {
  title: string
  options: FilterOption[]
  onSelectionChange: (selectedValue: string) => void
  resetTrigger?: number
  selectedValue?: string
}

export function FilterDropdown({ title, options, onSelectionChange, resetTrigger, selectedValue }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<FilterOption | null>(
    options.find(option => option.value === selectedValue) || 
    options.find(option => option.selected) || 
    null
  )
  const [hasChanged, setHasChanged] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sync with parent selectedValue
  useEffect(() => {
    if (selectedValue) {
      const option = options.find(opt => opt.value === selectedValue)
      if (option) {
        setSelectedOption(option)
      }
    }
  }, [selectedValue, options])

  // Reset to initial state when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      const initialOption = options.find(option => option.selected) || null
      setSelectedOption(initialOption)
      setHasChanged(false)
    }
  }, [resetTrigger])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionSelect = (option: FilterOption) => {
    setSelectedOption(option)
    setHasChanged(true)
    onSelectionChange(option.value)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const handleApply = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button - More Rounded */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors text-xs font-medium shadow-sm"
      >
        <span className="text-gray-700">{title}</span>
        {hasChanged && selectedOption && (
          <span className="bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
            1
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - More Rounded Card */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-6">
            {/* Options List with Radio Buttons */}
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selectedOption?.value === option.value
                return (
                  <label key={option.value} className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name={`filter-${title}`}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(option)}
                        className="sr-only"
                      />
                      {/* Custom Radio Button Design */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'bg-white border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-4 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      {option.label}
                    </span>
                  </label>
                )
              })}
            </div>

            {/* Action Buttons - More Rounded */}
            <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 text-sm font-medium text-blue-600 bg-transparent rounded-full hover:bg-blue-50 transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 