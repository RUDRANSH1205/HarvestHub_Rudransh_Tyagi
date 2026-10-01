'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useCollection } from '@/hooks/use-collection'
import { Button } from './button'
import { Card } from './card'
import { ConfirmDialog } from './confirm-dialog'
import { DataTable } from './data-table'
import { Modal } from './modal'
import { PageHeader } from './page-header'
import { ResourceForm } from './resource-form'

/**
 * A complete list page with search, Add, Edit, Delete (and optional View details).
 * Each module page only needs to describe its columns and form fields.
 */
export function CrudPage({
  title,
  description,
  collection,
  singular,
  columns,
  formFields,
  emptyValues,
  searchKeys = ['name'],
  detailsHref,
  sortRows,
  children,
}) {
  const { items, isLoading, add, update, remove } = useCollection(collection)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // null = closed, {} = add, record = edit
  const [deleting, setDeleting] = useState(null)

  const query = search.trim().toLowerCase()
  let rows = query
    ? items.filter((item) => searchKeys.some((key) => String(item[key] ?? '').toLowerCase().includes(query)))
    : items
  if (sortRows) rows = [...rows].sort(sortRows)

  const isEditMode = editing && editing.id

  async function handleSave(values) {
    if (isEditMode) await update(editing.id, values)
    else await add(values)
    setEditing(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={title}
        description={description}
        action={
          <Button onClick={() => setEditing({})}>
            <Plus aria-hidden="true" />
            Add {singular}
          </Button>
        }
      />

      {children}

      <Card>
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? 'record' : 'records'}
          </p>
          <label className="relative w-full sm:w-64">
            <span className="sr-only">Search {title.toLowerCase()}</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search…"
              className="h-9 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm focus:border-primary focus:outline-2 focus:outline-ring/30"
            />
          </label>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          emptyMessage={query ? 'No records match your search.' : `No ${title.toLowerCase()} yet. Click "Add ${singular}" to create one.`}
          actions={(row) => (
            <>
              {detailsHref && (
                <Link
                  href={detailsHref(row)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  <Eye className="size-4" aria-hidden="true" />
                  <span className="sr-only">View {singular}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={() => setEditing(row)}
                className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"
              >
                <Pencil className="size-4" aria-hidden="true" />
                <span className="sr-only">Edit {singular}</span>
              </button>
              <button
                type="button"
                onClick={() => setDeleting(row)}
                className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                <span className="sr-only">Delete {singular}</span>
              </button>
            </>
          )}
        />
      </Card>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={isEditMode ? `Edit ${singular}` : `Add ${singular}`}
      >
        {editing && (
          <ResourceForm
            key={editing.id || 'new'}
            fields={formFields}
            initialValues={isEditMode ? editing : emptyValues}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
            submitLabel={isEditMode ? 'Save Changes' : `Add ${singular}`}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => remove(deleting.id)}
        title={`Delete ${singular}?`}
        message={`This will permanently delete this ${singular.toLowerCase()}. This action cannot be undone.`}
      />
    </div>
  )
}
