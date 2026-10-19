import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-surface)' }}>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-text-muted text-sm mb-8">Start tracking your rides for free.</p>

          <form className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Rahul Sharma"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone number</label>
              <div className="flex gap-2">
                <span
                  className="flex items-center px-3 rounded-md text-sm text-text-muted"
                  style={{ border: '1px solid var(--color-border-input)', backgroundColor: 'var(--color-bg)' }}
                >
                  +91
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 rounded-md text-sm"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border-input)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="rahul@example.com"
                className="w-full px-4 py-3 rounded-md text-sm"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-input)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input id="terms" name="terms" type="checkbox" required className="mt-1" />
              <label htmlFor="terms" className="text-xs text-text-muted">
                I agree to the{' '}
                <Link href="/terms" className="underline hover:text-text">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline hover:text-text">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-md font-semibold text-sm mt-2"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-on-accent)' }}
            >
              Continue with OTP
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-2">
              <div className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }} />
              <span className="mx-3 text-xs text-text-muted">or</span>
              <div className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 rounded-md font-medium text-sm border flex items-center justify-center gap-2"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', backgroundColor: 'transparent' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline hover:text-text">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}