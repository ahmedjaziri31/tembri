import type { Meta, StoryObj } from '@storybook/nextjs'
import { ColorPalette } from './ColorPalette'

const meta = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Color System

The DJR Candidate design system uses a comprehensive color palette that includes primary brand colors, semantic colors for different states, and specialized colors for various application features.

## Color Categories

### Primary Colors
- **Brand Blue (#3C66F9)**: The main brand color used for primary actions, links, and focus states
- **Brand Black (#0D0C13)**: Used for text, borders, and dark backgrounds
- **Brand Gray (#F5F5F5)**: Used for subtle backgrounds and dividers

### Semantic Colors
- **Danger/Error Colors**: Red scale for error states and destructive actions
- **Warning Colors**: Yellow/orange scale for caution messages and warnings  
- **Success Colors**: Green scale for success states and confirmations
- **Info Colors**: Blue scale for informational messages and neutral feedback

### Application-Specific Colors
- **Job Category Colors**: Bright, distinctive colors for categorizing job types
- **Calendar Colors**: Pastel colors for different calendar event types
- **Application Status Colors**: Purple scale for tracking application progress

## Implementation

All colors are available as CSS custom properties and can be used throughout the application:

\`\`\`css
/* Primary colors */
background-color: var(--color-brand-blue);
color: var(--color-brand-black);

/* Semantic colors */
background-color: var(--color-danger);
background-color: var(--color-warning);
background-color: var(--color-success);
background-color: var(--color-info);
\`\`\`

## Tailwind Classes

Custom utility classes are also available:

\`\`\`html
<div class="bg-brand-blue text-white">Primary button</div>
<div class="text-danger">Error message</div>
<div class="bg-success text-white">Success notification</div>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const CompletePalette: Story = {
  name: 'Complete Color Palette',
  parameters: {
    docs: {
      description: {
        story:
          'The complete color system showing all primary, semantic, and application-specific colors.',
      },
    },
  },
}

export const PrimaryColorsOnly: Story = {
  name: 'Primary Colors',
  render: () => (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Primary Brand Colors</h2>
      <div className="flex gap-6">
        <div className="text-center">
          <div className="bg-brand-black mb-3 flex h-24 w-24 items-center justify-center rounded-lg shadow-lg">
            <span className="font-medium text-white">Black</span>
          </div>
          <div className="text-sm font-medium">Brand Black</div>
          <div className="font-mono text-xs text-gray-500">#0D0C13</div>
        </div>
        <div className="text-center">
          <div className="bg-brand-blue mb-3 flex h-24 w-24 items-center justify-center rounded-lg shadow-lg">
            <span className="font-medium text-white">Blue</span>
          </div>
          <div className="text-sm font-medium">Brand Blue</div>
          <div className="font-mono text-xs text-gray-500">#3C66F9</div>
        </div>
        <div className="text-center">
          <div className="bg-brand-gray mb-3 flex h-24 w-24 items-center justify-center rounded-lg border shadow-lg">
            <span className="font-medium text-black">Gray</span>
          </div>
          <div className="text-sm font-medium">Brand Gray</div>
          <div className="font-mono text-xs text-gray-500">#F5F5F5</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The three main brand colors that define the visual identity.',
      },
    },
  },
}

export const SemanticColors: Story = {
  render: () => (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Semantic Color System</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="text-center">
          <div className="bg-danger mb-3 flex h-20 w-20 items-center justify-center rounded-lg shadow-lg">
            <span className="text-xs font-medium text-white">Danger</span>
          </div>
          <div className="text-sm font-medium">Danger</div>
          <div className="text-xs text-gray-500">Errors & destructive actions</div>
        </div>
        <div className="text-center">
          <div className="bg-warning mb-3 flex h-20 w-20 items-center justify-center rounded-lg shadow-lg">
            <span className="text-xs font-medium text-white">Warning</span>
          </div>
          <div className="text-sm font-medium">Warning</div>
          <div className="text-xs text-gray-500">Caution & pending states</div>
        </div>
        <div className="text-center">
          <div className="bg-success mb-3 flex h-20 w-20 items-center justify-center rounded-lg shadow-lg">
            <span className="text-xs font-medium text-white">Success</span>
          </div>
          <div className="text-sm font-medium">Success</div>
          <div className="text-xs text-gray-500">Confirmations & completed</div>
        </div>
        <div className="text-center">
          <div className="bg-info mb-3 flex h-20 w-20 items-center justify-center rounded-lg shadow-lg">
            <span className="text-xs font-medium text-white">Info</span>
          </div>
          <div className="text-sm font-medium">Info</div>
          <div className="text-xs text-gray-500">Neutral information</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic colors used for different message types and states.',
      },
    },
  },
}

export const JobCategoryColors: Story = {
  render: () => (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">Job Category Colors</h2>
      <div className="flex flex-wrap gap-3">
        {[
          { name: 'Teal', color: '#6BD4CC' },
          { name: 'Green', color: '#7BBF6A' },
          { name: 'Purple', color: '#C4A7E7' },
          { name: 'Lime', color: '#8FD460' },
          { name: 'Yellow', color: '#F5D547' },
          { name: 'Orange', color: '#F5A547' },
          { name: 'Magenta', color: '#E667E4' },
          { name: 'Pink', color: '#F58AA6' },
        ].map((color, index) => (
          <div key={index} className="text-center">
            <div
              className="mb-2 h-16 w-16 rounded-lg shadow-sm"
              style={{ backgroundColor: color.color }}
            />
            <div className="text-xs font-medium">{color.name}</div>
            <div className="font-mono text-xs text-gray-500">{color.color}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bright, distinctive colors used for categorizing different job types.',
      },
    },
  },
}
