'use client'

import { Printer } from 'lucide-react'
import { useCollection } from '@/hooks/use-collection'
import { StatusBadge } from '@/components/common/badge'
import { Button } from '@/components/common/button'
import { Card, CardBody, CardHeader } from '@/components/common/card'
import { DataTable } from '@/components/common/data-table'
import { PageHeader } from '@/components/common/page-header'
import { getUpcomingMaintenance } from '@/components/maintenance/upcoming-maintenance'
import { formatCurrency, formatDate, formatNumber, lookup, sumBy, toQuintals } from '@/lib/format'
import { BarList, groupTotals } from './bar-list'

export function Reports() {
  const { items: farms } = useCollection('farms')
  const { items: fields } = useCollection('fields')
  const { items: crops } = useCollection('crops')
  const { items: rotations } = useCollection('rotations')
  const { items: expenses } = useCollection('expenses')
  const { items: yields } = useCollection('yields')
  const { items: equipment } = useCollection('equipment')
  const { items: maintenance } = useCollection('maintenance')

  const farmRows = farms.map((farm) => {
    const farmFields = fields.filter((field) => field.farmId === farm.id)
    return { ...farm, fieldCount: farmFields.length, usedArea: sumBy(farmFields, (field) => field.area) }
  })

  const cropRows = crops.map((crop) => {
    const cropExpenses = sumBy(expenses.filter((item) => item.cropId === crop.id), (item) => item.amount)
    const cropYield = sumBy(yields.filter((item) => item.cropId === crop.id), (item) => toQuintals(item.quantity, item.unit))
    return {
      ...crop,
      plans: rotations.filter((plan) => plan.cropId === crop.id).length,
      expenses: cropExpenses,
      yieldQtl: cropYield,
      costPerQtl: cropYield ? cropExpenses / cropYield : null,
    }
  })

  const expenseByCategory = groupTotals(expenses, (item) => item.category, (item) => item.amount)
  const yieldByCrop = groupTotals(yields, (item) => lookup(crops, item.cropId), (item) => toQuintals(item.quantity, item.unit))

  const equipmentRows = equipment.map((item) => {
    const records = maintenance.filter((record) => record.equipmentId === item.id)
    const next = getUpcomingMaintenance(records)[0]
    return { ...item, services: records.length, cost: sumBy(records, (record) => record.cost), nextDate: next?.nextMaintenanceDate }
  })

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        description="A summary of everything on your farms."
        action={
          <Button variant="outline" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            Print Report
          </Button>
        }
      />

      <Card>
        <CardHeader title="Farm Summary" description={`${farms.length} farms · ${fields.length} fields`} />
        <DataTable
          rows={farmRows}
          columns={[
            { key: 'name', label: 'Farm', render: (row) => <span className="font-medium">{row.name}</span> },
            { key: 'location', label: 'Location' },
            { key: 'totalArea', label: 'Total Area', render: (row) => `${formatNumber(row.totalArea)} acres` },
            { key: 'fieldCount', label: 'Fields' },
            { key: 'usedArea', label: 'Area in Fields', render: (row) => `${formatNumber(row.usedArea)} acres` },
          ]}
        />
      </Card>

      <Card>
        <CardHeader title="Crop Summary" description="Plans, spending and harvest per crop." />
        <DataTable
          rows={cropRows}
          columns={[
            { key: 'name', label: 'Crop', render: (row) => <span className="font-medium">{row.name}</span> },
            { key: 'season', label: 'Season' },
            { key: 'plans', label: 'Rotation Plans' },
            { key: 'expenses', label: 'Expenses', render: (row) => formatCurrency(row.expenses) },
            { key: 'yieldQtl', label: 'Yield', render: (row) => `${formatNumber(Math.round(row.yieldQtl))} qtl` },
            { key: 'costPerQtl', label: 'Cost / Quintal', render: (row) => (row.costPerQtl ? formatCurrency(row.costPerQtl) : '—') },
          ]}
        />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Expense Summary" description={`Total ${formatCurrency(sumBy(expenses, (item) => item.amount))}`} />
          <CardBody>
            <BarList items={expenseByCategory} formatValue={formatCurrency} emptyMessage="No expenses recorded." />
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            title="Yield Summary"
            description={`Total ${formatNumber(Math.round(sumBy(yieldByCrop, (item) => item.value)))} quintals`}
          />
          <CardBody>
            <BarList
              items={yieldByCrop}
              formatValue={(value) => `${formatNumber(Math.round(value))} qtl`}
              emptyMessage="No harvests recorded."
            />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Equipment Maintenance Summary"
          description={`Total maintenance cost ${formatCurrency(sumBy(maintenance, (record) => record.cost))}`}
        />
        <DataTable
          rows={equipmentRows}
          columns={[
            { key: 'name', label: 'Equipment', render: (row) => <span className="font-medium">{row.name}</span> },
            { key: 'type', label: 'Type' },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
            { key: 'services', label: 'Services Done' },
            { key: 'cost', label: 'Total Cost', render: (row) => formatCurrency(row.cost) },
            { key: 'nextDate', label: 'Next Due', render: (row) => formatDate(row.nextDate) },
          ]}
        />
      </Card>
    </div>
  )
}
