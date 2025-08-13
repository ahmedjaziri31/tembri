'use client'

import React, { useState, useEffect } from 'react'
import { Mail, Phone, ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ResendCodePage() {
  const [contactMethod, setContactMethod] = useState('email')
  const [contact, setContact] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!contact.trim()) {
      setError(`${contactMethod === 'email' ? 'Email' : 'Phone number'} is required`)
      return
    }
    
    if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(contact)) {
      setError('Please enter a valid email address')
      return
    }

    if (contactMethod === 'phone' && !/^\+?[\d\s\-\(\)]+$/.test(contact)) {
      setError('Please enter a valid phone number')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log(`Verification code sent via ${contactMethod} to:`, contact)
      // Handle resend code logic here
      
      setIsCodeSent(true)
      setCountdown(60) // Start 60-second countdown
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log(`Resending verification code via ${contactMethod} to:`, contact)
      setCountdown(60) // Restart countdown
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCodeSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Code sent successfully</CardTitle>
            <CardDescription>
              We've sent a verification code to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-3 border">
                {contactMethod === 'email' ? (
                  <Mail className="w-4 h-4 text-gray-500" />
                ) : (
                  <Phone className="w-4 h-4 text-gray-500" />
                )}
                <span className="font-medium text-sm">{contact}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                The verification code will expire in 10 minutes. Please check your{' '}
                {contactMethod === 'email' ? 'inbox and spam folder' : 'messages'}.
              </p>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={isLoading || countdown > 0}
              >
                {isLoading ? 'Resending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
              </Button>

              <Button
                className="w-full"
                onClick={() => router.push('/auth/verify-otp')}
              >
                I have the code
              </Button>

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
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Resend verification code</CardTitle>
          <CardDescription>
            Choose how you'd like to receive your verification code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label>How would you like to receive the code?</Label>
              <RadioGroup
                value={contactMethod}
                onValueChange={setContactMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Send via Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Send via SMS
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">
                {contactMethod === 'email' ? 'Email address' : 'Phone number'}
              </Label>
              <div className="relative">
                {contactMethod === 'email' ? (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                ) : (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}
                <Input
                  id="contact"
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="pl-10"
                  variant={error ? 'error' : 'default'}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Important:</p>
                  <p>The verification code will expire in 10 minutes after being sent.</p>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send verification code'}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to sign in
            </Link>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
 