"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const sideNavigationVariants = cva(
  "flex h-full",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const sidebarVariants = cva(
  "flex-shrink-0 border-r border-border bg-background",
  {
    variants: {
      width: {
        default: "w-64",
        sm: "w-48",
        lg: "w-80",
        xl: "w-96",
      },
    },
    defaultVariants: {
      width: "default",
    },
  }
)

const navigationItemVariants = cva(
  "flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-b border-border last:border-b-0",
        ghost: "hover:bg-accent/50",
        minimal: "",
      },
      state: {
        default: "text-muted-foreground",
        active: "bg-accent text-accent-foreground font-semibold",
        selected: "bg-primary/10 text-primary border-r-2 border-primary font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
)

// Main Side Navigation Container
interface SideNavigationProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sideNavigationVariants> {
  children: React.ReactNode
}

const SideNavigation = React.forwardRef<HTMLDivElement, SideNavigationProps>(
  ({ className, orientation, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sideNavigationVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SideNavigation.displayName = "SideNavigation"

// Sidebar Container
interface SidebarProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sidebarVariants> {
  title?: string
  children: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, width, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sidebarVariants({ width }), className)}
        {...props}
      >
        {title && (
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <nav className="flex-1 overflow-y-auto">
          {children}
        </nav>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

// Navigation Item
interface NavigationItemProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof navigationItemVariants> {
  icon?: React.ReactNode
  children: React.ReactNode
  isActive?: boolean
  isSelected?: boolean
  showChevron?: boolean
}

const NavigationItem = React.forwardRef<HTMLButtonElement, NavigationItemProps>(
  ({ 
    className, 
    variant, 
    state, 
    icon, 
    children, 
    isActive, 
    isSelected,
    showChevron = false,
    ...props 
  }, ref) => {
    // Determine state based on props
    const itemState = isSelected ? "selected" : isActive ? "active" : state

    return (
      <button
        ref={ref}
        className={cn(navigationItemVariants({ variant, state: itemState }), className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </div>
        {showChevron && (
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        )}
      </button>
    )
  }
)
NavigationItem.displayName = "NavigationItem"

// Content Area
interface ContentAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

const ContentArea = React.forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto", className)}
        {...props}
      >
        {title && (
          <div className="px-6 py-4 border-b border-border bg-background">
            <h2 className="text-xl font-semibold text-primary">{title}</h2>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    )
  }
)
ContentArea.displayName = "ContentArea"

// Navigation Group (for organizing items)
interface NavigationGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: React.ReactNode
}

const NavigationGroup = React.forwardRef<HTMLDivElement, NavigationGroupProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {title && (
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </div>
        )}
        <div className="space-y-0">
          {children}
        </div>
      </div>
    )
  }
)
NavigationGroup.displayName = "NavigationGroup"

export {
  SideNavigation,
  Sidebar,
  NavigationItem,
  ContentArea,
  NavigationGroup,
  sideNavigationVariants,
  sidebarVariants,
  navigationItemVariants,
} 