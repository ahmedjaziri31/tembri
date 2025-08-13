import type { Meta, StoryObj } from '@storybook/nextjs'
import { RadioGroup, RadioGroupItem, RadioWithLabel } from './radio-group'

const meta = {
  title: 'UI/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A radio button component for selecting a single option from a list of choices.

## Features
- **Single selection**: Only one option can be selected at a time
- **Multiple sizes**: Small, default, and large variants
- **Orientations**: Vertical and horizontal layouts
- **With labels**: Enhanced radio buttons with labels and descriptions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark mode**: Properly adapts to light and dark themes

## Usage
\`\`\`tsx
import { RadioGroup, RadioGroupItem, RadioWithLabel } from "@/components/ui/radio-group"

// Basic radio group
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <label htmlFor="option1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <label htmlFor="option2">Option 2</label>
  </div>
</RadioGroup>

// Radio with enhanced labels
<RadioGroup defaultValue="option1">
  <RadioWithLabel 
    value="option1" 
    id="option1" 
    label="Option 1"
    description="This is the first option"
  />
  <RadioWithLabel 
    value="option2" 
    id="option2" 
    label="Option 2"
    description="This is the second option"
  />
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the radio group',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
  },
  args: {
    defaultValue: 'option1',
    orientation: 'vertical',
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic Radio States (matching your image)
export const BasicRadioStates: Story = {
  name: 'Basic Radio States',
  render: () => (
    <div className="space-y-8">
      {/* Unselected and Selected states from your image */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic States</h3>
        <div className="flex items-center space-x-8">
          {/* Unselected state */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
            <RadioGroup>
              <RadioGroupItem value="unselected" id="unselected" />
            </RadioGroup>
            <span className="text-muted-foreground text-xs">Unselected</span>
          </div>

          {/* Selected state */}
          <div className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-blue-300 p-4">
            <RadioGroup defaultValue="selected">
              <RadioGroupItem value="selected" id="selected" />
            </RadioGroup>
            <span className="text-muted-foreground text-xs">Selected</span>
          </div>
        </div>
      </div>

      {/* Interactive example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Example</h3>
        <RadioGroup defaultValue="option1" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="r1" />
            <label htmlFor="r1" className="cursor-pointer text-sm font-medium">
              Default (pre-selected)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="r2" />
            <label htmlFor="r2" className="cursor-pointer text-sm font-medium">
              Alternative option
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="r3" />
            <label htmlFor="r3" className="cursor-pointer text-sm font-medium">
              Third choice
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic radio button states showing unselected and selected variants - matches your design image.',
      },
    },
  },
}

// Different Sizes
export const RadioSizes: Story = {
  name: 'Radio Sizes',
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Small Size</h3>
        <RadioGroup defaultValue="small1" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small1" id="s1" size="sm" />
            <label htmlFor="s1" className="cursor-pointer text-sm">
              Small radio button
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small2" id="s2" size="sm" />
            <label htmlFor="s2" className="cursor-pointer text-sm">
              Another small option
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Size</h3>
        <RadioGroup defaultValue="default1" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default1" id="d1" />
            <label htmlFor="d1" className="cursor-pointer text-sm">
              Default radio button
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default2" id="d2" />
            <label htmlFor="d2" className="cursor-pointer text-sm">
              Another default option
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Large Size</h3>
        <RadioGroup defaultValue="large1" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large1" id="l1" size="lg" />
            <label htmlFor="l1" className="cursor-pointer text-sm">
              Large radio button
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large2" id="l2" size="lg" />
            <label htmlFor="l2" className="cursor-pointer text-sm">
              Another large option
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in different sizes: small, default, and large.',
      },
    },
  },
}

// Radio with Enhanced Labels
export const RadioWithLabels: Story = {
  name: 'Radio with Labels',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Method Selection</h3>
        <RadioGroup defaultValue="card" className="space-y-4">
          <RadioWithLabel
            value="card"
            id="card"
            label="Credit Card"
            description="Pay with your credit or debit card"
          />
          <RadioWithLabel
            value="paypal"
            id="paypal"
            label="PayPal"
            description="Pay with your PayPal account"
          />
          <RadioWithLabel
            value="apple"
            id="apple"
            label="Apple Pay"
            description="Pay with Touch ID or Face ID"
          />
          <RadioWithLabel
            value="google"
            id="google"
            label="Google Pay"
            description="Pay with your Google account"
          />
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Subscription Plan</h3>
        <RadioGroup defaultValue="pro" className="space-y-4">
          <RadioWithLabel
            value="free"
            id="free"
            label="Free Plan"
            description="Perfect for personal use. Includes basic features."
          />
          <RadioWithLabel
            value="pro"
            id="pro"
            label="Pro Plan - $9/month"
            description="Best for professionals. Includes advanced features and priority support."
          />
          <RadioWithLabel
            value="enterprise"
            id="enterprise"
            label="Enterprise Plan - $29/month"
            description="For large teams. Includes all features and dedicated support."
          />
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons with enhanced labels and descriptions for better user experience.',
      },
    },
  },
}

// Horizontal Layout
export const HorizontalRadio: Story = {
  name: 'Horizontal Layout',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rating Scale</h3>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">How satisfied are you with our service?</p>
          <RadioGroup defaultValue="4" orientation="horizontal">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="rating1" />
              <label htmlFor="rating1" className="cursor-pointer text-sm">
                1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="rating2" />
              <label htmlFor="rating2" className="cursor-pointer text-sm">
                2
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="rating3" />
              <label htmlFor="rating3" className="cursor-pointer text-sm">
                3
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="rating4" />
              <label htmlFor="rating4" className="cursor-pointer text-sm">
                4
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="rating5" />
              <label htmlFor="rating5" className="cursor-pointer text-sm">
                5
              </label>
            </div>
          </RadioGroup>
          <div className="text-muted-foreground mt-1 flex justify-between text-xs">
            <span>Very Unsatisfied</span>
            <span>Very Satisfied</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Preference</h3>
        <RadioGroup defaultValue="medium" orientation="horizontal">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="size-s" />
            <label htmlFor="size-s" className="cursor-pointer text-sm">
              Small
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="size-m" />
            <label htmlFor="size-m" className="cursor-pointer text-sm">
              Medium
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="size-l" />
            <label htmlFor="size-l" className="cursor-pointer text-sm">
              Large
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="xlarge" id="size-xl" />
            <label htmlFor="size-xl" className="cursor-pointer text-sm">
              X-Large
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons arranged horizontally for compact layouts and rating scales.',
      },
    },
  },
}

// Form Examples
export const FormExamples: Story = {
  name: 'Form Examples',
  render: () => (
    <div className="max-w-2xl space-y-8">
      {/* User Profile Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">User Profile Settings</h3>

        <div className="space-y-4">
          <div>
            <label className="mb-3 block text-sm font-medium">Notification Preferences</label>
            <RadioGroup defaultValue="email" className="space-y-3">
              <RadioWithLabel
                value="email"
                id="notify-email"
                label="Email notifications"
                description="Receive notifications via email"
              />
              <RadioWithLabel
                value="sms"
                id="notify-sms"
                label="SMS notifications"
                description="Receive notifications via text message"
              />
              <RadioWithLabel
                value="push"
                id="notify-push"
                label="Push notifications"
                description="Receive notifications in the app"
              />
              <RadioWithLabel
                value="none"
                id="notify-none"
                label="No notifications"
                description="Don't receive any notifications"
              />
            </RadioGroup>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium">Theme Preference</label>
            <RadioGroup defaultValue="system" orientation="horizontal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <label htmlFor="theme-light" className="cursor-pointer text-sm">
                  Light
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <label htmlFor="theme-dark" className="cursor-pointer text-sm">
                  Dark
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <label htmlFor="theme-system" className="cursor-pointer text-sm">
                  System
                </label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium">Language</label>
            <RadioGroup defaultValue="en" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="lang-en" />
                <label htmlFor="lang-en" className="cursor-pointer text-sm">
                  English
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="es" id="lang-es" />
                <label htmlFor="lang-es" className="cursor-pointer text-sm">
                  Español
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fr" id="lang-fr" />
                <label htmlFor="lang-fr" className="cursor-pointer text-sm">
                  Français
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="de" id="lang-de" />
                <label htmlFor="lang-de" className="cursor-pointer text-sm">
                  Deutsch
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form examples showing radio buttons in realistic use cases.',
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
          <div className="space-y-4">
            <h4 className="font-medium">Basic Radio States</h4>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <RadioGroup>
                  <RadioGroupItem value="unselected" id="light-unselected" />
                </RadioGroup>
                <span className="text-xs text-gray-600">Unselected</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RadioGroup defaultValue="selected">
                  <RadioGroupItem value="selected" id="light-selected" />
                </RadioGroup>
                <span className="text-xs text-gray-600">Selected</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">With Labels</h4>
            <RadioGroup defaultValue="option1" className="space-y-3">
              <RadioWithLabel
                value="option1"
                id="light-option1"
                label="First Option"
                description="This is the first choice in light mode"
              />
              <RadioWithLabel
                value="option2"
                id="light-option2"
                label="Second Option"
                description="This is the second choice in light mode"
              />
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Dark Mode Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Mode</h3>
        <div className="dark space-y-6 rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
          <div className="space-y-4">
            <h4 className="font-medium text-white">Basic Radio States</h4>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <RadioGroup>
                  <RadioGroupItem value="unselected" id="dark-unselected" />
                </RadioGroup>
                <span className="text-xs text-gray-400">Unselected</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RadioGroup defaultValue="selected">
                  <RadioGroupItem value="selected" id="dark-selected" />
                </RadioGroup>
                <span className="text-xs text-gray-400">Selected</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">With Labels</h4>
            <RadioGroup defaultValue="option1" className="space-y-3">
              <RadioWithLabel
                value="option1"
                id="dark-option1"
                label="First Option"
                description="This is the first choice in dark mode"
              />
              <RadioWithLabel
                value="option2"
                id="dark-option2"
                label="Second Option"
                description="This is the second choice in dark mode"
              />
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons displayed in both light and dark modes for comparison.',
      },
    },
  },
}

// Interactive Playground
export const InteractivePlayground: Story = {
  name: 'Interactive Playground',
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Radio Button Playground</h2>
        <p className="text-muted-foreground">Try different radio button configurations</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Survey Example */}
        <div className="bg-card space-y-6 rounded-lg border p-6">
          <h3 className="font-semibold">Customer Survey</h3>

          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-medium">How did you hear about us?</p>
              <RadioGroup defaultValue="social" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="hear-social" />
                  <label htmlFor="hear-social" className="cursor-pointer text-sm">
                    Social Media
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friend" id="hear-friend" />
                  <label htmlFor="hear-friend" className="cursor-pointer text-sm">
                    Friend Referral
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="search" id="hear-search" />
                  <label htmlFor="hear-search" className="cursor-pointer text-sm">
                    Search Engine
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ad" id="hear-ad" />
                  <label htmlFor="hear-ad" className="cursor-pointer text-sm">
                    Advertisement
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Rate your experience</p>
              <RadioGroup defaultValue="4" orientation="horizontal">
                {[1, 2, 3, 4, 5].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <label htmlFor={`rating-${rating}`} className="cursor-pointer text-sm">
                      {rating}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Settings Example */}
        <div className="bg-card space-y-6 rounded-lg border p-6">
          <h3 className="font-semibold">App Settings</h3>

          <div className="space-y-4">
            <div>
              <p className="mb-3 text-sm font-medium">Default View</p>
              <RadioGroup defaultValue="grid" className="space-y-2">
                <RadioWithLabel
                  value="list"
                  id="view-list"
                  label="List View"
                  description="Display items in a vertical list"
                />
                <RadioWithLabel
                  value="grid"
                  id="view-grid"
                  label="Grid View"
                  description="Display items in a grid layout"
                />
                <RadioWithLabel
                  value="card"
                  id="view-card"
                  label="Card View"
                  description="Display items as cards"
                />
              </RadioGroup>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Auto-save</p>
              <RadioGroup defaultValue="5min" orientation="horizontal">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1min" id="save-1min" size="sm" />
                  <label htmlFor="save-1min" className="cursor-pointer text-xs">
                    1min
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5min" id="save-5min" size="sm" />
                  <label htmlFor="save-5min" className="cursor-pointer text-xs">
                    5min
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15min" id="save-15min" size="sm" />
                  <label htmlFor="save-15min" className="cursor-pointer text-xs">
                    15min
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="save-never" size="sm" />
                  <label htmlFor="save-never" className="cursor-pointer text-xs">
                    Never
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive examples showing radio buttons in real-world scenarios like surveys and settings.',
      },
    },
  },
}
