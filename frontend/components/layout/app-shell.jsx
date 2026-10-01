'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { ConfirmDialog } from '@/components/common/confirm-dialog'
import { Logo } from './logo'
import { Sidebar } from './sidebar'

/**
 * Layout for every logged-in page: sidebar + top bar + page content.
 * Redirects to /login when nobody is logged in.
 */
export function AppShell({ children }) {
  const router = useRouter()
  const { user, isReady, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  useEffect(() => {
    if (isReady && !user) router.replace('/login')
  }, [isReady, user, router])

  if (!isReady || !user) {
    return <p className="p-10 text-center text-muted-foreground">Loading…</p>
  }

  function openLogout() {
    setIsMenuOpen(false)
    setIsLogoutOpen(true)
  }

  const initials = user.fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-dvh lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar onLogout={openLogout} />
      </aside>

      {/* Mobile sidebar drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside className="relative h-full w-72 max-w-[85%]">
            <Sidebar onNavigate={() => setIsMenuOpen(false)} onLogout={openLogout} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-3 rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </aside>
        </div>
      )}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
          <Logo className="lg:hidden" />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <span
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
            aria-hidden="true"
          >
            {initials}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</main>

      <ConfirmDialog
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          logout()
          router.replace('/login?loggedOut=1')
        }}
        title="Log out?"
        message="You will need to log in again to access your farm data."
        confirmLabel="Logout"
        variant="primary"
      />
    </div>
  )
}
