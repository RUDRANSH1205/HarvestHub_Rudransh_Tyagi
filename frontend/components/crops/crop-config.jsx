import { Badge } from '@/components/common/badge'
import { SEASONS, WATER_LEVELS } from '@/lib/format'

export const cropFormFields = [
  { name: 'name', label: 'Crop Name', required: true, placeholder: 'e.g. Wheat' },
  { name: 'season', label: 'Season', type: 'select', required: true, options: SEASONS },
  { name: 'duration', label: 'Growing Duration (days)', type: 'number', required: true, min: 1 },
  { name: 'waterRequirement', label: 'Water Requirement', type: 'select', required: true, options: WATER_LEVELS },
]

export const emptyCrop = { name: '', season: '', duration: '', waterRequirement: '' }

const waterTone = { Low: 'gray', Medium: 'gold', High: 'green' }

export function WaterBadge({ level }) {
  return <Badge tone={waterTone[level] || 'gray'}>{level}</Badge>
}

export const cropColumns = [
  { key: 'name', label: 'Crop Name', render: (row) => <span className="font-medium">{row.name}</span> },
  { key: 'season', label: 'Season' },
  { key: 'duration', label: 'Growing Duration', render: (row) => `${row.duration} days` },
  { key: 'waterRequirement', label: 'Water Requirement', render: (row) => <WaterBadge level={row.waterRequirement} /> },
]
