import { SEASONS } from '@/lib/format'

// Sort plans by year, then by season order (Kharif → Rabi → Zaid)
export function sortPlans(plans) {
  return [...plans].sort((a, b) => a.year - b.year || SEASONS.indexOf(a.season) - SEASONS.indexOf(b.season))
}

/**
 * Returns the ids of plans where a field grows the same crop
 * as its previous plan. Good crop rotation avoids this.
 */
export function findRepeatedPlans(plans) {
  const repeated = new Set()
  const byField = {}
  plans.forEach((plan) => {
    byField[plan.fieldId] = byField[plan.fieldId] || []
    byField[plan.fieldId].push(plan)
  })

  Object.values(byField).forEach((fieldPlans) => {
    const sorted = sortPlans(fieldPlans)
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].cropId === sorted[i - 1].cropId) {
        repeated.add(sorted[i].id)
        repeated.add(sorted[i - 1].id)
      }
    }
  })
  return repeated
}
