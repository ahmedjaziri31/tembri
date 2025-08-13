import type { Meta, StoryObj } from '@storybook/nextjs'
import { Check, X, AlertTriangle, Clock, User, Star, Briefcase } from 'lucide-react'
import { Badge, StatusBadge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile badge component for displaying status indicators, labels, and categorization.

## Features
- **Status variants**: Success, fail, warning, info states
- **Application statuses**: Applied, under review, test phase, etc.
- **Multiple sizes**: Small, default, large, and extra large
- **Different shapes**: Rounded, square, and default pill shape
- **Icon support**: Add icons to badges with StatusBadge
- **Animation support**: Pulse animation for active states

## Usage
\`\`\`tsx
import { Badge, StatusBadge } from "@/components/ui/badge"

// Basic badge
<Badge variant="success">Success</Badge>

// Badge with icon
<StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
  Approved
</StatusBadge>

// Application status
<Badge variant="under-review">Under Review</Badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'fail',
        'warning',
        'info',
        'applied',
        'under-review',
        'test-phase',
        'interview-phase',
        'offer',
        'rejected',
        'withdrawn',
      ],
      description: 'Visual variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the badge',
    },
    shape: {
      control: 'select',
      options: ['default', 'rounded', 'square'],
      description: 'Shape of the badge',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    shape: 'default',
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Application Status Badges (matching your image)
export const ApplicationStatusBadges: Story = {
  name: 'Application Status Badges',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Application Status Flow</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="under-review">Under Review</Badge>
          <Badge variant="test-phase">Test phase</Badge>
          <Badge variant="interview-phase">Interview phase</Badge>
          <Badge variant="offer">Offer</Badge>
          <Badge variant="rejected">Rejected</Badge>
          <Badge variant="withdrawn">Withdrawn</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Status Icons</h3>
        <div className="flex flex-wrap gap-3">
          <StatusBadge variant="applied" icon={<User className="h-3 w-3" />}>
            Applied
          </StatusBadge>
          <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
            Under Review
          </StatusBadge>
          <StatusBadge variant="test-phase" icon={<Briefcase className="h-3 w-3" />}>
            Test phase
          </StatusBadge>
          <StatusBadge variant="interview-phase" icon={<Star className="h-3 w-3" />}>
            Interview phase
          </StatusBadge>
          <StatusBadge variant="offer" icon={<Check className="h-3 w-3" />}>
            Offer
          </StatusBadge>
          <StatusBadge variant="rejected" icon={<X className="h-3 w-3" />}>
            Rejected
          </StatusBadge>
          <StatusBadge variant="withdrawn" icon={<AlertTriangle className="h-3 w-3" />}>
            Withdrawn
          </StatusBadge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Application status badges matching your recruitment platform design.',
      },
    },
  },
}

// Test Result Badges (matching your table data)
export const TestResultBadges: Story = {
  name: 'Test Result Badges',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Test Results</h3>
        <div className="flex flex-wrap gap-3">
          <StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
            Success
          </StatusBadge>
          <StatusBadge variant="fail" icon={<X className="h-3 w-3" />}>
            Fail
          </StatusBadge>
          <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
            Under Review
          </StatusBadge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground w-16 text-sm">Small:</span>
            <StatusBadge variant="success" size="sm" icon={<Check className="h-2.5 w-2.5" />}>
              Success
            </StatusBadge>
            <StatusBadge variant="fail" size="sm" icon={<X className="h-2.5 w-2.5" />}>
              Fail
            </StatusBadge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground w-16 text-sm">Default:</span>
            <StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
              Success
            </StatusBadge>
            <StatusBadge variant="fail" icon={<X className="h-3 w-3" />}>
              Fail
            </StatusBadge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground w-16 text-sm">Large:</span>
            <StatusBadge variant="success" size="lg" icon={<Check className="h-3.5 w-3.5" />}>
              Success
            </StatusBadge>
            <StatusBadge variant="fail" size="lg" icon={<X className="h-3.5 w-3.5" />}>
              Fail
            </StatusBadge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Test result badges with success/fail states matching your data table design.',
      },
    },
  },
}

// All Badge Variants
export const AllVariants: Story = {
  name: 'All Badge Variants',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Success</Badge>
          <Badge variant="fail">Fail</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Application Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="under-review">Under Review</Badge>
          <Badge variant="test-phase">Test phase</Badge>
          <Badge variant="interview-phase">Interview phase</Badge>
          <Badge variant="offer">Offer</Badge>
          <Badge variant="rejected">Rejected</Badge>
          <Badge variant="withdrawn">Withdrawn</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all badge variants and their use cases.',
      },
    },
  },
}

// Badge Shapes
export const BadgeShapes: Story = {
  name: 'Badge Shapes',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Shape (Pill)</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" shape="default">
            Success
          </Badge>
          <Badge variant="warning" shape="default">
            Warning
          </Badge>
          <Badge variant="info" shape="default">
            Info
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rounded Shape</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" shape="rounded">
            Success
          </Badge>
          <Badge variant="warning" shape="rounded">
            Warning
          </Badge>
          <Badge variant="info" shape="rounded">
            Info
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Square Shape</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" shape="square">
            Success
          </Badge>
          <Badge variant="warning" shape="square">
            Warning
          </Badge>
          <Badge variant="info" shape="square">
            Info
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge shapes: pill (default), rounded, and square corners.',
      },
    },
  },
}

// Interactive Examples
export const InteractiveExamples: Story = {
  name: 'Interactive Examples',
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Interactive Badge Examples</h2>
        <p className="text-muted-foreground">Real-world usage scenarios</p>
      </div>

      {/* Job Application Status */}
      <div className="bg-card space-y-4 rounded-lg border p-6">
        <h3 className="font-semibold">Job Application Tracking</h3>
        <div className="space-y-3">
          <div className="bg-muted/30 flex items-center justify-between rounded p-3">
            <div>
              <p className="font-medium">UX Designer - Meta</p>
              <p className="text-muted-foreground text-sm">Applied 2 days ago</p>
            </div>
            <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
              Under Review
            </StatusBadge>
          </div>

          <div className="bg-muted/30 flex items-center justify-between rounded p-3">
            <div>
              <p className="font-medium">Frontend Developer - Google</p>
              <p className="text-muted-foreground text-sm">Applied 1 week ago</p>
            </div>
            <StatusBadge variant="interview-phase" icon={<Star className="h-3 w-3" />}>
              Interview phase
            </StatusBadge>
          </div>

          <div className="bg-muted/30 flex items-center justify-between rounded p-3">
            <div>
              <p className="font-medium">Product Manager - Apple</p>
              <p className="text-muted-foreground text-sm">Applied 3 weeks ago</p>
            </div>
            <StatusBadge variant="offer" icon={<Check className="h-3 w-3" />}>
              Offer
            </StatusBadge>
          </div>
        </div>
      </div>

      {/* Test Results Dashboard */}
      <div className="bg-card space-y-4 rounded-lg border p-6">
        <h3 className="font-semibold">Test Results Dashboard</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/10">
            <StatusBadge variant="success" size="lg" icon={<Check className="h-4 w-4" />}>
              Passed
            </StatusBadge>
            <p className="mt-2 text-2xl font-bold text-green-600">24</p>
            <p className="text-muted-foreground text-sm">Tests</p>
          </div>

          <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/10">
            <StatusBadge variant="fail" size="lg" icon={<X className="h-4 w-4" />}>
              Failed
            </StatusBadge>
            <p className="mt-2 text-2xl font-bold text-red-600">3</p>
            <p className="text-muted-foreground text-sm">Tests</p>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-900/10">
            <StatusBadge variant="under-review" size="lg" icon={<Clock className="h-4 w-4" />}>
              Pending
            </StatusBadge>
            <p className="mt-2 text-2xl font-bold text-orange-600">5</p>
            <p className="text-muted-foreground text-sm">Tests</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples showing badges in real-world application scenarios.',
      },
    },
  },
}

// Dark Mode Examples
export const DarkModeExamples: Story = {
  name: 'Dark Mode Examples',
  render: () => (
    <div className="space-y-8">
      {/* Light Mode */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Light Mode</h3>
        <div className="rounded-lg border bg-white p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
              Success
            </StatusBadge>
            <StatusBadge variant="fail" icon={<X className="h-3 w-3" />}>
              Fail
            </StatusBadge>
            <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
              Under Review
            </StatusBadge>
            <StatusBadge variant="applied" icon={<User className="h-3 w-3" />}>
              Applied
            </StatusBadge>
            <StatusBadge variant="offer" icon={<Star className="h-3 w-3" />}>
              Offer
            </StatusBadge>
          </div>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Mode</h3>
        <div className="dark rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
          <div className="flex flex-wrap gap-3">
            <StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
              Success
            </StatusBadge>
            <StatusBadge variant="fail" icon={<X className="h-3 w-3" />}>
              Fail
            </StatusBadge>
            <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
              Under Review
            </StatusBadge>
            <StatusBadge variant="applied" icon={<User className="h-3 w-3" />}>
              Applied
            </StatusBadge>
            <StatusBadge variant="offer" icon={<Star className="h-3 w-3" />}>
              Offer
            </StatusBadge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge components shown in both light and dark modes for comparison.',
      },
    },
  },
}
