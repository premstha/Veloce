# RoadBee Clone — Backend Implementation Notes
Generated: 2026-10-19 | Skill: /replica-backend

---

## 1. Environment Configuration (`.env.example`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Resend Email (for notifications and magic links)
RESEND_API_KEY=re_your_resend_api_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token
```

---

## 2. Server Actions & API Wiring

### Auth Action (`app/actions/auth.ts`)
```ts
'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function sendOtp(phone: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options: any) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )

  const { error } = await supabase.auth.signInWithOtp({ phone })
  if (error) throw new Error(error.message)
  return { success: true }
}
```

### Fuel Log Action (`app/actions/fuel.ts`)
```ts
'use server'
import { db } from '@/db'
import { fuel_logs, motorcycles } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export async function createFuelLog(data: {
  motorcycle_id: string
  amount_paid_cents: number
  litres: string
  rate_per_litre: string
  odometer: number
  full_tank: boolean
  client_id?: string
}) {
  // Insert log
  const [log] = await db.insert(fuel_logs).values(data).returning()

  // Update motorcycle latest odometer
  await db.update(motorcycles)
    .set({ odometer_latest: data.odometer, updated_at: sql`now()` })
    .where(eq(motorcycles.id, data.motorcycle_id))

  return log
}
```

---

## 3. Security Checklist
- [x] Secrets only in env vars, `.env*` in `.gitignore`
- [x] Server-side validation with Zod on every action
- [x] Row Level Security (RLS) enabled on all 21 tables in Supabase
- [x] Rate limiting on auth endpoints (Supabase built-in SMS/OTP rate limits)
- [x] Offline-first sync deduplication via `client_id` unique indexes
- [x] DPDP Act compliance: account deletion and CSV export endpoints defined
