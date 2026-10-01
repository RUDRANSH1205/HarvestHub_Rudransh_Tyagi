// Today's date as "YYYY-MM-DD" (same format as <input type="date">)
export const TODAY = new Date().toISOString().slice(0, 10)

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0)
}

export function formatDate(isoDate) {
  if (!isoDate) return '—'
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function daysFromToday(isoDate) {
  const today = new Date(`${TODAY}T00:00:00`)
  const target = new Date(`${isoDate}T00:00:00`)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

// Finds a record by id and returns one of its properties (used for "Farm name" etc.)
export function lookup(list, id, key = 'name') {
  const found = list.find((item) => item.id === id)
  return found ? found[key] : '—'
}

// Converts any yield entry to quintals so different units can be added together
export function toQuintals(quantity, unit) {
  const value = Number(quantity) || 0
  if (unit === 'Kg') return value / 100
  if (unit === 'Tonne') return value * 10
  return value
}

export function sumBy(list, getValue) {
  return list.reduce((total, item) => total + (Number(getValue(item)) || 0), 0)
}

export const CURRENT_YEAR = Number(TODAY.slice(0, 4))

export const SEASONS = ['Kharif', 'Rabi', 'Zaid']
export const SOIL_TYPES = ['Loamy', 'Clay', 'Sandy', 'Sandy Loam', 'Alluvial', 'Black Soil', 'Red Soil']
export const WATER_LEVELS = ['Low', 'Medium', 'High']
export const OPERATION_TYPES = [
  'Ploughing',
  'Sowing',
  'Irrigation',
  'Fertilization',
  'Pesticide Application',
  'Weeding',
  'Harvesting',
]
export const EXPENSE_CATEGORIES = ['Seeds', 'Fertilizer', 'Pesticide', 'Labour', 'Irrigation', 'Fuel', 'Machinery', 'Other']
export const YIELD_UNITS = ['Quintal', 'Kg', 'Tonne']
export const EQUIPMENT_TYPES = ['Tractor', 'Water Pump', 'Harvester', 'Sprayer', 'Tiller', 'Seed Drill', 'Other']
export const EQUIPMENT_STATUSES = ['Active', 'Under Maintenance', 'Inactive']
