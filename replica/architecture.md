# RoadBee Clone — Architecture
Generated: 2026-10-19 | Source: replica/recon.md + replica/features.csv

---

## Step 1: The Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Web app** | Next.js 14 (App Router) + TypeScript | Mature, Vercel-native, great PWA support, server components reduce JS |
| **Styling** | Tailwind CSS + design tokens from replica-design | Utility-first, tokens map 1:1, zero-runtime, dark mode built-in |
| **Mobile** | Expo SDK 51 (React Native) | Single codebase with web, native builds later, EAS for store delivery |
| **Database** | PostgreSQL on Supabase | Managed Postgres, built-in Auth + Realtime + Storage, row-level security, generous free tier |
| **ORM** | Drizzle ORM | Type-safe, fast, works with Supabase, migrations as code |
| **Auth** | Supabase Auth (email/phone OTP + Google) | Integrates with DB, row-level security, magic links, social providers |
| **Payments** | **None in v1** — all features free | Removed per recon decision; no Stripe/Razorpay code needed |
| **Email** | Resend | Simple API, good deliverability, React Email templates, generous free tier |
| **Jobs** | Supabase Cron + pg_cron | Runs in DB, no extra infra, good for reminders/cleanup |
| **Files** | Supabase Storage | Integrated with Auth, signed URLs, CDN |
| **Maps** | Mapbox GL JS (web) + react-native-mapbox-gl (native) | Vector tiles, offline packs, custom styling, India coverage |
| **Realtime** | Supabase Realtime (Postgres changes) | Broadcast rider locations in group rides, no extra server |
| **Hosting** | Vercel (web) + EAS Build (native) | Zero-config deploy, preview URLs, edge functions |

**One database. No microservices.** The clone needs the features, not RoadBee's architecture.

---

## Step 2: The Schema

```sql
-- ============================================
-- USERS & AUTH
-- ============================================
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text unique,
  name text not null,
  city_id uuid references cities(id) on delete set null,
  avatar_url text,
  is_premium boolean not null default false, -- kept for future, always false in v1
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on users (email);
create index on users (phone);
create index on users (city_id);

-- ============================================
-- CITIES (for ride/club discovery)
-- ============================================
create table cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

create index on cities (slug);

-- ============================================
-- MOTORCYCLES (user's garage)
-- ============================================
create table motorcycles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  make text not null,
  model text not null,
  year int,
  odometer_latest int not null default 0,
  purchase_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on motorcycles (user_id, is_active);
create index on motorcycles (user_id, created_at);

-- ============================================
-- FUEL LOGS
-- ============================================
create table fuel_logs (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references motorcycles(id) on delete cascade,
  amount_paid_cents int not null,
  litres numeric(6,2) not null,
  rate_per_litre numeric(6,2) not null,
  odometer int not null,
  full_tank boolean not null default true,
  logged_at timestamptz not null default now(),
  client_id text, -- for offline sync deduplication
  created_at timestamptz not null default now()
);

create index on fuel_logs (motorcycle_id, logged_at desc);
create unique index on fuel_logs (client_id) where client_id is not null;

-- ============================================
-- EXPENSES
-- ============================================
create type expense_category as enum (
  'fuel', 'repairs', 'accessories', 'gear', 'food', 'stay', 'transport', 'other'
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references motorcycles(id) on delete cascade,
  category expense_category not null,
  amount_cents int not null,
  parts_amount_cents int,
  labour_amount_cents int,
  workshop_id uuid references workshops(id) on delete set null,
  ride_id uuid references rides(id) on delete set null,
  expense_date date not null,
  notes text,
  client_id text,
  created_at timestamptz not null default now()
);

create index on expenses (motorcycle_id, expense_date desc);
create index on expenses (ride_id);
create unique index on expenses (client_id) where client_id is not null;

-- ============================================
-- WORKSHOPS
-- ============================================
create table workshops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city_id uuid references cities(id) on delete set null,
  created_at timestamptz not null default now()
);

create index on workshops (city_id);

-- ============================================
-- PART TYPES (catalog)
-- ============================================
create table part_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  group_name text not null, -- Engine, Brakes, Wheels & Tires, Drivetrain, Electrical, Suspension, Body
  default_interval_km int not null,
  created_at timestamptz not null default now()
);

create index on part_types (group_name);

-- ============================================
-- PART REPLACEMENTS
-- ============================================
create table part_replacements (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references motorcycles(id) on delete cascade,
  part_type_id uuid not null references part_types(id) on delete restrict,
  odometer_at int not null,
  custom_interval_km int, -- overrides default_interval_km
  notes text,
  created_at timestamptz not null default now()
);

create index on part_replacements (motorcycle_id, part_type_id, odometer_at desc);
-- One active replacement per part type per motorcycle at a given odometer
create unique index on part_replacements (motorcycle_id, part_type_id, odometer_at);

-- ============================================
-- DOCUMENTS (papers vault)
-- ============================================
create type document_kind as enum ('rc', 'insurance', 'puc', 'service_record', 'other');

create table documents (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references motorcycles(id) on delete cascade,
  kind document_kind not null,
  insurer text,
  policy_number text,
  expires_on date,
  file_path text not null, -- Supabase Storage path
  file_name text not null,
  file_size int not null,
  mime_type text not null,
  created_at timestamptz not null default now()
);

create index on documents (motorcycle_id, kind);
create index on documents (expires_on) where expires_on is not null;

-- ============================================
-- REMINDERS
-- ============================================
create type reminder_kind as enum (
  'service_by_km', 'service_by_date', 'insurance_expiry', 'puc_expiry', 'rc_expiry'
);

create table reminders (
  id uuid primary key default gen_random_uuid(),
  motorcycle_id uuid not null references motorcycles(id) on delete cascade,
  kind reminder_kind not null,
  due_km int,
  due_date date,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index on reminders (motorcycle_id, kind, sent_at) where sent_at is null;

-- ============================================
-- RIDES
-- ============================================
create type ride_type as enum ('breakfast', 'day', 'multi_day');

create table rides (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references users(id) on delete cascade,
  bike_id uuid references motorcycles(id) on delete set null,
  title text not null,
  description text,
  start_place text not null,
  end_place text not null,
  start_lat double precision,
  start_lng double precision,
  end_lat double precision,
  end_lng double precision,
  start_at timestamptz not null,
  end_at timestamptz,
  is_public boolean not null default true,
  riders_wanted int,
  cost_note text,
  food_stay_included boolean not null default false,
  type ride_type not null default 'day',
  city_id uuid references cities(id) on delete set null,
  status text not null default 'upcoming' check (status in ('upcoming','active','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on rides (owner_id, status, start_at);
create index on rides (city_id, status, start_at) where is_public;
create index on rides (start_at) where status = 'upcoming';

-- ============================================
-- RIDE PARTICIPANTS
-- ============================================
create type participant_role as enum ('organiser', 'rider', 'spectator');
create type participant_status as enum ('requested', 'accepted', 'declined', 'joined');

create table ride_participants (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role participant_role not null default 'rider',
  status participant_status not null default 'requested',
  distance_km numeric(8,2),
  avg_speed_kmph numeric(6,2),
  stopped_minutes int,
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  unique (ride_id, user_id)
);

create index on ride_participants (ride_id, status);
create index on ride_participants (user_id, status);

-- ============================================
-- TRACK POINTS (ride GPS)
-- ============================================
create table track_points (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  lat double precision not null,
  lng double precision not null,
  altitude double precision,
  speed_kmph numeric(6,2),
  recorded_at timestamptz not null default now()
);

create index on track_points (ride_id, recorded_at);
create index on track_points (ride_id, user_id, recorded_at);

-- ============================================
-- GROUPS (group ride rooms)
-- ============================================
create table groups (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references rides(id) on delete cascade,
  invite_code text not null unique,
  invite_expires_at timestamptz not null default (now() + interval '30 days'),
  max_members int not null default 20,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index on groups (invite_code);
create index on groups (ride_id);

-- ============================================
-- GROUP MEMBERS
-- ============================================
create type group_member_role as enum ('leader', 'sweep', 'rider', 'watcher');
create type group_member_status as enum ('pending', 'joined', 'left');

create table group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role group_member_role not null default 'rider',
  status group_member_status not null default 'pending',
  joined_at timestamptz,
  unique (group_id, user_id)
);

create index on group_members (group_id, status);

-- ============================================
-- CLUBS
-- ============================================
create table clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city_id uuid not null references cities(id) on delete restrict,
  logo_url text,
  since_year int,
  is_public boolean not null default true,
  is_confirmed boolean not null default false,
  created_at timestamptz not null default now()
);

create index on clubs (city_id, is_public);
create index on clubs (is_confirmed);

-- ============================================
-- CLUB MEMBERS
-- ============================================
create type club_member_status as enum ('member', 'pending', 'declined');

create table club_members (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references clubs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  status club_member_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (club_id, user_id)
);

create index on club_members (club_id, status);
create index on club_members (user_id);

-- ============================================
-- NOTIFICATIONS
-- ============================================
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null, -- ride_invite, ride_update, reminder, club_request, etc.
  payload jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index on notifications (user_id, read_at, created_at desc) where read_at is null;

-- ============================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================

-- Users see only themselves
alter table users enable row level security;
create policy "users_self" on users for all using (auth.uid() = id);

-- Motorcycles: owner sees own
alter table motorcycles enable row level security;
create policy "motorcycles_owner" on motorcycles for all using (auth.uid() = user_id);

-- Fuel logs: owner sees own
alter table fuel_logs enable row level security;
create policy "fuel_logs_owner" on fuel_logs for all using (
  motorcycle_id in (select id from motorcycles where user_id = auth.uid())
);

-- Expenses: owner sees own
alter table expenses enable row level security;
create policy "expenses_owner" on expenses for all using (
  motorcycle_id in (select id from motorcycles where user_id = auth.uid())
);

-- Part replacements: owner sees own
alter table part_replacements enable row level security;
create policy "parts_owner" on part_replacements for all using (
  motorcycle_id in (select id from motorcycles where user_id = auth.uid())
);

-- Documents: owner sees own
alter table documents enable row level security;
create policy "docs_owner" on documents for all using (
  motorcycle_id in (select id from motorcycles where user_id = auth.uid())
);

-- Reminders: owner sees own
alter table reminders enable row level security;
create policy "reminders_owner" on reminders for all using (
  motorcycle_id in (select id from motorcycles where user_id = auth.uid())
);

-- Rides: public rides visible to all; private rides visible to owner/participants
alter table rides enable row level security;
create policy "rides_public" on rides for select using (
  is_public = true or owner_id = auth.uid() or
  id in (select ride_id from ride_participants where user_id = auth.uid())
);
create policy "rides_owner_write" on rides for insert with check (owner_id = auth.uid());
create policy "rides_owner_update" on rides for update using (owner_id = auth.uid());

-- Ride participants: ride owner and participant see all; users see own
alter table ride_participants enable row level security;
create policy "rp_ride_owner" on ride_participants for all using (
  ride_id in (select id from rides where owner_id = auth.uid())
);
create policy "rp_self" on ride_participants for all using (user_id = auth.uid());

-- Track points: ride owner and participants
alter table track_points enable row level security;
create policy "tp_ride_access" on track_points for all using (
  ride_id in (
    select id from rides where owner_id = auth.uid()
    union
    select ride_id from ride_participants where user_id = auth.uid()
  )
);

-- Groups: group members see group
alter table groups enable row level security;
create policy "groups_members" on groups for select using (
  id in (select group_id from group_members where user_id = auth.uid())
);

-- Group members: self and group owner
alter table group_members enable row level security;
create policy "gm_self" on group_members for all using (user_id = auth.uid());
create policy "gm_group_owner" on group_members for all using (
  group_id in (select id from groups where ride_id in (select id from rides where owner_id = auth.uid()))
);

-- Clubs: public visible, members see all
alter table clubs enable row level security;
create policy "clubs_public" on clubs for select using (is_public = true);
create policy "clubs_members" on clubs for select using (
  id in (select club_id from club_members where user_id = auth.uid())
);

-- Club members: self and club (owner via club)
alter table club_members enable row level security;
create policy "cm_self" on club_members for all using (user_id = auth.uid());

-- Notifications: self only
alter table notifications enable row level security;
create policy "notif_self" on notifications for all using (user_id = auth.uid());
```

---

## Step 3: The API (Server Actions / Route Handlers)

| Method | Path | What it does | Who | Input | Output | Flow |
|--------|------|--------------|-----|-------|--------|------|
| POST | /api/auth/signup | Register with phone OTP or email | anon | {phone?, email?, name, otp} | {user, session} | F01 auth |
| POST | /api/auth/login | Magic link / OTP / Google | anon | {provider?, email?, phone?} | {session} | F01 auth |
| POST | /api/auth/logout | Sign out | user | — | — | — |
| GET | /api/motorcycles | List user's bikes | user | — | Motorcycle[] | F01 garage |
| POST | /api/motorcycles | Add motorcycle | user | {make, model, year, odometer, purchase_date} | Motorcycle | F01 garage |
| PATCH | /api/motorcycles/:id | Update bike | owner | {make?, model?, odometer?, is_active?} | Motorcycle | F01 |
| DELETE | /api/motorcycles/:id | Remove bike | owner | — | — | — |
| GET | /api/fuel-logs | List logs for bike | user | {motorcycle_id, limit?, cursor?} | FuelLog[] | F01 mileage |
| POST | /api/fuel-logs | Log fill-up (offline-first) | user | {motorcycle_id, amount, litres, rate, odometer, full_tank, client_id?, logged_at?} | FuelLog | F01 |
| PATCH | /api/fuel-logs/:id | Edit log | owner | {amount?, litres?, rate?, odometer?, full_tank?} | FuelLog | F01 |
| DELETE | /api/fuel-logs/:id | Delete log | owner | — | — | F01 |
| GET | /api/expenses | List expenses | user | {motorcycle_id?, ride_id?, limit?} | Expense[] | F01 expenses |
| POST | /api/expenses | Log expense | user | {motorcycle_id, category, amount, parts_amount?, labour_amount?, workshop_id?, ride_id?, date, client_id?} | Expense | F01 |
| GET | /api/analysis/cost-per-km | Cost per km per bike | user | {motorcycle_id} | {per_km, by_category, trend} | F07 |
| GET | /api/analysis/parts-health | Parts status per bike | user | {motorcycle_id} | {part, status, km_remaining}[] | F06, F07 |
| GET | /api/rides | Public rides (city, type, date) | anon/user | {city_id?, type?, from_date?, to_date?} | Ride[] | F03 |
| GET | /api/rides/:id | Ride detail | anon/user | — | Ride + participants | F03 |
| POST | /api/rides | Create ride | user | {title, start_place, end_place, start_at, type, riders_wanted?, cost_note?, bike_id?} | Ride | F04 |
| PATCH | /api/rides/:id | Update ride | organiser | {title?, description?, riders_wanted?, status?} | Ride | F04 |
| POST | /api/rides/:id/join | Request to join | user | — | RideParticipant | F03 |
| PATCH | /api/rides/:id/participants/:pid | Approve/decline | organiser | {status: accepted|declined} | RideParticipant | F03 |
| POST | /api/rides/:id/start | Start tracking | organiser | — | {track_session_id} | F02 |
| POST | /api/track-points | Batch upload GPS | participant | {ride_id, points: [{lat,lng,alt,speed,ts}]} | {count} | F02 |
| POST | /api/rides/:id/end | End tracking | organiser | — | Ride (completed) | F02 |
| GET | /api/rides/:id/share | Create live share link | participant | — | {url, token, expires_at} | F02 |
| GET | /api/live/:token | Public live viewer | anon | — | LiveRideData | F02 |
| POST | /api/groups | Create group from ride | organiser | {ride_id, invite_expires_days?} | Group | F08 |
| GET | /api/groups/:inviteCode | Get group by invite | anon/user | — | Group + members | F09 |
| POST | /api/groups/:id/join | Join group | user | {role?} | GroupMember | F09 |
| PATCH | /api/groups/:id/members/:uid | Update role/status | leader | {role?, status?} | GroupMember | F08 |
| GET | /api/groups/:id/live | Live group map data | member | — | {riders: [{user, lat, lng, status}]} | F08 |
| POST | /api/groups/:id/broadcast | Broadcast location | member | {lat, lng, speed, status?} | — | F08 (realtime) |
| GET | /api/clubs | List clubs | anon | {city_id?} | Club[] | F05 |
| POST | /api/clubs | Create club | user | {name, city_id, logo_url?, since_year} | Club | F05 |
| POST | /api/clubs/:id/join | Request to join | user | — | ClubMember | F05 |
| GET | /api/part-types | Catalog | anon | {group?} | PartType[] | F06 |
| POST | /api/part-replacements | Record replacement | user | {motorcycle_id, part_type_id, odometer, custom_interval?} | PartReplacement | F06 |
| POST | /api/documents | Upload document | user | {motorcycle_id, kind, file, expires_on?, insurer?, policy?} | Document | F06 |
| GET | /api/notifications | List notifications | user | {unread_only?} | Notification[] | — |
| PATCH | /api/notifications/:id/read | Mark read | user | — | Notification | — |
| GET | /api/export | Export all user data | user | — | CSV zip | F39 |
| DELETE | /api/account | Delete account + data | user | {confirm: true} | — | F52 |

---

## Step 4: The Parts That Bite

| Area | Risk | Mitigation |
|------|------|------------|
| **Offline-first fuel/expense logging** | Client-generated IDs, conflict resolution on sync | UUID v7 (timestamp-ordered), last-write-wins per client_id, retry queue in IndexedDB |
| **Ride tracking (web)** | Browser GPS only works in foreground; background needs native | PWA uses Page Visibility API to warn; native app via Expo later with background location permission |
| **Group ride live map** | High-frequency location updates (1-5s), many riders | Supabase Realtime broadcast; throttle to 5s on web, 2s native; only broadcast to group members |
| **Race: two riders join last seat** | Double-booking group ride | DB unique constraint on (group_id, user_id) + status check in transaction |
| **Race: fuel log sync** | Same log edited on two devices | client_id deduplication, server timestamp wins, show conflict UI if divergent |
| **Time zones** | Rides across zones, logs in local time | Store all timestamps as UTC timestamptz; display in user's tz (from profile or browser) |
| **File uploads** | Document images (RC, insurance) | Supabase Storage signed upload URLs, 10MB limit, type allowlist (pdf, jpg, png) |
| **Search / city pages** | "Rides in Mumbai" SEO pages | Static generation for city pages at build + ISR; pg_trgm index on rides for text search |
| **Realtime scaling** | Many concurrent group rides | Supabase Realtime handles 10k+ concurrent; each group is a separate channel |
| **GDPR / DPDP Act** | Delete account, export data | `/api/export` and `/api/account` endpoints; cascade deletes via FK |
| **Battery / network** | Group ride GPS drains battery | Adaptive polling: 2s when moving, 30s when stopped; pause on background |
| **Parts catalog seed** | 40+ part types with intervals | JSON seed file + migration; admin UI later |

---

## Step 5: Build Order

### Milestone 1 — Vertical Slice (Week 1-2)
**Goal:** Sign up → add bike → log fill-up → see cost/km
| Screens | Tables | Routes |
|---------|--------|--------|
| S03, S20, S28 (cost per km) | users, motorcycles, fuel_logs, cities | auth, motorcycles CRUD, fuel-logs CRUD, cost-per-km |

### Milestone 2 — Core Logging (Week 3-4)
**Goal:** Complete motorcycle ownership loop
| Screens | Tables | Routes |
|---------|--------|--------|
| S21 (expenses), S22 (parts), S23 (papers), S28, S29 (parts health) | expenses, workshops, part_types, part_replacements, documents, reminders | expenses CRUD, parts catalog, replacements, documents, reminders, analysis endpoints |

### Milestone 3 — Public Rides & Clubs (Week 5-6)
**Goal:** Discover and join public rides, clubs
| Screens | Tables | Routes |
|---------|--------|--------|
| S01-S06, S26, S27 | rides, ride_participants, clubs, club_members, cities | rides list/detail/create, join requests, clubs list/detail/join |

### Milestone 4 — Ride Tracking & Live Share (Week 7-8)
**Goal:** Track ride, share live link, view history
| Screens | Tables | Routes |
|---------|--------|--------|
| S24, S25, S14 (live viewer) | track_points, rides (status), live_shares | start/end tracking, batch track points, live share link, public viewer |

### Milestone 5 — Group Ride Room (Week 9-11)
**Goal:** Core differentiator — live group map
| Screens | Tables | Routes |
|---------|--------|--------|
| S32, S33, S34, S37, S38 | groups, group_members | create group, invite/join by code, live map data, Realtime broadcast, status buttons, privacy |

### Milestone 6 — Planning & Polish (Week 12-13)
| Screens | Tables | Routes |
|---------|--------|--------|
| S35 (expense split), S36 (route planner), S39 (export/delete) | — | expense split calc, GPX import/export, data export, account delete |

### Milestone 7 — Native Apps (Post-launch)
| Screens | Work |
|---------|------|
| All app screens | Expo build, background location, push notifications, EAS submit |

---

## Summary

- **Stack:** Next.js + Supabase + Expo + Mapbox — all managed, TypeScript end-to-end
- **Tables:** 21 (users, cities, motorcycles, fuel_logs, expenses, workshops, part_types, part_replacements, documents, reminders, rides, ride_participants, track_points, groups, group_members, clubs, club_members, notifications, part_type seed, etc.)
- **Routes:** ~35 server actions / API endpoints
- **Riskiest:** Offline-first sync, group ride realtime at scale, web GPS limitations
- **Next step:** `/replica-design` → design tokens + component specs