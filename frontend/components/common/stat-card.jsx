export function StatCard({ label, value, icon: Icon, hint }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate font-heading text-2xl font-semibold">{value}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  )
}
