import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState, useEffect } from 'react'
import { Progress, CircularProgress, ProgressRing, MultiStepProgress } from './progress'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive progress indicator system with linear bars, circular progress, and multi-step workflows.

## Features
- **Linear Progress**: Traditional progress bars with multiple variants
- **Circular Progress**: Ring-style progress indicators  
- **Gradient Colors**: Dynamic color transitions based on progress
- **Animated States**: Smooth transitions and optional animations
- **Multi-step Progress**: Workflow and stepper components
- **Responsive Sizing**: Multiple size options for different use cases

## Usage
\`\`\`tsx
import { Progress, CircularProgress, ProgressRing } from "@/components/ui/progress"

// Linear progress bar
<Progress value={75} variant="gradient" showLabel />

// Circular progress
<CircularProgress value={85} variant="gradient" showLabel />

// Multi-step progress
<MultiStepProgress steps={[
  { label: "Start", completed: true },
  { label: "Progress", current: true },
  { label: "Complete", completed: false }
]} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'blue', 'success', 'warning', 'danger'],
      description: 'Visual variant of the progress indicator',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show progress percentage label',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animation effects',
    },
  },
  args: {
    value: 65,
    variant: 'gradient',
    size: 'default',
    showLabel: true,
    animated: false,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Linear Progress Bars (matching your image)
export const LinearProgressBars: Story = {
  name: 'Linear Progress Bars',
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gradient Progress Bars</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Task Completion</span>
              <span>25%</span>
            </div>
            <Progress value={25} variant="gradient" size="lg" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Project Progress</span>
              <span>45%</span>
            </div>
            <Progress value={45} variant="gradient" size="lg" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Learning Path</span>
              <span>70%</span>
            </div>
            <Progress value={70} variant="gradient" size="lg" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Goals</span>
              <span>90%</span>
            </div>
            <Progress value={90} variant="gradient" size="lg" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Blue Progress Bars</h3>
        <div className="space-y-4">
          <Progress value={30} variant="blue" size="lg" />
          <Progress value={50} variant="blue" size="lg" />
          <Progress value={75} variant="blue" size="lg" />
          <Progress value={95} variant="blue" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Linear progress bars exactly matching your design with gradient and blue variants.',
      },
    },
  },
}

// Circular Progress Indicators (matching your image)
export const CircularProgressIndicators: Story = {
  name: 'Circular Progress Indicators',
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Circular Progress with Color Transitions</h3>
        <div className="flex items-center justify-center gap-6 p-8">
          <CircularProgress value={15} variant="gradient" size={80} strokeWidth={8} />
          <CircularProgress value={35} variant="gradient" size={80} strokeWidth={8} />
          <CircularProgress value={55} variant="gradient" size={80} strokeWidth={8} />
          <CircularProgress value={75} variant="gradient" size={80} strokeWidth={8} />
          <CircularProgress value={95} variant="gradient" size={80} strokeWidth={8} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center justify-center gap-6 p-8">
          <CircularProgress value={65} variant="gradient" size={60} strokeWidth={6} />
          <CircularProgress value={65} variant="gradient" size={80} strokeWidth={8} />
          <CircularProgress value={65} variant="gradient" size={100} strokeWidth={10} />
          <CircularProgress value={65} variant="gradient" size={120} strokeWidth={12} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Progress Rings</h3>
        <div className="flex items-center justify-center gap-6 p-8">
          <ProgressRing value={25} variant="gradient" size={100} strokeWidth={10} />
          <ProgressRing value={50} variant="gradient" size={100} strokeWidth={10} />
          <ProgressRing value={75} variant="gradient" size={100} strokeWidth={10} />
          <ProgressRing value={90} variant="gradient" size={100} strokeWidth={10} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Circular progress indicators exactly matching your design with gradient color transitions.',
      },
    },
  },
}

// All Progress Variants
export const AllProgressVariants: Story = {
  name: 'All Progress Variants',
  render: () => (
    <div className="max-w-3xl space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Linear Progress Variants</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Default</span>
            <Progress value={65} variant="default" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Gradient</span>
            <Progress value={65} variant="gradient" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Blue</span>
            <Progress value={65} variant="blue" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Success</span>
            <Progress value={65} variant="success" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Warning</span>
            <Progress value={65} variant="warning" showLabel />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Danger</span>
            <Progress value={65} variant="danger" showLabel />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Circular Progress Variants</h3>
        <div className="flex flex-wrap gap-6 p-4">
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="default" />
            <span className="text-muted-foreground text-xs">Default</span>
          </div>
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="gradient" />
            <span className="text-muted-foreground text-xs">Gradient</span>
          </div>
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="blue" />
            <span className="text-muted-foreground text-xs">Blue</span>
          </div>
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="success" />
            <span className="text-muted-foreground text-xs">Success</span>
          </div>
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="warning" />
            <span className="text-muted-foreground text-xs">Warning</span>
          </div>
          <div className="space-y-2 text-center">
            <CircularProgress value={65} variant="danger" />
            <span className="text-muted-foreground text-xs">Danger</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete overview of all progress variants for both linear and circular indicators.',
      },
    },
  },
}

// Animated Progress Examples
export const AnimatedProgressExamples: Story = {
  name: 'Animated Progress Examples',
  render: () => {
    const [progress1, setProgress1] = useState(0)
    const [progress2, setProgress2] = useState(0)
    const [progress3, setProgress3] = useState(0)

    useEffect(() => {
      const timer1 = setInterval(() => {
        setProgress1(prev => (prev >= 100 ? 0 : prev + 2))
      }, 100)

      const timer2 = setInterval(() => {
        setProgress2(prev => (prev >= 100 ? 0 : prev + 1.5))
      }, 80)

      const timer3 = setInterval(() => {
        setProgress3(prev => (prev >= 100 ? 0 : prev + 1))
      }, 60)

      return () => {
        clearInterval(timer1)
        clearInterval(timer2)
        clearInterval(timer3)
      }
    }, [])

    return (
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Animated Linear Progress</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Download Progress</span>
                <span>{Math.round(progress1)}%</span>
              </div>
              <Progress value={progress1} variant="gradient" size="lg" animated />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload Progress</span>
                <span>{Math.round(progress2)}%</span>
              </div>
              <Progress value={progress2} variant="blue" size="lg" animated />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Animated Circular Progress</h3>
          <div className="flex items-center justify-center gap-8 p-8">
            <div className="space-y-2 text-center">
              <CircularProgress value={progress1} variant="gradient" animated />
              <span className="text-muted-foreground text-sm">Processing</span>
            </div>
            <div className="space-y-2 text-center">
              <CircularProgress value={progress2} variant="blue" animated />
              <span className="text-muted-foreground text-sm">Loading</span>
            </div>
            <div className="space-y-2 text-center">
              <ProgressRing value={progress3} variant="gradient" animated />
              <span className="text-muted-foreground text-sm">Analyzing</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated progress indicators with smooth transitions and continuous updates.',
      },
    },
  },
}

// Multi-step Progress (matching your image)
export const MultiStepProgressExample: Story = {
  name: 'Multi-step Progress',
  render: () => {
    const [currentStep, setCurrentStep] = useState(2) // Start at "Testing" step like in your image

    const stepLabels = ['Setup', 'Configuration', 'Testing', 'Deployment', 'Complete']

    return (
      <div className="max-w-4xl space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Multi-step Workflow (Matching Your Design)</h3>

          <div className="bg-card rounded-lg border p-8">
            <MultiStepProgress
              steps={stepLabels.map((label, index) => ({
                label,
                completed: index < currentStep,
                current: index === currentStep,
              }))}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
              className="mx-auto max-w-2xl"
            />

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="rounded-md bg-gray-100 px-6 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                disabled={currentStep === 4}
                className="rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="text-muted-foreground text-center text-sm">
            <p>
              ✅ Completed steps show checkmarks • 🔵 Current step is highlighted • Click steps to
              navigate
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Different Step States</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Completed Process */}
            <div className="bg-card rounded-lg border p-6">
              <h4 className="mb-4 font-medium">Completed Process</h4>
              <MultiStepProgress
                steps={[
                  { label: 'Planning', completed: true },
                  { label: 'Design', completed: true },
                  { label: 'Development', completed: true },
                  { label: 'Testing', completed: true },
                  { label: 'Launch', completed: true },
                ]}
                currentStep={5}
              />
            </div>

            {/* In Progress Process */}
            <div className="bg-card rounded-lg border p-6">
              <h4 className="mb-4 font-medium">In Progress Process</h4>
              <MultiStepProgress
                steps={[
                  { label: 'Application', completed: true },
                  { label: 'Review', completed: true },
                  { label: 'Interview', completed: false, current: true },
                  { label: 'Decision', completed: false },
                  { label: 'Onboarding', completed: false },
                ]}
                currentStep={2}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Step Navigation</h3>
          <div className="bg-card rounded-lg border p-6">
            <MultiStepProgress
              steps={stepLabels.map((label, index) => ({
                label,
                completed: index < currentStep,
                current: index === currentStep,
              }))}
              currentStep={currentStep}
              onStepClick={stepIndex => {
                setCurrentStep(stepIndex)
                console.log(`Navigated to step ${stepIndex + 1}: ${stepLabels[stepIndex]}`)
              }}
            />

            <div className="bg-muted/30 mt-6 rounded-lg p-4">
              <div className="text-sm">
                <div className="font-medium">Current Status:</div>
                <div className="text-muted-foreground mt-1">
                  Step {currentStep + 1} of {stepLabels.length}:{' '}
                  <strong>{stepLabels[currentStep]}</strong>
                </div>
                <div className="text-muted-foreground mt-1">
                  Progress: {Math.round(((currentStep + 1) / stepLabels.length) * 100)}% complete
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setCurrentStep(0)}
                className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200"
              >
                Reset
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="rounded bg-green-100 px-3 py-1 text-xs text-green-700 hover:bg-green-200"
              >
                Complete All
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
          'Multi-step progress indicators with proper completion states, exactly matching your design with checkmarks for completed steps.',
      },
    },
  },
}

// Interactive Dashboard Example
export const ProgressDashboard: Story = {
  name: 'Progress Dashboard',
  render: () => (
    <div className="max-w-6xl space-y-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">Progress Dashboard</h2>
        <p className="text-muted-foreground">Comprehensive view of various progress indicators</p>
      </div>

      {/* Task Progress */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-card space-y-4 rounded-lg border p-6">
          <h3 className="font-semibold">Task Progress</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Frontend Development</span>
                <span>85%</span>
              </div>
              <Progress value={85} variant="gradient" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backend API</span>
                <span>60%</span>
              </div>
              <Progress value={60} variant="gradient" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Testing</span>
                <span>30%</span>
              </div>
              <Progress value={30} variant="gradient" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documentation</span>
                <span>90%</span>
              </div>
              <Progress value={90} variant="gradient" />
            </div>
          </div>
        </div>

        <div className="bg-card space-y-4 rounded-lg border p-6">
          <h3 className="font-semibold">Team Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-center">
              <CircularProgress value={92} variant="gradient" size={80} />
              <div className="text-sm">
                <div className="font-medium">Sarah</div>
                <div className="text-muted-foreground">Designer</div>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <CircularProgress value={78} variant="gradient" size={80} />
              <div className="text-sm">
                <div className="font-medium">Mike</div>
                <div className="text-muted-foreground">Developer</div>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <CircularProgress value={65} variant="gradient" size={80} />
              <div className="text-sm">
                <div className="font-medium">Alex</div>
                <div className="text-muted-foreground">Tester</div>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <CircularProgress value={88} variant="gradient" size={80} />
              <div className="text-sm">
                <div className="font-medium">Lisa</div>
                <div className="text-muted-foreground">Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Timeline */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">Project Timeline</h3>
        <MultiStepProgress
          steps={[
            { label: 'Planning', completed: true },
            { label: 'Design', completed: true },
            { label: 'Development', completed: false, current: true },
            { label: 'Testing', completed: false },
            { label: 'Launch', completed: false },
          ]}
        />
      </div>

      {/* Skill Progress */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-card rounded-lg border p-6 text-center">
          <ProgressRing value={85} variant="gradient" size={120} strokeWidth={12} />
          <div className="mt-4">
            <div className="font-medium">React Skills</div>
            <div className="text-muted-foreground text-sm">Advanced Level</div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-6 text-center">
          <ProgressRing value={70} variant="gradient" size={120} strokeWidth={12} />
          <div className="mt-4">
            <div className="font-medium">TypeScript</div>
            <div className="text-muted-foreground text-sm">Intermediate</div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-6 text-center">
          <ProgressRing value={45} variant="gradient" size={120} strokeWidth={12} />
          <div className="mt-4">
            <div className="font-medium">Node.js</div>
            <div className="text-muted-foreground text-sm">Beginner</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete progress dashboard showcasing various progress indicators in a real-world scenario.',
      },
    },
  },
}
