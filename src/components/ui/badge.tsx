"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Status variants matching your image
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
        fail: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
        // Application status variants
        applied: "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
        "under-review": "border-transparent bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
        "test-phase": "border-transparent bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300",
        "interview-phase": "border-transparent bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
        offer: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
        rejected: "border-transparent bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300",
        withdrawn: "border-transparent bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
      shape: {
        default: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, shape }), className)} {...props} />
  )
}

// Status Badge with icon support
interface StatusBadgeProps extends BadgeProps {
  icon?: React.ReactNode
  pulse?: boolean
}

function StatusBadge({ 
  className, 
  variant, 
  size, 
  shape, 
  icon, 
  pulse = false,
  children, 
  ...props 
}: StatusBadgeProps) {
  return (
    <Badge 
      className={cn(
        icon && "gap-1",
        pulse && "animate-pulse",
        className
      )} 
      variant={variant} 
      size={size} 
      shape={shape}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Badge>
  )
}

export { Badge, StatusBadge, badgeVariants } 