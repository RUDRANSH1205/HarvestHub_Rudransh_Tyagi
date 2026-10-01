'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/api/auth-service'
import { Button } from '@/components/common/button'
import { FormField } from '@/components/common/form-field'
import { toGmail } from '@/lib/email'
import { AuthMessage } from './auth-message'

const emptyForm = { fullName: '', email: '', phone: '', password: '', confirmPassword: '' }

function validate(form) {
  const errors = {}
  if (form.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (!/^[^\s@]+@gmail\.com$/i.test(form.email.trim())) errors.email = 'Please enter a valid Gmail address.'
  if (!/^\d{10}$/.test(form.phone)) errors.phone = 'Phone number must be 10 digits.'
  if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

export function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setServerError('')
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)
    try {
      const { confirmPassword, ...data } = form
      await authService.register({ ...data, fullName: data.fullName.trim(), email: data.email.trim().toLowerCase() })
      router.push('/login?registered=1')
    } catch (err) {
      setServerError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground">Start managing your farm in minutes.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField label="Full Name" name="fullName" autoComplete="name" required value={form.fullName} onChange={handleChange} error={errors.fullName} />
        <FormField
          label="Email"
          name="email"
          autoComplete="username"
          required
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField label="Phone Number" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit mobile number" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Password" name="password" type="password" autoComplete="new-password" required value={form.password} onChange={handleChange} error={errors.password} />
          <FormField label="Confirm Password" name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
        </div>

        {serverError && <AuthMessage tone="error">{serverError}</AuthMessage>}

        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create Account'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
