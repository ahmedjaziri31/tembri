import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { FormField, ValidationMessage } from "./input"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-2xl border px-3 py-2 text-body-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-input bg-background focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        error: "border-danger bg-background focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
        success: "border-success bg-background focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2", 
        info: "border-info bg-background focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2",
      },
      size: {
        sm: "min-h-[60px] p-2 text-body-xs",
        default: "min-h-[80px]",
        lg: "min-h-[120px] p-4 text-body-md",
        xl: "min-h-[200px] p-4 text-body-md",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

// Word Count Hook
const useWordCount = (text: string, minWords?: number, maxWords?: number) => {
  const wordCount = React.useMemo(() => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }, [text])

  const isValid = React.useMemo(() => {
    if (minWords && wordCount < minWords) return false
    if (maxWords && wordCount > maxWords) return false
    return true
  }, [wordCount, minWords, maxWords])

  return { wordCount, isValid }
}

// Enhanced Textarea with Label, Validation, and Word Count
interface TextareaFieldProps extends TextareaProps {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  infoMessage?: string
  required?: boolean
  id?: string
  showWordCount?: boolean
  minWords?: number
  maxWords?: number
  wordCountText?: string
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ 
    label, 
    helperText, 
    errorMessage, 
    successMessage, 
    infoMessage, 
    required, 
    id, 
    variant,
    className,
    showWordCount = false,
    minWords,
    maxWords,
    wordCountText,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const { wordCount, isValid } = useWordCount(String(internalValue), minWords, maxWords)
    
    // Generate unique ID - always call useId at top level
    const generatedId = React.useId()
    const textareaId = id || generatedId

    // Handle controlled/uncontrolled state
    const textValue = value !== undefined ? String(value) : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(e)
    }

    // Determine variant based on validation messages and word count
    let computedVariant = variant
    if (errorMessage || (showWordCount && minWords && !isValid)) {
      computedVariant = "error"
    } else if (successMessage) {
      computedVariant = "success" 
    } else if (infoMessage) {
      computedVariant = "info"
    }

    // Generate word count message
    const getWordCountMessage = () => {
      if (wordCountText) return wordCountText
      if (minWords && maxWords) {
        return `${wordCount}/${maxWords} words (minimum ${minWords})`
      }
      if (minWords) {
        return `${wordCount} words (minimum ${minWords})`
      }
      if (maxWords) {
        return `${wordCount}/${maxWords} words`
      }
      return `${wordCount} words`
    }

    return (
      <FormField className={className}>
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-label-md text-foreground block"
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        
        {/* Show word count requirement above textarea */}
        {showWordCount && minWords && (
          <p className="text-body-xs text-muted-foreground">
            Your answer should include at least {minWords} words
          </p>
        )}
        
        <Textarea
          id={textareaId}
          ref={ref}
          variant={computedVariant}
          value={textValue}
          onChange={handleChange}
          {...props}
        />
        
        {/* Word count display */}
        {showWordCount && (
          <div className="flex justify-between items-center">
            <div>
              {errorMessage && (
                <ValidationMessage variant="error">
                  {errorMessage}
                </ValidationMessage>
              )}
              {successMessage && (
                <ValidationMessage variant="success">
                  {successMessage}
                </ValidationMessage>
              )}
              {infoMessage && (
                <ValidationMessage variant="info">
                  {infoMessage}
                </ValidationMessage>
              )}
              {helperText && !errorMessage && !successMessage && !infoMessage && (
                <p className="text-body-xs text-muted-foreground">
                  {helperText}
                </p>
              )}
            </div>
            <div className={cn(
              "text-body-xs",
              !isValid && minWords ? "text-danger" : "text-muted-foreground"
            )}>
              {getWordCountMessage()}
            </div>
          </div>
        )}
        
        {/* Standard validation messages when not showing word count */}
        {!showWordCount && (
          <>
            {errorMessage && (
              <ValidationMessage variant="error">
                {errorMessage}
              </ValidationMessage>
            )}
            {successMessage && (
              <ValidationMessage variant="success">
                {successMessage}
              </ValidationMessage>
            )}
            {infoMessage && (
              <ValidationMessage variant="info">
                {infoMessage}
              </ValidationMessage>
            )}
            {helperText && !errorMessage && !successMessage && !infoMessage && (
              <p className="text-body-xs text-muted-foreground">
                {helperText}
              </p>
            )}
          </>
        )}
        
        {/* Show word count requirement below textarea if minimum not met */}
        {showWordCount && minWords && wordCount > 0 && wordCount < minWords && (
          <p className="text-body-xs text-muted-foreground">
            Your answer should include at least {minWords} words
          </p>
        )}
      </FormField>
    )
  }
)
TextareaField.displayName = "TextareaField"

export { Textarea, TextareaField, textareaVariants, useWordCount } 