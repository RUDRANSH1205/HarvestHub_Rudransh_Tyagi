'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/common/button'
import { FormField } from '@/components/common/form-field'
import { toGmail } from '@/lib/email'
import { AuthMessage } from './auth-message'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [loginMethod, setLoginMethod] = useState('email')
  const [form, setForm] = useState({ email: '', phone: '', password: '', remember: false })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notice = searchParams.get('registered')
    ? 'Account created successfully. Please log in.'
    : searchParams.get('loggedOut')
      ? 'You have been logged out.'
      : ''

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const identifier = loginMethod === 'email' ? form.email.trim().toLowerCase() : form.phone
      await login(identifier, form.password, form.remember)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">Log in to manage your farms.</p>
      </div>

      {notice && <AuthMessage tone="success">{notice}</AuthMessage>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium">Log in with</span>
          <div className="flex rounded-lg border border-border p-1" role="group" aria-label="Login method">
            <button type="button" className={`rounded-md px-3 py-1.5 ${loginMethod === 'email' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} onClick={() => setLoginMethod('email')}>Email</button>
            <button type="button" className={`rounded-md px-3 py-1.5 ${loginMethod === 'phone' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} onClick={() => setLoginMethod('phone')}>Phone</button>
          </div>
        </div>
        {loginMethod === 'email' ? (
          <FormField label="Email" name="email" type="email" autoComplete="username" required value={form.email} onChange={handleChange} placeholder="you@gmail.com" />
        ) : (
          <FormField label="Phone Number" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
        )}
        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="size-4 accent-primary"
          />
          Remember Me
        </label>

        {error && <AuthMessage tone="error">{error}</AuthMessage>}

        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </Button>

        <Link href="/forgot-password" className="text-center text-sm font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create New Account
        </Link>
      </p>
    </div>
  )
}
