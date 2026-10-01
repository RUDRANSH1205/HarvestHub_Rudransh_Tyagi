'use client'

import { useState } from 'react'
import { Button } from './button'
import { FormField } from './form-field'

/**
 * Builds a form from a list of field definitions:
 *   [{ name: 'name', label: 'Farm Name', type: 'text', required: true }]
 * Number fields are converted to numbers before onSubmit is called.
 */
export function ResourceForm({ fields, initialValues, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [values, setValues] = useState(initialValues)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const cleaned = { ...values }
    fields.forEach((field) => {
      if (field.type === 'number') cleaned[field.name] = Number(values[field.name])
      if (typeof cleaned[field.name] === 'string') cleaned[field.name] = cleaned[field.name].trim()
    })

    setIsSaving(true)
    try {
      await onSubmit(cleaned)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ fullWidth, ...field }) => (
          <FormField
            key={field.name}
            {...field}
            className={field.type === 'textarea' || fullWidth ? 'sm:col-span-2' : undefined}
            value={values[field.name] ?? ''}
            onChange={handleChange}
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
