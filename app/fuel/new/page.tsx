import Link from 'next/link'

export default function LogFuelPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/garage" className="text-sm text-text-muted hover:text-text">← Back to Garage</Link>
        <h1 className="text-2xl font-bold mt-2">Log a Fill-up</h1>
        <p className="text-sm text-text-muted mt-1">Takes 10 seconds. Calculates real mileage automatically.</p>
      </div>

      <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="bike" className="block text-sm font-medium mb-1">Select Bike</label>
            <select
              id="bike"
              name="bike"
              className="w-full px-4 py-3 rounded-md text-sm"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border-input)',
                color: 'var(--color-text)',
              }}
            >
              <option value="1">Royal Enfield Himalayan 450 (8,420 km)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount Paid (₹)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                required
                placeholder="1200"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
            <div>
              <label htmlFor="litres" className="block text-sm font-medium mb-1">Litres</label>
              <input
                id="litres"
                name="litres"
                type="number"
                step="0.01"
                required
                placeholder="11.4"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rate" className="block text-sm font-medium mb-1">Rate / Litre (₹)</label>
              <input
                id="rate"
                name="rate"
                type="number"
                step="0.01"
                required
                placeholder="105.26"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
            <div>
              <label htmlFor="odometer" className="block text-sm font-medium mb-1">Odometer (km)</label>
              <input
                id="odometer"
                name="odometer"
                type="number"
                required
                placeholder="8778"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              id="fullTank"
              name="fullTank"
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded"
            />
            <label htmlFor="fullTank" className="text-sm">Tank full? (needed for mileage calculation)</label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-sm mt-4"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
          >
            Save Fill-up
          </button>
        </form>
      </div>
    </div>
  )
}