'use client'

import Image from 'next/image'
import { Grid2x2, IndianRupee, Sprout, Warehouse, Wheat } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { useCollection } from '@/hooks/use-collection'
import { Button } from '@/components/common/button'
import { StatCard } from '@/components/common/stat-card'
import { UpcomingMaintenance } from '@/components/maintenance/upcoming-maintenance'
import { CURRENT_YEAR, formatCurrency, formatNumber, sumBy, toQuintals } from '@/lib/format'
import { UpcomingOperations } from './upcoming-operations'

export function Dashboard() {
  const { user } = useAuth()
  const { items: farms } = useCollection('farms')
  const { items: fields } = useCollection('fields')
  const { items: rotations } = useCollection('rotations')
  const { items: expenses } = useCollection('expenses')
  const { items: yields } = useCollection('yields')
  const { items: operations } = useCollection('operations')
  const { items: equipment } = useCollection('equipment')
  const { items: maintenance } = useCollection('maintenance')

  // "Active" crops = different crops planned on any field this year
  const activeCrops = new Set(rotations.filter((plan) => Number(plan.year) === CURRENT_YEAR).map((plan) => plan.cropId)).size
  const totalExpenses = sumBy(expenses, (item) => item.amount)
  const totalYield = sumBy(yields, (item) => toQuintals(item.quantity, item.unit))
  const firstName = user?.fullName?.split(' ')[0] || 'Farmer'

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-xl bg-primary text-primary-foreground">
        <Image src="/images/farm-fields.png" alt="" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover opacity-30" />
        <div className="relative flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium opacity-90">Welcome back,</p>
            <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">{firstName}</h1>
            <p className="max-w-md text-sm leading-relaxed opacity-90 text-pretty">
              Here is a quick look at your farms, crops, and upcoming work for {CURRENT_YEAR}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/operations" variant="secondary">
              Plan an Operation
            </Button>
            <Button href="/costs" variant="secondary">
              Add Expense
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <StatCard label="Total Farms" value={farms.length} icon={Warehouse} />
        <StatCard label="Total Fields" value={fields.length} icon={Grid2x2} />
        <StatCard label="Active Crops" value={activeCrops} icon={Sprout} hint={`Planned in ${CURRENT_YEAR}`} />
        <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} icon={IndianRupee} />
        <StatCard label="Total Yield" value={`${formatNumber(Math.round(totalYield))} qtl`} icon={Wheat} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingOperations operations={operations} fields={fields} limit={5} />
        <UpcomingMaintenance records={maintenance} equipment={equipment} limit={5} />
      </div>
    </div>
  )
}
