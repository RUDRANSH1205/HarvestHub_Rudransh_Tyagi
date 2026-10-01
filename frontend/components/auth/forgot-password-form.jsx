'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/common/button'
import { FormField } from '@/components/common/form-field'
import { AuthMessage } from './auth-message'
import { EMAIL_DOMAIN, cleanEmailUsername, toGmail } from '@/lib/email'

export function ForgotPasswordForm() {
  const [method, setMethod] = useState('email')
  const [identifier, setIdentifier] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Forgot password?</h1>
        <p className="text-muted-foreground">Use your email or phone number and we&apos;ll help you reset your password.</p>
      </div>

      {submitted ? (
        <AuthMessage tone="success">
          If an account exists for {method === 'email' ? toGmail(identifier) : identifier}, password reset instructions will be sent shortly.
        </AuthMessage>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium">Reset using</span>
            <div className="flex rounded-lg border border-border p-1" role="group" aria-label="Password reset method">
              <button type="button" className={`rounded-md px-3 py-1.5 ${method === 'email' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} onClick={() => setMethod('email')}>Email</button>
              <button type="button" className={`rounded-md px-3 py-1.5 ${method === 'phone' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`} onClick={() => setMethod('phone')}>Phone</button>
            </div>
          </div>
          {method === 'email' ? (
            <FormField label="Email" name="email" type="text" autoComplete="email" required suffix={EMAIL_DOMAIN} value={identifier} onChange={(event) => setIdentifier(cleanEmailUsername(event.target.value))} placeholder="yourname" />
          ) : (
            <FormField label="Phone Number" name="phone" type="tel" autoComplete="tel" required value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="10-digit mobile number" />
          )}
          <Button type="submit" size="lg">Send reset link</Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">Back to login</Link>
      </p>
    </div>
  )
}
