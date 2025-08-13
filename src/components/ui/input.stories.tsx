import type { Meta, StoryObj } from '@storybook/nextjs'
import { fn } from '@storybook/test'
import { useState } from 'react'
import { InputField } from './input'
import { TextareaField } from './textarea'
import { Toggle } from './toggle'

const meta = {
  title: 'UI/Form Inputs',
  component: InputField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Form Input System

A comprehensive form input system built with Inter typography and design system colors, featuring validation states, proper labeling, and accessibility.

## Components Included

### Input Components
- **Input**: Basic input component with validation states
- **InputField**: Enhanced input with label, validation messages, and helper text

### Textarea Components  
- **Textarea**: Basic textarea component with validation states
- **TextareaField**: Enhanced textarea with word counting, validation, and proper sizing

### Toggle Components
- **Toggle**: Basic toggle/switch component
- **Toggle**: Basic toggle component with different states

## Validation States

All components support four validation states:
- **Default**: Normal state with brand blue focus
- **Error**: Red border and focus ring with error messages
- **Success**: Green border and focus ring with success messages  
- **Info**: Blue border and focus ring with info messages

## Features

- **Inter Typography**: All text uses proper Inter font weights and scales
- **Design System Colors**: Consistent with brand blue (#3C66F9) and semantic colors
- **Accessibility**: Proper labeling, ARIA attributes, and keyboard navigation
- **Validation Messages**: Built-in error, success, and info message handling
- **Word Counting**: Advanced word counting for textareas with minimum/maximum limits
- **Responsive**: Works across all screen sizes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'info'],
      description: 'Visual validation state variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the input',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text shown below the input',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

// Input Field Stories
export const InputDefault: Story = {
  name: 'Input - Default State',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
  },
}

export const InputWithPlaceholder: Story = {
  name: 'Input - With Placeholder',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
  },
}

export const InputFilled: Story = {
  name: 'Input - Filled State',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
    defaultValue: 'user@example.com',
  },
}

export const InputError: Story = {
  name: 'Input - Error State',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
    defaultValue: 'invalid-email',
    errorMessage: 'This is an error text',
  },
}

export const InputSuccess: Story = {
  name: 'Input - Success State',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
    defaultValue: 'user@example.com',
    successMessage: 'This is an success text',
  },
}

export const InputInfo: Story = {
  name: 'Input - Info State',
  args: {
    label: 'Email Address',
    placeholder: 'Email address',
    infoMessage: 'This is an information text',
  },
}

export const InputSizes: Story = {
  name: 'Input - All Sizes',
  render: () => (
    <div className="space-y-4">
      <InputField label="Small Input" placeholder="Small size" size="sm" />
      <InputField label="Default Input" placeholder="Default size" />
      <InputField label="Large Input" placeholder="Large size" size="lg" />
    </div>
  ),
}

// Complete Input Showcase (matching the design)
export const InputShowcase: Story = {
  name: 'Complete Input System',
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Basic inputs */}
        <div className="space-y-4">
          <InputField label="Email Address" placeholder="Email address" />
          <InputField label="Email Address" placeholder="Email address" />
          <InputField label="Email Address" defaultValue="user@example.com" />
          <InputField label="Email Address" placeholder="Email address" />
          <InputField label="Email Address" placeholder="Email address" />
          <InputField label="Email Address" placeholder="Email address" />
          <InputField
            label="Email Address"
            placeholder="Email address"
            successMessage="This is an success text"
            defaultValue="user@example.com"
          />
          <InputField
            label="Email Address"
            placeholder="Email address"
            errorMessage="This is an error text"
            defaultValue="invalid-email"
          />
          <InputField
            label="Email Address"
            placeholder="Email address"
            infoMessage="This is an information text"
          />
        </div>

        {/* Column 2: Textareas with word count */}
        <div className="space-y-4">
          <TextareaField
            label="Your answer should include at least 200 words"
            placeholder="Answer"
            showWordCount
            minWords={200}
            size="xl"
          />
          <TextareaField
            label="Your answer should include at least 200 words"
            placeholder="Answer"
            showWordCount
            minWords={200}
            size="xl"
          />
          <TextareaField
            label="Your answer should include at least 200 words"
            placeholder="Answer"
            showWordCount
            minWords={200}
            size="xl"
          />
        </div>

        {/* Column 3: More textareas */}
        <div className="space-y-4">
          <TextareaField label="Details" placeholder="Details" size="lg" />
          <TextareaField label="Details" defaultValue="Sample text content here" size="lg" />
          <TextareaField label="Details" placeholder="Details" size="lg" />
        </div>

        {/* Column 4: Note fields and toggle */}
        <div className="space-y-4">
          <TextareaField label="Add a note" placeholder="" size="sm" />
          <TextareaField label="Add a note" placeholder="" size="lg" />
          <div className="pt-6">
            <Toggle defaultPressed />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all input components matching the design system, including various states, sizes, and validation messages.',
      },
    },
  },
}

// Textarea Stories
export const TextareaDefault: Story = {
  name: 'Textarea - Default',
  render: () => <TextareaField label="Details" placeholder="Enter your details here..." />,
}

export const TextareaWithWordCount: Story = {
  name: 'Textarea - With Word Count',
  render: () => (
    <TextareaField
      label="Your answer should include at least 200 words"
      placeholder="Answer"
      showWordCount
      minWords={200}
      size="xl"
    />
  ),
}

export const TextareaWordCountDemo: Story = {
  name: 'Textarea - Interactive Word Count',
  render: () => {
    const [value, setValue] = useState('')

    return (
      <TextareaField
        label="Your answer should include at least 200 words"
        placeholder="Start typing to see word count..."
        showWordCount
        minWords={200}
        maxWords={500}
        size="xl"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

// Toggle Stories
export const ToggleDefault: Story = {
  name: 'Toggle - Default',
  render: () => <Toggle>Toggle</Toggle>,
}

export const ToggleChecked: Story = {
  name: 'Toggle - Checked',
  render: () => <Toggle defaultPressed>Toggle</Toggle>,
}

export const ToggleWithLabel: Story = {
  name: 'Toggle - With Label',
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle defaultPressed>Enable notifications</Toggle>
    </div>
  ),
}

export const ToggleEnhanced: Story = {
  name: 'Toggle - Enhanced Field',
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Toggle>Email Notifications</Toggle>
      </div>
      <p className="text-muted-foreground text-sm">
        Receive email notifications for important updates
      </p>
      <p className="text-muted-foreground text-xs">You can change this setting anytime</p>
    </div>
  ),
}

export const ToggleStates: Story = {
  name: 'Toggle - All States',
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Toggle>Default State</Toggle>
        <p className="text-muted-foreground text-sm">Normal toggle state</p>
      </div>
      <div className="space-y-2">
        <Toggle defaultPressed>Success State</Toggle>
        <p className="text-muted-foreground text-sm">Successfully configured</p>
        <p className="text-sm text-green-600">Settings saved successfully</p>
      </div>
      <div className="space-y-2">
        <Toggle>Error State</Toggle>
        <p className="text-muted-foreground text-sm">Configuration error</p>
        <p className="text-sm text-red-600">Unable to save settings</p>
      </div>
      <div className="space-y-2">
        <Toggle>Info State</Toggle>
        <p className="text-muted-foreground text-sm">Additional information</p>
        <p className="text-sm text-blue-600">This setting affects email frequency</p>
      </div>
    </div>
  ),
}

// Interactive Demo
export const InteractiveDemo: Story = {
  name: 'Interactive Form Demo',
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      message: '',
      notifications: false,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    const handleSubmit = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!formData.message) {
        newErrors.message = 'Message is required'
      } else if (formData.message.split(' ').length < 10) {
        newErrors.message = 'Message should be at least 10 words'
      }

      setErrors(newErrors)

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!')
      }
    }

    return (
      <div className="max-w-md space-y-6">
        <h3 className="text-heading-lg">Contact Form</h3>

        <InputField
          label="Email Address"
          placeholder="your.email@example.com"
          required
          value={formData.email}
          onChange={e => {
            setFormData(prev => ({ ...prev, email: e.target.value }))
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
          }}
          errorMessage={errors.email}
          successMessage={
            formData.email && !errors.email && validateEmail(formData.email)
              ? 'Valid email address'
              : undefined
          }
        />

        <TextareaField
          label="Message"
          placeholder="Enter your message..."
          required
          showWordCount
          minWords={10}
          value={formData.message}
          onChange={e => {
            setFormData(prev => ({ ...prev, message: e.target.value }))
            if (errors.message) setErrors(prev => ({ ...prev, message: '' }))
          }}
          errorMessage={errors.message}
        />

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Toggle
              pressed={formData.notifications}
              onPressedChange={pressed =>
                setFormData(prev => ({ ...prev, notifications: pressed }))
              }
            >
              Email Notifications
            </Toggle>
          </div>
          <p className="text-muted-foreground text-sm">Receive updates via email</p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-brand-blue hover:bg-brand-blue/90 text-label-md w-full rounded-md px-4 py-2 text-white transition-colors"
        >
          Submit Form
        </button>

        <div className="text-body-xs text-muted-foreground">
          <p>
            <strong>Form Data:</strong>
          </p>
          <pre className="overflow-auto rounded bg-gray-50 p-2 text-xs">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive form demonstration with real-time validation, word counting, and state management.',
      },
    },
  },
}
