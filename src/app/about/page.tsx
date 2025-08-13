'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useStore } from '../../store/useStore'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const { theme, toggleTheme } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const technologies = [
    {
      name: "Next.js",
      description: "React framework for production with server-side rendering",
      version: "15.4.2",
      icon: "⚡"
    },
    {
      name: "Zustand",
      description: "Small, fast, and scalable state management",
      version: "5.0.6",
      icon: "🐻"
    },
    {
      name: "shadcn/ui",
      description: "Beautiful and accessible component library",
      version: "Latest",
      icon: "🎨"
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      version: "4.0",
      icon: "💨"
    },
    {
      name: "TypeScript",
      description: "Typed superset of JavaScript",
      version: "5.0",
      icon: "📘"
    }
  ]

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            About DJR Candidate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          About DJR Candidate
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This application demonstrates a modern React setup using the latest tools and best practices 
          for building scalable, type-safe, and performant web applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech) => (
          <Card key={tech.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tech.icon}</span>
                <div>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                  <CardDescription className="text-sm">v{tech.version}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Features Demonstrated</CardTitle>
          <CardDescription>
            This project showcases various features and patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">State Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Global state with Zustand</li>
                <li>• Persistent storage</li>
                <li>• DevTools integration</li>
                <li>• Type-safe actions</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Navigation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Client-side routing</li>
                <li>• State-based navigation</li>
                <li>• Smooth transitions</li>
                <li>• URL preservation</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">UI Components</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Accessible components</li>
                <li>• Dark/Light theme</li>
                <li>• Responsive design</li>
                <li>• Consistent styling</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Development Experience</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• TypeScript integration</li>
                <li>• Hot reload</li>
                <li>• ESLint configuration</li>
                <li>• Modern tooling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={toggleTheme}
          size="lg"
          className="mb-4"
        >
          Toggle Theme ({theme === 'light' ? 'Switch to Dark' : 'Switch to Light'})
        </Button>
        <p className="text-sm text-muted-foreground">
          Current theme: <span className="font-semibold capitalize">{theme}</span>
        </p>
      </div>
    </div>
  )
} 