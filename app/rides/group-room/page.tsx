import Link from 'next/link'

export default function GroupRideRoomPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider text-success">Live Group Ride</span>
          </div>
          <h1 className="text-2xl font-bold mt-1">Sunday Breakfast Ride: Lonavala Ghats</h1>
          <p className="text-sm text-text-muted">Start: Chandani Chowk, Pune • 6 Riders Active</p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md font-semibold text-sm border flex items-center gap-2"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            📋 Copy Invite Link
          </button>
          <button
            className="px-4 py-2 rounded-md font-semibold text-sm"
            style={{ backgroundColor: 'var(--color-danger)', color: '#fff' }}
          >
            SOS Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map Area */}
        <div className="lg:col-span-2 rounded-xl border border-border h-96 lg:h-[500px] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-center p-6">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="text-lg font-bold">Live Group Map</div>
            <p className="text-sm text-text-muted mt-1 max-w-sm">
              Real-time positions of all 6 riders. Updates every 3 seconds via Supabase Realtime broadcast.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(247, 183, 49, 0.1)', color: 'var(--color-accent)' }}>
              📍 Next Regroup: Food Mall Km 42
            </div>
          </div>
        </div>

        {/* Riders & Quick Actions */}
        <div className="flex flex-col gap-6">
          {/* Quick Status Buttons */}
          <div className="p-4 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Broadcast Status</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button className="p-2 rounded border border-border hover:border-accent">⛽ Fuel Stop</button>
              <button className="p-2 rounded border border-border hover:border-accent">☕ Tea Break</button>
              <button className="p-2 rounded border border-border hover:border-accent">⚠️ Pothole</button>
            </div>
          </div>

          {/* Rider Roster */}
          <div className="p-4 rounded-xl border border-border flex-1" style={{ backgroundColor: 'var(--color-surface)' }}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Riders (6)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent text-on-accent flex items-center justify-center font-bold text-xs">R</div>
                  <div>
                    <div className="font-semibold">Rahul (Lead)</div>
                    <div className="text-xs text-text-muted">Himalayan 450 • 68 km/h</div>
                  </div>
                </div>
                <span className="text-xs text-success">Ahead</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center font-bold text-xs">A</div>
                  <div>
                    <div className="font-semibold">Amit S.</div>
                    <div className="text-xs text-text-muted">KTM 390 Adv • 65 km/h</div>
                  </div>
                </div>
                <span className="text-xs text-text-muted">+0.4 km</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center font-bold text-xs">V</div>
                  <div>
                    <div className="font-semibold">Vikram (Sweep)</div>
                    <div className="text-xs text-text-muted">Scram 411 • 62 km/h</div>
                  </div>
                </div>
                <span className="text-xs text-warning">Lagging (-1.2 km)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}