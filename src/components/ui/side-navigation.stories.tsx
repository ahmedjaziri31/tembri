import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import {
  User,
  Calendar,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
  Heart,
  Settings,
  Home,
  Search,
  Bell,
  Mail,
  Users,
  BarChart3,
  Shield,
  CreditCard,
  HelpCircle,
} from 'lucide-react'
import {
  SideNavigation,
  Sidebar,
  NavigationItem,
  ContentArea,
  NavigationGroup,
} from './side-navigation'
import { cn } from '@/lib/utils'

const meta = {
  title: 'UI/Side Navigation',
  component: SideNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive side navigation component for dashboards, forms, and applications.

## Features
- **Flexible sidebar**: Configurable width and styling
- **Navigation items**: Support for icons, states, and grouping
- **Content area**: Dynamic content based on selection
- **Active states**: Clear visual feedback for current selection
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage
\`\`\`tsx
import { SideNavigation, Sidebar, NavigationItem, ContentArea } from "@/components/ui/side-navigation"

const [activeItem, setActiveItem] = useState('basic')

<SideNavigation className="h-screen">
  <Sidebar title="Navigation">
    <NavigationItem 
      isSelected={activeItem === 'basic'}
      onClick={() => setActiveItem('basic')}
    >
      Basic Information
    </NavigationItem>
    <NavigationItem 
      isSelected={activeItem === 'settings'}
      onClick={() => setActiveItem('settings')}
    >
      Settings
    </NavigationItem>
  </Sidebar>
  <ContentArea title={activeItem === 'basic' ? 'Basic Information' : 'Settings'}>
    {activeItem === 'basic' ? 'Basic Information content' : 'Settings content'}
  </ContentArea>
</SideNavigation>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<typeof SideNavigation>

export default meta
type Story = StoryObj<typeof meta>

// Profile Form Navigation (matching your image)
export const ProfileFormNavigation: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [activeSection, setActiveSection] = useState('basic')

    const sections = [
      { id: 'basic', label: 'Basic Information', icon: <User className="h-4 w-4" /> },
      { id: 'availability', label: 'Availability', icon: <Calendar className="h-4 w-4" /> },
      { id: 'web', label: 'On the web', icon: <Globe className="h-4 w-4" /> },
      { id: 'about', label: 'About', icon: <FileText className="h-4 w-4" /> },
      { id: 'experience', label: 'Work Experience', icon: <Briefcase className="h-4 w-4" /> },
      { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
      { id: 'certification', label: 'Certification', icon: <Award className="h-4 w-4" /> },
      { id: 'skills', label: 'Skills', icon: <Code className="h-4 w-4" /> },
      { id: 'languages', label: 'Languages', icon: <Languages className="h-4 w-4" /> },
      { id: 'interests', label: 'Interests', icon: <Heart className="h-4 w-4" /> },
    ]

    const getCurrentContent = () => {
      const section = sections.find(s => s.id === activeSection)
      return {
        title: section?.label || 'Basic Information',
        content: section?.label || 'Basic Information',
      }
    }

    return (
      <div className="h-[600px] overflow-hidden rounded-lg border">
        <SideNavigation>
          <Sidebar width="default">
            <div className="py-2">
              {sections.map(section => (
                <NavigationItem
                  key={section.id}
                  icon={section.icon}
                  isSelected={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </NavigationItem>
              ))}
            </div>
          </Sidebar>
          <ContentArea title={getCurrentContent().title}>
            <div className="space-y-4">
              <p className="text-muted-foreground">{getCurrentContent().content}</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm">
                  Content for {getCurrentContent().title} section would go here. This could include
                  forms, information displays, or any other relevant content.
                </p>
              </div>
            </div>
          </ContentArea>
        </SideNavigation>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Profile form navigation exactly matching your design - with sections like Basic Information, Availability, etc.',
      },
    },
  },
}

// Dashboard Navigation
export const DashboardNavigation: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [activeTab, setActiveTab] = useState('dashboard')

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
      { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
      { id: 'messages', label: 'Messages', icon: <Mail className="h-4 w-4" /> },
      { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    ]

    const settingsItems = [
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
      { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
      { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
      { id: 'help', label: 'Help', icon: <HelpCircle className="h-4 w-4" /> },
    ]

    const getContent = () => {
      const allItems = [...menuItems, ...settingsItems]
      const item = allItems.find(i => i.id === activeTab)
      return {
        title: item?.label || 'Dashboard',
        description: `Welcome to the ${item?.label || 'Dashboard'} section.`,
      }
    }

    return (
      <div className="h-[600px] overflow-hidden rounded-lg border">
        <SideNavigation>
          <Sidebar title="Admin Panel" width="default">
            <NavigationGroup title="Main">
              {menuItems.map(item => (
                <NavigationItem
                  key={item.id}
                  icon={item.icon}
                  isSelected={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </NavigationItem>
              ))}
            </NavigationGroup>

            <NavigationGroup title="Settings">
              {settingsItems.map(item => (
                <NavigationItem
                  key={item.id}
                  icon={item.icon}
                  isSelected={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </NavigationItem>
              ))}
            </NavigationGroup>
          </Sidebar>
          <ContentArea title={getContent().title}>
            <div className="space-y-6">
              <p className="text-muted-foreground">{getContent().description}</p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Quick Stats</h3>
                  <p className="text-primary text-2xl font-bold">1,234</p>
                  <p className="text-muted-foreground text-xs">Total items</p>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Recent Activity</h3>
                  <p className="text-2xl font-bold text-green-600">+12%</p>
                  <p className="text-muted-foreground text-xs">vs last month</p>
                </div>
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Status</h3>
                  <p className="text-2xl font-bold text-blue-600">Active</p>
                  <p className="text-muted-foreground text-xs">All systems operational</p>
                </div>
              </div>
            </div>
          </ContentArea>
        </SideNavigation>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard navigation with grouped menu items and interactive content area.',
      },
    },
  },
}

// Different Sidebar Widths
export const SidebarWidths: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [selectedWidth, setSelectedWidth] = useState('default')
    const [activeItem, setActiveItem] = useState('home')

    const widthOptions = [
      { value: 'sm', label: 'Small (192px)', width: 'sm' as const },
      { value: 'default', label: 'Default (256px)', width: 'default' as const },
      { value: 'lg', label: 'Large (320px)', width: 'lg' as const },
      { value: 'xl', label: 'Extra Large (384px)', width: 'xl' as const },
    ]

    const menuItems = [
      { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
      { id: 'search', label: 'Search', icon: <Search className="h-4 w-4" /> },
      { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
    ]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Sidebar Width:</label>
          <div className="flex gap-2">
            {widthOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedWidth(option.value)}
                className={cn(
                  'rounded border px-3 py-1 text-xs transition-colors',
                  selectedWidth === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] overflow-hidden rounded-lg border">
          <SideNavigation>
            <Sidebar
              width={widthOptions.find(w => w.value === selectedWidth)?.width}
              title="Navigation"
            >
              <div className="py-2">
                {menuItems.map(item => (
                  <NavigationItem
                    key={item.id}
                    icon={item.icon}
                    isSelected={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                  >
                    {item.label}
                  </NavigationItem>
                ))}
              </div>
            </Sidebar>
            <ContentArea title={menuItems.find(i => i.id === activeItem)?.label}>
              <p className="text-muted-foreground">
                Content area adjusts automatically based on sidebar width. Current sidebar width:{' '}
                {widthOptions.find(w => w.value === selectedWidth)?.label}
              </p>
            </ContentArea>
          </SideNavigation>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of different sidebar widths and how they affect the layout.',
      },
    },
  },
}

// Navigation Variants
export const NavigationVariants: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [activeVariant, setActiveVariant] = useState('default')
    const [activeItem, setActiveItem] = useState('item1')

    const variants = [
      { value: 'default', label: 'Default' },
      { value: 'ghost', label: 'Ghost' },
      { value: 'minimal', label: 'Minimal' },
    ]

    const items = [
      { id: 'item1', label: 'First Item' },
      { id: 'item2', label: 'Second Item' },
      { id: 'item3', label: 'Third Item' },
      { id: 'item4', label: 'Fourth Item' },
    ]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Navigation Variant:</label>
          <div className="flex gap-2">
            {variants.map(variant => (
              <button
                key={variant.value}
                onClick={() => setActiveVariant(variant.value)}
                className={cn(
                  'rounded border px-3 py-1 text-xs transition-colors',
                  activeVariant === variant.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent'
                )}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] overflow-hidden rounded-lg border">
          <SideNavigation>
            <Sidebar title={`${variants.find(v => v.value === activeVariant)?.label} Variant`}>
              <div className="py-2">
                {items.map(item => (
                  <NavigationItem
                    key={item.id}
                    variant={activeVariant as 'default' | 'ghost' | 'minimal'}
                    isSelected={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                  >
                    {item.label}
                  </NavigationItem>
                ))}
              </div>
            </Sidebar>
            <ContentArea title={items.find(i => i.id === activeItem)?.label}>
              <p className="text-muted-foreground">
                This content area shows the selected item:{' '}
                {items.find(i => i.id === activeItem)?.label}
              </p>
              <div className="bg-muted/30 mt-4 rounded-lg p-4">
                <p className="text-sm">
                  Current variant:{' '}
                  <strong>{variants.find(v => v.value === activeVariant)?.label}</strong>
                </p>
              </div>
            </ContentArea>
          </SideNavigation>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Different visual variants for navigation items including default, ghost, and minimal styles.',
      },
    },
  },
}

// Dark Mode Example
export const DarkModeExample: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard')

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
      { id: 'projects', label: 'Projects', icon: <FileText className="h-4 w-4" /> },
      { id: 'team', label: 'Team', icon: <Users className="h-4 w-4" /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
    ]

    return (
      <div className="space-y-8">
        {/* Light Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Light Mode</h3>
          <div className="h-[300px] overflow-hidden rounded-lg border bg-white">
            <SideNavigation>
              <Sidebar title="Light Theme" width="sm">
                <div className="py-2">
                  {menuItems.slice(0, 3).map(item => (
                    <NavigationItem
                      key={`light-${item.id}`}
                      icon={item.icon}
                      isSelected={activeItem === item.id}
                      onClick={() => setActiveItem(item.id)}
                    >
                      {item.label}
                    </NavigationItem>
                  ))}
                </div>
              </Sidebar>
              <ContentArea title={menuItems.find(i => i.id === activeItem)?.label}>
                <p className="text-gray-600">Light mode content area</p>
              </ContentArea>
            </SideNavigation>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dark Mode</h3>
          <div className="dark h-[300px] overflow-hidden rounded-lg border border-gray-800 bg-[#0D0C13]">
            <SideNavigation>
              <Sidebar title="Dark Theme" width="sm">
                <div className="py-2">
                  {menuItems.slice(0, 3).map(item => (
                    <NavigationItem
                      key={`dark-${item.id}`}
                      icon={item.icon}
                      isSelected={activeItem === item.id}
                      onClick={() => setActiveItem(item.id)}
                    >
                      {item.label}
                    </NavigationItem>
                  ))}
                </div>
              </Sidebar>
              <ContentArea title={menuItems.find(i => i.id === activeItem)?.label}>
                <p className="text-gray-300">Dark mode content area</p>
              </ContentArea>
            </SideNavigation>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Side navigation component shown in both light and dark modes for comparison.',
      },
    },
  },
}

// Responsive Example
export const ResponsiveExample: Story = {
  args: {
    children: 'Navigation Content',
  },
  render: () => {
    const [activeItem, setActiveItem] = useState('overview')

    const items = [
      { id: 'overview', label: 'Overview', icon: <Home className="h-4 w-4" /> },
      { id: 'reports', label: 'Reports', icon: <FileText className="h-4 w-4" /> },
      { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
      { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
    ]

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Responsive Navigation</h3>
          <p className="text-muted-foreground text-sm">
            Resize your browser to see how the navigation adapts to different screen sizes.
          </p>
        </div>

        <div className="h-[500px] overflow-hidden rounded-lg border">
          <SideNavigation>
            <Sidebar title="App Navigation" className="min-w-0">
              <div className="py-2">
                {items.map(item => (
                  <NavigationItem
                    key={item.id}
                    icon={item.icon}
                    isSelected={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                    className="justify-center md:justify-start"
                  >
                    <span className="hidden md:inline">{item.label}</span>
                  </NavigationItem>
                ))}
              </div>
            </Sidebar>
            <ContentArea title={items.find(i => i.id === activeItem)?.label}>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This is a responsive layout that adapts to different screen sizes.
                </p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="bg-card rounded border p-4">
                    <h4 className="mb-2 font-medium">Feature 1</h4>
                    <p className="text-muted-foreground text-sm">
                      Content adapts to available space
                    </p>
                  </div>
                  <div className="bg-card rounded border p-4">
                    <h4 className="mb-2 font-medium">Feature 2</h4>
                    <p className="text-muted-foreground text-sm">Responsive grid layout</p>
                  </div>
                </div>
              </div>
            </ContentArea>
          </SideNavigation>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Responsive navigation that adapts to different screen sizes, hiding labels on smaller screens.',
      },
    },
  },
}
