import { Analytics } from '@vercel/analytics/next'
import { Inter, Outfit } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'
import './globals.css'

const _inter = Inter({ subsets: ['latin', 'latin-ext'] })
const _outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'HarvestHub – Farm Management & Crop Planning',
  description:
    'Manage farms, fields, crops, crop rotation, field operations, expenses, yield, equipment and maintenance in one place.',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#2f7a4a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
