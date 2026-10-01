'use client'

import { useCollection } from '@/hooks/use-collection'
import { Card, CardHeader } from '@/components/common/card'
import { DataTable } from '@/components/common/data-table'
import { ResourceDetails } from '@/components/common/resource-details'
import { formatDate, formatNumber, lookup } from '@/lib/format'
import { cropFormFields, WaterBadge } from './crop-config'

export function CropDetails({ id }) {
  const { items: fields } = useCollection('fields')
  const { items: rotations } = useCollection('rotations')
  const { items: yields } = useCollection('yields')

  return (
    <ResourceDetails
      collection="crops"
      id={id}
      singular="Crop"
      backHref="/crops"
      backLabel="All crops"
      formFields={cropFormFields}
      info={(crop) => [
        { label: 'Season', value: crop.season },
        { label: 'Growing Duration', value: `${crop.duration} days` },
        { label: 'Water Requirement', value: <WaterBadge level={crop.waterRequirement} /> },
        { label: 'Planned Rotations', value: rotations.filter((r) => r.cropId === crop.id).length },
      ]}
    >
      {(crop) => (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Where it is planned" />
            <DataTable
              rows={rotations.filter((r) => r.cropId === crop.id).sort((a, b) => a.year - b.year)}
              emptyMessage="This crop is not in any rotation plan."
              columns={[
                { key: 'fieldId', label: 'Field', render: (row) => lookup(fields, row.fieldId) },
                { key: 'year', label: 'Year' },
                { key: 'season', label: 'Season' },
              ]}
            />
          </Card>
          <Card>
            <CardHeader title="Harvest history" />
            <DataTable
              rows={yields.filter((y) => y.cropId === crop.id)}
              emptyMessage="No harvest recorded for this crop."
              columns={[
                { key: 'fieldId', label: 'Field', render: (row) => lookup(fields, row.fieldId) },
                { key: 'harvestDate', label: 'Harvest Date', render: (row) => formatDate(row.harvestDate) },
                { key: 'quantity', label: 'Quantity', render: (row) => `${formatNumber(row.quantity)} ${row.unit}` },
              ]}
            />
          </Card>
        </div>
      )}
    </ResourceDetails>
  )
}
