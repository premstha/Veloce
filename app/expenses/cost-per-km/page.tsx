import Link from 'next/link'

export default function CostPerKmPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Cost of Ownership</h1>
        <p className="text-sm text-text-muted mt-1">Real expenses per kilometer across all your rides. Free for everyone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-sm text-text-muted">Total Cost / km</div>
          <div className="text-3xl font-bold mt-2" style={{ color: 'var(--color-accent)' }}>₹3.82</div>
          <div className="text-xs text-text-muted mt-1">Calculated over 8,420 km</div>
        </div>
        <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-sm text-text-muted">Fuel Only / km</div>
          <div className="text-3xl font-bold mt-2">₹2.88</div>
          <div className="text-xs text-text-muted mt-1">Avg 31.4 kmpl @ ₹105/L</div>
        </div>
        <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="text-sm text-text-muted">Maintenance / km</div>
          <div className="text-3xl font-bold mt-2">₹0.94</div>
          <div className="text-xs text-text-muted mt-1">Services, spares, gear</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
        <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fuel</span>
              <span className="font-semibold">₹24,250 (75%)</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '75%', backgroundColor: 'var(--color-accent)' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Repairs & Service</span>
              <span className="font-semibold">₹4,800 (15%)</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '15%', backgroundColor: 'var(--color-success)' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Accessories & Gear</span>
              <span className="font-semibold">₹3,150 (10%)</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: '10%', backgroundColor: 'var(--color-warning)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}