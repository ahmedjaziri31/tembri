'use client'

import { useState, useEffect, useCallback } from 'react'

import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  DollarSign,
  ChevronDown,
  Activity,
  Target
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { crmApi } from '../../../lib/api'
import { OverlayDropdown } from '../../../components/ui/overlay-dropdown'

interface Customer {
  _id: string
  type?: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  displayName?: string
  email?: string
  phone?: string
  addresses?: Array<{
    city?: string
    state?: string
    country?: string
  }>
  status?: 'lead' | 'prospect' | 'customer' | 'inactive' | 'lost'
  source?: string
  assignedTo?: {
    _id?: string
    firstName?: string
    lastName?: string
  }
  tags?: string[]
  priority?: string
  lifecycle?: { 
    stage?: string
    lastContact?: string
    nextContact?: string
  }
  value?: { 
    estimatedValue?: number
    currency?: string
  }
  engagement?: { 
    totalActivities?: number
  }
  createdAt?: string
  updatedAt?: string
  notes?: string
}

export default function CRMPage() {
  const router = useRouter()
  
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  // Fetch customers from API
  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: Record<string, string> = {}
      if (searchTerm.trim()) params.search = searchTerm.trim()
      if (filterStatus !== 'all') params.status = filterStatus
      
      const response = await crmApi.getAll(params)
      if (response.success) {
        setCustomers((response.data as {customers?: Customer[]})?.customers || [])
      } else {
        setError((response as {error?: {message: string}})?.error?.message || 'Failed to load customers')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }, [searchTerm, filterStatus])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // Pagination logic - customers are already filtered by the API
  const totalItems = customers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCustomers = customers.slice(startIndex, endIndex)
  const statuses = ['all', 'lead', 'prospect', 'customer', 'inactive', 'lost']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'prospect': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'customer': return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'lost': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'lead': return <Clock className="w-4 h-4 text-blue-500" />
      case 'prospect': return <Target className="w-4 h-4 text-yellow-500" />
      case 'customer': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive': return <Phone className="w-4 h-4 text-gray-500" />
      case 'lost': return <AlertCircle className="w-4 h-4 text-red-500" />
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

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return
    
    try {
      await crmApi.delete(selectedCustomer._id)
      setCustomers(customers.filter(customer => customer._id !== selectedCustomer._id))
      setShowDeleteModal(false)
      setSelectedCustomer(null)
      setSuccessMessage('Customer deleted successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete customer')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleUpdateStatus = async (customer: Customer, action: string) => {
    const id = customer._id
    setIsProcessing(id)
    
    try {
      // Mark qualified: set status to 'prospect' and lifecycle.stage to 'consideration'
      const payload = action === 'qualified'
        ? { 
            status: 'prospect',
            lifecycle: { 
              stage: 'consideration',
              lastContact: new Date().toISOString()
            }
          }
        : { status: action }
      
      await crmApi.update(id, payload)
      await fetchCustomers() // Refresh the list
      setActiveDropdown(null)
      setSuccessMessage('Customer status updated successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update customer status')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsProcessing(null)
    }
  }

  const handleEmailCustomer = (customer: Customer) => {
    const firstName = customer.firstName || customer.displayName?.split(' ')[0] || 'Customer'
    const company = customer.companyName || 'your company'
    const subject = encodeURIComponent(`Follow up - ${company}`)
    const body = encodeURIComponent(`Hi ${firstName},

I hope this email finds you well. I wanted to follow up on our previous conversation regarding ${company}'s needs.

Best regards,
Sales Team`)

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

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg dark:bg-green-900/50 dark:border-green-800 dark:text-green-300">
            {successMessage}
          </div>
        )}

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
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading customers...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedCustomers.length === 0 ? (
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
                    <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {(customer.displayName || `${customer.firstName || ''} ${customer.lastName || ''}`).trim().slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {customer.displayName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Unknown'}
                              </div>
                              {getStatusIcon(customer.status || 'lead')}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {customer.email || '—'}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {customer.addresses?.[0]
                                ? `${customer.addresses[0].city || ''}${customer.addresses[0].city && customer.addresses[0].state ? ', ' : ''}${customer.addresses[0].state || ''}`
                                : '—'
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {customer.companyName || '—'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {customer.type || '—'}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(customer.tags || []).slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {(customer.tags || []).length > 2 && (
                            <span className="text-xs text-gray-500">+{(customer.tags || []).length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`${getStatusColor(customer.status || 'lead')} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                        >
                          {(customer.status || 'lead').replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          {formatCurrency(customer.value?.estimatedValue || 0, customer.value?.currency || 'USD')}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {customer.engagement?.totalActivities || 0} interactions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {customer.lifecycle?.lastContact ? formatDate(customer.lifecycle.lastContact) : '—'}
                        </div>
                        {customer.lifecycle?.nextContact && (
                          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                            Follow up: {formatDate(customer.lifecycle.nextContact)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <OverlayDropdown
                          isOpen={activeDropdown === customer._id}
                          onToggle={() => setActiveDropdown(activeDropdown === customer._id ? null : customer._id)}
                          onClose={() => setActiveDropdown(null)}
                        >
                          <button
                            onClick={() => {
                              router.push(`/dashboard/crm/${customer._id}/activities`)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Activity className="w-4 h-4 mr-2" />
                            View Activities ({customer.engagement?.totalActivities || 0})
                          </button>
                          
                          <button
                            onClick={() => {
                              router.push(`/dashboard/crm/${customer._id}/edit`)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => {
                              handleEmailCustomer(customer)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </button>
                          
                          <button
                            onClick={() => {
                              window.open(`tel:${customer.phone || ''}`, '_self')
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Customer
                          </button>
                          
                          {customer.status !== 'customer' && (
                            <button
                              onClick={() => {
                                handleUpdateStatus(customer, 'qualified')
                                setActiveDropdown(null)
                              }}
                              disabled={isProcessing === customer._id}
                              className="flex items-center px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left disabled:opacity-50"
                            >
                              <Target className="w-4 h-4 mr-2" />
                              {isProcessing === customer._id ? 'Updating...' : 'Mark Qualified'}
                            </button>
                          )}
                          
                          <button
                            onClick={() => {
                              openDeleteModal(customer)
                              setActiveDropdown(null)
                            }}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </OverlayDropdown>
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
                Are you sure you want to delete &ldquo;{selectedCustomer.displayName || `${selectedCustomer.firstName || ''} ${selectedCustomer.lastName || ''}`.trim() || 'this customer'}&rdquo; from {selectedCustomer.companyName || 'their company'}? This action cannot be undone and will remove all interaction history.
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
 