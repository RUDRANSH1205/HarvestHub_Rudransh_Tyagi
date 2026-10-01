'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, IndianRupee, Wheat } from 'lucide-react'
import { StatCard } from '@/components/common/stat-card'
import { useCollection } from '@/hooks/use-collection'
import { formatCurrency, formatNumber, sumBy, toQuintals } from '@/lib/format'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/costs', label: 'Expenses' },
  { href: '/costs/yield', label: 'Yield' },
]

// Cost per unit = total expenses ÷ total yield (in quintals)
export function useCostTotals() {
  const { items: expenses } = useCollection('expenses')
  const { items: yields } = useCollection('yields')
  const totalExpenses = sumBy(expenses, (item) => item.amount)
  const totalYield = sumBy(yields, (item) => toQuintals(item.quantity, item.unit))
  const costPerUnit = totalYield > 0 ? totalExpenses / totalYield : 0
  return { totalExpenses, totalYield, costPerUnit }
}

export function CostSummary() {
  const pathname = usePathname()
  const { totalExpenses, totalYield, costPerUnit } = useCostTotals()

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} icon={IndianRupee} />
        <StatCard label="Total Yield" value={`${formatNumber(Math.round(totalYield))} qtl`} icon={Wheat} hint="All units converted to quintals" />
        <StatCard
          label="Cost per Quintal"
          value={costPerUnit ? formatCurrency(costPerUnit) : '—'}
          icon={Calculator}
          hint="Total expenses ÷ total yield"
        />
      </div>

      <nav aria-label="Costs and yield sections" className="flex w-fit gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'rounded-md px-4 py-1.5 text-sm font-medium',
                isActive ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
