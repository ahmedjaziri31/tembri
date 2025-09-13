'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FollowUsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page and scroll to social media section
    router.push('/#social-media')
  }, [router])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-300 font-body">Taking you to our social media section</p>
      </div>
    </div>
  )
}
