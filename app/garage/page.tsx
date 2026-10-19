import Link from 'next/link'

export default function GaragePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Garage</h1>
          <p className="text-sm text-text-muted mt-1">Manage your motorcycles and track maintenance</p>
        </div>
        <Link
          href="/garage/new"
          className="px-4 py-2 rounded-md font-semibold text-sm"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
        >
          + Add Motorcycle
        </Link>
      </div>

      {/* Motorcycle Card List */}
      <div className="grid gap-6">
        <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', color: 'var(--color-success)' }}>
                Active Bike
              </span>
              <h2 className="text-xl font-bold mt-2">Royal Enfield Himalayan 450</h2>
              <p className="text-sm text-text-muted mt-1">2024 • Current Odometer: 8,420 km</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/fuel/new?bike=1"
                className="px-3 py-1.5 rounded text-sm font-medium border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                ⛽ Log Fuel
              </Link>
              <Link
                href="/expenses/new?bike=1"
                className="px-3 py-1.5 rounded text-sm font-medium border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                💰 Log Expense
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <div className="text-xs text-text-muted">Real Mileage</div>
              <div className="text-lg font-bold mt-1" style={{ color: 'var(--color-accent)' }}>31.4 kmpl</div>
            </div>
            <div>
              <div className="text-xs text-text-muted">Cost per km</div>
              <div className="text-lg font-bold mt-1" style={{ color: 'var(--color-accent)' }}>₹3.82 /km</div>
            </div>
            <div>
              <div className="text-xs text-text-muted">Next Service Due</div>
              <div className="text-lg font-bold mt-1 text-warning">in 1,580 km</div>
            </div>
            <div>
              <div className="text-xs text-text-muted">Insurance Expiry</div>
              <div className="text-lg font-bold mt-1">14 Mar 2027</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}