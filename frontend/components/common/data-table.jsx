import { Inbox } from 'lucide-react'

/**
 * Generic table.
 *   columns: [{ key: 'name', label: 'Name', render: (row) => ... }]
 *   rows:    array of objects with an `id`
 *   actions: optional function (row) => JSX for the last column
 */
export function DataTable({ columns, rows, actions, isLoading, emptyMessage = 'No records yet.' }) {
  if (isLoading) {
    return <p className="px-5 py-10 text-center text-sm text-muted-foreground">Loading…</p>
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-5 py-12 text-center text-muted-foreground">
        <Inbox className="size-8" aria-hidden="true" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-5 py-3 font-medium whitespace-nowrap">
                {column.label}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-5 py-3 text-right font-medium">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-3 whitespace-nowrap">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
