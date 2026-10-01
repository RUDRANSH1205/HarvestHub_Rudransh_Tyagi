'use client'

import { Badge } from '@/components/common/badge'
import { CrudPage } from '@/components/common/crud-page'
import { CostSummary } from '@/components/costs/cost-summary'
import { useCollection } from '@/hooks/use-collection'
import { EXPENSE_CATEGORIES, TODAY, formatCurrency, formatDate, lookup } from '@/lib/format'

export default function ExpensesPage() {
  const { items: fields } = useCollection('fields')
  const { items: crops } = useCollection('crops')

  const formFields = [
    { name: 'fieldId', label: 'Field', type: 'select', required: true, options: fields.map((f) => ({ value: f.id, label: f.name })) },
    { name: 'cropId', label: 'Crop', type: 'select', required: true, options: crops.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'category', label: 'Category', type: 'select', required: true, options: EXPENSE_CATEGORIES },
    { name: 'amount', label: 'Amount (₹)', type: 'number', required: true, min: 0 },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'e.g. Urea 5 bags' },
  ]

  const columns = [
    { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
    { key: 'category', label: 'Category', render: (row) => <Badge tone="gray">{row.category}</Badge> },
    { key: 'fieldId', label: 'Field', render: (row) => lookup(fields, row.fieldId) },
    { key: 'cropId', label: 'Crop', render: (row) => lookup(crops, row.cropId) },
    { key: 'amount', label: 'Amount', render: (row) => <span className="font-medium">{formatCurrency(row.amount)}</span> },
    { key: 'description', label: 'Description', render: (row) => <span className="text-muted-foreground">{row.description || '—'}</span> },
  ]

  return (
    <CrudPage
      title="Costs & Yield"
      description="Record spending and harvests to see your cost per unit."
      collection="expenses"
      singular="Expense"
      columns={columns}
      formFields={formFields}
      emptyValues={{ fieldId: '', cropId: '', category: '', amount: '', date: TODAY, description: '' }}
      searchKeys={['category', 'description']}
      sortRows={(a, b) => b.date.localeCompare(a.date)}
    >
      <CostSummary />
    </CrudPage>
  )
}
