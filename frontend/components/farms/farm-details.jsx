'use client'

import Link from 'next/link'
import { useCollection } from '@/hooks/use-collection'
import { Card, CardHeader } from '@/components/common/card'
import { DataTable } from '@/components/common/data-table'
import { ResourceDetails } from '@/components/common/resource-details'
import { formatNumber } from '@/lib/format'
import { farmFormFields } from './farm-config'

export function FarmDetails({ id }) {
  const { items: fields } = useCollection('fields')

  return (
    <ResourceDetails
      collection="farms"
      id={id}
      singular="Farm"
      backHref="/farms"
      backLabel="All farms"
      formFields={farmFormFields}
      info={(farm) => {
        const farmFields = fields.filter((field) => field.farmId === farm.id)
        const usedArea = farmFields.reduce((sum, field) => sum + Number(field.area), 0)
        return [
          { label: 'Location', value: farm.location },
          { label: 'Total Area', value: `${formatNumber(farm.totalArea)} acres` },
          { label: 'Fields', value: farmFields.length },
          { label: 'Area in Fields', value: `${formatNumber(usedArea)} acres` },
        ]
      }}
    >
      {(farm) => (
        <Card>
          <CardHeader title="Fields on this farm" />
          <DataTable
            rows={fields.filter((field) => field.farmId === farm.id)}
            emptyMessage="No fields added to this farm yet."
            columns={[
              {
                key: 'name',
                label: 'Field Name',
                render: (row) => (
                  <Link href={`/fields/${row.id}`} className="font-medium text-primary hover:underline">
                    {row.name}
                  </Link>
                ),
              },
              { key: 'area', label: 'Area', render: (row) => `${formatNumber(row.area)} acres` },
              { key: 'soilType', label: 'Soil Type' },
            ]}
          />
        </Card>
      )}
    </ResourceDetails>
  )
}
