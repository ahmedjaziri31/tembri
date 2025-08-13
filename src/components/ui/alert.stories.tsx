import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from './alert'

const meta = {
  title: 'UI/Alert (Message Bar)',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile alert/message bar component for displaying important information to users with different severity levels.

## Features
- **Multiple variants**: Info, success, warning, destructive
- **Dismissible**: Optional close button functionality
- **Action buttons**: Add custom action buttons
- **Icons**: Automatic icons based on variant type
- **Accessible**: Built with proper ARIA attributes
- **Customizable**: Easy to style and extend

## Usage
\`\`\`tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

// Basic alert
<Alert variant="info">
  <AlertDescription>This is an info message.</AlertDescription>
</Alert>

// With title and description
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

// With action and dismiss
<Alert 
  variant="warning"
  onClose={() => console.log('dismissed')}
  action={<button>Action</button>}
>
  <AlertDescription>Warning message with action.</AlertDescription>
</Alert>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
      description: 'Visual variant of the alert',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
    },
    onClose: {
      action: 'close',
      description: 'Callback when close button is clicked',
    },
  },
  args: {
    onClose: () => console.log('Alert dismissed'),
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Basic Variants
export const Info: Story = {
  name: 'Info',
  args: {
    variant: 'info',
    children: <AlertDescription>Info text</AlertDescription>,
  },
}

export const Success: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    children: <AlertDescription>Success text</AlertDescription>,
  },
}

export const Warning: Story = {
  name: 'Warning',
  args: {
    variant: 'warning',
    children: <AlertDescription>Warning text</AlertDescription>,
  },
}

export const Destructive: Story = {
  name: 'Danger',
  args: {
    variant: 'destructive',
    children: <AlertDescription>Danger text</AlertDescription>,
  },
}

// With Close Button
export const InfoWithClose: Story = {
  name: 'Info - Dismissible',
  args: {
    variant: 'info',
    onClose: () => console.log('Info alert dismissed'),
    children: <AlertDescription>Info text</AlertDescription>,
  },
}

export const SuccessWithClose: Story = {
  name: 'Success - Dismissible',
  args: {
    variant: 'success',
    onClose: () => console.log('Success alert dismissed'),
    children: <AlertDescription>Success text</AlertDescription>,
  },
}

export const WarningWithClose: Story = {
  name: 'Warning - Dismissible',
  args: {
    variant: 'warning',
    onClose: () => console.log('Warning alert dismissed'),
    children: <AlertDescription>Warning text</AlertDescription>,
  },
}

export const DestructiveWithClose: Story = {
  name: 'Danger - Dismissible',
  args: {
    variant: 'destructive',
    onClose: () => console.log('Danger alert dismissed'),
    children: <AlertDescription>Danger text</AlertDescription>,
  },
}

// With Action Buttons
export const SuccessWithAction: Story = {
  name: 'Success - With Action',
  args: {
    variant: 'success',
    onClose: () => console.log('Success alert dismissed'),
    action: (
      <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
        Action
      </button>
    ),
    children: <AlertDescription>Success text</AlertDescription>,
  },
}

export const WarningWithAction: Story = {
  name: 'Warning - With Action',
  args: {
    variant: 'warning',
    onClose: () => console.log('Warning alert dismissed'),
    action: (
      <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
        Action
      </button>
    ),
    children: <AlertDescription>Warning text</AlertDescription>,
  },
}

export const DestructiveWithAction: Story = {
  name: 'Danger - With Action',
  args: {
    variant: 'destructive',
    onClose: () => console.log('Danger alert dismissed'),
    action: (
      <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
        Action
      </button>
    ),
    children: <AlertDescription>Danger text</AlertDescription>,
  },
}

export const InfoWithAction: Story = {
  name: 'Info - With Action',
  args: {
    variant: 'info',
    onClose: () => console.log('Info alert dismissed'),
    action: (
      <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
        Action
      </button>
    ),
    children: <AlertDescription>Info text</AlertDescription>,
  },
}

// Complete Message Bar Demo (Like the image)
export const MessageBarDemo: Story = {
  name: 'Message Bar Collection',
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'info', text: 'Info text', hasAction: false },
      { id: 2, variant: 'success', text: 'Success text', hasAction: false },
      { id: 3, variant: 'warning', text: 'Warning text', hasAction: false },
      { id: 4, variant: 'destructive', text: 'Danger text', hasAction: false },
      { id: 5, variant: 'success', text: 'Success text', hasAction: true },
      { id: 6, variant: 'warning', text: 'Warning text', hasAction: true },
      { id: 7, variant: 'destructive', text: 'Danger text', hasAction: true },
      { id: 8, variant: 'info', text: 'Info text', hasAction: true },
    ])

    const removeAlert = (id: number) => {
      setAlerts(prev => prev.filter(alert => alert.id !== id))
    }

    const resetAlerts = () => {
      setAlerts([
        { id: 1, variant: 'info', text: 'Info text', hasAction: false },
        { id: 2, variant: 'success', text: 'Success text', hasAction: false },
        { id: 3, variant: 'warning', text: 'Warning text', hasAction: false },
        { id: 4, variant: 'destructive', text: 'Danger text', hasAction: false },
        { id: 5, variant: 'success', text: 'Success text', hasAction: true },
        { id: 6, variant: 'warning', text: 'Warning text', hasAction: true },
        { id: 7, variant: 'destructive', text: 'Danger text', hasAction: true },
        { id: 8, variant: 'info', text: 'Info text', hasAction: true },
      ])
    }

    const getActionButton = () => {
      const baseClasses =
        'px-3 py-1 rounded text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white'
      return <button className={baseClasses}>Action</button>
    }

    return (
      <div className="max-w-2xl space-y-4">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Message Bar</h3>
          <button
            onClick={resetAlerts}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm transition-colors"
          >
            Reset All
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            All messages dismissed. Click &quot;Reset All&quot; to restore them.
          </div>
        ) : (
          alerts.map(alert => (
            <Alert
              key={alert.id}
              variant={alert.variant as 'info' | 'success' | 'warning' | 'destructive'}
              onClose={() => removeAlert(alert.id)}
              action={alert.hasAction ? getActionButton() : undefined}
            >
              <AlertDescription>{alert.text}</AlertDescription>
            </Alert>
          ))
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete message bar collection matching the design shown in the reference image.',
      },
    },
  },
}

// Real-world Examples
export const FormValidation: Story = {
  name: 'Form Validation Messages',
  render: () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleSubmit = () => {
      setShowError(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleInvalidSubmit = () => {
      setShowSuccess(false)
      setShowError(true)
    }

    return (
      <div className="max-w-md space-y-4">
        <h3 className="text-lg font-semibold">User Registration</h3>

        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)}>
            <AlertTitle>Registration Successful!</AlertTitle>
            <AlertDescription>
              Welcome! Your account has been created successfully.
            </AlertDescription>
          </Alert>
        )}

        {showError && (
          <Alert
            variant="destructive"
            onClose={() => setShowError(false)}
            action={
              <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Retry
              </button>
            }
          >
            <AlertTitle>Registration Failed</AlertTitle>
            <AlertDescription>Please check your information and try again.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-md border p-2"
          />
          <input type="password" placeholder="Password" className="w-full rounded-md border p-2" />

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              Register
            </button>
            <button
              onClick={handleInvalidSubmit}
              className="flex-1 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Simulate Error
            </button>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Form validation messages with success and error states.',
      },
    },
  },
}

export const SystemNotifications: Story = {
  name: 'System Notifications',
  render: () => (
    <div className="max-w-lg space-y-4">
      <h3 className="text-lg font-semibold">System Status</h3>

      <Alert variant="info">
        <AlertTitle>Maintenance Scheduled</AlertTitle>
        <AlertDescription>
          System maintenance is scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.
        </AlertDescription>
      </Alert>

      <Alert
        variant="warning"
        action={
          <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Update Now
          </button>
        }
      >
        <AlertTitle>Update Available</AlertTitle>
        <AlertDescription>
          A new version is available with important security updates.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Backup Complete</AlertTitle>
        <AlertDescription>Your data backup was completed successfully at 3:45 AM.</AlertDescription>
      </Alert>

      <Alert
        variant="destructive"
        action={
          <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Resolve
          </button>
        }
      >
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>
          Unable to connect to the database. Some features may be unavailable.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'System notifications with titles and descriptions.',
      },
    },
  },
}

// Without Icons
export const WithoutIcons: Story = {
  name: 'Without Icons',
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" showIcon={false}>
        <AlertDescription>Info message without icon</AlertDescription>
      </Alert>
      <Alert variant="success" showIcon={false}>
        <AlertDescription>Success message without icon</AlertDescription>
      </Alert>
      <Alert variant="warning" showIcon={false}>
        <AlertDescription>Warning message without icon</AlertDescription>
      </Alert>
      <Alert variant="destructive" showIcon={false}>
        <AlertDescription>Danger message without icon</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts without icons for minimal design.',
      },
    },
  },
}
