import type { Meta, StoryObj } from '@storybook/nextjs'
import { Typography } from './Typography'

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Typography System

The DJR Candidate design system uses **Inter** as the primary typeface with four carefully selected font weights and a comprehensive type scale designed for digital interfaces.

## Font Family: Inter

Inter is a modern, highly legible typeface specifically designed for user interfaces. It offers excellent readability at small sizes and maintains clarity across different screen resolutions and devices.

### Available Weights

- **Regular (400)**: Used for body text, descriptions, and content where readability is key
- **Medium (500)**: Used for labels, form fields, and subtle emphasis within paragraphs  
- **Semi Bold (600)**: Used for headings, subheadings, and important interface elements
- **Bold (700)**: Used for main headlines, call-to-action buttons, and strong emphasis

## Typography Scale

### Display Text
Large text for hero sections, main headlines, and prominent features:
- Display 2XL (72px, Bold)
- Display XL (60px, Bold) 
- Display Large (48px, Bold)
- Display Medium (36px, Bold)
- Display Small (30px, Semi Bold)

### Headings
Structured hierarchy for content organization:
- Heading XL (24px, Semi Bold)
- Heading Large (20px, Semi Bold)
- Heading Medium (18px, Semi Bold)
- Heading Small (16px, Semi Bold)

### Body Text
Main content text optimized for readability:
- Body XL (20px, Regular)
- Body Large (18px, Regular)
- Body Medium (16px, Regular) - Default
- Body Small (14px, Regular)
- Body XS (12px, Regular)

### Labels
Medium weight text for interactive elements:
- Label Large (16px, Medium)
- Label Medium (14px, Medium)
- Label Small (12px, Medium)

## Implementation

### CSS Classes

All typography styles are available as utility classes:

\`\`\`css
/* Display Text */
.text-display-2xl { font-size: 4.5rem; font-weight: 700; }
.text-display-xl { font-size: 3.75rem; font-weight: 700; }
.text-display-lg { font-size: 3rem; font-weight: 700; }
.text-display-md { font-size: 2.25rem; font-weight: 700; }
.text-display-sm { font-size: 1.875rem; font-weight: 600; }

/* Headings */
.text-heading-xl { font-size: 1.5rem; font-weight: 600; }
.text-heading-lg { font-size: 1.25rem; font-weight: 600; }
.text-heading-md { font-size: 1.125rem; font-weight: 600; }
.text-heading-sm { font-size: 1rem; font-weight: 600; }

/* Body Text */
.text-body-xl { font-size: 1.25rem; font-weight: 400; }
.text-body-lg { font-size: 1.125rem; font-weight: 400; }
.text-body-md { font-size: 1rem; font-weight: 400; }
.text-body-sm { font-size: 0.875rem; font-weight: 400; }
.text-body-xs { font-size: 0.75rem; font-weight: 400; }

/* Labels */
.text-label-lg { font-size: 1rem; font-weight: 500; }
.text-label-md { font-size: 0.875rem; font-weight: 500; }
.text-label-sm { font-size: 0.75rem; font-weight: 500; }

/* Font Weights */
.font-regular { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
\`\`\`

### React Implementation

\`\`\`tsx
// Typography examples
<h1 className="text-display-lg">Main Headline</h1>
<h2 className="text-heading-xl">Section Heading</h2>
<p className="text-body-md">Regular paragraph text content.</p>
<label className="text-label-md">Form Label</label>
\`\`\`

## Accessibility

- All text maintains WCAG 2.1 AA contrast ratios
- Proper hierarchy using semantic HTML elements
- Scalable units support zoom up to 200%
- Optimized line heights for readability
- Appropriate letter spacing for different text sizes
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const CompleteTypographySystem: Story = {
  name: 'Complete Typography System',
  parameters: {
    docs: {
      description: {
        story:
          'The complete typography system showing all available text styles, weights, and scales.',
      },
    },
  },
}

export const FontWeights: Story = {
  name: 'Font Weights',
  render: () => (
    <div className="p-6">
      <h2 className="mb-8 text-2xl font-semibold">Inter Font Weights</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="font-regular mb-4 text-6xl">Aa</div>
          <div className="text-lg font-medium">Regular</div>
          <div className="text-sm text-gray-500">Weight: 400</div>
          <div className="mt-2 text-xs text-gray-400">Body text, descriptions</div>
        </div>
        <div className="text-center">
          <div className="mb-4 text-6xl font-medium">Aa</div>
          <div className="text-lg font-medium">Medium</div>
          <div className="text-sm text-gray-500">Weight: 500</div>
          <div className="mt-2 text-xs text-gray-400">Labels, form elements</div>
        </div>
        <div className="text-center">
          <div className="mb-4 text-6xl font-semibold">Aa</div>
          <div className="text-lg font-medium">Semi Bold</div>
          <div className="text-sm text-gray-500">Weight: 600</div>
          <div className="mt-2 text-xs text-gray-400">Headings, subheadings</div>
        </div>
        <div className="text-center">
          <div className="mb-4 text-6xl font-bold">Aa</div>
          <div className="text-lg font-medium">Bold</div>
          <div className="text-sm text-gray-500">Weight: 700</div>
          <div className="mt-2 text-xs text-gray-400">Headlines, CTAs</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The four available font weights in the Inter typeface.',
      },
    },
  },
}

export const DisplayText: Story = {
  name: 'Display Text Scale',
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Display Text Styles</h2>
        <p className="mb-8 text-gray-600">
          Large text for hero sections, main headlines, and prominent features.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-display-2xl mb-2">Display 2XL</div>
          <div className="text-sm text-gray-500">72px, Bold (700)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-display-xl mb-2">Display XL</div>
          <div className="text-sm text-gray-500">60px, Bold (700)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-display-lg mb-2">Display Large</div>
          <div className="text-sm text-gray-500">48px, Bold (700)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-display-md mb-2">Display Medium</div>
          <div className="text-sm text-gray-500">36px, Bold (700)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-display-sm mb-2">Display Small</div>
          <div className="text-sm text-gray-500">30px, Semi Bold (600)</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Display text styles for prominent headlines and hero sections.',
      },
    },
  },
}

export const Headings: Story = {
  name: 'Heading Hierarchy',
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Heading Hierarchy</h2>
        <p className="mb-8 text-gray-600">
          Structured hierarchy for content organization and page sections.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-heading-xl mb-2">Heading XL</div>
          <div className="text-sm text-gray-500">24px, Semi Bold (600)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-heading-lg mb-2">Heading Large</div>
          <div className="text-sm text-gray-500">20px, Semi Bold (600)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-heading-md mb-2">Heading Medium</div>
          <div className="text-sm text-gray-500">18px, Semi Bold (600)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-heading-sm mb-2">Heading Small</div>
          <div className="text-sm text-gray-500">16px, Semi Bold (600)</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Heading styles for creating clear content hierarchy.',
      },
    },
  },
}

export const BodyText: Story = {
  name: 'Body Text Scale',
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Body Text Styles</h2>
        <p className="mb-8 text-gray-600">
          Main content text optimized for readability across different contexts.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-body-xl mb-2">
            Body XL text provides excellent readability for important content sections and
            introductory paragraphs where you want to make a strong impression.
          </div>
          <div className="text-sm text-gray-500">20px, Regular (400)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-body-lg mb-2">
            Body Large text is perfect for lead paragraphs, important descriptions, and content that
            should stand out while maintaining excellent readability.
          </div>
          <div className="text-sm text-gray-500">18px, Regular (400)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-body-md mb-2">
            Body Medium text is our default body text size, providing optimal readability for most
            content including articles, descriptions, and general interface text.
          </div>
          <div className="text-sm text-gray-500">16px, Regular (400) - Default</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-body-sm mb-2">
            Body Small text is used for secondary information, captions, help text, and areas where
            space is limited but readability is still important.
          </div>
          <div className="text-sm text-gray-500">14px, Regular (400)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-body-xs mb-2">
            Body XS text is used for fine print, metadata, timestamps, and other supplementary
            information that needs to be readable but unobtrusive.
          </div>
          <div className="text-sm text-gray-500">12px, Regular (400)</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Body text styles for main content and descriptions.',
      },
    },
  },
}

export const Labels: Story = {
  name: 'Label Text',
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Label Text Styles</h2>
        <p className="mb-8 text-gray-600">
          Medium weight text for form labels, buttons, and interface elements.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-label-lg mb-2">Label Large</div>
          <div className="text-sm text-gray-500">16px, Medium (500)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-label-md mb-2">Label Medium</div>
          <div className="text-sm text-gray-500">14px, Medium (500)</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-label-sm mb-2">Label Small</div>
          <div className="text-sm text-gray-500">12px, Medium (500)</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label styles for forms, buttons, and interactive elements.',
      },
    },
  },
}

export const CharacterSet: Story = {
  name: 'Character Set',
  render: () => (
    <div className="p-6">
      <h2 className="mb-8 text-2xl font-semibold">Inter Character Set</h2>
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <div className="mb-6 space-y-2 text-3xl">
          <div className="font-regular">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div className="font-regular">abcdefghijklmnopqrstuvwxyz</div>
          <div className="font-regular">0123456789 !@#$%^&*()</div>
        </div>
        <div className="text-sm text-gray-600">
          Full character support including uppercase, lowercase, numbers, and symbols
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete character set showing all available letters, numbers, and symbols.',
      },
    },
  },
}

export const ResponsiveExample: Story = {
  name: 'Responsive Typography',
  render: () => (
    <div className="p-6">
      <h2 className="mb-8 text-2xl font-semibold">Responsive Typography Example</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <div className="text-display-lg md:text-display-xl lg:text-display-2xl mb-4">
          Responsive Headline
        </div>
        <div className="text-heading-md md:text-heading-lg lg:text-heading-xl mb-4">
          Responsive Subheading
        </div>
        <div className="text-body-sm md:text-body-md lg:text-body-lg">
          This text demonstrates how typography can be responsive across different screen sizes. On
          smaller screens, it uses smaller text sizes for better mobile readability, and scales up
          on larger screens for improved visual hierarchy.
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Resize your browser to see the typography scale responsively.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of how typography can be made responsive using Tailwind CSS breakpoint prefixes.',
      },
    },
  },
}
