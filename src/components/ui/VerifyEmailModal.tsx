'use client'

import React from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

interface VerifyEmailModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onResendEmail?: () => void
  onContinue?: () => void
}

export function VerifyEmailModal({ 
  isOpen, 
  onClose, 
  email, 
  onResendEmail, 
  onContinue 
}: VerifyEmailModalProps) {
  if (!isOpen) return null

  const handleResendEmail = () => {
    console.log('Resending email to:', email)
    if (onResendEmail) {
      onResendEmail()
    }
  }

  const handleContinue = () => {
    console.log('Continue clicked')
    if (onContinue) {
      onContinue()
    }
  }

  return (
<div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
<div className="bg-white bg-opacity-30 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h2 className="text-xl font-bold text-gray-900 text-center">Verify your Email Address</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-48 relative">
            <Image
              src="/Auth/postalworkersdeliveringmail.png"
              alt="Postal workers delivering mail"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Description Text */}
        <div className="text-left mb-8">
          <p className="text-gray-700 text-sm leading-relaxed">
            An email has been sent to{' '}
            <span className="font-medium text-gray-900">{email}</span>{' '}
            with a link to verify your account. If you have not received the email in a few minutes, please check your spam folder
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleResendEmail}
            className="flex-1 border-2 border-[#3C66F9] bg-transparent text-[#3C66F9] py-2.5 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Resend Email
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-[#3C66F9] text-white py-2.5 rounded-full font-semibold hover:bg-[#2952F8] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
} 