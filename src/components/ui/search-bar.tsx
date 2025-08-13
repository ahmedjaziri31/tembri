"use client"

import * as React from "react"
import { Search, MapPin } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const searchBarVariants = cva(
  "flex items-center gap-2 border border-input rounded-full bg-background text-foreground shadow-sm transition-colors",
  {
    variants: {
      variant: {
        simple: "px-4 py-3",
        dual: "px-4 py-3",
        compact: "px-3 py-2",
      },
      size: {
        default: "w-full",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
      },
    },
    defaultVariants: {
      variant: "simple",
      size: "default",
    },
  }
)

interface SearchBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof searchBarVariants> {
  onSearch?: (query: string, location?: string) => void
  placeholder?: string
  locationPlaceholder?: string
  showLocationInput?: boolean
  searchButtonText?: string
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ 
    className, 
    variant, 
    size, 
    onSearch, 
    placeholder = "Search", 
    locationPlaceholder = "Add country or city",
    showLocationInput = false,
    searchButtonText = "Search",
    ...props 
  }, ref) => {
    const [query, setQuery] = React.useState("")
    const [location, setLocation] = React.useState("")

    const handleSearch = () => {
      onSearch?.(query, showLocationInput ? location : undefined)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(searchBarVariants({ variant, size }), className)}
        {...props}
      >
        {/* Main search input */}
        <div className="flex items-center flex-1 gap-2 min-w-0">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 outline-none text-sm bg-transparent placeholder:text-muted-foreground text-foreground min-w-0"
          />
        </div>

        {/* Location input (if enabled) */}
        {showLocationInput && (
          <>
            <div className="h-8 w-px bg-border flex-shrink-0" />
            <div className="flex items-center flex-1 gap-2 min-w-0">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={locationPlaceholder}
                className="flex-1 outline-none text-sm bg-transparent placeholder:text-muted-foreground text-foreground min-w-0"
              />
            </div>
          </>
        )}

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 shadow-sm"
        >
          {searchButtonText}
        </button>
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

// Simple Search Input Component
interface SimpleSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
  icon?: React.ReactNode
}

const SimpleSearch = React.forwardRef<HTMLInputElement, SimpleSearchProps>(
  ({ className, onSearch, icon, onKeyPress, ...props }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value)
      }
      onKeyPress?.(e)
    }

    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon || <Search className="h-4 w-4 text-muted-foreground" />}
        </div>
        <input
          ref={ref}
          className={cn(
            "block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-sm transition-colors shadow-sm",
            className
          )}
          onKeyPress={handleKeyPress}
          {...props}
        />
      </div>
    )
  }
)
SimpleSearch.displayName = "SimpleSearch"

export { SearchBar, SimpleSearch, searchBarVariants } 