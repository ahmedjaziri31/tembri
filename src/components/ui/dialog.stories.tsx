import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { Plus, Trash2, Edit, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

const meta = {
  title: 'UI/Dialog (Modals)',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A modal dialog component built with Radix UI Dialog primitive and styled with shadcn/ui patterns.

## Features
- **Accessible**: Built on Radix UI Dialog primitive
- **Variants**: Default, info, success, warning, destructive backgrounds
- **Keyboard navigation**: ESC to close, focus management  
- **Backdrop**: Click outside to close
- **Animations**: Smooth open/close transitions
- **Responsive**: Mobile-friendly design

## Usage
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description content.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <button>Action</button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`
        `,
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// Basic Dialog Examples
export const InfoDialog: Story = {
  name: 'Info Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Open Info Dialog
      </DialogTrigger>
      <DialogContent variant="info" className="max-w-md">
        <DialogHeader className="flex flex-row items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Info text</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SuccessDialog: Story = {
  name: 'Success Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
        Open Success Dialog
      </DialogTrigger>
      <DialogContent variant="success" className="max-w-md">
        <DialogHeader className="flex flex-row items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Success text</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WarningDialog: Story = {
  name: 'Warning Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700">
        Open Warning Dialog
      </DialogTrigger>
      <DialogContent variant="warning" className="max-w-md">
        <DialogHeader className="flex flex-row items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Warning text</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const DangerDialog: Story = {
  name: 'Danger Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
        Open Danger Dialog
      </DialogTrigger>
      <DialogContent variant="destructive" className="max-w-md">
        <DialogHeader className="flex flex-row items-start gap-3">
          <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Danger text</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Confirmation Dialogs with Multiple Actions
export const ConfirmationDialog: Story = {
  name: 'Confirmation Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
        <Trash2 className="h-4 w-4" />
        Delete Item
      </DialogTrigger>
      <DialogContent variant="confirmation" className="max-w-md bg-red-50">
        <DialogHeader className="flex flex-row items-start gap-3">
          <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Add Item</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Are you sure you want to delete this item ?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end gap-3">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
          <button className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
            Another Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const AddItemDialog: Story = {
  name: 'Add Item Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        <Plus className="h-4 w-4" />
        Add Item
      </DialogTrigger>
      <DialogContent variant="confirmation" className="max-w-md bg-blue-50">
        <DialogHeader className="flex flex-row items-start gap-3">
          <Edit className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Add Item</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Are you sure you want to delete this item ?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end gap-3">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
          <button className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
            Another Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const EditItemDialog: Story = {
  name: 'Edit Item Dialog',
  render: () => (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700">
        <Edit className="h-4 w-4" />
        Edit Item
      </DialogTrigger>
      <DialogContent variant="confirmation" className="max-w-md">
        <DialogHeader className="flex flex-row items-start gap-3">
          <Edit className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
          <div className="flex-1">
            <DialogTitle className="text-left">Add Item</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              Are you sure you want to delete this item ?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="justify-end gap-3">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Action
          </button>
          <button className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
            Another Action
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Form Dialog Example
export const FormDialog: Story = {
  name: 'Form Dialog',
  render: () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    return (
      <Dialog>
        <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Create Account
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>Enter your information to create a new account.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Cancel
            </button>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Create Account
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// All Dialog Types Collection
export const DialogCollection: Story = {
  name: 'Dialog Collection',
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Dialog>
        <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Info Dialog
        </DialogTrigger>
        <DialogContent variant="info" className="max-w-md">
          <DialogHeader className="flex flex-row items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <div className="flex-1">
              <DialogTitle className="text-left">Info text</DialogTitle>
              <DialogDescription className="mt-2 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="justify-end">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
          Success Dialog
        </DialogTrigger>
        <DialogContent variant="success" className="max-w-md">
          <DialogHeader className="flex flex-row items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div className="flex-1">
              <DialogTitle className="text-left">Success text</DialogTitle>
              <DialogDescription className="mt-2 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="justify-end">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700">
          Warning Dialog
        </DialogTrigger>
        <DialogContent variant="warning" className="max-w-md">
          <DialogHeader className="flex flex-row items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div className="flex-1">
              <DialogTitle className="text-left">Warning text</DialogTitle>
              <DialogDescription className="mt-2 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="justify-end">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700">
          Danger Dialog
        </DialogTrigger>
        <DialogContent variant="destructive" className="max-w-md">
          <DialogHeader className="flex flex-row items-start gap-3">
            <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div className="flex-1">
              <DialogTitle className="text-left">Danger text</DialogTitle>
              <DialogDescription className="mt-2 text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="justify-end">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Action
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of all dialog types matching the designs from your images.',
      },
    },
  },
}
