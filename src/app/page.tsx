'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Root() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to /dashboard on root access (or /auth/login if not authenticated)
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-muted-foreground">Taking you to your dashboard</p>
        </div>
    </div>
  )
}
