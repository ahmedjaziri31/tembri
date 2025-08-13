'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Building,
  DollarSign,
  ChevronDown,
  Activity,
  Target
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  location: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  source: 'website' | 'referral' | 'social-media' | 'email-campaign' | 'cold-outreach' | 'event'
  dealValue: number
  currency: string
  assignedTo: string
  tags: string[]
  lastContact: string
  nextFollowUp?: string
  createdAt: string
  updatedAt: string
  notes?: string
  interactionsCount: number
}

export default function CRMPage() {
  const router = useRouter()
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      position: 'CTO',
      location: 'San Francisco, CA',
      status: 'qualified',
      source: 'website',
      dealValue: 50000,
      currency: 'USD',
      assignedTo: 'Jaziri Ahmed',
      tags: ['Enterprise', 'High Priority', 'Tech'],
      lastContact: '2024-01-15',
      nextFollowUp: '2024-01-20',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      notes: 'Interested in enterprise solution for team of 200+',
      interactionsCount: 8
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@designstudio.com',
      phone: '+1 (555) 987-6543',
      company: 'Creative Design Studio',
      position: 'Creative Director',
      location: 'New York, NY',
      status: 'proposal',
      source: 'referral',
      dealValue: 25000,
      currency: 'USD',
      assignedTo: 'Jaziri Ahmed',
      tags: ['Design', 'Creative', 'Mid-size'],
      lastContact: '2024-01-14',
      nextFollowUp: '2024-01-18',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-14',
      notes: 'Looking for design collaboration tools',
      interactionsCount: 12
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 456-7890',
      company: 'InnovateTech Startup',
      position: 'Founder & CEO',
      location: 'Austin, TX',
      status: 'new',
      source: 'social-media',
      dealValue: 15000,
      currency: 'USD',
      assignedTo: 'Jaziri Ahmed',
      tags: ['Startup', 'SaaS', 'Young Company'],
      lastContact: '2024-01-13',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
      notes: 'Startup looking for growth tools',
      interactionsCount: 3
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@retailchain.com',
      phone: '+1 (555) 234-5678',
      company: 'Retail Chain Inc',
      position: 'Operations Manager',
      location: 'Chicago, IL',
      status: 'closed-won',
      source: 'email-campaign',
      dealValue: 75000,
      currency: 'USD',
      assignedTo: 'Jaziri Ahmed',
      tags: ['Retail', 'Large Deal', 'Operations'],
      lastContact: '2024-01-12',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12',
      notes: 'Successfully closed - retail management solution',
      interactionsCount: 15
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterSource, setFilterSource] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    const matchesSource = filterSource === 'all' || customer.source === filterSource
    
    return matchesSearch && matchesStatus && matchesSource
  })

  // Pagination logic
  const totalItems = filteredCustomers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

  const sources = Array.from(new Set(customers.map(customer => customer.source)))
  const statuses = ['all', 'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'contacted': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'qualified': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'proposal': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'negotiation': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'closed-won': return 'bg-green-100 text-green-800 border-green-200'
      case 'closed-lost': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: Customer['status']) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4 text-blue-500" />
      case 'contacted': return <Phone className="w-4 h-4 text-purple-500" />
      case 'qualified': return <Target className="w-4 h-4 text-yellow-500" />
      case 'proposal': return <Eye className="w-4 h-4 text-orange-500" />
      case 'negotiation': return <Activity className="w-4 h-4 text-indigo-500" />
      case 'closed-won': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'closed-lost': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    return formatter.format(amount)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return
    
    setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id))
    setShowDeleteModal(false)
    setSelectedCustomer(null)
  }

  const handleUpdateStatus = async (customer: Customer, newStatus: Customer['status']) => {
    setIsProcessing(customer.id)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedCustomer: Customer = {
        ...customer,
        status: newStatus,
        updatedAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0]
      }

      setCustomers(prev => prev.map(c => c.id === customer.id ? updatedCustomer : c))
      setActiveDropdown(null)
    } catch (error) {
      console.error('Error updating customer status:', error)
    } finally {
      setIsProcessing(null)
    }
  }

  const handleEmailCustomer = (customer: Customer) => {
    const subject = encodeURIComponent(`Follow up - ${customer.company}`)
    const body = encodeURIComponent(`Hi ${customer.firstName},

I hope this email finds you well. I wanted to follow up on our previous conversation regarding ${customer.company}'s needs.

Best regards,
${customer.assignedTo}`)

    const mailtoUrl = `mailto:${customer.email}?subject=${subject}&body=${body}`
    window.location.href = mailtoUrl
    setActiveDropdown(null)
  }

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowDeleteModal(true)
    setActiveDropdown(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Users className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">CRM Management</h1>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customers & Leads</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage customer relationships and sales pipeline
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/crm/new')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Lead
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All</option>
                {statuses.slice(1).map(status => (
                  <option 
                    key={status} 
                    value={status}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Deal Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No customers found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Get started by adding your first lead or customer
                      </p>
                      <Button onClick={() => router.push('/dashboard/crm/new')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Lead
                      </Button>
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {customer.firstName[0]}{customer.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {customer.firstName} {customer.lastName}
                              </div>
                              {getStatusIcon(customer.status)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {customer.email}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {customer.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {customer.company}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {customer.position}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {customer.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {customer.tags.length > 2 && (
                            <span className="text-xs text-gray-500">+{customer.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(customer.status)} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {customer.status.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          {formatCurrency(customer.dealValue, customer.currency)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {customer.interactionsCount} interactions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(customer.lastContact)}
                        </div>
                        {customer.nextFollowUp && (
                          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                            Follow up: {formatDate(customer.nextFollowUp)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === customer.id ? null : customer.id)
                            }}
                            className="p-1"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === customer.id && (
                            <div 
                              className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/crm/${customer.id}/activities`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Activity className="w-4 h-4 mr-2" />
                                  View Activities ({customer.interactionsCount})
                                </button>
                                
                                <button
                                  onClick={() => {
                                    router.push(`/dashboard/crm/${customer.id}/edit`)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </button>
                                
                                <button
                                  onClick={() => handleEmailCustomer(customer)}
                                  className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </button>
                                
                                <button
                                  onClick={() => window.open(`tel:${customer.phone}`, '_self')}
                                  className="flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call Customer
                                </button>
                                
                                {customer.status !== 'closed-won' && customer.status !== 'closed-lost' && (
                                  <button
                                    onClick={() => handleUpdateStatus(customer, 'qualified')}
                                    disabled={isProcessing === customer.id}
                                    className="flex items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                                  >
                                    <Target className="w-4 h-4 mr-2" />
                                    {isProcessing === customer.id ? 'Updating...' : 'Mark Qualified'}
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => openDeleteModal(customer)}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginatedCustomers.length > 0 && (
            <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} customers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Show:</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 pr-7 text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                  >
                    <option value={5} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">5</option>
                    <option value={10} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">10</option>
                    <option value={20} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">20</option>
                    <option value={50} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300 px-3">
                    {currentPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-modal-in">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Delete Customer
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{selectedCustomer.firstName} {selectedCustomer.lastName}" from {selectedCustomer.company}? This action cannot be undone and will remove all interaction history.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteCustomer}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 