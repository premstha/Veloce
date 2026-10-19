import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RoadBee Clone',
  description: 'Motorcycle rider companion — log fuel, expenses, track rides, and group rides with friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Sticky Nav Bar */}
        <nav className="sticky top-0 z-50 bg-bg border-b border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Logo placeholder */}
              <Link href="/" className="font-bold text-xl" style={{ color: 'var(--color-accent)' }}>
                RideLog
              </Link>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-8 text-sm">
                <Link href="/rides" className="text-text-muted hover:text-text transition">Rides</Link>
                <Link href="/clubs" className="text-text-muted hover:text-text transition">Clubs</Link>
                <Link href="/garage" className="text-text-muted hover:text-text transition">Garage</Link>
                <Link href="/expenses" className="text-text-muted hover:text-text transition">Expenses</Link>
              </div>

              {/* CTA Pill */}
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
              >
                Get the App
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-between gap-4 text-sm text-text-muted">
              <div className="flex gap-6">
                <Link href="/help" className="hover:text-text">Help</Link>
                <Link href="/about" className="hover:text-text">About</Link>
                <Link href="/terms" className="hover:text-text">Terms</Link>
                <Link href="/privacy" className="hover:text-text">Privacy</Link>
              </div>
              <div>
                © 2026 RideLog. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}