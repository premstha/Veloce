# Veloce — Group Ride & Tour Sharing Platform

A modern, high-performance clone of RoadBee built with Next.js, Supabase, and Tailwind CSS. Veloce enables riders to log fuel, track maintenance, discover group rides, and share live ride experiences with other motorcycle enthusiasts.

## Features

- **Motorcycle Garage:** Add bikes, track maintenance intervals, log part replacements
- **Fuel Logging:** Record fill-ups with cost analytics and fuel efficiency tracking
- **Expense Tracking:** Monitor cost per km and maintenance expenses
- **Group Rides:** Discover public rides, request to join, and track live with the group
- **Tour & Share:** Create tours, invite friends via invite codes, track live locations
- **Live Group Room:** Real-time map showing all riders in a group with speed and location
- **Clubs:** Discover and join motorcycle clubs based on location and interests
- **Phone OTP Authentication:** Secure login with SMS verification

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Database:** Supabase (PostgreSQL) with Drizzle ORM
- **Authentication:** Supabase Auth (Phone OTP)
- **Real-time:** Supabase Realtime for live tracking
- **Testing:** Playwright for E2E tests
- **Deployment:** Vercel / Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/morluto/rea.git
cd rea
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=your_database_url
```

4. Run migrations:
```bash
npm run db:migrate
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
veloce/
├── app/                      # Next.js app directory
│   ├── auth/                 # Authentication pages
│   ├── garage/               # Motorcycle management
│   ├── fuel/                 # Fuel logging
│   ├── expenses/             # Cost analytics
│   ├── rides/                # Ride discovery & group room
│   ├── clubs/                # Club discovery
│   └── layout.tsx            # Root layout
├── db/                       # Database schema (Drizzle ORM)
├── e2e/                      # Playwright tests
├── replica/                  # Documentation & design
│   ├── recon.md              # Feature matrix & user flows
│   ├── architecture.md       # Tech stack & API design
│   ├── brand.md              # Brand guidelines & voice
│   ├── design/               # Design tokens & components
│   ├── launch/               # Landing page & App Store listing
│   ├── deploy.md             # Production deployment guide
│   └── test-plan.md          # Testing strategy
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── drizzle.config.json
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
npm run test         # Run Playwright E2E tests
npm run lint         # Run ESLint
```

## Database Schema

The app uses PostgreSQL with Drizzle ORM. Key tables:

- `users` — User profiles and authentication
- `motorcycles` — User's bikes in the garage
- `fuel_logs` — Fuel fill-up records
- `maintenance_logs` — Part replacements and service records
- `rides` — Public ride posts
- `ride_requests` — Join requests for rides
- `group_rooms` — Active group ride sessions with live tracking
- `clubs` — Motorcycle clubs
- `club_members` — Club membership requests and statuses

See `db/schema.ts` for the complete schema.

## Testing

Run end-to-end tests with Playwright:

```bash
npm run test
```

Tests cover:
- Authentication flow (phone OTP)
- Fuel logging with validation
- Garage management
- Ride discovery and joining
- Live group room tracking
- Expense analytics

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel dashboard
3. Add environment variables
4. Deploy

### Cloudflare Pages

1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Add environment variables
5. Deploy

See `replica/deploy.md` for detailed deployment steps and DNS configuration.

## Environment Variables

Required variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXT_PUBLIC_APP_URL=https://veloce.app
```

## Brand & Design

- **Colors:** Premium palette with electric accents
- **Typography:** Clean, modern typeface
- **Voice:** Friendly, empowering, community-focused
- **Design System:** Modular components with Tailwind tokens

See `replica/brand.md` and `replica/design/` for details.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

MIT License — See LICENSE file for details.

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check existing documentation in `replica/`
- Review test cases in `e2e/` for usage examples

---

Built with ❤️ for the motorcycle community. Join the ride.
