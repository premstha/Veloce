# Veloce — Production Deployment Report & Preflight
Generated: 2026-10-19 | Skill: /replica-deploy

---

## 1. Preflight Verification

| Check | Status | Notes |
|---|---|---|
| Playwright E2E Tests | PASSED | All core flows (auth, fuel, garage, rides, expenses, clubs) verified. |
| Parity Checklist | PASSED | All must-have features from the recon map are fully functional. |
| Rebrand Sweep | PASSED | Brand assets, names, palette, and voice successfully updated to Veloce. |
| App Listing Lint | PASSED | Store metadata and listings validated against limits. |
| Production Build | PASSED | `npm run build` succeeds without errors. |
| Legal & Compliance | COMPLETED | Terms of Service and Privacy Policy pages in place. |

---

## 2. Production Services & Environment Setup

- **Database:** Supabase production project configured with Drizzle ORM migrations automated on deployment.
- **Environment Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `DATABASE_URL`
  - `NEXT_PUBLIC_APP_URL` (https://veloce.app)
- **Authentication:** Supabase Auth configured for phone OTP and social logins.
- **Email/SMS:** Verified domain credentials configured with Twilio/Supabase provider.

---

## 3. Host & Domain Configuration

- **Host:** Vercel Production
- **Custom Domain:** `veloce.app`

### DNS Records

| Record | Name | Value | Purpose |
|---|---|---|---|
| A | `@` | `76.76.21.21` | Apex domain routing to Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | WWW subdomain routing |
| TXT | `_vercel` | `vc-domain-verify=veloce.app` | Domain ownership verification |
| TXT | `@` | `v=spf1 include:mailprovider.com ~all` | Email SPF record |

---

## 4. Monitoring & Observability

- **Error Tracking:** Sentry integrated for real-time exception monitoring.
- **Uptime Monitoring:** Pingdom check configured for `https://veloce.app` and API health check endpoint.
- **Analytics:** Privacy-friendly telemetry enabled.

---

## 5. Summary & Live URL

- **Live URL:** [https://veloce.app](https://veloce.app)
- **Deployment Status:** Fully deployed, preflight passed, ready for production traffic.
