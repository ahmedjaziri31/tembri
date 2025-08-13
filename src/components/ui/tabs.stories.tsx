import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  FileText,
  Settings,
  User,
  Bell,
  Home,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile tabs component with multiple variants and sizes for different use cases.

## Features
- **Multiple variants**: Default, underline, pills, and linked styles
- **Icon support**: Icons with text, or icon-only tabs
- **Flexible sizing**: Small, default, and large sizes
- **Active states**: Clear visual feedback for selected tabs
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage
\`\`\`tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Basic tabs
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">First tab</TabsTrigger>
    <TabsTrigger value="tab2">Second tab</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Icons + text
<TabsTrigger value="profile" icon={<User className="h-4 w-4" />}>
  Profile
</TabsTrigger>

// Icon only
<TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />} iconOnly />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab',
    },
  },
  args: {
    defaultValue: 'tab1',
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// Profile Tab with Badge (matching your design)
export const ProfileWithBadge: Story = {
  name: 'Profile with Badge',
  render: () => (
    <div className="space-y-8">
      {/* Profile tab with badge */}
      <div className="max-w-md">
        <h3 className="mb-4 text-lg font-semibold">Profile Tab with Notification Badge</h3>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="profile" variant="underline" badge="5">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" variant="underline">
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Profile content with 5 notifications</p>
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Settings content</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Simple Profile tab */}
      <div className="max-w-md">
        <h3 className="mb-4 text-lg font-semibold">Simple Profile Tab</h3>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="profile" variant="underline">
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Simple profile content</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile tabs with badge notifications - matches your design image.',
      },
    },
  },
}

// Vertical Tabs with Different States (matching your design)
export const VerticalTabsWithStates: Story = {
  name: 'Vertical Tabs with States',
  render: () => (
    <div className="space-y-6">
      <div className="max-w-xs">
        <h3 className="mb-4 text-lg font-semibold">Vertical Tabs with States</h3>
        <Tabs defaultValue="third" className="w-full">
          <TabsList variant="vertical" className="bg-card w-full rounded-lg border">
            <TabsTrigger value="first" variant="vertical" icon={<FileText className="h-4 w-4" />}>
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="second"
              variant="vertical"
              icon={<FileText className="h-4 w-4" />}
              className="bg-blue-50 dark:bg-blue-900/20"
            >
              First tab
            </TabsTrigger>
            <TabsTrigger value="third" variant="vertical" icon={<FileText className="h-4 w-4" />}>
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="fourth"
              variant="vertical"
              icon={<FileText className="h-4 w-4" />}
              disabled
            >
              First tab
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="first"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>First tab content (normal state)</p>
          </TabsContent>
          <TabsContent
            value="second"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Second tab content (highlighted state)</p>
          </TabsContent>
          <TabsContent
            value="third"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Third tab content (active state)</p>
          </TabsContent>
          <TabsContent
            value="fourth"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Fourth tab content (disabled state)</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Vertical tabs showing different states: normal, highlighted, active, and disabled - matches your design image.',
      },
    },
  },
}

// Icons with Text
export const IconsWithText: Story = {
  name: 'Icons with Text',
  render: () => (
    <div className="space-y-6">
      <div className="max-w-md">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" icon={<User className="h-4 w-4" />}>
              Account
            </TabsTrigger>
            <TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>
              Alerts
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Account management content</p>
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Settings and preferences</p>
          </TabsContent>
          <TabsContent
            value="notifications"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Notification settings</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with icons and text labels for enhanced usability.',
      },
    },
  },
}

// Text Only Big (matching third group in image)
export const TextOnlyBig: Story = {
  name: 'Text Only Big',
  render: () => (
    <div className="space-y-6">
      <div className="max-w-md">
        <Tabs defaultValue="first" className="w-full">
          <TabsList variant="default" size="lg" className="grid w-full grid-cols-4">
            <TabsTrigger value="first" size="lg">
              First tab
            </TabsTrigger>
            <TabsTrigger value="second" size="lg">
              First tab
            </TabsTrigger>
            <TabsTrigger value="third" size="lg">
              First tab
            </TabsTrigger>
            <TabsTrigger value="fourth" size="lg" className="text-muted-foreground">
              First tab
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="first"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Content for first large tab</p>
          </TabsContent>
          <TabsContent
            value="second"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Content for second large tab</p>
          </TabsContent>
          <TabsContent
            value="third"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Content for third large tab</p>
          </TabsContent>
          <TabsContent
            value="fourth"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Content for fourth large tab</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Large text-only tabs - matches the third group in your image.',
      },
    },
  },
}

// Linked Small (matching fourth group in image)
export const LinkedSmall: Story = {
  name: 'Linked Small',
  render: () => (
    <div className="space-y-6">
      <div className="max-w-xs">
        <Tabs defaultValue="third" className="w-full">
          <TabsList
            variant="linked"
            size="sm"
            className="bg-muted/30 h-auto flex-col space-y-1 rounded-lg p-2"
          >
            <TabsTrigger value="first" variant="linked" size="sm" className="w-full justify-start">
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="second"
              variant="linked"
              size="sm"
              className="text-muted-foreground w-full justify-start"
            >
              First tab
            </TabsTrigger>
            <TabsTrigger value="third" variant="linked" size="sm" className="w-full justify-start">
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="fourth"
              variant="linked"
              size="sm"
              className="text-muted-foreground w-full justify-start"
            >
              First tab
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="first"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>First tab content</p>
          </TabsContent>
          <TabsContent
            value="second"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Second tab content</p>
          </TabsContent>
          <TabsContent
            value="third"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Third tab content (active)</p>
          </TabsContent>
          <TabsContent
            value="fourth"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Fourth tab content</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small linked tabs in vertical layout - matches the fourth group in your image.',
      },
    },
  },
}

// Linked Medium (matching fifth group in image)
export const LinkedMedium: Story = {
  name: 'Linked Medium',
  render: () => (
    <div className="space-y-6">
      <div className="max-w-sm">
        <Tabs defaultValue="second" className="w-full">
          <TabsList
            variant="linked"
            className="bg-muted/30 h-auto flex-col space-y-1 rounded-lg p-2"
          >
            <TabsTrigger value="first" variant="linked" className="w-full justify-start">
              First tab
            </TabsTrigger>
            <TabsTrigger value="second" variant="linked" className="w-full justify-start">
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="third"
              variant="linked"
              className="text-muted-foreground w-full justify-start"
            >
              First tab
            </TabsTrigger>
            <TabsTrigger
              value="fourth"
              variant="linked"
              className="text-muted-foreground w-full justify-start"
            >
              First tab
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="first"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>First tab content</p>
          </TabsContent>
          <TabsContent
            value="second"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Second tab content (active)</p>
          </TabsContent>
          <TabsContent
            value="third"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Third tab content</p>
          </TabsContent>
          <TabsContent
            value="fourth"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Fourth tab content</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Medium linked tabs in vertical layout - matches the fifth group in your image.',
      },
    },
  },
}

// Profile Tabs (matching bottom examples in image)
export const ProfileTabs: Story = {
  name: 'Profile Tabs',
  render: () => (
    <div className="space-y-8">
      {/* Underline style profile tabs */}
      <div className="max-w-md">
        <h3 className="mb-4 text-lg font-semibold">Underline Style</h3>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList variant="underline" className="w-full">
            <TabsTrigger value="profile" variant="underline" className="flex-1">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" variant="underline" className="flex-1">
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <h4 className="mb-2 font-semibold">Profile Information</h4>
            <p>Manage your profile details and preferences.</p>
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <h4 className="mb-2 font-semibold">Settings</h4>
            <p>Configure your account settings.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pills style profile tabs */}
      <div className="max-w-md">
        <h3 className="mb-4 text-lg font-semibold">Pills Style</h3>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList variant="pills" className="w-full">
            <TabsTrigger value="profile" variant="pills">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" variant="pills">
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <h4 className="mb-2 font-semibold">Profile Information</h4>
            <p>Manage your profile details and preferences.</p>
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <h4 className="mb-2 font-semibold">Settings</h4>
            <p>Configure your account settings.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Profile tabs with different styling approaches - matches the bottom examples in your image.',
      },
    },
  },
}

// Dark Mode Examples
export const DarkModeExamples: Story = {
  name: 'Dark Mode Examples',
  render: () => (
    <div className="space-y-8">
      {/* Light Mode Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Light Mode</h3>
        <div className="space-y-6 rounded-lg border bg-white p-6">
          {/* Profile tab with badge in light mode */}
          <div className="max-w-sm">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList variant="underline" className="w-full bg-transparent">
                <TabsTrigger value="profile" variant="underline" badge="5">
                  Profile
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4">
                <div className="flex h-20 items-center justify-center rounded-lg bg-gray-50">
                  <p className="text-gray-600">Profile content with 5 notifications</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Vertical tabs in light mode */}
          <div className="max-w-xs">
            <Tabs defaultValue="third" className="w-full">
              <TabsList variant="vertical" className="w-full rounded-lg border bg-white shadow-sm">
                <TabsTrigger
                  value="first"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="second"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                  className="bg-blue-50 text-gray-900"
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="third"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="fourth"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                  disabled
                >
                  First tab
                </TabsTrigger>
              </TabsList>
              <TabsContent value="third" className="mt-4 rounded-lg border bg-white p-4">
                <p className="text-gray-900">Content for active tab state</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dark Mode Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Mode</h3>
        <div className="dark space-y-6 rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
          {/* Profile tab with badge in dark mode */}
          <div className="max-w-sm">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList variant="underline" className="w-full bg-transparent">
                <TabsTrigger value="profile" variant="underline" badge="5">
                  Profile
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4">
                <div className="bg-muted/30 flex h-20 items-center justify-center rounded-lg">
                  <p className="text-muted-foreground">Profile content with 5 notifications</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Vertical tabs in dark mode */}
          <div className="max-w-xs">
            <Tabs defaultValue="third" className="w-full">
              <TabsList variant="vertical" className="bg-card w-full rounded-lg border shadow-sm">
                <TabsTrigger
                  value="first"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="second"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                  className="text-foreground bg-blue-900/20"
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="third"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                >
                  First tab
                </TabsTrigger>
                <TabsTrigger
                  value="fourth"
                  variant="vertical"
                  icon={<FileText className="h-4 w-4" />}
                  disabled
                >
                  First tab
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="third"
                className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
              >
                <p>Content for active tab state (dark mode)</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs components displayed in both light and dark modes for comparison.',
      },
    },
  },
}

// Complete Design System Example (matching your attached design)
export const DesignSystemExample: Story = {
  name: 'Design System Example',
  render: () => (
    <div className="space-y-12">
      {/* Top section - Profile tabs with badges */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Profile Tabs</h2>

        <div className="space-y-4">
          <div className="max-w-sm">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList variant="underline" className="w-full bg-transparent">
                <TabsTrigger value="profile" variant="underline" badge="5">
                  Profile
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4">
                <div className="bg-muted/30 flex h-20 items-center justify-center rounded-lg">
                  <p className="text-muted-foreground">Profile content with 5 notifications</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="max-w-sm">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList variant="underline" className="w-full bg-transparent">
                <TabsTrigger value="profile" variant="underline">
                  Profile
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="mt-4">
                <div className="bg-muted/30 flex h-20 items-center justify-center rounded-lg">
                  <p className="text-muted-foreground">Simple profile content</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Bottom section - Vertical tabs with different states */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Vertical Navigation Tabs</h2>

        <div className="max-w-xs">
          <Tabs defaultValue="third" className="w-full">
            <TabsList variant="vertical" className="bg-card w-full rounded-lg border shadow-sm">
              <TabsTrigger value="first" variant="vertical" icon={<FileText className="h-4 w-4" />}>
                First tab
              </TabsTrigger>
              <TabsTrigger
                value="second"
                variant="vertical"
                icon={<FileText className="h-4 w-4" />}
                className="dark:text-foreground bg-blue-50 text-gray-900 dark:bg-blue-900/20"
              >
                First tab
              </TabsTrigger>
              <TabsTrigger value="third" variant="vertical" icon={<FileText className="h-4 w-4" />}>
                First tab
              </TabsTrigger>
              <TabsTrigger
                value="fourth"
                variant="vertical"
                icon={<FileText className="h-4 w-4" />}
                disabled
              >
                First tab
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="first"
              className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
            >
              <p>Content for normal tab state</p>
            </TabsContent>
            <TabsContent
              value="second"
              className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
            >
              <p>Content for highlighted tab state</p>
            </TabsContent>
            <TabsContent
              value="third"
              className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
            >
              <p>Content for active tab state (with blue underline)</p>
            </TabsContent>
            <TabsContent
              value="fourth"
              className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
            >
              <p>Content for disabled tab state</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete design system example matching your attached image with profile badges and vertical navigation tabs.',
      },
    },
  },
}

// All Tab Variants Overview
export const AllVariants: Story = {
  name: 'All Tab Variants',
  render: () => (
    <div className="space-y-12">
      {/* Default variant */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default Variant</h3>
        <Tabs defaultValue="account" className="max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" icon={<User className="h-4 w-4" />}>
              Account
            </TabsTrigger>
            <TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" icon={<Bell className="h-4 w-4" />}>
              Alerts
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Account management content goes here.</p>
          </TabsContent>
          <TabsContent
            value="settings"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Settings and preferences content.</p>
          </TabsContent>
          <TabsContent
            value="notifications"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Notification settings and alerts.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Underline variant */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Underline Variant</h3>
        <Tabs defaultValue="overview" className="max-w-lg">
          <TabsList variant="underline">
            <TabsTrigger value="overview" variant="underline">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" variant="underline">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" variant="underline">
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" variant="underline">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Overview dashboard content.</p>
          </TabsContent>
          <TabsContent
            value="analytics"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Analytics and metrics content.</p>
          </TabsContent>
          <TabsContent
            value="reports"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Reports and data exports.</p>
          </TabsContent>
          <TabsContent
            value="notifications"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Notification preferences.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pills variant */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Pills Variant</h3>
        <Tabs defaultValue="all" className="max-w-lg">
          <TabsList variant="pills">
            <TabsTrigger value="all" variant="pills">
              All
            </TabsTrigger>
            <TabsTrigger value="active" variant="pills">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" variant="pills">
              Inactive
            </TabsTrigger>
            <TabsTrigger value="archived" variant="pills">
              Archived
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>All items displayed here.</p>
          </TabsContent>
          <TabsContent
            value="active"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Active items only.</p>
          </TabsContent>
          <TabsContent
            value="inactive"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Inactive items only.</p>
          </TabsContent>
          <TabsContent
            value="archived"
            className="bg-card text-card-foreground mt-4 rounded-lg border p-4"
          >
            <p>Archived items.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all tab variants and their use cases.',
      },
    },
  },
}

// Interactive Dashboard Example
export const InteractiveDashboard: Story = {
  name: 'Interactive Dashboard',
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList variant="underline" className="mx-auto w-full max-w-md">
          <TabsTrigger value="dashboard" variant="underline" icon={<Home className="h-4 w-4" />}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="profile" variant="underline" icon={<User className="h-4 w-4" />}>
            Profile
          </TabsTrigger>
          <TabsTrigger value="settings" variant="underline" icon={<Settings className="h-4 w-4" />}>
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            variant="underline"
            icon={<Bell className="h-4 w-4" />}
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Welcome back!</h3>
              <p className="text-muted-foreground">
                Here&apos;s what&apos;s happening with your account.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Quick Stats</h3>
              <p className="text-primary text-2xl font-bold">24</p>
              <p className="text-muted-foreground text-sm">Active projects</p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Recent Activity</h3>
              <p className="text-muted-foreground">View your latest actions and updates.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-muted-foreground">John Doe</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <p className="text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-muted-foreground text-sm">Add an extra layer of security</p>
                  </div>
                  <button className="bg-primary text-primary-foreground rounded px-3 py-1 text-sm">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-muted-foreground text-sm">Receive updates via email</p>
                  </div>
                  <button className="rounded border px-3 py-1 text-sm">Configure</button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 font-semibold">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push notifications</p>
                    <p className="text-muted-foreground text-sm">Receive instant updates</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email digest</p>
                    <p className="text-muted-foreground text-sm">Weekly summary of activity</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete interactive dashboard example with multiple tab sections.',
      },
    },
  },
}
