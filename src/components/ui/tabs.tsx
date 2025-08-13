"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabsListVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "h-10 rounded-md bg-muted p-1",
        underline: "h-10 border-b border-border",
        pills: "gap-2 bg-transparent",
        linked: "gap-1 bg-transparent",
        vertical: "flex-col h-auto w-full bg-transparent items-stretch",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-sm px-3 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        underline: "border-b-2 border-transparent px-4 py-2 text-sm data-[state=active]:border-blue-500 data-[state=active]:text-foreground hover:text-foreground text-muted-foreground",
        pills: "rounded-full px-4 py-2 text-sm bg-muted/50 hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        linked: "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/10",
        vertical: "w-full justify-start gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-blue-50 hover:text-gray-900 data-[state=active]:bg-blue-50 data-[state=active]:text-gray-900 data-[state=active]:border-r-2 data-[state=active]:border-blue-500 border-r-2 border-transparent dark:hover:bg-blue-900/20 dark:hover:text-foreground dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-foreground",
      },
      size: {
        default: "px-3 py-1.5 text-sm",
        sm: "px-2 py-1 text-xs",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants> & {
      icon?: React.ReactNode
      iconOnly?: boolean
      badge?: string | number
      disabled?: boolean
    }
>(({ className, variant, size, icon, iconOnly, badge, disabled, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({ variant, size }),
      iconOnly && "aspect-square p-2",
      disabled && "opacity-50 text-muted-foreground/50",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {icon && (
      <span className={cn("flex-shrink-0", !iconOnly && children && (variant === "vertical" ? "mr-3" : "mr-2"))}>
        {icon}
      </span>
    )}
    {!iconOnly && (
      <span className="flex items-center gap-2">
        {children}
        {badge && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
            {badge}
          </span>
        )}
      </span>
    )}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants } 