'use client'

import { CrudPage } from '@/components/common/crud-page'
import { Badge } from '@/components/common/badge'
import { emptyField, getFieldFormFields } from '@/components/fields/field-config'
import { useCollection } from '@/hooks/use-collection'
import { formatNumber, lookup } from '@/lib/format'

export default function FieldsPage() {
  const { items: farms } = useCollection('farms')

  const columns = [
    { key: 'name', label: 'Field Name', render: (row) => <span className="font-medium">{row.name}</span> },
    { key: 'farmId', label: 'Farm', render: (row) => lookup(farms, row.farmId) },
    { key: 'area', label: 'Area', render: (row) => `${formatNumber(row.area)} acres` },
    { key: 'soilType', label: 'Soil Type', render: (row) => <Badge tone="gray">{row.soilType}</Badge> },
  ]

  return (
    <CrudPage
      title="Fields"
      description="Individual plots of land inside your farms."
      collection="fields"
      singular="Field"
      columns={columns}
      formFields={getFieldFormFields(farms)}
      emptyValues={emptyField}
      searchKeys={['name', 'soilType']}
      detailsHref={(field) => `/fields/${field.id}`}
    />
  )
}
