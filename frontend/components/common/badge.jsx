import { cn } from '@/lib/utils'

const tones = {
  green: 'bg-secondary text-secondary-foreground',
  gold: 'bg-warning text-warning-foreground',
  red: 'bg-destructive/10 text-destructive',
  gray: 'bg-muted text-muted-foreground',
}

export function Badge({ tone = 'green', children }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap', tones[tone])}>
      {children}
    </span>
  )
}

// Picks a badge colour for equipment status values
export function StatusBadge({ status }) {
  const tone = status === 'Active' ? 'green' : status === 'Under Maintenance' ? 'gold' : 'gray'
  return <Badge tone={tone}>{status}</Badge>
}
