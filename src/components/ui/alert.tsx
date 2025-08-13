"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex items-center gap-3",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "border-blue-200 bg-blue-100 text-blue-900 border-blue-300",
        success: "border-green-200 bg-green-100 text-green-900 border-green-300", 
        warning: "border-yellow-200 bg-yellow-100 text-yellow-900 border-yellow-300",
        destructive: "border-red-200 bg-red-100 text-red-900 border-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const getVariantIcon = (variant: string) => {
  switch (variant) {
    case 'info':
      return Info
    case 'success':
      return CheckCircle
    case 'warning':
      return AlertTriangle
    case 'destructive':
      return AlertCircle
    default:
      return Info
  }
}

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void
  showIcon?: boolean
  action?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", onClose, showIcon = true, action, children, ...props }, ref) => {
    const Icon = getVariantIcon(variant || "default")
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && (
          <Icon className={cn(
            "h-4 w-4 flex-shrink-0",
            variant === "info" && "text-blue-600",
            variant === "success" && "text-green-600", 
            variant === "warning" && "text-yellow-700",
            variant === "destructive" && "text-red-600"
          )} />
        )}
        <div className="flex-1 flex items-center justify-between min-w-0">
          <div className="flex-1 min-w-0">
            {children}
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            {action}
            {onClose && (
              <button
                onClick={onClose}
                className="inline-flex h-5 w-5 items-center justify-center rounded hover:bg-black/10 focus:outline-none text-gray-600 hover:text-gray-800"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants } 