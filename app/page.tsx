import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text">
            Every ride counts.<br />
            Every rupee accounted.
          </h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Track fuel, expenses, and maintenance for your motorcycle.
            Join rides and clubs. All for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-lg"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
            >
              Get Started Free
            </Link>
            <Link
              href="/rides"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-lg border"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              Explore Rides
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-8 border-y border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>Free</div>
              <div className="text-sm text-text-muted mt-1">Everything included</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>₹0</div>
              <div className="text-sm text-text-muted mt-1">Cost per km tracker</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>100%</div>
              <div className="text-sm text-text-muted mt-1">Your data stays yours</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>Open</div>
              <div className="text-sm text-text-muted mt-1">No premium gates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">Everything you need to ride smarter</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fuel Logging */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">⛽</div>
              <h3 className="text-lg font-semibold mb-2">Log Fuel</h3>
              <p className="text-text-muted text-sm">
                Track every fill-up. See your real mileage per bike. Works offline.
              </p>
            </div>

            {/* Expense Tracking */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-semibold mb-2">Track Expenses</h3>
              <p className="text-text-muted text-sm">
                Repairs, gear, accessories. Know your cost per kilometer.
              </p>
            </div>

            {/* Parts Health */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold mb-2">Parts Health</h3>
              <p className="text-text-muted text-sm">
                Service intervals, due reminders, and maintenance history.
              </p>
            </div>

            {/* Find Rides */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold mb-2">Find Rides</h3>
              <p className="text-text-muted text-sm">
                Discover breakfast, day, and multi-day rides near you.
              </p>
            </div>

            {/* Join Clubs */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">🏍️</div>
              <h3 className="text-lg font-semibold mb-2">Join Clubs</h3>
              <p className="text-text-muted text-sm">
                Find riding clubs in your city. Join events and meet riders.
              </p>
            </div>

            {/* Group Rides */}
            <div className="p-6 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">Group Rides</h3>
              <p className="text-text-muted text-sm">
                See everyone on a live map. Regroup alerts and shared routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Mockup Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 rounded-3xl border-4 border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="w-64 h-96 rounded-xl border border-border flex items-center justify-center text-text-muted">
              App Screenshot Placeholder
            </div>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Track your rides, costs, and maintenance in one place.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to ride smarter?</h2>
        <p className="text-text-muted mb-8">Join thousands of riders tracking their journey.</p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-xl"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
        >
          Get Started Free
        </Link>
      </section>
    </div>
  )
}