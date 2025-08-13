import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"

// Custom rounded Plus icon component without background
const RoundedPlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
  >
    <path
      d="M8 3.5V12.5M3.5 8H12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&>*]:text-inherit",
  {
    variants: {
      variant: {
        default:
          "bg-primary !text-white shadow hover:bg-primary/90 [&>*]:!text-white",
        destructive:
          "bg-destructive !text-white shadow-sm hover:bg-destructive/90 [&>*]:!text-white",
        outline:
          "border border-input bg-background text-gray-900 shadow-sm hover:bg-accent hover:text-accent-foreground dark:text-gray-100",
        secondary:
          "bg-secondary text-gray-900 shadow-sm hover:bg-secondary/80 dark:text-gray-100",
        ghost: "text-gray-900 hover:bg-accent hover:text-accent-foreground dark:text-gray-100",
        link: "text-brand-blue underline-offset-4 hover:underline hover:text-brand-blue/80",
        primary: "bg-brand-blue !text-white shadow hover:bg-brand-blue/90 focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 [&>*]:!text-white",
        "primary-outline": "border-2 border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-2 focus:ring-brand-blue focus:ring-offset-2",
        "secondary-outline": "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:text-gray-100 dark:hover:text-gray-100 dark:border-gray-600",
        "outlined": "border border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue/10 focus:ring-2 focus:ring-brand-blue focus:ring-offset-2",
        "linked": "text-brand-blue hover:text-brand-blue/80 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded-sm",
        warning: "bg-warning !text-white shadow hover:bg-warning/90 focus:ring-2 focus:ring-warning focus:ring-offset-2 [&>*]:!text-white",
        success: "bg-success !text-white shadow hover:bg-success/90 focus:ring-2 focus:ring-success focus:ring-offset-2 [&>*]:!text-white",
        info: "bg-info !text-white shadow hover:bg-info/90 focus:ring-2 focus:ring-info focus:ring-offset-2 [&>*]:!text-white",
      },
      size: {
        default: "h-9 px-4 py-2 text-label-md",
        sm: "h-8 px-3 text-label-sm",
        lg: "h-10 px-8 text-label-lg", 
        xl: "h-12 px-10 text-label-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
  /**
   * Icon to display at the start of the button
   */
  icon?: React.ReactNode
  /**
   * Icon to display at the end of the button
   */
  endIcon?: React.ReactNode
  /**
   * Whether to show a loading state
   */
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, endIcon, loading, children, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && !loading && icon}
        {children}
        {endIcon && !loading && endIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Predefined button compositions for common use cases
export const PrimaryButtonWithIcon = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="primary"
      icon={<RoundedPlusIcon />}
      {...props}
    >
      {children}
    </Button>
  )
)
PrimaryButtonWithIcon.displayName = "PrimaryButtonWithIcon"

export const SecondaryButtonWithIcon = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="secondary-outline"
      icon={<RoundedPlusIcon />}
      {...props}
    >
      {children}
    </Button>
  )
)
SecondaryButtonWithIcon.displayName = "SecondaryButtonWithIcon"

export const OutlinedButtonWithIcon = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outlined"
      icon={<RoundedPlusIcon />}
      {...props}
    >
      {children}
    </Button>
  )
)
OutlinedButtonWithIcon.displayName = "OutlinedButtonWithIcon"

export const LinkedButtonWithLeftIcon = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="linked"
      icon={<RoundedPlusIcon />}
      {...props}
    >
      {children}
    </Button>
  )
)
LinkedButtonWithLeftIcon.displayName = "LinkedButtonWithLeftIcon"

export const LinkedButtonWithRightIcon = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'endIcon'>>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="linked"
      endIcon={<RoundedPlusIcon />}
      {...props}
    >
      {children}
    </Button>
  )
)
LinkedButtonWithRightIcon.displayName = "LinkedButtonWithRightIcon"

export const AccountButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'icon' | 'children'>>(
  ({ variant = "primary", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variant}
      icon={variant === "primary" || variant === "default" ? <RoundedPlusIcon /> : <User />}
      {...props}
    >
      My account
    </Button>
  )
)
AccountButton.displayName = "AccountButton"

export { Button, buttonVariants, RoundedPlusIcon }
