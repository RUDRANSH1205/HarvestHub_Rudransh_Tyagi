import { SOIL_TYPES } from '@/lib/format'

export function getFieldFormFields(farms) {
  return [
    { name: 'name', label: 'Field Name', required: true, placeholder: 'e.g. North Field' },
    {
      name: 'farmId',
      label: 'Farm',
      type: 'select',
      required: true,
      options: farms.map((farm) => ({ value: farm.id, label: farm.name })),
    },
    { name: 'area', label: 'Area (acres)', type: 'number', required: true, min: 0, step: 0.1 },
    { name: 'soilType', label: 'Soil Type', type: 'select', required: true, options: SOIL_TYPES },
  ]
}

export const emptyField = { name: '', farmId: '', area: '', soilType: '' }
