import type { Meta, StoryObj } from '@storybook/nextjs'
// import { fn } from '@storybook/test' // Using inline function instead
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Volume2,
  Heart,
  Star,
  Bookmark,
  Bell,
  BellOff,
} from 'lucide-react'
import { Toggle } from './toggle'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A two-state button that can be either on or off. Built with Radix UI Toggle primitive and styled with shadcn/ui patterns.

## Features
- **Accessible**: Built on Radix UI Toggle primitive
- **Keyboard navigation**: Full keyboard support
- **Variants**: Multiple visual styles (default, outline)
- **Sizes**: Small, default, and large sizes
- **Icons**: Perfect for icon toggles
- **State management**: Controlled and uncontrolled modes

## Usage
\`\`\`tsx
import { Toggle } from "@/components/ui/toggle"

// Basic toggle
<Toggle>Toggle me</Toggle>

// With icon
<Toggle><Bold className="h-4 w-4" /></Toggle>

// Controlled
<Toggle pressed={isPressed} onPressedChange={setIsPressed}>
  Toggle
</Toggle>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual variant of the toggle',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the toggle',
    },
    pressed: {
      control: 'boolean',
      description: 'Whether the toggle is pressed (controlled)',
    },
    defaultPressed: {
      control: 'boolean',
      description: 'Whether the toggle is initially pressed (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    onPressedChange: {
      action: 'pressedChange',
      description: 'Called when the pressed state changes',
    },
  },
  args: {
    onPressedChange: (pressed: boolean) => console.log('Toggle pressed:', pressed),
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {
    children: 'Toggle',
  },
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Toggle',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    children: 'Toggle',
  },
}

export const DisabledPressed: Story = {
  name: 'Disabled + Pressed',
  args: {
    disabled: true,
    defaultPressed: true,
    children: 'Toggle',
  },
}

// Variants
export const Outline: Story = {
  name: 'Outline Variant',
  args: {
    variant: 'outline',
    children: 'Toggle',
  },
}

export const OutlinePressed: Story = {
  name: 'Outline + Pressed',
  args: {
    variant: 'outline',
    defaultPressed: true,
    children: 'Toggle',
  },
}

// Sizes
export const Small: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
    children: 'Large',
  },
}

// Icon Examples
export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    children: <Bold className="h-4 w-4" />,
  },
}

export const IconWithText: Story = {
  name: 'Icon + Text',
  args: {
    children: (
      <>
        <Bold className="h-4 w-4" />
        Bold
      </>
    ),
  },
}

// Text Formatting Toolbar
export const TextFormattingToolbar: Story = {
  name: 'Text Formatting Toolbar',
  render: () => (
    <div className="flex items-center space-x-1 rounded-lg border p-2">
      <Toggle variant="outline" size="sm">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <Underline className="h-4 w-4" />
      </Toggle>
      <div className="bg-border mx-1 h-6 w-px" />
      <Toggle variant="outline" size="sm">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" size="sm">
        <AlignRight className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using toggles in a text formatting toolbar.',
      },
    },
  },
}

// Audio Controls
export const AudioControls: Story = {
  name: 'Audio Controls',
  render: () => (
    <div className="flex items-center space-x-2">
      <Toggle>
        <Volume2 className="h-4 w-4" />
      </Toggle>
      <span className="text-muted-foreground text-sm">Mute/Unmute</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle for audio mute/unmute functionality.',
      },
    },
  },
}

// Favorites Toggle
export const FavoritesToggle: Story = {
  name: 'Favorites Toggle',
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Toggle className="text-red-500 data-[state=on]:text-red-600">
          <Heart className="h-4 w-4" />
        </Toggle>
        <span className="text-sm">Like</span>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle className="text-yellow-500 data-[state=on]:text-yellow-600">
          <Star className="h-4 w-4" />
        </Toggle>
        <span className="text-sm">Star</span>
      </div>
      <div className="flex items-center space-x-2">
        <Toggle className="text-blue-500 data-[state=on]:text-blue-600">
          <Bookmark className="h-4 w-4" />
        </Toggle>
        <span className="text-sm">Bookmark</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggles with custom colors for favorites, stars, and bookmarks.',
      },
    },
  },
}

// Notification Settings
export const NotificationSettings: Story = {
  name: 'Notification Settings',
  render: () => (
    <div className="max-w-sm space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Notification Settings</h3>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-muted-foreground text-xs">Receive updates via email</p>
        </div>
        <Toggle variant="outline">
          <Bell className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Push notifications</p>
          <p className="text-muted-foreground text-xs">Receive push notifications</p>
        </div>
        <Toggle variant="outline" defaultPressed>
          <Bell className="h-4 w-4" />
        </Toggle>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Do not disturb</p>
          <p className="text-muted-foreground text-xs">Silence all notifications</p>
        </div>
        <Toggle variant="outline">
          <BellOff className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggles used in a notification settings panel.',
      },
    },
  },
}

// All Variants and Sizes
export const AllVariantsAndSizes: Story = {
  name: 'All Variants & Sizes',
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium">Default Variant</h4>
        <div className="flex items-center space-x-2">
          <Toggle size="sm">Small</Toggle>
          <Toggle size="default">Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Outline Variant</h4>
        <div className="flex items-center space-x-2">
          <Toggle variant="outline" size="sm">
            Small
          </Toggle>
          <Toggle variant="outline" size="default">
            Default
          </Toggle>
          <Toggle variant="outline" size="lg">
            Large
          </Toggle>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">With Icons</h4>
        <div className="flex items-center space-x-2">
          <Toggle size="sm">
            <Bold className="h-3 w-3" />
          </Toggle>
          <Toggle size="default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg">
            <Bold className="h-5 w-5" />
          </Toggle>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Pressed States</h4>
        <div className="flex items-center space-x-2">
          <Toggle defaultPressed>Pressed</Toggle>
          <Toggle variant="outline" defaultPressed>
            Outline Pressed
          </Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled defaultPressed>
            Disabled Pressed
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive overview of all toggle variants, sizes, and states.',
      },
    },
  },
}
