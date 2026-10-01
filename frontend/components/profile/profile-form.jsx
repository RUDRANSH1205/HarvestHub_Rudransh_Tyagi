'use client'

import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/common/button'
import { Card, CardBody, CardHeader } from '@/components/common/card'
import { FormField } from '@/components/common/form-field'
import { PageHeader } from '@/components/common/page-header'

export function ProfileForm() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [values, setValues] = useState({ fullName: user.fullName, email: user.email, phone: user.phone || '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [isSaving, setIsSaving] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', text: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!/^\d{10}$/.test(values.phone)) {
      setStatus({ type: 'error', text: 'Phone number must be 10 digits.' })
      return
    }
    setIsSaving(true)
    try {
      await updateProfile({ ...values, fullName: values.fullName.trim(), email: values.email.trim() })
      setStatus({ type: 'success', text: 'Profile updated successfully.' })
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Could not update profile.' })
    } finally {
      setIsSaving(false)
    }
  }

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  const initials = user.fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader title="Profile" description="Manage your account details." />

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">{user.fullName}</p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Personal information" />
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full Name" name="fullName" required value={values.fullName} onChange={handleChange} className="sm:col-span-2" />
              <FormField label="Email" name="email" type="email" required value={values.email} onChange={handleChange} />
              <FormField label="Phone Number" name="phone" type="tel" required value={values.phone} onChange={handleChange} />
            </div>
            {status.text && (
              <p
                role={status.type === 'error' ? 'alert' : 'status'}
                className={
                  status.type === 'error'
                    ? 'rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive'
                    : 'rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground'
                }
              >
                {status.text}
              </p>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Log out</p>
            <p className="text-sm text-muted-foreground">End your session on this device.</p>
          </div>
          <Button variant="danger" onClick={handleLogout}>
            <LogOut aria-hidden="true" />
            Logout
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
