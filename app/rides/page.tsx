import Link from 'next/link'

export default function RidesBrowsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Discover Rides</h1>
          <p className="text-sm text-text-muted mt-1">Find group rides or post your own. All free to join.</p>
        </div>
        <Link
          href="/rides/new"
          className="px-4 py-2 rounded-md font-semibold text-sm"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
        >
          + Post a Ride
        </Link>
      </div>

      {/* Ride Type Filters */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button className="p-4 rounded-xl border border-accent text-left" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-xl mb-1">🍳</div>
          <div className="font-semibold text-sm">Breakfast Rides</div>
          <div className="text-xs text-text-muted mt-0.5">50–150 km • Morning return</div>
        </button>
        <button className="p-4 rounded-xl border border-border text-left hover:border-accent" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-xl mb-1">☀️</div>
          <div className="font-semibold text-sm">Day Trips</div>
          <div className="text-xs text-text-muted mt-0.5">150–400 km • Full day</div>
        </button>
        <button className="p-4 rounded-xl border border-border text-left hover:border-accent" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-xl mb-1">🏔️</div>
          <div className="font-semibold text-sm">Multi-Day Tours</div>
          <div className="text-xs text-text-muted mt-0.5">500+ km • Weekends & expeditions</div>
        </button>
      </div>

      {/* Ride Cards List */}
      <div className="grid gap-6">
        <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface border border-border">
                  Breakfast Ride
                </span>
                <span className="text-xs text-text-muted">Pune, Maharashtra</span>
              </div>
              <h2 className="text-xl font-bold mt-2">Lonavala Old Highway Sunrise Cruise</h2>
              <p className="text-sm text-text-muted mt-1">Sunday, 25 Oct • 05:30 AM • Start: Chandani Chowk</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/rides/group-room"
                className="px-4 py-2 rounded-md font-semibold text-sm"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
              >
                Join Group Room
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs text-text-muted">
            <span>👥 6/12 Riders</span>
            <span>🛣️ 140 km Roundtrip</span>
            <span>☕ Breakfast at German Bakery</span>
            <span>💰 Cost sharing: Split food & toll</span>
          </div>
        </div>
      </div>
    </div>
  )
}