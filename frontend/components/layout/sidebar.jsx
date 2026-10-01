'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  MapPinned,
  RefreshCcw,
  Tractor,
  User,
  Wallet,
  Warehouse,
  Wheat,
  Wrench,
  Grid2x2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

export const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/farms', label: 'Farms', icon: Warehouse },
  { href: '/fields', label: 'Fields', icon: Grid2x2 },
  { href: '/crops', label: 'Crops', icon: Wheat },
  { href: '/rotation', label: 'Crop Rotation', icon: RefreshCcw },
  { href: '/operations', label: 'Field Operations', icon: CalendarClock },
  { href: '/costs', label: 'Costs & Yield', icon: Wallet },
  { href: '/equipment', label: 'Equipment', icon: Tractor },
  { href: '/maintenance', label: 'Maintenance', icon: Wrench },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/profile', label: 'Profile', icon: User },
]

export function Sidebar({ onNavigate, onLogout }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo light />
        </Link>
      </div>

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                >
                  <item.icon className="size-4.5 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4.5" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  )
}
