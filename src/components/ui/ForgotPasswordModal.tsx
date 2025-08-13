'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onResetPasswordSuccess?: (email: string) => void
}

export function ForgotPasswordModal({ 
  isOpen, 
  onClose, 
  onResetPasswordSuccess 
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Reset password for:', email)
    
    // Simulate successful password reset request
    if (onResetPasswordSuccess) {
      onResetPasswordSuccess(email)
    }
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-30 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h2 className="text-xl font-bold text-gray-900 text-center">Forgot password</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="text-left mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            Please enter your email address and we&apos;ll send you a code to reset your password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-[#3C66F9] text-white py-2.5 rounded-full font-semibold hover:bg-[#2952F8] transition-colors mt-6"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
} 