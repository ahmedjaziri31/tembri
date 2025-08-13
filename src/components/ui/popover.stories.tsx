import type { Meta, StoryObj } from '@storybook/nextjs'
import { Calendar, HelpCircle, Settings, User, Bell, ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverFooter,
  PopoverTitle,
  PopoverDescription,
} from './popover'

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A popover component built with Radix UI Popover primitive for lightweight overlays and tooltips.

## Features
- **Accessible**: Built on Radix UI Popover primitive
- **Positioning**: Smart positioning with collision detection
- **Variants**: Default, simple, and card styles
- **Interactive**: Click or hover triggers
- **Lightweight**: Perfect for tooltips and small overlays
- **Keyboard navigation**: ESC to close, focus management

## Usage
\`\`\`tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger>Click me</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Popover Title</PopoverTitle>
      <PopoverDescription>Popover content goes here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Basic Popover Examples
export const SimplePopover: Story = {
  name: 'Simple Popover',
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Open Popover
      </PopoverTrigger>
      <PopoverContent variant="simple" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Main question or action</PopoverTitle>
          <PopoverDescription>Reporting messages incorrectly marked as junk</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700">
            Action
          </button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

export const CardPopover: Story = {
  name: 'Card Popover',
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700">
        User Menu
      </PopoverTrigger>
      <PopoverContent variant="card" className="w-72">
        <PopoverHeader>
          <PopoverTitle>User Account</PopoverTitle>
          <PopoverDescription>Manage your account settings and preferences</PopoverDescription>
        </PopoverHeader>
        <div className="space-y-2 py-2">
          <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
            Profile Settings
          </button>
          <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
            Notifications
          </button>
          <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
            Billing
          </button>
          <hr className="my-2" />
          <button className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-gray-100">
            Sign Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const HelpPopover: Story = {
  name: 'Help Popover',
  render: () => (
    <div className="flex items-center gap-2">
      <span>Need help?</span>
      <Popover>
        <PopoverTrigger className="text-blue-600 hover:text-blue-700">
          <HelpCircle className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent variant="simple" className="w-64">
          <PopoverDescription>
            Click here to get help with this feature. You can also contact our support team for
            assistance.
          </PopoverDescription>
          <PopoverFooter>
            <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
              Contact Support
            </button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const NotificationPopover: Story = {
  name: 'Notification Popover',
  render: () => (
    <Popover>
      <PopoverTrigger className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
      </PopoverTrigger>
      <PopoverContent variant="card" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-3 py-2">
          <div className="flex gap-3 rounded p-2 hover:bg-gray-50">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">New message received</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex gap-3 rounded p-2 hover:bg-gray-50">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <p className="text-sm">Task completed successfully</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex gap-3 rounded p-2 hover:bg-gray-50">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <p className="text-sm">System maintenance scheduled</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
        <PopoverFooter>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View all notifications
          </button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

export const DatePickerPopover: Story = {
  name: 'Date Picker Popover',
  render: () => (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 transition-colors hover:border-gray-400">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm">Select date</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </PopoverTrigger>
      <PopoverContent variant="card" className="w-64">
        <PopoverHeader>
          <PopoverTitle>Select Date</PopoverTitle>
        </PopoverHeader>
        <div className="p-2">
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            <div className="p-2 font-medium text-gray-500">Su</div>
            <div className="p-2 font-medium text-gray-500">Mo</div>
            <div className="p-2 font-medium text-gray-500">Tu</div>
            <div className="p-2 font-medium text-gray-500">We</div>
            <div className="p-2 font-medium text-gray-500">Th</div>
            <div className="p-2 font-medium text-gray-500">Fr</div>
            <div className="p-2 font-medium text-gray-500">Sa</div>
            {Array.from({ length: 35 }, (_, i) => (
              <button
                key={i}
                className={`rounded p-2 text-sm hover:bg-blue-100 ${
                  i === 15 ? 'bg-blue-600 text-white' : ''
                }`}
              >
                {i < 3 ? '' : i - 2}
              </button>
            ))}
          </div>
        </div>
        <PopoverFooter>
          <div className="flex gap-2">
            <button className="flex-1 rounded border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-50">
              Cancel
            </button>
            <button className="flex-1 rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
              Select
            </button>
          </div>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

// Simple Notification Style (like third image)
export const SimpleNotifications: Story = {
  name: 'Simple Notifications',
  render: () => (
    <div className="space-y-4 p-4">
      <Popover>
        <PopoverTrigger className="w-full rounded-md border border-gray-200 p-3 text-left transition-colors hover:border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Main question or action</p>
              <p className="text-sm text-gray-500">Reporting messages incorrectly marked as junk</p>
            </div>
            <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent variant="simple" className="w-80">
          <PopoverDescription>
            This is additional information that appears when you interact with the notification.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="w-full rounded-md border border-gray-200 p-3 text-left transition-colors hover:border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Main question or action</p>
              <p className="text-sm text-gray-500">Reporting messages incorrectly marked as junk</p>
            </div>
            <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent variant="simple" className="w-80">
          <PopoverDescription>
            Additional context and information for this specific item.
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="w-full rounded-md border border-gray-200 p-3 text-left transition-colors hover:border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Main question or action</p>
              <p className="text-sm text-gray-500">Reporting messages incorrectly marked as junk</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent variant="simple" className="w-80">
          <PopoverDescription>
            This item doesn&apos;t have an action button, just informational content.
          </PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple notification-style popovers matching the third image design.',
      },
    },
  },
}

// Positioning Examples
export const PopoverPositions: Story = {
  name: 'Popover Positions',
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Popover>
        <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Top
        </PopoverTrigger>
        <PopoverContent side="top" variant="card" className="w-48">
          <PopoverDescription>This popover appears above the trigger</PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Bottom
        </PopoverTrigger>
        <PopoverContent side="bottom" variant="card" className="w-48">
          <PopoverDescription>This popover appears below the trigger</PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Left
        </PopoverTrigger>
        <PopoverContent side="left" variant="card" className="w-48">
          <PopoverDescription>This popover appears to the left of the trigger</PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Right
        </PopoverTrigger>
        <PopoverContent side="right" variant="card" className="w-48">
          <PopoverDescription>This popover appears to the right of the trigger</PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Popovers positioned on different sides of their triggers.',
      },
    },
  },
}

// Settings Menu Popover
export const SettingsPopover: Story = {
  name: 'Settings Menu',
  render: () => (
    <Popover>
      <PopoverTrigger className="rounded-full p-2 transition-colors hover:bg-gray-100">
        <Settings className="h-5 w-5 text-gray-600" />
      </PopoverTrigger>
      <PopoverContent variant="card" className="w-56">
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-1 py-2">
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100">
            <User className="h-4 w-4" />
            Account Settings
          </button>
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100">
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            Preferences
          </button>
          <hr className="my-2" />
          <button className="w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
            Sign Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// All Popover Types Collection
export const PopoverCollection: Story = {
  name: 'Popover Collection',
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Popover>
        <PopoverTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Simple
        </PopoverTrigger>
        <PopoverContent variant="simple">
          <PopoverDescription>Simple popover with minimal styling</PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
          Card
        </PopoverTrigger>
        <PopoverContent variant="card">
          <PopoverHeader>
            <PopoverTitle>Card Popover</PopoverTitle>
            <PopoverDescription>Card-style popover with border and shadow</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700">
          With Actions
        </PopoverTrigger>
        <PopoverContent variant="card">
          <PopoverHeader>
            <PopoverTitle>Action Popover</PopoverTitle>
            <PopoverDescription>Popover with action buttons</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <button className="rounded bg-purple-600 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-700">
              Action
            </button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of different popover styles and configurations.',
      },
    },
  },
}
