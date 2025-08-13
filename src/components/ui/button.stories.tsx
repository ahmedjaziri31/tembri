import type { Meta, StoryObj } from '@storybook/nextjs'
import { fn } from '@storybook/test'
import { User, Download, Settings, Heart, Star } from 'lucide-react'
import {
  Button,
  PrimaryButtonWithIcon,
  SecondaryButtonWithIcon,
  OutlinedButtonWithIcon,
  LinkedButtonWithLeftIcon,
  LinkedButtonWithRightIcon,
  AccountButton,
  RoundedPlusIcon,
} from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component built with Radix UI and Tailwind CSS. Supports multiple variants, sizes, icons, and states.

## Features
- Multiple variants (primary, secondary, outline, ghost, semantic colors, etc.)
- Icon support (start, end, or both)
- Rounded plus icons matching the design system
- Loading states with spinner
- Accessible by default
- Full keyboard navigation support
- Customizable styling with Tailwind CSS
- Design system color integration (#3C66F9 primary blue)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'primary',
        'primary-outline',
        'secondary-outline',
        'outlined',
        'linked',
        'warning',
        'success',
        'info',
      ],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state',
    },
    children: {
      control: { type: 'text' },
      description: 'The button content/text',
    },
    icon: {
      control: { type: 'select' },
      options: ['none', 'plus', 'user', 'download', 'settings', 'heart'],
      mapping: {
        none: undefined,
        plus: <RoundedPlusIcon />,
        user: <User />,
        download: <Download />,
        settings: <Settings />,
        heart: <Heart />,
      },
      description: 'Icon to display at the start of the button',
    },
    endIcon: {
      control: { type: 'select' },
      options: ['none', 'plus', 'user', 'download', 'settings', 'star'],
      mapping: {
        none: undefined,
        plus: <RoundedPlusIcon />,
        user: <User />,
        download: <Download />,
        settings: <Settings />,
        star: <Star />,
      },
      description: 'Icon to display at the end of the button',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic Button Stories
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'My account',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'My account',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'My account',
  },
}

// Semantic Color Variants
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

// Semantic Colors Showcase
export const SemanticColorVariants: Story = {
  name: 'Semantic Color Variants',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons using the design system semantic colors for different states and actions.',
      },
    },
  },
}

// Primary Buttons with Icons (matching your design)
export const PrimaryWithIcon: Story = {
  name: 'Primary button with icon',
  args: {
    variant: 'primary',
    icon: <RoundedPlusIcon />,
    children: 'My account',
  },
}

// Secondary Buttons with Icons (matching your design)
export const SecondaryWithIcon: Story = {
  name: 'Secondary button With icon',
  args: {
    variant: 'secondary-outline',
    icon: <RoundedPlusIcon />,
    children: 'My account',
  },
}

// Size Variations
export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="default" variant="primary">
        Default
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
      <Button size="xl" variant="primary">
        Extra Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button sizes available.',
      },
    },
  },
}

// Primary Button Variations (matching your design layout)
export const PrimaryVariations: Story = {
  name: 'Primary button with icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="primary" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="primary" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="primary" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="primary" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Primary buttons with rounded plus icons in different sizes, matching the design specification.',
      },
    },
  },
}

// Primary Buttons WITHOUT Icons (matching your design)
export const PrimaryWithoutIcon: Story = {
  name: 'Primary button w/ icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="primary" size="sm">
          My account
        </Button>
        <Button variant="primary" size="sm">
          Start test
        </Button>
        <Button variant="primary" size="sm">
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="primary">My account</Button>
        <Button variant="primary">Start test</Button>
        <Button variant="primary">My account</Button>
      </div>

      {/* Column 3: Large + one secondary */}
      <div className="space-y-3">
        <Button variant="primary" size="lg">
          My account
        </Button>
        <Button variant="secondary" size="lg">
          Start test
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Primary buttons WITHOUT icons in different sizes, matching the design specification.',
      },
    },
  },
}

// Secondary Button Variations (matching your design layout)
export const SecondaryVariations: Story = {
  name: 'Secondary button With icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="secondary-outline" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="secondary-outline" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="secondary-outline" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="secondary-outline" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Secondary buttons WITH rounded plus icons in different sizes, matching the design specification.',
      },
    },
  },
}

// Secondary Buttons WITHOUT Icons (matching your design)
export const SecondaryWithoutIcon: Story = {
  name: 'Secondary button w/ icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1 */}
      <div className="space-y-3">
        <Button variant="secondary-outline" size="sm">
          My account
        </Button>
        <Button variant="secondary-outline" size="sm">
          My account
        </Button>
        <Button variant="secondary-outline" size="sm">
          My account
        </Button>
      </div>

      {/* Column 2 */}
      <div className="space-y-3">
        <Button variant="secondary-outline">My account</Button>
        <Button variant="secondary-outline">My account</Button>
        <Button variant="secondary-outline">My account</Button>
      </div>

      {/* Column 3 */}
      <div className="space-y-3">
        <Button variant="secondary-outline" size="lg">
          My account
        </Button>
        <Button variant="secondary-outline" size="lg">
          My account
        </Button>
        <Button variant="secondary-outline" size="lg">
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Secondary outline buttons WITHOUT icons in different sizes.',
      },
    },
  },
}

// NEW: Outlined Button with Icon (matching your design)
export const OutlinedButtonWithIconVariations: Story = {
  name: 'Outlined button with icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="outlined" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="outlined" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="outlined" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="outlined" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined buttons with rounded plus icons in different sizes.',
      },
    },
  },
}

// NEW: Outlined Button without Icon (matching your design)
export const OutlinedButtonWithoutIcon: Story = {
  name: 'Outlined button w/ icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="outlined" size="sm">
          My account
        </Button>
        <Button variant="outlined" size="sm">
          My account
        </Button>
        <Button variant="outlined" size="sm">
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="outlined">My account</Button>
        <Button variant="outlined">My account</Button>
        <Button variant="outlined">My account</Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="outlined" size="lg">
          My account
        </Button>
        <Button variant="outlined" size="lg">
          My account
        </Button>
        <Button variant="outlined" size="lg">
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined buttons WITHOUT icons in different sizes.',
      },
    },
  },
}

// NEW: Linked Button with Left Icon (matching your design)
export const LinkedButtonWithLeftIconVariations: Story = {
  name: 'Linked button with left icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="sm" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="linked" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="lg" icon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Linked buttons with left rounded plus icons in different sizes.',
      },
    },
  },
}

// NEW: Linked Button without Icon (matching your design)
export const LinkedButtonWithoutIcon: Story = {
  name: 'Linked button w/ icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="sm">
          My account
        </Button>
        <Button variant="linked" size="sm">
          My account
        </Button>
        <Button variant="linked" size="sm">
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="linked">My account</Button>
        <Button variant="linked">My account</Button>
        <Button variant="linked">My account</Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="lg">
          My account
        </Button>
        <Button variant="linked" size="lg">
          My account
        </Button>
        <Button variant="linked" size="lg">
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Linked buttons WITHOUT icons in different sizes.',
      },
    },
  },
}

// NEW: Linked Button with Right Icon (matching your design)
export const LinkedButtonWithRightIconVariations: Story = {
  name: 'Linked button with right icon',
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {/* Column 1: Small buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="sm" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="sm" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="sm" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 2: Default buttons */}
      <div className="space-y-3">
        <Button variant="linked" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>

      {/* Column 3: Large buttons */}
      <div className="space-y-3">
        <Button variant="linked" size="lg" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="lg" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
        <Button variant="linked" size="lg" endIcon={<RoundedPlusIcon />}>
          My account
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Linked buttons with right rounded plus icons in different sizes.',
      },
    },
  },
}

// States
export const LoadingState: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
}

export const DisabledState: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
}

// Interactive Demo
export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  args: {
    variant: 'primary',
    children: 'Click me',
    icon: <RoundedPlusIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive button where you can test different props using the controls below.',
      },
    },
  },
}

// Predefined Component Stories
export const PredefinedPrimaryWithIcon: Story = {
  name: 'PrimaryButtonWithIcon Component',
  render: () => <PrimaryButtonWithIcon>My account</PrimaryButtonWithIcon>,
  parameters: {
    docs: {
      description: {
        story: 'A predefined primary button component with a rounded plus icon.',
      },
    },
  },
}

export const PredefinedSecondaryWithIcon: Story = {
  name: 'SecondaryButtonWithIcon Component',
  render: () => <SecondaryButtonWithIcon>My account</SecondaryButtonWithIcon>,
  parameters: {
    docs: {
      description: {
        story: 'A predefined secondary button component with a rounded plus icon.',
      },
    },
  },
}

export const PredefinedOutlinedWithIcon: Story = {
  name: 'OutlinedButtonWithIcon Component',
  render: () => <OutlinedButtonWithIcon>My account</OutlinedButtonWithIcon>,
  parameters: {
    docs: {
      description: {
        story: 'A predefined outlined button component with a rounded plus icon.',
      },
    },
  },
}

export const PredefinedLinkedWithLeftIcon: Story = {
  name: 'LinkedButtonWithLeftIcon Component',
  render: () => <LinkedButtonWithLeftIcon>My account</LinkedButtonWithLeftIcon>,
  parameters: {
    docs: {
      description: {
        story: 'A predefined linked button component with a left rounded plus icon.',
      },
    },
  },
}

export const PredefinedLinkedWithRightIcon: Story = {
  name: 'LinkedButtonWithRightIcon Component',
  render: () => <LinkedButtonWithRightIcon>My account</LinkedButtonWithRightIcon>,
  parameters: {
    docs: {
      description: {
        story: 'A predefined linked button component with a right rounded plus icon.',
      },
    },
  },
}

export const PredefinedAccountButton: Story = {
  name: 'AccountButton Component',
  render: () => (
    <div className="flex gap-4">
      <AccountButton variant="primary" />
      <AccountButton variant="secondary-outline" />
      <AccountButton variant="outlined" />
      <AccountButton variant="linked" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A predefined account button component in different variants with rounded plus icons.',
      },
    },
  },
}
