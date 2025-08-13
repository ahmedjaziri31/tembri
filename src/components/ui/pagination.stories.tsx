import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  usePagination,
} from './pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive pagination component for navigating through multiple pages of content.

## Features
- **Navigation controls**: Previous, Next, First, Last page buttons
- **Page numbers**: Clickable page number buttons with ellipsis
- **Multiple variants**: Default, ghost, and outline styles
- **Different shapes**: Default, rounded, and square buttons
- **Multiple sizes**: Small, default, and large
- **Active states**: Clear visual feedback for current page
- **Disabled states**: Proper handling of edge cases
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage
\`\`\`tsx
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  usePagination 
} from "@/components/ui/pagination"

const [currentPage, setCurrentPage] = useState(1)
const totalPages = 10
const pages = usePagination({ totalPages, currentPage })

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious 
        isDisabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      />
    </PaginationItem>
    
    {pages.map((page, index) => (
      <PaginationItem key={index}>
        {page === "..." ? (
          <PaginationEllipsis />
        ) : (
          <PaginationButton
            isActive={page === currentPage}
            onClick={() => setCurrentPage(page as number)}
          >
            {page}
          </PaginationButton>
        )}
      </PaginationItem>
    ))}
    
    <PaginationItem>
      <PaginationNext 
        isDisabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the pagination component',
    },
  },
  args: {
    size: 'default',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Classic Pagination (matching top of your image)
export const ClassicPagination: Story = {
  name: 'Classic Pagination',
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pages = usePagination({ totalPages, currentPage, siblingCount: 1 })

    return (
      <div className="space-y-8">
        {/* Main pagination example from your image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Standard Pagination</h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  href="#"
                  isDisabled={currentPage === 1}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(1)
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  isDisabled={currentPage === 1}
                  showText={false}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(Math.max(1, currentPage - 1))
                  }}
                />
              </PaginationItem>

              {pages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={e => {
                        e.preventDefault()
                        setCurrentPage(page as number)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  isDisabled={currentPage === totalPages}
                  showText={false}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLast
                  href="#"
                  isDisabled={currentPage === totalPages}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(totalPages)
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-muted-foreground text-center text-sm">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Classic pagination with first/last buttons, page numbers, and ellipsis - matches the top section of your image.',
      },
    },
  },
}

// Button Shapes (matching middle of your image)
export const ButtonShapes: Story = {
  name: 'Button Shapes',
  render: () => {
    const [squarePage, setSquarePage] = useState(0)
    const [roundedPage, setRoundedPage] = useState(0)

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Square Buttons</h3>
          <Pagination>
            <PaginationContent>
              {[0, 0, 0].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationButton
                    shape="square"
                    size="icon"
                    isActive={squarePage === index}
                    onClick={() => setSquarePage(index)}
                  >
                    0
                  </PaginationButton>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rounded Buttons</h3>
          <Pagination>
            <PaginationContent>
              {[0, 0, 0].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationButton
                    shape="rounded"
                    size="icon"
                    isActive={roundedPage === index}
                    onClick={() => setRoundedPage(index)}
                  >
                    0
                  </PaginationButton>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Default Shape</h3>
          <Pagination>
            <PaginationContent>
              {[1, 2, 3].map((number, index) => (
                <PaginationItem key={index}>
                  <PaginationButton shape="default" size="icon" isActive={index === 0}>
                    {number}
                  </PaginationButton>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different button shapes: square, rounded, and default - matches the middle section of your image.',
      },
    },
  },
}

// Navigation States (matching bottom of your image)
export const NavigationStates: Story = {
  name: 'Navigation States',
  render: () => {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Navigation Button States</h3>

          {/* Row 1: Different chevron states */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Icon-only Navigation</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default">
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default">
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default" isDisabled>
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Row 2: More chevron states */}
          <div className="space-y-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default">
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default">
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton size="icon" shape="default" isDisabled>
                    <ChevronLeft className="h-4 w-4" />
                  </PaginationButton>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          {/* Row 3: Text with chevrons */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Text + Icon Navigation</p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </PaginationButton>
                </PaginationItem>
                <PaginationItem>
                  <PaginationButton className="gap-2" isDisabled>
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </PaginationButton>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different navigation button states including active, normal, and disabled - matches the bottom section of your image.',
      },
    },
  },
}

// Complete Interactive Example
export const InteractivePagination: Story = {
  name: 'Interactive Pagination',
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 20
    const pages = usePagination({ totalPages, currentPage, siblingCount: 2 })

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold">Interactive Pagination</h3>
          <p className="text-muted-foreground text-sm">
            Navigate through 20 pages with full pagination controls
          </p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                href="#"
                isDisabled={currentPage === 1}
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(1)
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                href="#"
                isDisabled={currentPage === 1}
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(Math.max(1, currentPage - 1))
                }}
              />
            </PaginationItem>

            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={e => {
                      e.preventDefault()
                      setCurrentPage(page as number)
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                isDisabled={currentPage === totalPages}
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLast
                href="#"
                isDisabled={currentPage === totalPages}
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(totalPages)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="text-muted-foreground text-center text-sm">
          <p>
            Showing page {currentPage} of {totalPages}
          </p>
          <p className="mt-1">Click any page number or navigation button to see it in action</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive pagination example with all controls working.',
      },
    },
  },
}

// Different Sizes
export const PaginationSizes: StoryObj = {
  name: 'Pagination Sizes',
  render: () => {
    const [smallPage, setSmallPage] = useState(1)
    const [defaultPage, setDefaultPage] = useState(1)
    const [largePage, setLargePage] = useState(1)

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Small Size</h3>
          <Pagination size="sm">
            <PaginationContent size="sm">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  size="sm"
                  isDisabled={smallPage === 1}
                  onClick={e => {
                    e.preventDefault()
                    setSmallPage(Math.max(1, smallPage - 1))
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    size="sm"
                    isActive={page === smallPage}
                    onClick={e => {
                      e.preventDefault()
                      setSmallPage(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  size="sm"
                  isDisabled={smallPage === 3}
                  onClick={e => {
                    e.preventDefault()
                    setSmallPage(Math.min(3, smallPage + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Default Size</h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  isDisabled={defaultPage === 1}
                  onClick={e => {
                    e.preventDefault()
                    setDefaultPage(Math.max(1, defaultPage - 1))
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === defaultPage}
                    onClick={e => {
                      e.preventDefault()
                      setDefaultPage(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  isDisabled={defaultPage === 3}
                  onClick={e => {
                    e.preventDefault()
                    setDefaultPage(Math.min(3, defaultPage + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Large Size</h3>
          <Pagination size="lg">
            <PaginationContent size="lg">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  size="lg"
                  isDisabled={largePage === 1}
                  onClick={e => {
                    e.preventDefault()
                    setLargePage(Math.max(1, largePage - 1))
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    size="lg"
                    isActive={page === largePage}
                    onClick={e => {
                      e.preventDefault()
                      setLargePage(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  size="lg"
                  isDisabled={largePage === 3}
                  onClick={e => {
                    e.preventDefault()
                    setLargePage(Math.min(3, largePage + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination components in different sizes: small, default, and large.',
      },
    },
  },
}

// Dark Mode Example
export const DarkModeExample: Story = {
  name: 'Dark Mode Example',
  render: () => {
    const [lightPage, setLightPage] = useState(2)
    const [darkPage, setDarkPage] = useState(2)

    return (
      <div className="space-y-8">
        {/* Light Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Light Mode</h3>
          <div className="rounded-lg border bg-white p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst
                    href="#"
                    isDisabled={lightPage === 1}
                    onClick={e => {
                      e.preventDefault()
                      setLightPage(1)
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    showText={false}
                    isDisabled={lightPage === 1}
                    onClick={e => {
                      e.preventDefault()
                      setLightPage(Math.max(1, lightPage - 1))
                    }}
                  />
                </PaginationItem>
                {[1, 2, 3, 4, 5].map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === lightPage}
                      onClick={e => {
                        e.preventDefault()
                        setLightPage(page)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    showText={false}
                    isDisabled={lightPage === 5}
                    onClick={e => {
                      e.preventDefault()
                      setLightPage(Math.min(5, lightPage + 1))
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    href="#"
                    isDisabled={lightPage === 5}
                    onClick={e => {
                      e.preventDefault()
                      setLightPage(5)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dark Mode</h3>
          <div className="dark rounded-lg border border-gray-800 bg-[#0D0C13] p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationFirst
                    href="#"
                    isDisabled={darkPage === 1}
                    onClick={e => {
                      e.preventDefault()
                      setDarkPage(1)
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    showText={false}
                    isDisabled={darkPage === 1}
                    onClick={e => {
                      e.preventDefault()
                      setDarkPage(Math.max(1, darkPage - 1))
                    }}
                  />
                </PaginationItem>
                {[1, 2, 3, 4, 5].map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === darkPage}
                      onClick={e => {
                        e.preventDefault()
                        setDarkPage(page)
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    showText={false}
                    isDisabled={darkPage === 5}
                    onClick={e => {
                      e.preventDefault()
                      setDarkPage(Math.min(5, darkPage + 1))
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    href="#"
                    isDisabled={darkPage === 5}
                    onClick={e => {
                      e.preventDefault()
                      setDarkPage(5)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination component shown in both light and dark modes for comparison.',
      },
    },
  },
}

// Custom Dark Mode Design (matching your image)
export const CustomDarkModeDesign: Story = {
  name: 'Custom Dark Mode Design',
  render: () => {
    const [currentPage, setCurrentPage] = useState(5)
    // const totalPages = 10 // Commented out since not used in this story

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Dark Mode</h2>
          <p className="text-muted-foreground">Custom dark pagination design matching your image</p>
        </div>

        {/* Custom Dark Mode Pagination matching your image */}
        <div className="w-full rounded-2xl bg-gradient-to-r from-gray-900 to-black p-8">
          <Pagination>
            <PaginationContent className="gap-2">
              {Array.from({ length: 8 }, (_, index) => {
                const pageNumber = index + 1
                const isActive = pageNumber === currentPage

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationButton
                      shape="default"
                      size="icon"
                      isActive={isActive}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={cn(
                        'h-12 w-12 rounded-lg transition-all duration-200',
                        isActive
                          ? 'scale-105 bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                      )}
                    >
                      {pageNumber <= 6 ? pageNumber : pageNumber === 7 ? '...' : '10'}
                    </PaginationButton>
                  </PaginationItem>
                )
              })}
            </PaginationContent>
          </Pagination>
        </div>

        {/* Alternative Dark Style */}
        <div className="w-full rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <Pagination>
            <PaginationContent className="gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
                <PaginationItem key={page}>
                  <PaginationButton
                    shape="default"
                    size="icon"
                    isActive={page === 5}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'h-10 w-10 rounded-md font-medium transition-all duration-200',
                      page === 5
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700'
                        : 'border-gray-700/50 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    {page}
                  </PaginationButton>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>

        {/* Compact Dark Style */}
        <div className="w-full rounded-xl bg-black p-6">
          <Pagination>
            <PaginationContent className="gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map(page => (
                <PaginationItem key={page}>
                  <PaginationButton
                    shape="default"
                    size="icon-sm"
                    isActive={page === 5}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'h-8 w-8 rounded text-xs font-semibold transition-all duration-200',
                      page === 5
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'border border-gray-800 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    )}
                  >
                    {page}
                  </PaginationButton>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          <p>Current page: {currentPage}</p>
          <p className="mt-1">Click any page number to see the active state</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom dark mode pagination designs with different styling approaches matching your image.',
      },
    },
  },
}
