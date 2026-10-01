import { cn } from '@/lib/utils'

const tones = {
  success: 'bg-secondary text-secondary-foreground',
  info: 'bg-muted text-muted-foreground',
  error: 'bg-destructive/10 text-destructive',
}

export function AuthMessage({ tone = 'info', children }) {
  return (
    <p role={tone === 'error' ? 'alert' : 'status'} className={cn('rounded-lg px-3 py-2.5 text-sm', tones[tone])}>
      {children}
    </p>
  )
}
