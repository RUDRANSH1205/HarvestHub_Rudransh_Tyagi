'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowRight, Trash2 } from 'lucide-react'
import { useCollection } from '@/hooks/use-collection'
import { Badge } from '@/components/common/badge'
import { Button } from '@/components/common/button'
import { Card, CardBody, CardHeader } from '@/components/common/card'
import { ConfirmDialog } from '@/components/common/confirm-dialog'
import { DataTable } from '@/components/common/data-table'
import { FormField } from '@/components/common/form-field'
import { PageHeader } from '@/components/common/page-header'
import { CURRENT_YEAR, SEASONS, lookup } from '@/lib/format'
import { findRepeatedPlans, sortPlans } from './rotation-utils'

const YEARS = Array.from({ length: 6 }, (_, i) => String(CURRENT_YEAR - 1 + i))
const emptyPlan = { fieldId: '', year: String(CURRENT_YEAR), season: '', cropId: '' }

export function RotationPlanner() {
  const { items: fields } = useCollection('fields')
  const { items: crops } = useCollection('crops')
  const { items: plans, isLoading, add, remove } = useCollection('rotations')

  const [form, setForm] = useState(emptyPlan)
  const [message, setMessage] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [timelineFieldId, setTimelineFieldId] = useState('')

  const repeatedIds = findRepeatedPlans(plans)
  const selectedFieldId = timelineFieldId || form.fieldId || fields[0]?.id || ''
  const timeline = sortPlans(plans.filter((plan) => plan.fieldId === selectedFieldId))

  // Warn before saving if this crop was planned for the same field the year before or after
  const formWarning =
    form.fieldId &&
    form.cropId &&
    plans.some(
      (plan) =>
        plan.fieldId === form.fieldId &&
        plan.cropId === form.cropId &&
        Math.abs(Number(plan.year) - Number(form.year)) <= 1,
    )

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setMessage('')
    if (name === 'fieldId') setTimelineFieldId('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await add({ ...form, year: Number(form.year) })
    setTimelineFieldId(form.fieldId)
    setForm({ ...emptyPlan, fieldId: form.fieldId })
    setMessage('Rotation plan saved.')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Crop Rotation"
        description="Plan which crop goes on each field, season by season, to keep your soil healthy."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader title="New rotation plan" />
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FormField
                label="Field"
                name="fieldId"
                type="select"
                required
                value={form.fieldId}
                onChange={handleChange}
                options={fields.map((field) => ({ value: field.id, label: field.name }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Year" name="year" type="select" required value={form.year} onChange={handleChange} options={YEARS} />
                <FormField label="Season" name="season" type="select" required value={form.season} onChange={handleChange} options={SEASONS} />
              </div>
              <FormField
                label="Crop"
                name="cropId"
                type="select"
                required
                value={form.cropId}
                onChange={handleChange}
                options={crops.map((crop) => ({ value: crop.id, label: crop.name }))}
              />

              {formWarning && (
                <p role="alert" className="flex gap-2 rounded-lg bg-warning px-3 py-2 text-sm text-warning-foreground">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {lookup(crops, form.cropId)} is already planned for this field in a nearby year. Consider rotating with a different crop.
                </p>
              )}
              {message && (
                <p role="status" className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                  {message}
                </p>
              )}

              <Button type="submit">Save Rotation Plan</Button>
            </form>
          </CardBody>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader
            title="Rotation timeline"
            description="Year-by-year crops for the selected field."
            action={
              <label className="w-44">
                <span className="sr-only">Choose field for timeline</span>
                <select
                  value={selectedFieldId}
                  onChange={(event) => setTimelineFieldId(event.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-card px-2 text-sm"
                >
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </label>
            }
          />
          <CardBody>
            {timeline.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No rotation planned for this field yet.</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {timeline.map((plan, index) => {
                  const isRepeated = repeatedIds.has(plan.id)
                  return (
                    <li key={plan.id} className="flex items-center gap-3">
                      <span className="w-14 shrink-0 font-heading text-lg font-semibold">{plan.year}</span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div
                        className={`flex flex-1 flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-2.5 ${
                          isRepeated ? 'border-warning-foreground/30 bg-warning' : 'border-border bg-secondary/50'
                        }`}
                      >
                        <span className="font-medium">{lookup(crops, plan.cropId)}</span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          {plan.season}
                          {isRepeated && index > 0 && <Badge tone="gold">Repeated crop</Badge>}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Rotation history" description="All rotation plans across your fields." />
        <DataTable
          rows={sortPlans(plans)}
          isLoading={isLoading}
          emptyMessage="No rotation plans saved yet."
          columns={[
            { key: 'fieldId', label: 'Field', render: (row) => <span className="font-medium">{lookup(fields, row.fieldId)}</span> },
            { key: 'year', label: 'Year' },
            { key: 'season', label: 'Season' },
            { key: 'cropId', label: 'Crop', render: (row) => lookup(crops, row.cropId) },
            {
              key: 'status',
              label: 'Check',
              render: (row) =>
                repeatedIds.has(row.id) ? <Badge tone="gold">Same crop repeated</Badge> : <Badge>Good rotation</Badge>,
            },
          ]}
          actions={(row) => (
            <button
              type="button"
              onClick={() => setDeleting(row)}
              className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              <span className="sr-only">Delete rotation plan</span>
            </button>
          )}
        />
      </Card>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => remove(deleting.id)}
        title="Delete rotation plan?"
        message="This rotation plan will be removed permanently."
      />
    </div>
  )
}
