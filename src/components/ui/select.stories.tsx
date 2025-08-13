import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  MultiSelect,
  RadioSelect,
  type MultiSelectOption,
  type RadioSelectOption,
} from './select'

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive select/dropdown system with single selection, multi-selection, and various styling options.

## Features
- **Single Select**: Traditional dropdown with single selection
- **Multi Select**: Checkbox-based multi-selection with apply/cancel actions
- **Radio Select**: Radio button-based single selection with optional actions
- **Multiple Variants**: Default, dashed, outlined, and minimal styles
- **Flexible Sizing**: Small, default, and large sizes
- **Action Buttons**: Optional Apply/Cancel buttons for controlled selection
- **Customizable**: Close buttons, placeholder text, and display options

## Usage
\`\`\`tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect, RadioSelect } from "@/components/ui/select"

// Basic single select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select category..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Multi-select with actions
<MultiSelect
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  showActions
  onApply={handleApply}
/>

// Radio select
<RadioSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  showActions
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Dropdown Triggers (matching your first image)
export const DropdownTriggers: Story = {
  name: 'Dropdown Triggers',
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Trigger Styles</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Default Style */}
          <div className="space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
            <Select>
              <SelectTrigger variant="default">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Design</SelectItem>
                <SelectItem value="option2">Development</SelectItem>
                <SelectItem value="option3">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="default">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Frontend</SelectItem>
                <SelectItem value="option2">Backend</SelectItem>
                <SelectItem value="option3">Full Stack</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="default" className="border-blue-200 bg-blue-50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Junior</SelectItem>
                <SelectItem value="option2">Mid-level</SelectItem>
                <SelectItem value="option3">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dashed Purple Style */}
          <div className="space-y-2 rounded-lg border-2 border-dashed border-purple-300 p-4">
            <Select>
              <SelectTrigger variant="dashed">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Remote</SelectItem>
                <SelectItem value="option2">Hybrid</SelectItem>
                <SelectItem value="option3">On-site</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="dashed">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Full-time</SelectItem>
                <SelectItem value="option2">Part-time</SelectItem>
                <SelectItem value="option3">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="dashed" className="border-purple-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Entry Level</SelectItem>
                <SelectItem value="option2">Experienced</SelectItem>
                <SelectItem value="option3">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Outlined Style */}
          <div className="space-y-2 rounded-lg border-2 border-dashed border-blue-300 p-4">
            <Select>
              <SelectTrigger variant="outlined">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Technology</SelectItem>
                <SelectItem value="option2">Healthcare</SelectItem>
                <SelectItem value="option3">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="outlined">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Startup</SelectItem>
                <SelectItem value="option2">Mid-size</SelectItem>
                <SelectItem value="option3">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="outlined">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">0-2 years</SelectItem>
                <SelectItem value="option2">3-5 years</SelectItem>
                <SelectItem value="option3">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minimal Style */}
          <div className="space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-4">
            <Select>
              <SelectTrigger variant="minimal">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">USA</SelectItem>
                <SelectItem value="option2">Canada</SelectItem>
                <SelectItem value="option3">UK</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="minimal">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">English</SelectItem>
                <SelectItem value="option2">Spanish</SelectItem>
                <SelectItem value="option3">French</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger variant="minimal">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Active</SelectItem>
                <SelectItem value="option2">Inactive</SelectItem>
                <SelectItem value="option3">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different dropdown trigger styles exactly matching your design with dashed borders and various layouts.',
      },
    },
  },
}

// Dropdown Variations (matching your second image)
export const DropdownVariations: Story = {
  name: 'Dropdown Variations',
  render: () => {
    const [singleValue, setSingleValue] = useState('')
    const [multiValue, setMultiValue] = useState<string[]>([])
    const [radioValue, setRadioValue] = useState('')
    const [checkboxValue, setCheckboxValue] = useState<string[]>([])

    const remoteOptions: RadioSelectOption[] = [
      { value: 'no-remote', label: 'No remote work' },
      { value: 'occasional', label: 'Occasional remote' },
      { value: 'few-days', label: 'Few days at home' },
      { value: 'fully-remote', label: 'Fully remote' },
    ]

    const multiRemoteOptions: MultiSelectOption[] = [
      { value: 'no-remote', label: 'No remote work' },
      { value: 'occasional', label: 'Occasional remote' },
      { value: 'few-days', label: 'Few days at home' },
      { value: 'fully-remote', label: 'Fully remote' },
    ]

    return (
      <div className="max-w-5xl space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dropdown Variations</h3>

          {/* Top Row - Radio and Checkbox with Actions */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium">Radio Select with Actions</span>
              <RadioSelect
                options={remoteOptions}
                value={radioValue}
                onChange={setSingleValue}
                placeholder="Select work type..."
                showActions
                onApply={value => {
                  setSingleValue(value)
                  console.log('Applied:', value)
                }}
                onCancel={() => console.log('Cancelled')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Multi-Select with Actions</span>
              <MultiSelect
                options={multiRemoteOptions}
                value={multiValue}
                onChange={setMultiValue}
                placeholder="Select work types..."
                showActions
                onApply={values => {
                  console.log('Applied:', values)
                }}
                onCancel={() => console.log('Cancelled')}
                className="w-full"
              />
            </div>
          </div>

          {/* Middle Row - With Close Buttons */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium">Radio Select with Close</span>
              <RadioSelect
                options={remoteOptions}
                value={radioValue}
                onChange={setRadioValue}
                placeholder="Select work type..."
                showClose
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Multi-Select with Close</span>
              <MultiSelect
                options={multiRemoteOptions}
                value={checkboxValue}
                onChange={setCheckboxValue}
                placeholder="Select work types..."
                className="w-full"
              />
            </div>
          </div>

          {/* Bottom Row - Simple Options */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-sm font-medium">Simple Radio Select</span>
              <RadioSelect
                options={remoteOptions}
                value={radioValue}
                onChange={setRadioValue}
                placeholder="Select work type..."
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Simple Multi-Select</span>
              <MultiSelect
                options={multiRemoteOptions}
                value={checkboxValue}
                onChange={setCheckboxValue}
                placeholder="Select work types..."
                variant="outlined"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="mb-2 font-semibold">Selected Values:</h4>
          <div className="space-y-1 text-sm">
            <div>Single Radio: {singleValue || 'None'}</div>
            <div>Multi Checkbox: {multiValue.length ? multiValue.join(', ') : 'None'}</div>
            <div>Radio Value: {radioValue || 'None'}</div>
            <div>Checkbox Values: {checkboxValue.length ? checkboxValue.join(', ') : 'None'}</div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete dropdown variations exactly matching your design with radio buttons, checkboxes, and action buttons.',
      },
    },
  },
}

// Basic Select Examples
export const BasicSelectExamples: Story = {
  name: 'Basic Select Examples',
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Single Select Variants</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Default</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Dashed Border</span>
            <Select>
              <SelectTrigger variant="dashed">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Outlined</span>
            <Select>
              <SelectTrigger variant="outlined">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Minimal</span>
            <Select>
              <SelectTrigger variant="minimal">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="office">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic single select examples with different visual variants.',
      },
    },
  },
}

// Size Variations
export const SizeVariations: Story = {
  name: 'Size Variations',
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Small</span>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Small select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Default</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Default select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Large</span>
            <Select>
              <SelectTrigger size="lg">
                <SelectValue placeholder="Large select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select components in different sizes: small, default, and large.',
      },
    },
  },
}

// Interactive Examples
export const InteractiveExamples: Story = {
  name: 'Interactive Examples',
  render: () => {
    const [jobCategory, setJobCategory] = useState('')
    const [workTypes, setWorkTypes] = useState<string[]>([])
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState<string[]>([])

    const categories = [
      { value: 'design', label: 'Design' },
      { value: 'development', label: 'Development' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
    ]

    const workTypeOptions: MultiSelectOption[] = [
      { value: 'remote', label: 'Remote work' },
      { value: 'hybrid', label: 'Hybrid work' },
      { value: 'office', label: 'Office work' },
      { value: 'travel', label: 'Travel required' },
    ]

    const experienceOptions: RadioSelectOption[] = [
      { value: 'entry', label: 'Entry level (0-2 years)' },
      { value: 'mid', label: 'Mid level (3-5 years)' },
      { value: 'senior', label: 'Senior level (5+ years)' },
      { value: 'lead', label: 'Lead/Principal (8+ years)' },
    ]

    const skillOptions: MultiSelectOption[] = [
      { value: 'react', label: 'React' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'figma', label: 'Figma' },
      { value: 'photoshop', label: 'Photoshop' },
    ]

    return (
      <div className="max-w-4xl space-y-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Interactive Select Examples</h2>
          <p className="text-muted-foreground">Job search filter interface</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-card space-y-4 rounded-lg border p-6">
            <h3 className="font-semibold">Job Search Filters</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Category</label>
              <Select value={jobCategory} onValueChange={setJobCategory}>
                <SelectTrigger variant="dashed">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Types</label>
              <MultiSelect
                options={workTypeOptions}
                value={workTypes}
                onChange={setWorkTypes}
                placeholder="Select work types..."
                variant="outlined"
                showActions
                onApply={() => console.log('Applied work types:', workTypes)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <RadioSelect
                options={experienceOptions}
                value={experience}
                onChange={setExperience}
                placeholder="Select experience..."
                variant="default"
                showActions
                onApply={() => console.log('Applied experience:', experience)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <MultiSelect
                options={skillOptions}
                value={skills}
                onChange={setSkills}
                placeholder="Select skills..."
                variant="minimal"
                maxDisplayed={3}
              />
            </div>
          </div>

          <div className="bg-card space-y-4 rounded-lg border p-6">
            <h3 className="font-semibold">Current Selections</h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="text-muted-foreground">
                  {jobCategory ? categories.find(c => c.value === jobCategory)?.label : 'None'}
                </span>
              </div>

              <div>
                <span className="font-medium">Work Types:</span>{' '}
                <span className="text-muted-foreground">
                  {workTypes.length
                    ? workTypes
                        .map(wt => workTypeOptions.find(w => w.value === wt)?.label)
                        .join(', ')
                    : 'None'}
                </span>
              </div>

              <div>
                <span className="font-medium">Experience:</span>{' '}
                <span className="text-muted-foreground">
                  {experience ? experienceOptions.find(e => e.value === experience)?.label : 'None'}
                </span>
              </div>

              <div>
                <span className="font-medium">Skills:</span>{' '}
                <span className="text-muted-foreground">
                  {skills.length
                    ? skills.map(s => skillOptions.find(sk => sk.value === s)?.label).join(', ')
                    : 'None'}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setJobCategory('')
                  setWorkTypes([])
                  setExperience('')
                  setSkills([])
                }}
                className="bg-muted text-muted-foreground hover:bg-muted/80 w-full rounded-md px-4 py-2 text-sm"
              >
                Clear All Filters
              </button>
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
          'Interactive examples showing select components in a real-world job search filter interface.',
      },
    },
  },
}
