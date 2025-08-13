import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { Wifi, Bluetooth, MapPin, Moon, Bell, Plane, Database, RefreshCw } from 'lucide-react'
import { Switch } from './switch'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
An iOS-style toggle switch component built with Radix UI Switch primitive and styled with shadcn/ui patterns.

## Features
- **Accessible**: Built on Radix UI Switch primitive
- **Keyboard navigation**: Full keyboard and screen reader support
- **Sizes**: Small, default, and large variants
- **Smooth animations**: CSS transitions for toggle states
- **Form integration**: Works with form libraries
- **Customizable**: Easy to theme and style

## Usage
\`\`\`tsx
import { Switch } from "@/components/ui/switch"

// Basic switch
<Switch />

// Controlled switch
<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />

// With label
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <label htmlFor="airplane-mode">Airplane Mode</label>
</div>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the switch is initially checked (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Called when the checked state changes',
    },
  },
  args: {
    onCheckedChange: (checked: boolean) => console.log('Switch changed:', checked),
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

// Sizes
export const Small: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
  },
}

// With Labels
export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <label
        htmlFor="notifications"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Enable notifications
      </label>
    </div>
  ),
}

export const WithDescription: Story = {
  name: 'With Label & Description',
  render: () => (
    <div className="flex items-center space-x-3">
      <Switch id="marketing" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="marketing"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Marketing emails
        </label>
        <p className="text-muted-foreground text-xs">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
}

// Settings Panel Examples
export const MobileSettings: Story = {
  name: 'Mobile Settings Panel',
  render: () => {
    const [settings, setSettings] = useState({
      wifi: true,
      bluetooth: false,
      location: true,
      airplaneMode: false,
      darkMode: false,
      notifications: true,
    })

    const updateSetting = (key: keyof typeof settings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="bg-background w-80 space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Settings</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Wi-Fi</p>
                <p className="text-muted-foreground text-xs">Connected to Home Network</p>
              </div>
            </div>
            <Switch checked={settings.wifi} onCheckedChange={() => updateSetting('wifi')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bluetooth className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Bluetooth</p>
                <p className="text-muted-foreground text-xs">Off</p>
              </div>
            </div>
            <Switch
              checked={settings.bluetooth}
              onCheckedChange={() => updateSetting('bluetooth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Location Services</p>
                <p className="text-muted-foreground text-xs">Enabled for 3 apps</p>
              </div>
            </div>
            <Switch checked={settings.location} onCheckedChange={() => updateSetting('location')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Airplane Mode</p>
                <p className="text-muted-foreground text-xs">Disable all wireless</p>
              </div>
            </div>
            <Switch
              checked={settings.airplaneMode}
              onCheckedChange={() => updateSetting('airplaneMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-muted-foreground text-xs">Use dark appearance</p>
              </div>
            </div>
            <Switch checked={settings.darkMode} onCheckedChange={() => updateSetting('darkMode')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-muted-foreground text-xs">Allow all notifications</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={() => updateSetting('notifications')}
            />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete mobile settings panel showcasing switches with icons and descriptions.',
      },
    },
  },
}

export const PreferencesForm: Story = {
  name: 'User Preferences Form',
  render: () => {
    const [preferences, setPreferences] = useState({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      marketingEmails: true,
      weeklyDigest: true,
      autoSync: false,
      dataSaver: true,
    })

    const updatePreference = (key: keyof typeof preferences) => {
      setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="max-w-md space-y-6 rounded-lg border p-6">
        <div>
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <p className="text-muted-foreground text-sm">Choose how you&apos;d like to be notified</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Communication</h4>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Email notifications</p>
                <p className="text-muted-foreground text-xs">Get notified via email</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={() => updatePreference('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Push notifications</p>
                <p className="text-muted-foreground text-xs">Browser push notifications</p>
              </div>
              <Switch
                checked={preferences.pushNotifications}
                onCheckedChange={() => updatePreference('pushNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">SMS notifications</p>
                <p className="text-muted-foreground text-xs">Text message alerts</p>
              </div>
              <Switch
                checked={preferences.smsNotifications}
                onCheckedChange={() => updatePreference('smsNotifications')}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Content</h4>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Marketing emails</p>
                <p className="text-muted-foreground text-xs">Product updates and offers</p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={() => updatePreference('marketingEmails')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Weekly digest</p>
                <p className="text-muted-foreground text-xs">Summary of your activity</p>
              </div>
              <Switch
                checked={preferences.weeklyDigest}
                onCheckedChange={() => updatePreference('weeklyDigest')}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Data & Sync</h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RefreshCw className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm">Auto-sync</p>
                  <p className="text-muted-foreground text-xs">Sync data automatically</p>
                </div>
              </div>
              <Switch
                checked={preferences.autoSync}
                onCheckedChange={() => updatePreference('autoSync')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm">Data saver</p>
                  <p className="text-muted-foreground text-xs">Reduce data usage</p>
                </div>
              </div>
              <Switch
                checked={preferences.dataSaver}
                onCheckedChange={() => updatePreference('dataSaver')}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive user preferences form with categorized switch options.',
      },
    },
  },
}

// All Sizes Demo
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Switch size="sm" defaultChecked />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex items-center space-x-4">
        <Switch size="default" defaultChecked />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex items-center space-x-4">
        <Switch size="lg" defaultChecked />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available switch sizes side by side.',
      },
    },
  },
}

// States Overview
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Default</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch />
            <span className="text-sm">Unchecked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <span className="text-sm">Checked</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Disabled</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch disabled />
            <span className="text-sm">Disabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch disabled defaultChecked />
            <span className="text-sm">Disabled + Checked</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all possible switch states.',
      },
    },
  },
}
