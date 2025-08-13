import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'flex w-full rounded-full border px-3 py-2 text-body-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-input bg-background focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        error:
          'border-danger bg-background focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2',
        success:
          'border-success bg-background focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2',
        info: 'border-info bg-background focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2',
      },
      size: {
        sm: 'h-8 px-2 text-body-xs',
        default: 'h-10',
        lg: 'h-12 px-4 text-body-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
            size: size as 'sm' | 'default' | 'lg' | null | undefined,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// Validation Message Component
interface ValidationMessageProps {
  variant?: 'error' | 'success' | 'info'
  children: React.ReactNode
  className?: string
}

const ValidationMessage = React.forwardRef<HTMLParagraphElement, ValidationMessageProps>(
  ({ variant = 'error', children, className }, ref) => {
    const variantStyles = {
      error: 'text-danger',
      success: 'text-success',
      info: 'text-info',
    }

    return (
      <p ref={ref} className={cn('text-body-xs mt-1', variantStyles[variant], className)}>
        {children}
      </p>
    )
  }
)
ValidationMessage.displayName = 'ValidationMessage'

// Form Field Wrapper Component
interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-1', className)}>
        {children}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

// Enhanced Input with Label and Validation
interface InputFieldProps extends InputProps {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  infoMessage?: string
  required?: boolean
  id?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      infoMessage,
      required,
      id,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    // Determine variant based on validation messages
    const computedVariant = errorMessage
      ? 'error'
      : successMessage
        ? 'success'
        : infoMessage
          ? 'info'
          : variant

    // Generate unique ID if not provided
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <FormField className={className}>
        {label && (
          <label htmlFor={inputId} className="text-label-md text-foreground block">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <Input id={inputId} ref={ref} variant={computedVariant} {...props} />
        {errorMessage && <ValidationMessage variant="error">{errorMessage}</ValidationMessage>}
        {successMessage && (
          <ValidationMessage variant="success">{successMessage}</ValidationMessage>
        )}
        {infoMessage && <ValidationMessage variant="info">{infoMessage}</ValidationMessage>}
        {helperText && !errorMessage && !successMessage && !infoMessage && (
          <p className="text-body-xs text-muted-foreground mt-1">{helperText}</p>
        )}
      </FormField>
    )
  }
)
InputField.displayName = 'InputField'

export { Input, InputField, FormField, ValidationMessage, inputVariants }
