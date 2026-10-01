'use client'

import { CrudPage } from '@/components/common/crud-page'
import { Badge } from '@/components/common/badge'
import { useCollection } from '@/hooks/use-collection'
import { OPERATION_TYPES, TODAY, formatDate, lookup } from '@/lib/format'

export default function OperationsPage() {
  const { items: fields } = useCollection('fields')

  const formFields = [
    {
      name: 'fieldId',
      label: 'Field',
      type: 'select',
      required: true,
      options: fields.map((field) => ({ value: field.id, label: field.name })),
    },
    { name: 'type', label: 'Operation Type', type: 'select', required: true, options: OPERATION_TYPES },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Any details about this work' },
  ]

  const columns = [
    { key: 'type', label: 'Operation', render: (row) => <span className="font-medium">{row.type}</span> },
    { key: 'fieldId', label: 'Field', render: (row) => lookup(fields, row.fieldId) },
    { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (row.date >= TODAY ? <Badge tone="gold">Upcoming</Badge> : <Badge tone="gray">Completed</Badge>),
    },
    { key: 'notes', label: 'Notes', render: (row) => <span className="text-muted-foreground">{row.notes || '—'}</span> },
  ]

  return (
    <CrudPage
      title="Field Operations"
      description="Schedule and track work done on your fields."
      collection="operations"
      singular="Operation"
      columns={columns}
      formFields={formFields}
      emptyValues={{ fieldId: '', type: '', date: TODAY, notes: '' }}
      searchKeys={['type', 'notes']}
      sortRows={(a, b) => b.date.localeCompare(a.date)}
    />
  )
}
