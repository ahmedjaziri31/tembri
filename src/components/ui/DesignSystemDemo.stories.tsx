import type { Meta, StoryObj } from '@storybook/nextjs'
import { DesignSystemDemo } from './DesignSystemDemo'

const meta = {
  title: 'Design System/Complete Demo',
  component: DesignSystemDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# DJR Candidate Design System - Complete Demo

This comprehensive demo showcases the complete design system implementation, including:

## 🎨 **Typography System**
- **Inter font family** with 4 precise weights (Regular, Medium, Semi Bold, Bold)
- **Comprehensive text scales** from display text to body and labels
- **Proper hierarchy** for clear content organization

## 🌈 **Color System**
- **Primary brand colors** (#3C66F9 blue, #0D0C13 black, #F5F5F5 gray)
- **Semantic colors** for success, warning, danger, and info states
- **Job category colors** for visual categorization
- **Calendar and status colors** for application-specific needs

## 🔘 **Button System**
- **Multiple variants** using design system colors
- **Consistent typography** with proper label styles
- **Icon integration** with rounded plus icons
- **Semantic variants** for different states and actions

## 📱 **Real-world Application**
The demo includes a realistic job posting interface showing:
- Typography hierarchy in action
- Semantic colors for status indicators
- Job category color coding
- Consistent button usage
- Proper spacing and layout

## 🛠️ **Implementation Ready**
All components and styles are production-ready with:
- Comprehensive CSS utility classes
- Accessible color contrasts
- Scalable typography system
- Consistent component APIs
- Full Tailwind CSS integration

This design system provides everything needed to build consistent, accessible, and visually appealing job recruitment interfaces.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DesignSystemDemo>

export default meta
type Story = StoryObj<typeof meta>

export const CompleteDemo: Story = {
  name: 'Complete Design System Demo',
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive demonstration of the complete design system showing typography, colors, and components working together in realistic scenarios.',
      },
    },
  },
}
