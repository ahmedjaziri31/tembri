'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircle, Mail, X, Send, HelpCircle } from 'lucide-react'

interface ContactSupportProps {
  developerEmail?: string
  projectName?: string
}

export function ContactSupport({ 
  developerEmail = 'safwen.benfredj@gmail.com',
  projectName = 'Tembri Dashboard'
}: ContactSupportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSupport = async () => {
    setIsLoading(true)
    
    try {
      const subject = encodeURIComponent(`Support Request - ${projectName}`)
      const body = encodeURIComponent(`Hello Safouane,

I need help with the ${projectName} application.

Issue Description:
[Please describe your issue here]

Steps to Reproduce:
1. 
2. 
3. 

Browser: ${navigator.userAgent}
URL: ${window.location.href}
Timestamp: ${new Date().toLocaleString()}

Thank you for your assistance!

Best regards`)

      const mailtoUrl = `mailto:${developerEmail}?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoUrl
      
      // Close the tooltip after a brief delay
      setTimeout(() => {
        setIsOpen(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error opening email client:', error)
      // Fallback: copy email to clipboard
      try {
        await navigator.clipboard.writeText(developerEmail)
        alert(`Email copied to clipboard: ${developerEmail}`)
      } catch (clipboardError) {
        alert(`Please contact support at: ${developerEmail}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickHelp = () => {
    const helpMessage = `Need help with ${projectName}? Here are some quick tips:

🔍 Search: Use the search bar to find articles quickly
📝 Create: Click "Add New Article" to create content  
✏️ Edit: Click the three dots menu on any article to edit
🗑️ Delete: Use the delete option in the three dots menu
🌙 Theme: Toggle between light/dark mode in the header
📱 Mobile: The sidebar minimizes automatically on mobile

Still need help? Click "Email Developer" to contact support!`
    
    alert(helpMessage)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Support Options Tooltip */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 animate-in zoom-in-95 fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              Need Help?
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={handleQuickHelp}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm h-auto py-2"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Quick Help Tips
            </Button>
            
            <Button
              onClick={handleEmailSupport}
              disabled={isLoading}
              size="sm"
              className="w-full justify-start text-sm h-auto py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              {isLoading ? 'Opening...' : 'Email Developer'}
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Developer: Jaziri Ahmed
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Response time: 24-48 hours
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 border-0 relative overflow-hidden animate-float"
        size="sm"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90" />
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-full" />
      </Button>
    </div>
  )
}
 