import Link from 'next/link'
import { CalendarClock } from 'lucide-react'
import { Badge } from '@/components/common/badge'
import { Card, CardHeader } from '@/components/common/card'
import { TODAY, daysFromToday, formatDate, lookup } from '@/lib/format'

export function UpcomingOperations({ operations, fields, limit }) {
  const upcoming = operations
    .filter((operation) => operation.date >= TODAY)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)

  return (
    <Card>
      <CardHeader
        title="Upcoming Field Operations"
        action={
          <Link href="/operations" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        }
      />
      {upcoming.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">No operations scheduled.</p>
      ) : (
        <ul className="divide-y divide-border">
          {upcoming.map((operation) => {
            const days = daysFromToday(operation.date)
            return (
              <li key={operation.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <CalendarClock className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {operation.type} · {lookup(fields, operation.fieldId)}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{formatDate(operation.date)}</p>
                </div>
                <Badge tone={days <= 3 ? 'gold' : 'green'}>{days === 0 ? 'Today' : `In ${days} day${days === 1 ? '' : 's'}`}</Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
