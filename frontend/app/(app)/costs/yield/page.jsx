'use client'

import { CrudPage } from '@/components/common/crud-page'
import { CostSummary } from '@/components/costs/cost-summary'
import { useCollection } from '@/hooks/use-collection'
import { TODAY, YIELD_UNITS, formatDate, formatNumber, lookup } from '@/lib/format'

export default function YieldPage() {
  const { items: fields } = useCollection('fields')
  const { items: crops } = useCollection('crops')

  const formFields = [
    { name: 'fieldId', label: 'Field', type: 'select', required: true, options: fields.map((f) => ({ value: f.id, label: f.name })) },
    { name: 'cropId', label: 'Crop', type: 'select', required: true, options: crops.map((c) => ({ value: c.id, label: c.name })) },
    { name: 'harvestDate', label: 'Harvest Date', type: 'date', required: true },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true, min: 0, step: 'any' },
    { name: 'unit', label: 'Unit', type: 'select', required: true, options: YIELD_UNITS },
  ]

  const columns = [
    { key: 'harvestDate', label: 'Harvest Date', render: (row) => formatDate(row.harvestDate) },
    { key: 'cropId', label: 'Crop', render: (row) => <span className="font-medium">{lookup(crops, row.cropId)}</span> },
    { key: 'fieldId', label: 'Field', render: (row) => lookup(fields, row.fieldId) },
    { key: 'quantity', label: 'Quantity', render: (row) => `${formatNumber(row.quantity)} ${row.unit}` },
  ]

  return (
    <CrudPage
      title="Costs & Yield"
      description="Record spending and harvests to see your cost per unit."
      collection="yields"
      singular="Yield"
      columns={columns}
      formFields={formFields}
      emptyValues={{ fieldId: '', cropId: '', harvestDate: TODAY, quantity: '', unit: 'Quintal' }}
      searchKeys={['unit']}
      sortRows={(a, b) => b.harvestDate.localeCompare(a.harvestDate)}
    >
      <CostSummary />
    </CrudPage>
  )
}
