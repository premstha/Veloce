# Veloce GitHub Repository Setup Guide

## Quick Start for GitHub

### 1. Initialize Git & Push to GitHub

```bash
cd /path/to/roadbee-clone
git init
git add .
git commit -m "Initial commit: Veloce app - RoadBee clone with group rides & tours"
git branch -M main
git remote add origin https://github.com/morluto/rea.git
git push -u origin main
```

### 2. Required Files Included

✅ `.gitignore` — Excludes node_modules, .env, build files  
✅ `README.md` — Complete documentation, setup, and deployment guide  
✅ `package.json` — All dependencies and scripts  
✅ `tsconfig.json` — TypeScript configuration  
✅ `tailwind.config.js` — Styling configuration  
✅ `drizzle.config.json` — Database ORM configuration  
✅ `app/` — All Next.js pages and components  
✅ `db/schema.ts` — Database schema  
✅ `e2e/` — Playwright tests  
✅ `replica/` — Documentation (recon, architecture, brand, launch, deploy)  

### 3. GitHub Repository Structure

```
rea/
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── drizzle.config.json
├── app/
│   ├── auth/
│   ├── garage/
│   ├── fuel/
│   ├── expenses/
│   ├── rides/
│   ├── clubs/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── db/
│   └── schema.ts
├── e2e/
│   ├── playwright.config.ts
│   ├── auth.spec.ts
│   ├── fuel.spec.ts
│   ├── garage.spec.ts
│   ├── rides.spec.ts
│   ├── expenses.spec.ts
│   └── clubs.spec.ts
└── replica/
    ├── recon.md
    ├── architecture.md
    ├── brand.md
    ├── brand.json
    ├── deploy.md
    ├── test-plan.md
    ├── bugs.md
    ├── launch/
    │   ├── landing.md
    │   ├── pricing.md
    │   ├── listing.json
    │   └── launch-plan.md
    └── design/
        ├── tokens.json
        └── components.md
```

### 4. Setup CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run test

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 5. Add GitHub Secrets

In your GitHub repo settings, add:

- `VERCEL_TOKEN` — From Vercel dashboard
- `VERCEL_ORG_ID` — From Vercel team settings
- `VERCEL_PROJECT_ID` — From Vercel project settings

### 6. Environment Variables

Create `.env.example` for reference:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=your_database_url
NEXT_PUBLIC_APP_URL=https://veloce.app
```

Add actual values to Vercel environment variables.

### 7. Branch Protection Rules (Optional)

In GitHub repo settings → Branches:
- Require pull request reviews before merging
- Require status checks to pass (tests, build)
- Require branches to be up to date

### 8. Documentation Structure

All documentation is in `replica/`:

- **recon.md** — Feature matrix, user flows, competitive analysis
- **architecture.md** — Tech stack, database schema, API design
- **brand.md** — Brand guidelines, color palette, voice & tone
- **deploy.md** — Production deployment checklist, DNS setup
- **test-plan.md** — Test cases by flow, Playwright specs
- **bugs.md** — Bug tracker template and known issues

### 9. Ready for Production

Once pushed to GitHub:

1. **Install dependencies locally:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm run test
   ```

3. **Deploy to Vercel:**
   Connect your GitHub repo in Vercel dashboard for automatic deployments

4. **Deploy to Cloudflare Pages:**
   Add your GitHub repo in Cloudflare > Workers & Pages

### 10. Next Steps

- [ ] Create GitHub repository at github.com/morluto/rea
- [ ] Push code: `git push -u origin main`
- [ ] Add Vercel integration
- [ ] Add Cloudflare Pages integration
- [ ] Set environment variables in Vercel
- [ ] Configure GitHub Actions for CI/CD
- [ ] Enable branch protection rules
- [ ] Create first pull request template

---

**Repository is now ready for collaborative development, continuous integration, and production deployment.**
