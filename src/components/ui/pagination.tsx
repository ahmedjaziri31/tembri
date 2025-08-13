"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const paginationVariants = cva(
  "mx-auto flex w-full justify-center",
  {
    variants: {
      size: {
        default: "gap-1",
        sm: "gap-0.5",
        lg: "gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const paginationContentVariants = cva(
  "flex items-center gap-1",
  {
    variants: {
      size: {
        default: "gap-1",
        sm: "gap-0.5", 
        lg: "gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-full",
        square: "rounded-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-11 w-11",
      },
      state: {
        default: "",
        active: "bg-primary text-primary-foreground hover:bg-primary/90",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      size: "default",
      state: "default",
    },
  }
)

const Pagination = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"nav"> & VariantProps<typeof paginationVariants>
>(({ className, size, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn(paginationVariants({ size }), className)}
    {...props}
  />
))
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul"> & VariantProps<typeof paginationContentVariants>
>(({ className, size, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(paginationContentVariants({ size }), className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  isDisabled?: boolean
} & VariantProps<typeof paginationItemVariants> &
  React.ComponentProps<"a">

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ 
    className, 
    isActive, 
    isDisabled,
    variant, 
    shape, 
    size, 
    state,
    ...props 
  }, ref) => {
    const linkState = isActive ? "active" : isDisabled ? "disabled" : state

    return (
      <a
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          paginationItemVariants({ variant, shape, size, state: linkState }),
          className
        )}
        {...props}
      />
    )
  }
)
PaginationLink.displayName = "PaginationLink"

type PaginationButtonProps = {
  isActive?: boolean
  isDisabled?: boolean
} & VariantProps<typeof paginationItemVariants> &
  React.ComponentProps<"button">

const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ 
    className, 
    isActive, 
    isDisabled,
    variant, 
    shape, 
    size, 
    state,
    ...props 
  }, ref) => {
    const buttonState = isActive ? "active" : isDisabled ? "disabled" : state

    return (
      <button
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        disabled={isDisabled}
        className={cn(
          paginationItemVariants({ variant, shape, size, state: buttonState }),
          className
        )}
        {...props}
      />
    )
  }
)
PaginationButton.displayName = "PaginationButton"

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink> & {
    showIcon?: boolean
    showText?: boolean
  }
>(({ className, showIcon = true, showText = true, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    {showIcon && <ChevronLeft className="h-4 w-4" />}
    {showText && <span>Previous</span>}
  </PaginationLink>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink> & {
    showIcon?: boolean
    showText?: boolean
  }
>(({ className, showIcon = true, showText = true, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    {showText && <span>Next</span>}
    {showIcon && <ChevronRight className="h-4 w-4" />}
  </PaginationLink>
))
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink> & {
    showIcon?: boolean
    showText?: boolean
  }
>(({ className, showIcon = true, showText = false, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    className={cn("gap-1", className)}
    size="icon"
    {...props}
  >
    {showIcon && <ChevronsLeft className="h-4 w-4" />}
    {showText && <span>First</span>}
  </PaginationLink>
))
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink> & {
    showIcon?: boolean
    showText?: boolean
  }
>(({ className, showIcon = true, showText = false, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    className={cn("gap-1", className)}
    size="icon"
    {...props}
  >
    {showText && <span>Last</span>}
    {showIcon && <ChevronsRight className="h-4 w-4" />}
  </PaginationLink>
))
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

// Utility function to generate page numbers
interface PaginationInfo {
  totalPages: number
  currentPage: number
  siblingCount?: number
}

export const usePagination = ({ 
  totalPages, 
  currentPage, 
  siblingCount = 1 
}: PaginationInfo) => {
  const range = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5 // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftItems = Array.from({ length: leftItemCount }, (_, i) => i + 1)

      return [...leftItems, "...", lastPageIndex]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightItems = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      )

      return [firstPageIndex, "...", ...rightItems]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleItems = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )

      return [firstPageIndex, "...", ...middleItems, "...", lastPageIndex]
    }

    return []
  }, [totalPages, currentPage, siblingCount])

  return range
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  paginationVariants,
  paginationItemVariants,
} 