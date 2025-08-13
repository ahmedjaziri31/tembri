'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(300) // 5 minutes countdown
  const [resendCountdown, setResendCountdown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  // Mock data - in real app, this would come from router params or state
  const contactMethod = 'email' // or 'phone'
  const contactInfo = 'user@example.com' // or phone number

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCountdown])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take the last character
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && !isLoading) {
      handleVerify(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '') // Remove non-digits
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('').slice(0, 6)
      setOtp(newOtp)
      setError('')
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (code: string) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate verification logic
      if (code === '123456') { // Mock valid code
        console.log('OTP verified successfully:', code)
        setIsVerified(true)
        // Redirect after successful verification
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError('Invalid verification code. Please try again.')
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    
    if (code.length !== 6) {
      setError('Please enter the complete verification code')
      return
    }
    
    handleVerify(code)
  }

  const handleResendCode = async () => {
    if (resendCountdown > 0) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log(`Resending verification code via ${contactMethod} to:`, contactInfo)
      setResendCountdown(60) // Start 60-second countdown
      setCountdown(300) // Reset main countdown
      setOtp(['', '', '', '', '', ''])
      setError('')
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Verification successful!</CardTitle>
            <CardDescription>
              Your account has been verified successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Redirecting you to your dashboard...
            </p>
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Enter verification code</CardTitle>
          <CardDescription>
            We sent a 6-digit code to
          </CardDescription>
          <div className="flex items-center justify-center gap-2 mt-2 bg-gray-50 rounded-lg p-2">
            {contactMethod === 'email' ? (
              <Mail className="w-4 h-4 text-gray-500" />
            ) : (
              <Phone className="w-4 h-4 text-gray-500" />
            )}
            <span className="font-medium text-sm">{contactInfo}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-bold"
                    variant={error ? 'error' : 'default'}
                  />
                ))}
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>

            <div className="text-center space-y-2">
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Code expires in <span className="font-medium text-orange-600">{formatTime(countdown)}</span>
                </p>
              ) : (
                <p className="text-sm text-red-500 font-medium">
                  Code has expired. Please request a new one.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.some(digit => digit === '') || countdown === 0}
            >
              {isLoading ? 'Verifying...' : 'Verify code'}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn't receive the code?
              </p>
              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={isLoading || resendCountdown > 0}
                className="w-full"
              >
                {isLoading ? 'Resending...' : resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend code'}
              </Button>
            </div>

            <div className="text-center">
              <Link href="/auth/resend-code" className="text-sm text-blue-600 hover:text-blue-500">
                Use different {contactMethod === 'email' ? 'phone number' : 'email address'}
              </Link>
            </div>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800 text-center">
              <strong>Demo:</strong> Use code <span className="font-mono font-bold">123456</span> to verify
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
 