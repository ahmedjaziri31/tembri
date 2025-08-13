"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MapPin, Clock, Star, Users, Building2, Bookmark, BookmarkCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border hover:shadow-md",
        elevated: "shadow-md hover:shadow-lg",
        outlined: "border-2 hover:border-primary/50",
        ghost: "border-0 bg-transparent hover:bg-accent/50",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      clickable: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      clickable: false,
    },
  }
)

// Job Card Component
interface JobCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  company: {
    name: string
    logo?: string
    verified?: boolean
  }
  position: string
  location: string
  description: string
  tags: Array<{
    label: string
    variant?: "default" | "success" | "warning" | "info"
  }>
  timePosted?: string
  salary?: string
  onLearnMore?: () => void
  onApply?: () => void
  onSave?: () => void
  saved?: boolean
}

const JobCard = React.forwardRef<HTMLDivElement, JobCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    clickable,
    company,
    position,
    location,
    description,
    tags,
    timePosted,
    salary,
    onLearnMore,
    onApply,
    onSave,
    saved = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, clickable }), className)}
        {...props}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <div className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center overflow-hidden">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {company.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 font-medium">
                  {company.name}
                </span>
                {company.verified && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              {timePosted && (
                <span className="text-xs text-muted-foreground">{timePosted}</span>
              )}
            </div>
          </div>
          <button
            onClick={onSave}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-blue-600" />
            ) : (
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg leading-tight">{position}</h3>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <span>💰</span>
                {salary}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant={tag.variant || "secondary"} 
                size="sm"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onLearnMore}
            className="flex-1 px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
          >
            Learn more
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    )
  }
)
JobCard.displayName = "JobCard"

// Company Card Component
interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  company: {
    name: string
    logo?: string
    image?: string
    rating?: number
    jobCount?: number
    hiringStatus?: "hiring" | "not-hiring" | "urgent"
  }
  description: string
  onViewProfile?: () => void
  onViewJobs?: () => void
}

const CompanyCard = React.forwardRef<HTMLDivElement, CompanyCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    clickable,
    company,
    description,
    onViewProfile,
    onViewJobs,
    ...props 
  }, ref) => {
    const getHiringBadge = () => {
      switch (company.hiringStatus) {
        case "hiring":
          return <Badge variant="success" size="sm">Hiring</Badge>
        case "urgent":
          return <Badge variant="warning" size="sm">Urgent hiring</Badge>
        case "not-hiring":
          return <Badge variant="secondary" size="sm">Not hiring</Badge>
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, clickable }), className)}
        {...props}
      >
        {company.image && (
          <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
            <img 
              src={company.image} 
              alt={company.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <div className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center overflow-hidden">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              {getHiringBadge()}
              {company.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{company.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{company.name}</h3>
          
          {company.jobCount && (
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <Users className="h-4 w-4" />
              {company.jobCount} jobs
            </div>
          )}

          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onViewProfile}
            className="flex-1 px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
          >
            View profile
          </button>
          <button
            onClick={onViewJobs}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View jobs
          </button>
        </div>
      </div>
    )
  }
)
CompanyCard.displayName = "CompanyCard"

// Test/Interview Card Component
interface TestCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  test: {
    name: string
    type: "written" | "ai" | "virtual"
    company: {
      name: string
      logo?: string
    }
    position: string
    timeSlot: string
    status?: "scheduled" | "completed" | "missed"
  }
  onStartTest?: () => void
  onReschedule?: () => void
}

const TestCard = React.forwardRef<HTMLDivElement, TestCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    clickable,
    test,
    onStartTest,
    onReschedule,
    ...props 
  }, ref) => {
    const getTestTypeBadge = () => {
      switch (test.type) {
        case "written":
          return <Badge variant="success" size="sm">Written test</Badge>
        case "ai":
          return <Badge variant="fail" size="sm">AI test</Badge>
        case "virtual":
          return <Badge variant="interview-phase" size="sm">Virtual test</Badge>
        default:
          return null
      }
    }

    const getStatusColor = () => {
      switch (test.status) {
        case "completed":
          return "border-green-200"
        case "missed":
          return "border-red-200"
        default:
          return "border-border"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, clickable }), 
          getStatusColor(),
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {test.company.logo ? (
              <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center overflow-hidden">
                <img 
                  src={test.company.logo} 
                  alt={test.company.name}
                  className="w-6 h-6 object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {test.company.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              {getTestTypeBadge()}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{test.name}</h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {test.position}
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {test.company.name}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {test.timeSlot}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onStartTest}
            className="flex-1 px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-accent transition-colors"
          >
            Start test
          </button>
          <button
            onClick={onReschedule}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Reschedule
          </button>
        </div>
      </div>
    )
  }
)
TestCard.displayName = "TestCard"

export { 
  JobCard, 
  CompanyCard, 
  TestCard, 
  cardVariants,
  type JobCardProps,
  type CompanyCardProps,
  type TestCardProps
} 