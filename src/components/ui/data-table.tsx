'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      striped: '[&_tbody_tr:nth-child(odd)]:bg-muted/50',
      bordered: 'border border-border',
    },
    size: {
      default: '',
      sm: 'text-xs',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & VariantProps<typeof tableVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn(tableVariants({ variant, size }), className)} {...props} />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    clickable?: boolean
    selected?: boolean
  }
>(({ className, clickable, selected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors',
      selected
        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/20 dark:hover:bg-blue-950/30'
        : 'hover:bg-muted/50 data-[state=selected]:bg-muted',
      clickable && 'cursor-pointer',
      !selected && clickable && 'hover:bg-accent/50',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    sortable?: boolean
    sortDirection?: 'asc' | 'desc' | null
    onSort?: () => void
  }
>(({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
      sortable && 'hover:text-foreground cursor-pointer select-none',
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center gap-2">
      {children}
      {sortable && (
        <div className="flex flex-col">
          {sortDirection === 'asc' ? (
            <ChevronUp className="h-3 w-3" />
          ) : sortDirection === 'desc' ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <div className="flex flex-col">
              <ChevronUp className="h-3 w-3 opacity-30" />
              <ChevronDown className="-mt-1 h-3 w-3 opacity-30" />
            </div>
          )}
        </div>
      )}
    </div>
  </th>
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

// Action cell for dropdown menus, buttons, etc.
const TableActionCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <TableCell ref={ref} className={cn('w-10 text-right', className)} {...props}>
    {children || (
      <button className="hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-md p-0">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </button>
    )}
  </TableCell>
))
TableActionCell.displayName = 'TableActionCell'

// Enhanced table with built-in sorting and selection
interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  className?: string
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'default' | 'sm' | 'lg'
  selectable?: boolean
  sortable?: boolean
  onRowClick?: (row: T, index: number) => void
  onSelectionChange?: (selectedRows: T[]) => void
}

interface DataTableColumn<T> {
  key: string
  title: string
  render?: (value: unknown, row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  variant = 'default',
  size = 'default',
  selectable = false,
  sortable = false,
  onRowClick,
  onSelectionChange,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc' | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<T[]>([])

  const handleSort = (columnKey: string) => {
    if (!sortable) return

    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (String(aValue) < String(bValue)) return sortDirection === 'asc' ? -1 : 1
      if (String(aValue) > String(bValue)) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  const handleRowSelection = (row: T, checked: boolean) => {
    const newSelectedRows = checked ? [...selectedRows, row] : selectedRows.filter(r => r !== row)

    setSelectedRows(newSelectedRows)
    onSelectionChange?.(newSelectedRows)
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...data] : []
    setSelectedRows(newSelectedRows)
    onSelectionChange?.(newSelectedRows)
  }

  return (
    <Table variant={variant} size={size} className={className}>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-10">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={e => handleSelectAll(e.target.checked)}
                className="border-input rounded border accent-blue-600"
              />
            </TableHead>
          )}
          {columns.map(column => (
            <TableHead
              key={column.key}
              sortable={column.sortable && sortable}
              sortDirection={sortColumn === column.key ? sortDirection : null}
              onSort={() => handleSort(column.key)}
              className={cn(
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right',
                column.className
              )}
              style={{ width: column.width }}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row, index) => {
          const isSelected = selectedRows.includes(row)
          return (
            <TableRow
              key={index}
              clickable={!!onRowClick}
              selected={isSelected}
              onClick={() => onRowClick?.(row, index)}
            >
              {selectable && (
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={e => handleRowSelection(row, e.target.checked)}
                    className="border-input rounded border accent-blue-600"
                  />
                </TableCell>
              )}
              {columns.map(column => (
                <TableCell
                  key={column.key}
                  className={cn(
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.className
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row, index)
                    : String(row[column.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableActionCell,
  DataTable,
  tableVariants,
  type DataTableColumn,
  type DataTableProps,
}
