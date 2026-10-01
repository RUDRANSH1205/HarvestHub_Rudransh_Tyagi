'use client'

import { useCollection } from '@/hooks/use-collection'
import { Badge } from '@/components/common/badge'
import { Card, CardHeader } from '@/components/common/card'
import { DataTable } from '@/components/common/data-table'
import { ResourceDetails } from '@/components/common/resource-details'
import { formatCurrency, formatDate, formatNumber, lookup } from '@/lib/format'
import { getFieldFormFields } from './field-config'

export function FieldDetails({ id }) {
  const { items: farms } = useCollection('farms')
  const { items: crops } = useCollection('crops')
  const { items: rotations } = useCollection('rotations')
  const { items: operations } = useCollection('operations')
  const { items: expenses } = useCollection('expenses')

  return (
    <ResourceDetails
      collection="fields"
      id={id}
      singular="Field"
      backHref="/fields"
      backLabel="All fields"
      formFields={getFieldFormFields(farms)}
      info={(field) => {
        const fieldExpenses = expenses.filter((expense) => expense.fieldId === field.id)
        return [
          { label: 'Farm', value: lookup(farms, field.farmId) },
          { label: 'Area', value: `${formatNumber(field.area)} acres` },
          { label: 'Soil Type', value: field.soilType },
          { label: 'Total Expenses', value: formatCurrency(fieldExpenses.reduce((sum, e) => sum + Number(e.amount), 0)) },
        ]
      }}
    >
      {(field) => (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Rotation plan" />
            <DataTable
              rows={rotations.filter((r) => r.fieldId === field.id).sort((a, b) => a.year - b.year)}
              emptyMessage="No rotation planned for this field."
              columns={[
                { key: 'year', label: 'Year' },
                { key: 'season', label: 'Season' },
                { key: 'cropId', label: 'Crop', render: (row) => lookup(crops, row.cropId) },
              ]}
            />
          </Card>
          <Card>
            <CardHeader title="Field operations" />
            <DataTable
              rows={operations.filter((o) => o.fieldId === field.id).sort((a, b) => b.date.localeCompare(a.date))}
              emptyMessage="No operations recorded for this field."
              columns={[
                { key: 'type', label: 'Operation', render: (row) => <Badge>{row.type}</Badge> },
                { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
              ]}
            />
          </Card>
        </div>
      )}
    </ResourceDetails>
  )
}
