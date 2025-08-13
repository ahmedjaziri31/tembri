import type { Meta, StoryObj } from '@storybook/nextjs'
import { Search, MapPin } from 'lucide-react'
import { SearchBar, SimpleSearch } from './search-bar'

const meta = {
  title: 'UI/Search Bar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile search bar component perfect for job search, location search, and general search functionality.

## Features
- **Multiple variants**: Simple, dual input, and compact layouts
- **Flexible sizing**: From small to extra-large widths
- **Dual input support**: Job title + location search
- **Keyboard support**: Enter key to search
- **Icons**: Search and location icons
- **Customizable**: Flexible placeholder texts and button labels

## Usage
\`\`\`tsx
import { SearchBar, SimpleSearch } from "@/components/ui/search-bar"

// Simple search
<SearchBar 
  placeholder="Search jobs..."
  onSearch={(query) => console.log(query)}
/>

// Job + Location search
<SearchBar 
  variant="dual"
  showLocationInput
  placeholder="Job title or key word"
  locationPlaceholder="Add country or city"
  onSearch={(query, location) => console.log(query, location)}
/>

// Simple input
<SimpleSearch placeholder="Search" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'dual', 'compact'],
      description: 'Visual variant of the search bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg', 'xl'],
      description: 'Size of the search bar',
    },
    showLocationInput: {
      control: 'boolean',
      description: 'Whether to show location input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for main search input',
    },
    locationPlaceholder: {
      control: 'text',
      description: 'Placeholder text for location input',
    },
    searchButtonText: {
      control: 'text',
      description: 'Text for the search button',
    },
  },
  args: {
    onSearch: (query: string, location?: string) => console.log('Search:', query, location),
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

// Simple Search Examples (matching first group in image)
export const SimpleSearchInputs: Story = {
  name: 'Simple Search Inputs',
  render: () => (
    <div className="max-w-xs space-y-4">
      <SimpleSearch placeholder="Search" />
      <SimpleSearch placeholder="Search" />
      <SimpleSearch placeholder="1" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple search inputs with icons - matches the first group in your image.',
      },
    },
  },
}

// Job Search Bars (matching main group in image)
export const JobSearchBars: Story = {
  name: 'Job Search Bars',
  render: () => (
    <div className="space-y-6">
      {/* Large job search bar */}
      <SearchBar
        variant="dual"
        size="xl"
        showLocationInput
        placeholder="Job title or key word ..."
        locationPlaceholder="Add country or city"
        onSearch={(query, location) => console.log('Search:', query, location)}
      />

      {/* Medium job search bar */}
      <SearchBar
        variant="dual"
        size="lg"
        showLocationInput
        placeholder="Job title or key word ..."
        locationPlaceholder="Add country or city"
        onSearch={(query, location) => console.log('Search:', query, location)}
      />

      {/* Compact job search bar */}
      <SearchBar
        variant="compact"
        size="md"
        showLocationInput
        placeholder="l"
        locationPlaceholder="l"
        onSearch={(query, location) => console.log('Search:', query, location)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Job search bars with dual inputs - matches the main group in your image.',
      },
    },
  },
}

// Bottom Search Bars (matching last group in image)
export const WideSearchBars: Story = {
  name: 'Wide Search Bars',
  render: () => (
    <div className="space-y-4">
      <SearchBar
        variant="simple"
        size="lg"
        placeholder="Search by Job title or key word"
        onSearch={query => console.log('Search:', query)}
      />

      <SearchBar
        variant="simple"
        size="lg"
        placeholder="Search by Job title or key word"
        onSearch={query => console.log('Search:', query)}
      />

      <SearchBar
        variant="simple"
        size="md"
        placeholder="l"
        onSearch={query => console.log('Search:', query)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wide search bars with single input - matches the bottom group in your image.',
      },
    },
  },
}

// All Search Bar Variants
export const AllVariants: Story = {
  name: 'All Search Bar Variants',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Simple Search Bars</h3>
        <div className="space-y-3">
          <SearchBar variant="simple" size="sm" placeholder="Small search" />
          <SearchBar variant="simple" size="md" placeholder="Medium search" />
          <SearchBar variant="simple" size="lg" placeholder="Large search" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Job + Location Search</h3>
        <div className="space-y-3">
          <SearchBar
            variant="dual"
            size="md"
            showLocationInput
            placeholder="Job title or key word"
            locationPlaceholder="Add country or city"
          />
          <SearchBar
            variant="dual"
            size="lg"
            showLocationInput
            placeholder="Software Engineer"
            locationPlaceholder="New York, NY"
          />
          <SearchBar
            variant="dual"
            size="xl"
            showLocationInput
            placeholder="Enter job title, skills, or company"
            locationPlaceholder="Enter city, state, or country"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Compact Variants</h3>
        <div className="space-y-3">
          <SearchBar variant="compact" size="sm" placeholder="Quick search" />
          <SearchBar
            variant="compact"
            size="md"
            showLocationInput
            placeholder="Job"
            locationPlaceholder="Location"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all search bar variants and sizes.',
      },
    },
  },
}

// Interactive Examples
export const InteractiveJobSearch: Story = {
  name: 'Interactive Job Search',
  render: () => {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Find Your Dream Job</h2>
          <p className="text-gray-600">Search thousands of jobs from top companies</p>
        </div>

        <SearchBar
          variant="dual"
          size="xl"
          showLocationInput
          placeholder="Job title, keywords, or company"
          locationPlaceholder="City, state, or remote"
          searchButtonText="Find Jobs"
          onSearch={(query, location) => {
            alert(`Searching for: "${query}" in "${location}"`)
          }}
          className="border-gray-200 shadow-lg"
        />

        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-500">Popular searches:</span>
          {['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer'].map(term => (
            <button
              key={term}
              className="text-sm text-blue-600 underline hover:text-blue-800"
              onClick={() => console.log(`Quick search: ${term}`)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive job search example with popular search suggestions.',
      },
    },
  },
}

// Search Input Variations
export const SearchInputVariations: Story = {
  name: 'Search Input Variations',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Simple Search Inputs</h3>
        <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <SimpleSearch placeholder="Search jobs..." />
          <SimpleSearch placeholder="Search candidates..." />
          <SimpleSearch placeholder="Search companies..." />
          <SimpleSearch placeholder="Search locations..." />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Custom Icons</h3>
        <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <SimpleSearch
            placeholder="Search by location..."
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
          />
          <SimpleSearch
            placeholder="Quick search..."
            icon={<Search className="text-primary h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various search input configurations with different placeholders and icons.',
      },
    },
  },
}

// Recruitment Platform Example
export const RecruitmentPlatform: Story = {
  name: 'Recruitment Platform',
  render: () => (
    <div className="max-w-6xl space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
        <div className="mx-auto mb-6 max-w-4xl text-center">
          <h1 className="mb-2 text-3xl font-bold">Find Your Next Opportunity</h1>
          <p className="text-blue-100">Discover amazing jobs from companies that are hiring now</p>
        </div>

        <SearchBar
          variant="dual"
          size="xl"
          showLocationInput
          placeholder="Job title or key word ..."
          locationPlaceholder="Add country or city"
          searchButtonText="Search Jobs"
          onSearch={(query, location) => {
            console.log('Job search:', { query, location })
          }}
          className="shadow-xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="mb-3 font-semibold">Quick Job Search</h3>
          <SearchBar
            variant="simple"
            size="md"
            placeholder="Enter job title..."
            searchButtonText="Search"
          />
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="mb-3 font-semibold">Location Search</h3>
          <SimpleSearch
            placeholder="Search by location..."
            icon={<MapPin className="text-muted-foreground h-4 w-4" />}
          />
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="mb-3 font-semibold">Company Search</h3>
          <SimpleSearch placeholder="Search companies..." />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete recruitment platform search interface example.',
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
        <div className="space-y-4 rounded-lg border bg-white p-6">
          <SearchBar
            variant="simple"
            size="lg"
            placeholder="Search jobs in light mode..."
            onSearch={query => console.log('Light mode search:', query)}
          />

          <SearchBar
            variant="dual"
            size="lg"
            showLocationInput
            placeholder="Job title or key word"
            locationPlaceholder="Add country or city"
            onSearch={(query, location) => console.log('Light mode dual search:', query, location)}
          />

          <SimpleSearch placeholder="Simple search in light mode..." />
        </div>
      </div>

      {/* Dark Mode Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Mode</h3>
        <div className="dark space-y-4 rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
          <SearchBar
            variant="simple"
            size="lg"
            placeholder="Search jobs in dark mode..."
            onSearch={query => console.log('Dark mode search:', query)}
          />

          <SearchBar
            variant="dual"
            size="lg"
            showLocationInput
            placeholder="Job title or key word"
            locationPlaceholder="Add country or city"
            onSearch={(query, location) => console.log('Dark mode dual search:', query, location)}
          />

          <SimpleSearch placeholder="Simple search in dark mode..." />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search bar components displayed in both light and dark modes for comparison.',
      },
    },
  },
}

// Focus States and Interactions
export const FocusStatesAndInteractions: Story = {
  name: 'Focus States & Interactions',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="mb-4 text-lg font-semibold">Focus and Hover States</h3>

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-2 text-sm">
              Try focusing on inputs and hovering over buttons:
            </p>
            <SearchBar
              variant="dual"
              size="lg"
              showLocationInput
              placeholder="Click here to focus..."
              locationPlaceholder="Or focus here..."
              searchButtonText="Hover me!"
              onSearch={(query, location) => {
                alert(`Searching for: "${query}" in "${location}"`)
              }}
            />
          </div>

          <div>
            <p className="text-muted-foreground mb-2 text-sm">Simple search with focus ring:</p>
            <SimpleSearch
              placeholder="Focus to see the focus ring..."
              onSearch={query => alert(`Simple search: "${query}"`)}
            />
          </div>
        </div>
      </div>

      {/* Dark mode focus states */}
      <div className="dark space-y-4 rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Dark Mode Focus States</h3>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-gray-400">Focus states in dark mode:</p>
            <SearchBar
              variant="dual"
              size="lg"
              showLocationInput
              placeholder="Dark mode focus..."
              locationPlaceholder="Focus rings work here too..."
              searchButtonText="Dark Button"
              onSearch={(query, location) => {
                alert(`Dark mode search: "${query}" in "${location}"`)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive examples showing focus states, hover effects, and user interactions in both light and dark modes.',
      },
    },
  },
}
