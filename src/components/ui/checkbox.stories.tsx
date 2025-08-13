import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { Checkbox } from './checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A checkbox component built with Radix UI Checkbox primitive and styled with shadcn/ui patterns.

## Features
- **Accessible**: Built on Radix UI Checkbox primitive
- **Three states**: Checked, unchecked, and indeterminate
- **Sizes**: Small, default, and large variants
- **Form integration**: Works seamlessly with form libraries
- **Keyboard navigation**: Full keyboard support
- **Screen reader support**: Proper ARIA attributes

## Usage
\`\`\`tsx
import { Checkbox } from "@/components/ui/checkbox"

// Basic checkbox
<Checkbox />

// Controlled checkbox
<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />

// With label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>

// Indeterminate state
<Checkbox checked="indeterminate" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the checkbox',
    },
    checked: {
      control: 'radio',
      options: [true, false, 'indeterminate'],
      description: 'The checked state of the checkbox',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is initially checked (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Called when the checked state changes',
    },
  },
  args: {
    onCheckedChange: (checked: boolean | 'indeterminate') =>
      console.log('Checkbox changed:', checked),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  name: 'Checked',
  args: {
    defaultChecked: true,
  },
}

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: {
    checked: 'indeterminate',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

// Sizes
export const Small: Story = {
  name: 'Small Size',
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  name: 'Large Size',
  args: {
    size: 'lg',
  },
}

// With Labels
export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="newsletter" />
      <label
        htmlFor="newsletter"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Subscribe to newsletter
      </label>
    </div>
  ),
}

export const WithDescription: Story = {
  name: 'With Label & Description',
  render: () => (
    <div className="flex items-start space-x-3">
      <Checkbox id="marketing" className="mt-1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="marketing"
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Marketing communications
        </label>
        <p className="text-muted-foreground text-xs">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
}

// Form Examples
export const SimpleForm: Story = {
  name: 'Simple Form',
  render: () => {
    const [formData, setFormData] = useState({
      newsletter: false,
      terms: false,
      privacy: false,
    })

    return (
      <div className="max-w-sm space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">Sign Up</h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
            />
            <label htmlFor="newsletter" className="text-sm">
              Subscribe to newsletter
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, terms: !!checked }))}
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.privacy}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, privacy: !!checked }))}
            />
            <label htmlFor="privacy" className="text-sm">
              I have read the privacy policy
            </label>
          </div>
        </div>

        <button
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          disabled={!formData.terms || !formData.privacy}
        >
          Create Account
        </button>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'A simple signup form with required checkboxes.',
      },
    },
  },
}

export const TodoList: Story = {
  name: 'Todo List',
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Review pull requests', completed: true },
      { id: 2, text: 'Update documentation', completed: false },
      { id: 3, text: 'Fix bug in navigation', completed: false },
      { id: 4, text: 'Prepare demo presentation', completed: true },
      { id: 5, text: 'Deploy to staging', completed: false },
    ])

    const toggleTodo = (id: number) => {
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      )
    }

    const allCompleted = todos.every(todo => todo.completed)
    const someCompleted = todos.some(todo => todo.completed)
    const selectAllState = allCompleted ? true : someCompleted ? 'indeterminate' : false

    const toggleAll = () => {
      const newState = !allCompleted
      setTodos(prev => prev.map(todo => ({ ...todo, completed: newState })))
    }

    return (
      <div className="max-w-md space-y-4 rounded-lg border p-4">
        <div className="flex items-center space-x-2 border-b pb-2">
          <Checkbox checked={selectAllState} onCheckedChange={toggleAll} />
          <span className="text-sm font-medium">
            {allCompleted
              ? 'All tasks complete'
              : `${todos.filter(t => t.completed).length} of ${todos.length} complete`}
          </span>
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center space-x-2">
              <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
              <span
                className={`text-sm ${todo.completed ? 'text-muted-foreground line-through' : ''}`}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>

        <div className="text-muted-foreground border-t pt-2 text-xs">
          Click the top checkbox to select/deselect all items
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'A todo list demonstrating indeterminate state for "select all" functionality.',
      },
    },
  },
}

export const FeaturePermissions: Story = {
  name: 'Feature Permissions',
  render: () => {
    const [permissions, setPermissions] = useState({
      users: {
        create: true,
        read: true,
        update: false,
        delete: false,
      },
      posts: {
        create: true,
        read: true,
        update: true,
        delete: false,
      },
      settings: {
        create: false,
        read: true,
        update: false,
        delete: false,
      },
    })

    const updatePermission = (feature: keyof typeof permissions, action: string) => {
      setPermissions(prev => ({
        ...prev,
        [feature]: {
          ...prev[feature],
          [action]: !prev[feature][action as keyof (typeof prev)[typeof feature]],
        },
      }))
    }

    const getFeatureState = (feature: keyof typeof permissions) => {
      const actions = Object.values(permissions[feature])
      const allTrue = actions.every(Boolean)
      const someTrue = actions.some(Boolean)
      return allTrue ? true : someTrue ? 'indeterminate' : false
    }

    const toggleAllForFeature = (feature: keyof typeof permissions) => {
      const allTrue = Object.values(permissions[feature]).every(Boolean)
      const newState = !allTrue
      setPermissions(prev => ({
        ...prev,
        [feature]: Object.keys(prev[feature]).reduce(
          (acc, key) => ({
            ...acc,
            [key]: newState,
          }),
          {} as Record<string, boolean>
        ),
      }))
    }

    return (
      <div className="max-w-lg space-y-6 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">User Permissions</h3>

        {Object.entries(permissions).map(([feature, actions]) => (
          <div key={feature} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={getFeatureState(feature as keyof typeof permissions)}
                onCheckedChange={() => toggleAllForFeature(feature as keyof typeof permissions)}
              />
              <span className="text-sm font-medium capitalize">{feature}</span>
            </div>

            <div className="ml-6 space-y-2">
              {Object.entries(actions).map(([action, enabled]) => (
                <div key={action} className="flex items-center space-x-2">
                  <Checkbox
                    size="sm"
                    checked={enabled}
                    onCheckedChange={() =>
                      updatePermission(feature as keyof typeof permissions, action)
                    }
                  />
                  <span className="text-sm capitalize">{action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border-t pt-4">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
            Save Permissions
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'A permission system with nested checkboxes and indeterminate states.',
      },
    },
  },
}

// All Sizes Demo
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Checkbox size="sm" defaultChecked />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox size="default" defaultChecked />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex items-center space-x-4">
        <Checkbox size="lg" defaultChecked />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available checkbox sizes side by side.',
      },
    },
  },
}

// States Overview
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Default</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-sm">Unchecked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <span className="text-sm">Checked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked="indeterminate" />
            <span className="text-sm">Indeterminate</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Disabled</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox disabled />
            <span className="text-sm">Disabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled defaultChecked />
            <span className="text-sm">Disabled + Checked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled checked="indeterminate" />
            <span className="text-sm">Disabled + Indeterminate</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all possible checkbox states including indeterminate.',
      },
    },
  },
}
