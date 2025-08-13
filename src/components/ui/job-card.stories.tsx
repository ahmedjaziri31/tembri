import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { JobCard, CompanyCard, TestCard } from './job-card'

const meta = {
  title: 'UI/Job Cards',
  component: JobCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive card system for job boards and recruitment platforms.

## Features
- **Job Cards**: Display job postings with company info, tags, and actions
- **Company Cards**: Showcase company profiles with ratings and hiring status
- **Test Cards**: Show scheduled tests and interviews with time management
- **Interactive Actions**: Built-in buttons for apply, save, reschedule, etc.
- **Visual Variants**: Multiple styling options and layouts
- **Responsive Design**: Works on all screen sizes

## Usage
\`\`\`tsx
import { JobCard, CompanyCard, TestCard } from "@/components/ui/job-card"

// Job posting card
<JobCard
  company={{ name: "Google", logo: "google-logo.png", verified: true }}
  position="Senior UX Designer"
  location="New York, NY"
  description="Join our design team..."
  tags={[
    { label: "Remote", variant: "success" },
    { label: "Full time", variant: "info" }
  ]}
  onApply={handleApply}
/>

// Company profile card
<CompanyCard
  company={{ 
    name: "Microsoft", 
    rating: 4.2, 
    jobCount: 15,
    hiringStatus: "hiring" 
  }}
  description="Leading technology company..."
  onViewJobs={handleViewJobs}
/>

// Test/interview card
<TestCard
  test={{
    name: "Design Challenge",
    type: "virtual",
    company: { name: "Pinterest" },
    position: "UX Designer",
    timeSlot: "02:00PM - 03:00PM"
  }}
  onStartTest={handleStartTest}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'ghost'],
      description: 'Visual variant of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the card',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
  },
} satisfies Meta<typeof JobCard>

export default meta
type Story = StoryObj<typeof meta>

// Job Cards (matching your first image)
export const JobCards: Story = {
  args: {
    company: { name: 'Example Corp', verified: true },
    position: 'Software Engineer',
    location: 'Remote',
    description: 'Example job description',
    tags: [{ label: 'React' }],
    salary: '80k-120k',
    timePosted: '2d ago',
    variant: 'default',
  },
  render: () => {
    const [savedJobs, setSavedJobs] = useState<string[]>([])

    const toggleSaved = (jobId: string) => {
      setSavedJobs(prev =>
        prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
      )
    }

    const jobsData = [
      {
        id: '1',
        company: { name: 'Google', logo: 'https://www.google.com/favicon.ico', verified: true },
        position: 'Position name',
        location: 'Location',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        tags: [
          { label: 'Remote', variant: 'success' as const },
          { label: 'Full time', variant: 'success' as const },
          { label: 'Min. 3 years of experience', variant: 'warning' as const },
        ],
        timePosted: '12 hr ago',
        salary: '10,000$ - 13,000$',
      },
      {
        id: '2',
        company: { name: 'Google', logo: 'https://www.google.com/favicon.ico', verified: true },
        position: 'Position name',
        location: 'Location',
        description:
          'Proin eget tellus dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero sit vel vitae mauris, ex aliquet odio.',
        tags: [
          { label: 'Remote', variant: 'success' as const },
          { label: 'Full time', variant: 'success' as const },
          { label: 'Min. 3 years of experience', variant: 'warning' as const },
        ],
        timePosted: '12 hr ago',
      },
      {
        id: '3',
        company: { name: 'Google', logo: 'https://www.google.com/favicon.ico', verified: true },
        position: 'Position name',
        location: 'Location',
        description:
          'Proin eget tellus dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero sit vel vitae mauris, ex aliquet odio.',
        tags: [
          { label: 'Remote', variant: 'success' as const },
          { label: 'Full time', variant: 'success' as const },
          { label: 'Min. 3 years of experience', variant: 'warning' as const },
        ],
        timePosted: '12 hr ago',
      },
    ]

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Posting Cards</h3>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobsData.map(job => (
              <JobCard
                key={job.id}
                company={job.company}
                position={job.position}
                location={job.location}
                description={job.description}
                tags={job.tags}
                timePosted={job.timePosted}
                salary={job.salary}
                saved={savedJobs.includes(job.id)}
                onSave={() => toggleSaved(job.id)}
                onLearnMore={() => console.log('Learn more:', job.position)}
                onApply={() => console.log('Apply to:', job.position)}
                variant="elevated"
                clickable
              />
            ))}
          </div>
        </div>

        {/* Vertical Layout */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vertical Layout</h3>
          <div className="max-w-md space-y-4">
            {jobsData.slice(0, 2).map(job => (
              <JobCard
                key={`vertical-${job.id}`}
                company={job.company}
                position={job.position}
                location={job.location}
                description={job.description}
                tags={job.tags}
                timePosted={job.timePosted}
                saved={savedJobs.includes(`vertical-${job.id}`)}
                onSave={() => toggleSaved(`vertical-${job.id}`)}
                onLearnMore={() => console.log('Learn more:', job.position)}
                onApply={() => console.log('Apply to:', job.position)}
                variant="outlined"
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Job posting cards exactly matching your design with Google branding, tags, and action buttons.',
      },
    },
  },
}

// Company Cards (matching your company profile images)
export const CompanyCards: Story = {
  args: {
    company: { name: 'Example Corp', verified: true },
    position: 'Software Engineer',
    location: 'Remote',
    description: 'Example job description',
    tags: [{ label: 'React' }],
    salary: '80k-120k',
    timePosted: '2d ago',
    variant: 'default',
  },
  render: () => {
    const companyData = [
      {
        id: '1',
        company: {
          name: 'Ottobock',
          logo: 'https://www.ottobock.com/favicon.ico',
          rating: 3.7,
          jobCount: 12,
          hiringStatus: 'hiring' as const,
        },
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
      },
      {
        id: '2',
        company: {
          name: 'Ottobock',
          logo: 'https://www.ottobock.com/favicon.ico',
          image:
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
          rating: 3.7,
          jobCount: 12,
          hiringStatus: 'hiring' as const,
        },
        description:
          'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nunc Vulputate Libero Et Velit Interdum.',
      },
      {
        id: '3',
        company: {
          name: 'Tech Innovations',
          rating: 4.2,
          jobCount: 8,
          hiringStatus: 'urgent' as const,
        },
        description:
          'Leading technology company focused on innovation and growth. Join our team of experts.',
      },
    ]

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Company Profile Cards</h3>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companyData.map(company => (
              <CompanyCard
                key={company.id}
                company={company.company}
                description={company.description}
                onViewProfile={() => console.log('View profile:', company.company.name)}
                onViewJobs={() => console.log('View jobs:', company.company.name)}
                variant="elevated"
                clickable
              />
            ))}
          </div>
        </div>

        {/* Mobile/Vertical Layout */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mobile Layout</h3>
          <div className="max-w-sm space-y-4">
            {companyData.slice(0, 2).map(company => (
              <CompanyCard
                key={`mobile-${company.id}`}
                company={company.company}
                description={company.description}
                onViewProfile={() => console.log('View profile:', company.company.name)}
                onViewJobs={() => console.log('View jobs:', company.company.name)}
                variant="outlined"
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Company profile cards with ratings, hiring status, and job counts matching your design.',
      },
    },
  },
}

// Test/Interview Cards (matching your test scheduling images)
export const TestCards: Story = {
  args: {
    company: { name: 'Example Corp', verified: true },
    position: 'Software Engineer',
    location: 'Remote',
    description: 'Example job description',
    tags: [{ label: 'React' }],
    salary: '80k-120k',
    timePosted: '2d ago',
    variant: 'default',
  },
  render: () => {
    const testsData = [
      {
        id: '1',
        test: {
          name: 'Design test',
          type: 'written' as const,
          company: { name: 'Pinterest', logo: 'https://www.pinterest.com/favicon.ico' },
          position: 'Junior UX designer',
          timeSlot: '02:00PM - 03:00PM',
          status: 'scheduled' as const,
        },
      },
      {
        id: '2',
        test: {
          name: 'Design test',
          type: 'ai' as const,
          company: { name: 'Pinterest', logo: 'https://www.pinterest.com/favicon.ico' },
          position: 'Junior UX designer',
          timeSlot: '02:00PM - 03:00PM',
          status: 'scheduled' as const,
        },
      },
      {
        id: '3',
        test: {
          name: 'Design test',
          type: 'virtual' as const,
          company: { name: 'Pinterest', logo: 'https://www.pinterest.com/favicon.ico' },
          position: 'Junior UX designer',
          timeSlot: '02:00PM - 03:00PM',
          status: 'scheduled' as const,
        },
      },
    ]

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test/Interview Cards</h3>

          {/* Mobile Layout (matching your design) */}
          <div className="max-w-sm space-y-4">
            {testsData.map(test => (
              <TestCard
                key={test.id}
                test={test.test}
                onStartTest={() => console.log('Start test:', test.test.name)}
                onReschedule={() => console.log('Reschedule:', test.test.name)}
                variant="outlined"
              />
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Grid Layout</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testsData.map(test => (
              <TestCard
                key={`grid-${test.id}`}
                test={test.test}
                onStartTest={() => console.log('Start test:', test.test.name)}
                onReschedule={() => console.log('Reschedule:', test.test.name)}
                variant="elevated"
                clickable
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Test and interview scheduling cards with Pinterest branding and different test types.',
      },
    },
  },
}

// All Card Variants
export const AllCardVariants: Story = {
  args: {
    company: { name: 'Example Corp', verified: true },
    position: 'Software Engineer',
    location: 'Remote',
    description: 'Example job description',
    tags: [{ label: 'React' }],
    salary: '80k-120k',
    timePosted: '2d ago',
    variant: 'default',
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Variants</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="font-medium">Default</h4>
            <JobCard
              company={{ name: 'Example Co', verified: true }}
              position="Software Engineer"
              location="Remote"
              description="Join our engineering team to build amazing products."
              tags={[{ label: 'Remote', variant: 'success' }]}
              variant="default"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Elevated</h4>
            <JobCard
              company={{ name: 'Example Co', verified: true }}
              position="Software Engineer"
              location="Remote"
              description="Join our engineering team to build amazing products."
              tags={[{ label: 'Remote', variant: 'success' }]}
              variant="elevated"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Outlined</h4>
            <JobCard
              company={{ name: 'Example Co', verified: true }}
              position="Software Engineer"
              location="Remote"
              description="Join our engineering team to build amazing products."
              tags={[{ label: 'Remote', variant: 'success' }]}
              variant="outlined"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Ghost</h4>
            <JobCard
              company={{ name: 'Example Co', verified: true }}
              position="Software Engineer"
              location="Remote"
              description="Join our engineering team to build amazing products."
              tags={[{ label: 'Remote', variant: 'success' }]}
              variant="ghost"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Sizes</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Small</h4>
            <div className="max-w-sm">
              <JobCard
                company={{ name: 'Example Co' }}
                position="Software Engineer"
                location="Remote"
                description="Join our engineering team."
                tags={[{ label: 'Remote', variant: 'success' }]}
                size="sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Default</h4>
            <div className="max-w-sm">
              <JobCard
                company={{ name: 'Example Co' }}
                position="Software Engineer"
                location="Remote"
                description="Join our engineering team to build amazing products."
                tags={[{ label: 'Remote', variant: 'success' }]}
                size="default"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Large</h4>
            <div className="max-w-sm">
              <JobCard
                company={{ name: 'Example Co' }}
                position="Software Engineer"
                location="Remote"
                description="Join our engineering team to build amazing products and work with cutting-edge technology."
                tags={[{ label: 'Remote', variant: 'success' }]}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants and sizes demonstrating the flexibility of the card system.',
      },
    },
  },
}

// Interactive Dashboard Example
export const InteractiveDashboard: Story = {
  args: {
    company: { name: 'Example Corp', verified: true },
    position: 'Software Engineer',
    location: 'Remote',
    description: 'Example job description',
    tags: [{ label: 'React' }],
    salary: '80k-120k',
    timePosted: '2d ago',
    variant: 'default',
  },
  render: () => {
    const [savedJobs, setSavedJobs] = useState<string[]>(['job-1'])
    const [appliedJobs, setAppliedJobs] = useState<string[]>([])

    const handleApply = (jobId: string, position: string) => {
      setAppliedJobs(prev => [...prev, jobId])
      console.log(`Applied to: ${position}`)
    }

    const toggleSaved = (jobId: string) => {
      setSavedJobs(prev =>
        prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
      )
    }

    return (
      <div className="max-w-6xl space-y-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Job Board Dashboard</h2>
          <p className="text-muted-foreground">
            Interactive job cards with real-world functionality
          </p>
        </div>

        {/* Job Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Jobs</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard
              company={{
                name: 'Google',
                logo: 'https://www.google.com/favicon.ico',
                verified: true,
              }}
              position="Senior Frontend Developer"
              location="Mountain View, CA"
              description="Join our team to build the next generation of web applications using React, TypeScript, and modern web technologies."
              tags={[
                { label: 'Remote', variant: 'success' },
                { label: 'Full time', variant: 'info' },
                { label: '5+ years', variant: 'warning' },
              ]}
              timePosted="2 hr ago"
              salary="$120k - $180k"
              saved={savedJobs.includes('job-1')}
              onSave={() => toggleSaved('job-1')}
              onApply={() => handleApply('job-1', 'Senior Frontend Developer')}
              variant="elevated"
              clickable
            />

            <JobCard
              company={{ name: 'Microsoft', verified: true }}
              position="UX Designer"
              location="Seattle, WA"
              description="Design intuitive user experiences for millions of users worldwide in our Office suite products."
              tags={[
                { label: 'Hybrid', variant: 'info' },
                { label: 'Full time', variant: 'info' },
                { label: '3+ years', variant: 'warning' },
              ]}
              timePosted="4 hr ago"
              salary="$90k - $140k"
              saved={savedJobs.includes('job-2')}
              onSave={() => toggleSaved('job-2')}
              onApply={() => handleApply('job-2', 'UX Designer')}
              variant="elevated"
              clickable
            />

            <JobCard
              company={{ name: 'Apple', verified: true }}
              position="iOS Developer"
              location="Cupertino, CA"
              description="Develop innovative iOS applications that delight users and push the boundaries of mobile technology."
              tags={[
                { label: 'On-site', variant: 'info' },
                { label: 'Full time', variant: 'info' },
                { label: '4+ years', variant: 'warning' },
              ]}
              timePosted="6 hr ago"
              salary="$130k - $190k"
              saved={savedJobs.includes('job-3')}
              onSave={() => toggleSaved('job-3')}
              onApply={() => handleApply('job-3', 'iOS Developer')}
              variant="elevated"
              clickable
            />
          </div>
        </div>

        {/* Company Profiles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Featured Companies</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CompanyCard
              company={{
                name: 'Stripe',
                rating: 4.6,
                jobCount: 25,
                hiringStatus: 'urgent',
                image:
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop',
              }}
              description="Financial infrastructure for the internet. Build and scale your online business with powerful APIs and developer tools."
              onViewProfile={() => console.log('View Stripe profile')}
              onViewJobs={() => console.log('View Stripe jobs')}
              variant="elevated"
              clickable
            />

            <CompanyCard
              company={{
                name: 'Netflix',
                rating: 4.3,
                jobCount: 18,
                hiringStatus: 'hiring',
                image:
                  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=200&fit=crop',
              }}
              description="Entertainment company that revolutionized how the world consumes content. Join us in creating amazing streaming experiences."
              onViewProfile={() => console.log('View Netflix profile')}
              onViewJobs={() => console.log('View Netflix jobs')}
              variant="elevated"
              clickable
            />
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Tests</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestCard
              test={{
                name: 'React Assessment',
                type: 'written',
                company: { name: 'Facebook', logo: 'https://www.facebook.com/favicon.ico' },
                position: 'Frontend Developer',
                timeSlot: 'Today, 02:00PM - 03:30PM',
                status: 'scheduled',
              }}
              onStartTest={() => console.log('Starting React Assessment')}
              onReschedule={() => console.log('Rescheduling React Assessment')}
              variant="outlined"
            />

            <TestCard
              test={{
                name: 'Design Challenge',
                type: 'virtual',
                company: { name: 'Airbnb' },
                position: 'Product Designer',
                timeSlot: 'Tomorrow, 10:00AM - 11:30AM',
                status: 'scheduled',
              }}
              onStartTest={() => console.log('Starting Design Challenge')}
              onReschedule={() => console.log('Rescheduling Design Challenge')}
              variant="outlined"
            />
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="bg-muted/30 rounded-lg p-6">
          <h4 className="mb-4 font-semibold">Your Activity</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{savedJobs.length}</div>
              <div className="text-muted-foreground text-sm">Saved Jobs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{appliedJobs.length}</div>
              <div className="text-muted-foreground text-sm">Applications</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-muted-foreground text-sm">Interviews</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete interactive job board dashboard showcasing all card types working together.',
      },
    },
  },
}
