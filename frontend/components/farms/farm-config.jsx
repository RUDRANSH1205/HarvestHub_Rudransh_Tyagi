import { formatNumber } from '@/lib/format'

export const farmFormFields = [
  { name: 'name', label: 'Farm Name', required: true, fullWidth: true, placeholder: 'e.g. Green Valley Farm' },
  { name: 'location', label: 'Location', required: true, placeholder: 'Village, District, State' },
  { name: 'totalArea', label: 'Total Area (acres)', type: 'number', required: true, min: 0, step: 0.1 },
]

export const emptyFarm = { name: '', location: '', totalArea: '' }

export const farmColumns = [
  { key: 'name', label: 'Farm Name', render: (row) => <span className="font-medium">{row.name}</span> },
  { key: 'location', label: 'Location' },
  { key: 'totalArea', label: 'Total Area', render: (row) => `${formatNumber(row.totalArea)} acres` },
]
