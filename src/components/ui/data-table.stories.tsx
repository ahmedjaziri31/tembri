import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { Check, X, AlertTriangle, Clock } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableActionCell,
  DataTable,
  type DataTableColumn,
} from './data-table'
import { Badge, StatusBadge } from './badge'
import { cn } from '@/lib/utils'

const meta = {
  title: 'UI/Data Table',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive data table component for displaying structured data with sorting, selection, and actions.

## Features
- **Flexible columns**: Custom rendering with type-safe column definitions
- **Sorting**: Built-in sorting functionality for columns
- **Selection**: Row selection with checkboxes
- **Status indicators**: Perfect for displaying test results and application statuses
- **Action menus**: Built-in support for row actions
- **Responsive**: Handles overflow with horizontal scrolling
- **Customizable**: Multiple variants, sizes, and styling options

## Usage
\`\`\`tsx
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

interface TestResult {
  id: string
  testName: string
  candidate: string
  score: number
  status: 'success' | 'fail' | 'under-review'
  date: string
}

const columns: DataTableColumn<TestResult>[] = [
  {
    key: 'testName',
    title: 'Test Name',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    render: (value) => <Badge variant={value}>{value}</Badge>
  }
]

<DataTable 
  data={testResults}
  columns={columns}
  sortable
  selectable
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Visual variant of the table',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Size of the table',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable sorting functionality',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// Test Results Table (matching your image)
export const TestResultsTable: Story = {
  args: {
    data: [],
    columns: [],
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
  render: () => {
    const testResults = [
      {
        id: 1,
        icon: 'success',
        testName: 'Graphic design test',
        testType: 'Virtual interview',
        role: 'Junior UX/UI Designer',
        company: 'Meta',
        date: '14/08/2025',
        time: '2:30PM- 4:00PM',
        score: '82%',
        status: 'success',
      },
      {
        id: 2,
        icon: 'fail',
        testName: 'Graphic design test',
        testType: 'AI test',
        role: 'Junior UX/UI Designer',
        company: 'Meta',
        date: '14/08/2025',
        time: '2:30PM- 4:00PM',
        score: '82%',
        status: 'fail',
      },
      {
        id: 3,
        icon: 'warning',
        testName: 'Graphic design test',
        testType: 'AI test',
        role: 'Junior UX/UI Designer',
        company: 'Meta',
        date: '14/08/2025',
        time: '2:30PM- 4:00PM',
        score: '',
        status: 'under-review',
      },
    ]

    const columns: DataTableColumn<(typeof testResults)[0]>[] = [
      {
        key: 'icon',
        title: '',
        width: '40px',
        render: value => (
          <div className="flex justify-center">
            {value === 'success' && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
            )}
            {value === 'fail' && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
              </div>
            )}
            {value === 'warning' && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <AlertTriangle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'testName',
        title: 'Test Name',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium">{String(value)}</div>
            <Badge variant="info" size="sm" className="text-xs">
              {String((row as Record<string, unknown>).testType)}
            </Badge>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role',
        sortable: true,
        render: value => <div className="text-muted-foreground text-sm">{String(value)}</div>,
      },
      {
        key: 'company',
        title: 'Company',
        sortable: true,
        render: value => <div className="text-sm">{String(value)}</div>,
      },
      {
        key: 'date',
        title: 'Date & Time',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="text-sm">{String(value)}</div>
            <div className="text-muted-foreground text-xs">
              {String((row as Record<string, unknown>).time)}
            </div>
          </div>
        ),
      },
      {
        key: 'score',
        title: 'Score',
        align: 'center',
        render: value => <div className="text-sm font-medium">{String(value) || '-'}</div>,
      },
      {
        key: 'status',
        title: 'Status',
        render: value => (
          <StatusBadge
            variant={value === 'pending' ? 'warning' : (value as 'success' | 'fail')}
            icon={
              value === 'success' ? (
                <Check className="h-3 w-3" />
              ) : value === 'fail' ? (
                <X className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )
            }
          >
            {value === 'success' ? 'Success' : value === 'fail' ? 'Fail' : 'Under Review'}
          </StatusBadge>
        ),
      },
    ]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Test Results Dashboard</h3>
          <p className="text-muted-foreground text-sm">
            Comprehensive view of candidate test results with status indicators
          </p>
        </div>

        <DataTable
          data={testResults}
          columns={columns}
          variant="default"
          sortable
          className="rounded-lg border"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Test results table exactly matching your recruitment platform design with status indicators and badges.',
      },
    },
  },
}

// Application Status Table
export const ApplicationStatusTable: Story = {
  args: {
    data: [],
    columns: [],
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
  render: () => {
    const applications = [
      {
        id: 1,
        testName: 'Design test',
        role: 'UX/UI Designer',
        company: 'Meta',
        location: 'Newyork',
        date: '14/08/2025',
        time: '02:30PM - 04:00PM',
        interviewType: 'Virtual interview',
        status: 'applied',
      },
      {
        id: 2,
        testName: 'Design test',
        role: 'UX/UI Designer',
        company: 'Meta',
        location: 'Newyork',
        date: '14/08/2025',
        time: '02:30PM - 04:00PM',
        interviewType: 'Virtual interview',
        status: 'interview-phase',
      },
      {
        id: 3,
        testName: 'Frontend Challenge',
        role: 'Frontend Developer',
        company: 'Google',
        location: 'Remote',
        date: '15/08/2025',
        time: '10:00AM - 12:00PM',
        interviewType: 'Technical interview',
        status: 'offer',
      },
      {
        id: 4,
        testName: 'Product Design',
        role: 'Product Designer',
        company: 'Apple',
        location: 'San Francisco',
        date: '16/08/2025',
        time: '03:00PM - 05:00PM',
        interviewType: 'Design review',
        status: 'rejected',
      },
    ]

    const columns: DataTableColumn<(typeof applications)[0]>[] = [
      {
        key: 'testName',
        title: 'Position',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium">{String(value)}</div>
            <div className="text-muted-foreground text-sm">
              {String((row as Record<string, unknown>).role)}
            </div>
          </div>
        ),
      },
      {
        key: 'company',
        title: 'Company',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium">{String(value)}</div>
            <div className="text-muted-foreground text-sm">
              {String((row as Record<string, unknown>).location)}
            </div>
          </div>
        ),
      },
      {
        key: 'date',
        title: 'Interview Date',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="text-sm">{String(value)}</div>
            <div className="text-muted-foreground text-xs">
              {String((row as Record<string, unknown>).time)}
            </div>
          </div>
        ),
      },
      {
        key: 'interviewType',
        title: 'Type',
        render: value => (
          <Badge variant="info" size="sm">
            {String(value)}
          </Badge>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        render: value => {
          const statusMap = {
            applied: 'Applied',
            'under-review': 'Under Review',
            'test-phase': 'Test phase',
            'interview-phase': 'Interview phase',
            offer: 'Offer',
            rejected: 'Rejected',
            withdrawn: 'Withdrawn',
          }

          return (
            <Badge
              variant={
                String(value) as
                  | 'default'
                  | 'success'
                  | 'fail'
                  | 'warning'
                  | 'under-review'
                  | 'applied'
                  | 'interview-phase'
                  | 'offer'
                  | 'rejected'
                  | 'test-phase'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
                  | 'info'
                  | 'withdrawn'
              }
            >
              {statusMap[String(value) as keyof typeof statusMap]}
            </Badge>
          )
        },
      },
    ]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Application Status Tracking</h3>
          <p className="text-muted-foreground text-sm">
            Track your job applications through different stages of the hiring process
          </p>
        </div>

        <DataTable
          data={applications}
          columns={columns}
          variant="striped"
          sortable
          selectable
          className="rounded-lg border"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Application status tracking table with different hiring stages and statuses.',
      },
    },
  },
}

// Candidate Management Table (matching your exact design)
export const CandidateManagementTable: Story = {
  args: {
    data: [],
    columns: [],
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
  render: () => {
    const [selectedRows, setSelectedRows] = useState([])

    const candidates = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        position: 'Senior UX Designer',
        experience: '5 years',
        skills: ['Figma', 'Sketch'],
        status: 'interview-phase',
        score: 92,
        scoreLabel: 'Excellent',
        appliedDate: '10/01/2025',
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        position: 'Frontend Developer',
        experience: '3 years',
        skills: ['React', 'TypeScript'],
        status: 'test-phase',
        score: 88,
        scoreLabel: 'Good',
        appliedDate: '12/01/2025',
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        position: 'Product Manager',
        experience: '7 years',
        skills: ['Strategy', 'Analytics'],
        status: 'offer',
        score: 95,
        scoreLabel: 'Excellent',
        appliedDate: '08/01/2025',
      },
      {
        id: 4,
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        position: 'UI Developer',
        experience: '2 years',
        skills: ['HTML', 'CSS'],
        status: 'rejected',
        score: 65,
        scoreLabel: 'Below Average',
        appliedDate: '15/01/2025',
      },
    ]

    const columns: DataTableColumn<(typeof candidates)[0]>[] = [
      {
        key: 'name',
        title: 'Candidate',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">{String(value)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {String((row as Record<string, unknown>).email)}
            </div>
          </div>
        ),
      },
      {
        key: 'position',
        title: 'Position',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium text-gray-900 dark:text-gray-100">{String(value)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {String((row as Record<string, unknown>).experience)} experience
            </div>
          </div>
        ),
      },
      {
        key: 'skills',
        title: 'Skills',
        render: value => (
          <div className="flex flex-wrap gap-1">
            {(value as unknown[]).slice(0, 2).map((skill: unknown, index: number) => (
              <Badge key={index} variant="secondary" size="sm" className="text-xs">
                {String(skill)}
              </Badge>
            ))}
            {(value as unknown[]).length > 2 && (
              <Badge variant="outline" size="sm" className="text-xs">
                +{(value as unknown[]).length - 2}
              </Badge>
            )}
          </div>
        ),
      },
      {
        key: 'score',
        title: 'Score',
        sortable: true,
        align: 'center',
        render: (value, row) => (
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-gray-100">{String(value)}%</div>
            <div
              className={cn(
                'text-xs font-medium',
                Number(value) >= 90
                  ? 'text-green-600 dark:text-green-400'
                  : Number(value) >= 80
                    ? 'text-blue-600 dark:text-blue-400'
                    : Number(value) >= 70
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
              )}
            >
              {String((row as Record<string, unknown>).scoreLabel)}
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        render: value => {
          const statusMap = {
            applied: 'Applied',
            'under-review': 'Under Review',
            'test-phase': 'Test phase',
            'interview-phase': 'Interview phase',
            offer: 'Offer',
            rejected: 'Rejected',
          }

          return (
            <Badge
              variant={
                String(value) as
                  | 'default'
                  | 'success'
                  | 'fail'
                  | 'warning'
                  | 'under-review'
                  | 'applied'
                  | 'interview-phase'
                  | 'offer'
                  | 'rejected'
                  | 'test-phase'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
                  | 'info'
                  | 'withdrawn'
              }
              className="font-medium"
            >
              {statusMap[String(value) as keyof typeof statusMap]}
            </Badge>
          )
        },
      },
      {
        key: 'appliedDate',
        title: 'Applied',
        sortable: true,
        render: value => (
          <div className="text-sm text-gray-700 dark:text-gray-300">{String(value)}</div>
        ),
      },
    ]

    return (
      <div className="max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Candidate Management
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage candidates through the hiring process with sorting and selection
            </p>
          </div>

          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {selectedRows.length} selected
              </span>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Bulk Action
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <DataTable
            data={candidates}
            columns={columns}
            variant="default"
            sortable
            selectable
            onSelectionChange={setSelectedRows as (rows: Record<string, unknown>[]) => void}
          />
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>✨ Select candidates to see the blue highlight and bulk action button</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Candidate management table with proper selection highlighting matching your exact design.',
      },
    },
  },
}

// Interactive Data Table with Actions
export const InteractiveDataTable: Story = {
  args: {
    data: [],
    columns: [],
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
  render: () => {
    const [selectedRows, setSelectedRows] = useState([])

    const candidates = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        position: 'Senior UX Designer',
        experience: '5 years',
        skills: ['Figma', 'Sketch', 'Prototyping'],
        status: 'interview-phase',
        score: 92,
        appliedDate: '2025-01-10',
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        position: 'Frontend Developer',
        experience: '3 years',
        skills: ['React', 'TypeScript', 'CSS'],
        status: 'test-phase',
        score: 88,
        appliedDate: '2025-01-12',
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        position: 'Product Manager',
        experience: '7 years',
        skills: ['Strategy', 'Analytics', 'Leadership'],
        status: 'offer',
        score: 95,
        appliedDate: '2025-01-08',
      },
      {
        id: 4,
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        position: 'UI Developer',
        experience: '2 years',
        skills: ['HTML', 'CSS', 'JavaScript'],
        status: 'rejected',
        score: 65,
        appliedDate: '2025-01-15',
      },
    ]

    const columns: DataTableColumn<(typeof candidates)[0]>[] = [
      {
        key: 'name',
        title: 'Candidate',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium">{String(value)}</div>
            <div className="text-muted-foreground text-sm">
              {String((row as Record<string, unknown>).email)}
            </div>
          </div>
        ),
      },
      {
        key: 'position',
        title: 'Position',
        sortable: true,
        render: (value, row) => (
          <div className="space-y-1">
            <div className="font-medium">{String(value)}</div>
            <div className="text-muted-foreground text-sm">
              {String((row as Record<string, unknown>).experience)} experience
            </div>
          </div>
        ),
      },
      {
        key: 'skills',
        title: 'Skills',
        render: value => (
          <div className="flex flex-wrap gap-1">
            {(value as unknown[]).slice(0, 2).map((skill: unknown, index: number) => (
              <Badge key={index} variant="secondary" size="sm">
                {String(skill)}
              </Badge>
            ))}
            {(value as unknown[]).length > 2 && (
              <Badge variant="outline" size="sm">
                +{(value as unknown[]).length - 2}
              </Badge>
            )}
          </div>
        ),
      },
      {
        key: 'score',
        title: 'Score',
        sortable: true,
        align: 'center',
        render: value => (
          <div className="text-center">
            <div className="font-medium">{String(value)}%</div>
            <div
              className={cn(
                'text-xs',
                Number(value) >= 90
                  ? 'text-green-600'
                  : Number(value) >= 80
                    ? 'text-blue-600'
                    : Number(value) >= 70
                      ? 'text-yellow-600'
                      : 'text-red-600'
              )}
            >
              {Number(value) >= 90
                ? 'Excellent'
                : Number(value) >= 80
                  ? 'Good'
                  : Number(value) >= 70
                    ? 'Average'
                    : 'Below Average'}
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        render: value => {
          const statusMap = {
            applied: 'Applied',
            'under-review': 'Under Review',
            'test-phase': 'Test phase',
            'interview-phase': 'Interview phase',
            offer: 'Offer',
            rejected: 'Rejected',
          }

          return (
            <Badge
              variant={
                String(value) as
                  | 'default'
                  | 'success'
                  | 'fail'
                  | 'warning'
                  | 'under-review'
                  | 'applied'
                  | 'interview-phase'
                  | 'offer'
                  | 'rejected'
                  | 'test-phase'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
                  | 'info'
                  | 'withdrawn'
              }
            >
              {statusMap[String(value) as keyof typeof statusMap]}
            </Badge>
          )
        },
      },
      {
        key: 'appliedDate',
        title: 'Applied',
        sortable: true,
        render: value => new Date(String(value)).toLocaleDateString(),
      },
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Candidate Management</h3>
            <p className="text-muted-foreground text-sm">
              Manage candidates through the hiring process with sorting and selection
            </p>
          </div>

          {selectedRows.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {selectedRows.length} selected
              </span>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Bulk Action
              </button>
            </div>
          )}
        </div>

        <DataTable
          data={candidates}
          columns={columns}
          variant="default"
          sortable
          selectable
          onSelectionChange={setSelectedRows as (rows: Record<string, unknown>[]) => void}
          className="rounded-lg border"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive data table with selection, sorting, and bulk actions for candidate management.',
      },
    },
  },
}

// Basic Table Structure
export const BasicTable: Story = {
  args: {
    data: [],
    columns: [],
    variant: 'default',
    size: 'default',
    sortable: true,
    selectable: false,
  },
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Table</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">John Doe</TableCell>
              <TableCell>
                <StatusBadge variant="success" icon={<Check className="h-3 w-3" />}>
                  Success
                </StatusBadge>
              </TableCell>
              <TableCell>95%</TableCell>
              <TableActionCell />
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Jane Smith</TableCell>
              <TableCell>
                <StatusBadge variant="under-review" icon={<Clock className="h-3 w-3" />}>
                  Under Review
                </StatusBadge>
              </TableCell>
              <TableCell>-</TableCell>
              <TableActionCell />
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Bob Johnson</TableCell>
              <TableCell>
                <StatusBadge variant="fail" icon={<X className="h-3 w-3" />}>
                  Failed
                </StatusBadge>
              </TableCell>
              <TableCell>42%</TableCell>
              <TableActionCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Striped Table</h3>
        <Table variant="striped">
          <TableHeader>
            <TableRow>
              <TableHead>Test</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Design Challenge</TableCell>
              <TableCell>
                <Badge variant="info" size="sm">
                  Virtual interview
                </Badge>
              </TableCell>
              <TableCell>14/08/2025</TableCell>
              <TableCell>
                <StatusBadge variant="success" size="sm">
                  Success
                </StatusBadge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coding Test</TableCell>
              <TableCell>
                <Badge variant="info" size="sm">
                  AI test
                </Badge>
              </TableCell>
              <TableCell>15/08/2025</TableCell>
              <TableCell>
                <StatusBadge variant="fail" size="sm">
                  Fail
                </StatusBadge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Technical Interview</TableCell>
              <TableCell>
                <Badge variant="info" size="sm">
                  Virtual interview
                </Badge>
              </TableCell>
              <TableCell>16/08/2025</TableCell>
              <TableCell>
                <StatusBadge variant="under-review" size="sm">
                  Under Review
                </StatusBadge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic table structures with different variants and styling options.',
      },
    },
  },
}
