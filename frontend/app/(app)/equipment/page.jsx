'use client'

import { CrudPage } from '@/components/common/crud-page'
import { StatusBadge } from '@/components/common/badge'
import { EQUIPMENT_STATUSES, EQUIPMENT_TYPES, formatDate } from '@/lib/format'

const formFields = [
  { name: 'name', label: 'Equipment Name', required: true, fullWidth: true, placeholder: 'e.g. Mahindra 575 DI' },
  { name: 'type', label: 'Equipment Type', type: 'select', required: true, options: EQUIPMENT_TYPES },
  { name: 'status', label: 'Status', type: 'select', required: true, options: EQUIPMENT_STATUSES },
  { name: 'purchaseDate', label: 'Purchase Date', type: 'date', required: true },
]

const columns = [
  { key: 'name', label: 'Equipment Name', render: (row) => <span className="font-medium">{row.name}</span> },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  { key: 'purchaseDate', label: 'Purchase Date', render: (row) => formatDate(row.purchaseDate) },
]

export default function EquipmentPage() {
  return (
    <CrudPage
      title="Equipment"
      description="Tractors, pumps, harvesters and other machinery."
      collection="equipment"
      singular="Equipment"
      columns={columns}
      formFields={formFields}
      emptyValues={{ name: '', type: '', status: 'Active', purchaseDate: '' }}
      searchKeys={['name', 'type', 'status']}
    />
  )
}
