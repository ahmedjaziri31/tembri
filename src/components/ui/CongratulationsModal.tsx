'use client'

import React from 'react'
import Image from 'next/image'

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue?: () => void
}

export function CongratulationsModal({ 
  isOpen, 
  onClose, 
  onContinue 
}: CongratulationsModalProps) {
  if (!isOpen) return null

  const handleContinue = () => {
    console.log('Congratulations continue clicked')
    if (onContinue) {
      onContinue()
    }
  }

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-30 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 text-center">Congratulations</h2>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <p className="text-gray-700 text-sm leading-relaxed">
            Your password has been reset
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-48 relative">
            <Image
              src="/Auth/postalworkerschangedpassword.png"
              alt="Password reset success"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-[#3C66F9] text-white py-2.5 rounded-full font-semibold hover:bg-[#2952F8] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
} 