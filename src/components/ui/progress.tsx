"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1.5",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof progressVariants> & {
    value?: number
    max?: number
    variant?: "default" | "gradient" | "blue" | "success" | "warning" | "danger"
    showLabel?: boolean
    animated?: boolean
  }
>(({ className, value = 0, max = 100, size, variant = "default", showLabel = false, animated = false, ...props }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const getProgressColor = () => {
    switch (variant) {
      case "gradient":
        if (percentage < 25) return "bg-gradient-to-r from-yellow-400 to-orange-400"
        if (percentage < 50) return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"
        if (percentage < 75) return "bg-gradient-to-r from-orange-400 via-yellow-500 to-lime-400"
        return "bg-gradient-to-r from-yellow-400 via-lime-400 to-green-500"
      case "blue":
        return "bg-blue-500"
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="space-y-2">
      <div
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out",
            getProgressColor(),
            animated && "animate-pulse"
          )}
          style={{ 
            transform: `translateX(-${100 - percentage}%)`,
            transition: animated ? "transform 1s ease-out" : "transform 0.5s ease-out"
          }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}%</span>
          <span>{value} / {max}</span>
        </div>
      )}
    </div>
  )
})
Progress.displayName = "Progress"

// Circular Progress Component
interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabel?: boolean
  variant?: "default" | "gradient" | "blue" | "success" | "warning" | "danger"
  animated?: boolean
}

const CircularProgress = React.forwardRef<
  SVGSVGElement,
  CircularProgressProps
>(({ 
  value = 0, 
  max = 100, 
  size = 80, 
  strokeWidth = 8, 
  className, 
  showLabel = true, 
  variant = "gradient",
  animated = false,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const getStrokeColor = () => {
    switch (variant) {
      case "gradient":
        if (percentage < 25) return "#f59e0b" // yellow-500
        if (percentage < 50) return "#f97316" // orange-500  
        if (percentage < 75) return "#84cc16" // lime-500
        return "#22c55e" // green-500
      case "blue":
        return "#3b82f6" // blue-500
      case "success":
        return "#22c55e" // green-500
      case "warning":
        return "#f59e0b" // yellow-500
      case "danger":
        return "#ef4444" // red-500
      default:
        return "hsl(var(--primary))"
    }
  }

  const getGradientId = () => {
    if (variant === "gradient") {
      if (percentage < 25) return "yellowGradient"
      if (percentage < 50) return "orangeGradient"
      if (percentage < 75) return "limeGradient"
      return "greenGradient"
    }
    return null
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        {...props}
      >
        <defs>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getGradientId() ? `url(#${getGradientId()})` : getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-500 ease-out",
            animated && "animate-pulse"
          )}
          style={{
            transition: animated ? "stroke-dashoffset 1s ease-out" : "stroke-dashoffset 0.5s ease-out"
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
})
CircularProgress.displayName = "CircularProgress"

// Progress Ring Component (alternative circular design)
interface ProgressRingProps extends CircularProgressProps {
  trackColor?: string
  progressColor?: string
}

const ProgressRing = React.forwardRef<
  SVGSVGElement,
  ProgressRingProps
>(({ 
  value = 0, 
  max = 100, 
  size = 120, 
  strokeWidth = 12,
  trackColor = "rgba(0,0,0,0.1)",
  progressColor,
  className, 
  showLabel = true, 
  variant = "gradient",
  animated = false,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const getProgressColor = () => {
    if (progressColor) return progressColor
    
    switch (variant) {
      case "gradient":
        if (percentage < 25) return "#fbbf24"
        if (percentage < 50) return "#f97316"  
        if (percentage < 75) return "#84cc16"
        return "#22c55e"
      case "blue":
        return "#3b82f6"
      case "success":
        return "#22c55e"
      case "warning":
        return "#f59e0b"
      case "danger":
        return "#ef4444"
      default:
        return "hsl(var(--primary))"
    }
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        {...props}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getProgressColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-700 ease-out",
            animated && "animate-pulse"
          )}
          style={{
            transition: animated ? "stroke-dashoffset 1.2s ease-out" : "stroke-dashoffset 0.7s ease-out"
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
})
ProgressRing.displayName = "ProgressRing"

// Multi-step Progress Component
interface MultiStepProgressProps {
  steps: Array<{
    label: string
    completed: boolean
    current?: boolean
  }>
  className?: string
  currentStep?: number
  onStepClick?: (stepIndex: number) => void
  showNumbers?: boolean
}

const MultiStepProgress = React.forwardRef<
  HTMLDivElement,
  MultiStepProgressProps
>(({ steps, className, currentStep, onStepClick, showNumbers = true, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center justify-between w-full", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = step.completed || (currentStep !== undefined && index < currentStep)
        const isCurrent = step.current || (currentStep !== undefined && index === currentStep)
        const isClickable = !!onStepClick
        
        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 border-2",
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white shadow-lg"
                    : isCurrent
                    ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400",
                  isClickable && "cursor-pointer hover:scale-105",
                  isCurrent && "ring-4 ring-blue-200 dark:ring-blue-800"
                )}
                onClick={() => onStepClick?.(index)}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : showNumbers ? (
                  index + 1
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              <div className="text-center">
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isCompleted 
                    ? "text-green-600 dark:text-green-400" 
                    : isCurrent 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {step.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={cn(
                    "h-0.5 transition-all duration-300",
                    isCompleted ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})
MultiStepProgress.displayName = "MultiStepProgress"

export { 
  Progress, 
  CircularProgress, 
  ProgressRing, 
  MultiStepProgress, 
  progressVariants,
  type CircularProgressProps,
  type ProgressRingProps,
  type MultiStepProgressProps
} 