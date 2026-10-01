'use client'

import { CrudPage } from '@/components/common/crud-page'
import { UpcomingMaintenance } from '@/components/maintenance/upcoming-maintenance'
import { useCollection } from '@/hooks/use-collection'
import { formatCurrency, formatDate, lookup } from '@/lib/format'

export default function MaintenancePage() {
  const { items: equipment } = useCollection('equipment')
  const { items: records } = useCollection('maintenance')

  const formFields = [
    {
      name: 'equipmentId',
      label: 'Equipment',
      type: 'select',
      required: true,
      fullWidth: true,
      options: equipment.map((item) => ({ value: item.id, label: `${item.name} (${item.type})` })),
    },
    { name: 'maintenanceDate', label: 'Maintenance Date', type: 'date', required: true },
    { name: 'nextMaintenanceDate', label: 'Next Maintenance Date', type: 'date' },
    { name: 'cost', label: 'Cost (₹)', type: 'number', required: true, min: 0 },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'What was serviced?' },
  ]

  const columns = [
    { key: 'equipmentId', label: 'Equipment', render: (row) => <span className="font-medium">{lookup(equipment, row.equipmentId)}</span> },
    { key: 'maintenanceDate', label: 'Maintenance Date', render: (row) => formatDate(row.maintenanceDate) },
    { key: 'nextMaintenanceDate', label: 'Next Due', render: (row) => formatDate(row.nextMaintenanceDate) },
    { key: 'cost', label: 'Cost', render: (row) => formatCurrency(row.cost) },
    { key: 'description', label: 'Description', render: (row) => <span className="text-muted-foreground">{row.description || '—'}</span> },
  ]

  return (
    <CrudPage
      title="Maintenance"
      description="Service history and upcoming maintenance for your equipment."
      collection="maintenance"
      singular="Maintenance"
      columns={columns}
      formFields={formFields}
      emptyValues={{ equipmentId: '', maintenanceDate: '', nextMaintenanceDate: '', cost: '', description: '' }}
      searchKeys={['description']}
      sortRows={(a, b) => b.maintenanceDate.localeCompare(a.maintenanceDate)}
    >
      <UpcomingMaintenance records={records} equipment={equipment} />
      <h2 className="-mb-2 text-lg font-semibold">Maintenance History</h2>
    </CrudPage>
  )
}
