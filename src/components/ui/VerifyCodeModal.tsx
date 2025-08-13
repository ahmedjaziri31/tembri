'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'

interface VerifyCodeModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onCodeVerified?: (code: string) => void
}

export function VerifyCodeModal({ 
  isOpen, 
  onClose, 
  email, 
  onCodeVerified 
}: VerifyCodeModalProps) {
  const [code, setCode] = useState(['', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length === 4) {
      console.log('Verifying code:', fullCode)
      if (onCodeVerified) {
        onCodeVerified(fullCode)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-30 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h2 className="text-xl font-bold text-gray-900 text-center">Verify your email</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="text-left mb-8">
          <p className="text-gray-700 text-sm leading-relaxed">
            Please enter the 4 digit code we sent to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Code Input Fields */}
          <div className="flex justify-center gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border-2 border-blue-500 rounded-lg text-center text-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            ))}
          </div>

          {/* Send Code Button */}
          <button
            type="submit"
            className="w-full bg-[#3C66F9] text-white py-2.5 rounded-full font-semibold hover:bg-[#2952F8] transition-colors"
          >
            Send code
          </button>
        </form>
      </div>
    </div>
  )
} 