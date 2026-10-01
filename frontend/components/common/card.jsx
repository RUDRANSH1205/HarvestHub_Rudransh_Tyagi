import { cn } from '@/lib/utils'

export function Card({ className, children }) {
  return (
    <section className={cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </section>
  )
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function CardBody({ className, children }) {
  return <div className={cn('p-5', className)}>{children}</div>
}
