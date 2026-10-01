'use client'

import { Wrench } from 'lucide-react'
import { Badge } from '@/components/common/badge'
import { Card, CardHeader } from '@/components/common/card'
import { TODAY, daysFromToday, formatDate, lookup } from '@/lib/format'

export function getUpcomingMaintenance(records) {
  return records
    .filter((record) => record.nextMaintenanceDate && record.nextMaintenanceDate >= TODAY)
    .sort((a, b) => a.nextMaintenanceDate.localeCompare(b.nextMaintenanceDate))
}

export function UpcomingMaintenance({ records, equipment, limit }) {
  const upcoming = getUpcomingMaintenance(records).slice(0, limit)

  return (
    <Card>
      <CardHeader title="Upcoming Maintenance" description="Next service dates for your equipment." />
      {upcoming.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">No maintenance scheduled.</p>
      ) : (
        <ul className="divide-y divide-border">
          {upcoming.map((record) => {
            const days = daysFromToday(record.nextMaintenanceDate)
            return (
              <li key={record.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Wrench className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{lookup(equipment, record.equipmentId)}</p>
                  <p className="truncate text-xs text-muted-foreground">{formatDate(record.nextMaintenanceDate)}</p>
                </div>
                <Badge tone={days <= 7 ? 'red' : days <= 30 ? 'gold' : 'green'}>
                  {days === 0 ? 'Today' : `In ${days} day${days === 1 ? '' : 's'}`}
                </Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
