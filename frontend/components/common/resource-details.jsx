'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { useCollection } from '@/hooks/use-collection'
import { Button } from './button'
import { Card, CardBody, CardHeader } from './card'
import { ConfirmDialog } from './confirm-dialog'
import { Modal } from './modal'
import { PageHeader } from './page-header'
import { ResourceForm } from './resource-form'

/**
 * Shows one record with Edit / Delete buttons.
 *   info:     (item) => [{ label, value }]
 *   children: (item) => extra sections (related tables etc.)
 */
export function ResourceDetails({ collection, id, singular, backHref, backLabel, formFields, info, children }) {
  const router = useRouter()
  const { items, isLoading, update, remove } = useCollection(collection)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const item = items.find((record) => record.id === id)

  if (isLoading) {
    return <p className="py-10 text-center text-muted-foreground">Loading…</p>
  }

  if (!item) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title={`${singular} not found`} backHref={backHref} backLabel={backLabel} />
        <p className="text-muted-foreground">This {singular.toLowerCase()} may have been deleted.</p>
      </div>
    )
  }

  async function handleDelete() {
    await remove(item.id)
    router.push(backHref)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={item.name}
        description={`${singular} details`}
        backHref={backHref}
        backLabel={backLabel}
        action={
          <>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil aria-hidden="true" />
              Edit
            </Button>
            <Button variant="danger" onClick={() => setIsDeleting(true)}>
              <Trash2 aria-hidden="true" />
              Delete
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader title="Overview" />
        <CardBody>
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info(item).map((entry) => (
              <div key={entry.label} className="flex flex-col gap-1">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{entry.label}</dt>
                <dd className="font-medium">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </CardBody>
      </Card>

      {children && children(item)}

      <Modal open={isEditing} onClose={() => setIsEditing(false)} title={`Edit ${singular}`}>
        {isEditing && (
          <ResourceForm
            fields={formFields}
            initialValues={item}
            onSubmit={async (values) => {
              await update(item.id, values)
              setIsEditing(false)
            }}
            onCancel={() => setIsEditing(false)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <ConfirmDialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={handleDelete}
        title={`Delete ${singular}?`}
        message={`"${item.name}" will be permanently deleted. This action cannot be undone.`}
      />
    </div>
  )
}
