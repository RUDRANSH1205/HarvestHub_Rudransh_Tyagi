import { Sprout } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, light = false }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-lg',
          light ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'bg-primary text-primary-foreground',
        )}
      >
        <Sprout className="size-5" aria-hidden="true" />
      </span>
      <span className="font-heading text-xl font-semibold tracking-tight">HarvestHub</span>
    </span>
  )
}
