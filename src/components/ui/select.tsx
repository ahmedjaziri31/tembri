"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const selectTriggerVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "border-input",
        dashed: "border-dashed border-2 border-purple-300 dark:border-purple-600",
        outlined: "border-2 border-gray-300 dark:border-gray-600",
        minimal: "border-0 bg-muted/50",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 py-2 text-xs",
        lg: "h-11 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants>
>(({ className, children, variant, size, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// Custom Multi-Select Component
interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  className?: string
  variant?: "default" | "dashed" | "outlined" | "minimal"
  size?: "default" | "sm" | "lg"
  showActions?: boolean
  onApply?: (value: string[]) => void
  onCancel?: () => void
  maxDisplayed?: number
}

const MultiSelect = React.forwardRef<
  HTMLDivElement,
  MultiSelectProps
>(({ 
  options, 
  value = [], 
  onChange, 
  placeholder = "Select options...",
  className,
  variant = "default",
  size = "default",
  showActions = false,
  onApply,
  onCancel,
  maxDisplayed = 2,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value)

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue]
    
    setSelectedValues(newValues)
    if (!showActions) {
      onChange?.(newValues)
    }
  }

  const handleApply = () => {
    onChange?.(selectedValues)
    onApply?.(selectedValues)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setSelectedValues(value)
    onCancel?.()
    setIsOpen(false)
  }

  const displayText = React.useMemo(() => {
    if (selectedValues.length === 0) return placeholder
    
    const selectedLabels = selectedValues
      .map(val => options.find(opt => opt.value === val)?.label)
      .filter(Boolean)
    
    if (selectedLabels.length <= maxDisplayed) {
      return selectedLabels.join(', ')
    }
    
    return `${selectedLabels.slice(0, maxDisplayed).join(', ')} +${selectedLabels.length - maxDisplayed}`
  }, [selectedValues, options, placeholder, maxDisplayed])

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(selectTriggerVariants({ variant, size }))}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
            <div className="p-1 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer rounded-sm hover:bg-accent",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => !option.disabled && handleToggle(option.value)}
                    disabled={option.disabled}
                    className="rounded border-input"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            
            {showActions && (
              <div className="flex justify-end gap-2 p-3 border-t">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
})
MultiSelect.displayName = "MultiSelect"

// Single Select with Radio Options
interface RadioSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioSelectProps {
  options: RadioSelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  variant?: "default" | "dashed" | "outlined" | "minimal"
  size?: "default" | "sm" | "lg"
  showActions?: boolean
  onApply?: (value: string) => void
  onCancel?: () => void
  showClose?: boolean
}

const RadioSelect = React.forwardRef<
  HTMLDivElement,
  RadioSelectProps
>(({ 
  options, 
  value = "", 
  onChange, 
  placeholder = "Select option...",
  className,
  variant = "default",
  size = "default",
  showActions = false,
  onApply,
  onCancel,
  showClose = false,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string>(value)

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    if (!showActions) {
      onChange?.(optionValue)
      setIsOpen(false)
    }
  }

  const handleApply = () => {
    onChange?.(selectedValue)
    onApply?.(selectedValue)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setSelectedValue(value)
    onCancel?.()
    setIsOpen(false)
  }

  const displayText = React.useMemo(() => {
    if (!selectedValue) return placeholder
    return options.find(opt => opt.value === selectedValue)?.label || placeholder
  }, [selectedValue, options, placeholder])

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(selectTriggerVariants({ variant, size }))}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
            {showClose && (
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-accent rounded-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <div className="p-3 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 py-2 text-sm cursor-pointer",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="radio"
                    name="radio-select"
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    className="text-primary"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            
            {showActions && (
              <div className="flex justify-end gap-2 p-3 border-t">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
})
RadioSelect.displayName = "RadioSelect"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  MultiSelect,
  RadioSelect,
  selectTriggerVariants,
  type MultiSelectOption,
  type MultiSelectProps,
  type RadioSelectOption,
  type RadioSelectProps,
} 