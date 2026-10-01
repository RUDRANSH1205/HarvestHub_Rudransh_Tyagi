import Image from 'next/image'
import { Logo } from '@/components/layout/logo'

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/farm-fields.png"
          alt="Aerial view of green crop fields at sunrise"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-sidebar/85 p-10 text-sidebar-foreground">
          <p className="font-heading text-2xl font-semibold text-balance">
            Plan every season. Track every field. Grow with confidence.
          </p>
          <p className="text-sm leading-relaxed">
            Farms, crops, rotation, operations, costs, yield and equipment — all in one place.
          </p>
        </div>
      </div>

      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="flex w-full max-w-md flex-col gap-8">
          <Logo />
          {children}
        </div>
      </main>
    </div>
  )
}
