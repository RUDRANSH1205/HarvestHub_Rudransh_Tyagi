// A simple horizontal bar chart made with plain divs – no chart library needed.
export function BarList({ items, formatValue = (value) => value, emptyMessage = 'No data yet.' }) {
  const max = Math.max(...items.map((item) => item.value), 0)

  if (items.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-muted-foreground">{formatValue(item.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${max ? (item.value / max) * 100 : 0}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

// Groups a list by a key and adds up a value: [{ label, value }] sorted largest first
export function groupTotals(list, getLabel, getValue) {
  const totals = {}
  list.forEach((item) => {
    const label = getLabel(item)
    totals[label] = (totals[label] || 0) + (Number(getValue(item)) || 0)
  })
  return Object.entries(totals)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
}
