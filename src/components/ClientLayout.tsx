'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useStore } from '../store/useStore'
import { ContactSupport } from './ContactSupport'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useStore()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Navigation Header */}
        <Card className="rounded-none border-b">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                DJR Candidate App
              </CardTitle>
              <div className="flex items-center gap-4">
                <nav className="flex gap-4">
                  <Link href="/about">
                    <Button variant="ghost">About</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" size="sm">Sign Up</Button>
                  </Link>
                </nav>
                <Button 
                  onClick={toggleTheme}
                  variant="outline"
                  size="sm"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <main className="container mx-auto py-8">
          {children}
        </main>

        {/* Footer */}
        <Card className="rounded-none border-t mt-16">
          <CardContent className="py-6">
            <div className="text-center text-sm text-muted-foreground">
              © 2024 DJR Candidate App. Built with Next.js, Zustand & shadcn/ui
            </div>
          </CardContent>
        </Card>

        {/* Floating Contact Support */}
        <ContactSupport />
      </div>
    </div>
  )
} 