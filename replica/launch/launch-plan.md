# Veloce — Launch Plan
Generated: 2026-10-19 | Skill: /replica-launch

---

## 1. Pre-Launch Checklist

### Infrastructure
- [ ] Supabase project deployed with all 21 tables and RLS policies
- [ ] Mapbox token configured for production
- [ ] Domain (veloce.app or similar) pointing to Vercel deployment
- [ ] SSL certificate active
- [ ] Environment variables set in Vercel (Supabase URL, anon key, Mapbox token)
- [ ] Error tracking (Sentry or similar) configured
- [ ] Analytics (Plausible or PostHog) for product analytics

### Store Assets
- [ ] App icon: 1024x1024 PNG (iOS), adaptive icon (Android)
- [ ] Screenshots: 6 for each platform at required sizes
- [ ] Privacy policy page live at /privacy
- [ ] Support page / support email operational
- [ ] Terms of service page

### Apple & Google
- [ ] Apple Developer account (₹999/yr India)
- [ ] Google Play Console account (one-time $25)
- [ ] Privacy labels completed for both stores
- [ ] Data safety form completed (Google Play)
- [ ] Age rating: 4+ (both stores)
- [ ] Test account credentials ready for reviewers

---

## 2. Beta Waitlist

### Waitlist Strategy
Before public launch, gather 50-100 early riders:

1. **Reddit**: Post in r/indianbikes, r/motorcycling, r/RoadBee (if allowed)
2. **WhatsApp**: Contact local riding clubs in Pune, Mumbai, Bangalore, Delhi
3. **Instagram**: @veloce.app — post mockups, ask for beta testers
4. **Telegram**: Indian Motorcycle Riders group

### Beta Onboarding
- Send waitlisters a direct link to the PWA
- Early access to Group Ride Room (most requested feature)
- Slack/Discord community for feedback
- Feature request voting

### Beta Launch Sequence
1. **Week 1**: Invite 20 riders from Reddit + club contacts
2. **Week 2**: Open to public waitlist (100 more)
3. **Week 3**: Soft launch — public URL, social posts

---

## 3. Launch Channels

### Primary: Product-Led Growth
- **Landing page** (this repo) drives organic search
- **SEO**: Target "free bike tracker", "motorcycle cost calculator", "group ride GPS"
- **Reddit** (r/indianbikes, r/motorcycling): Lead with the fix — no paywall
- **Twitter/X**: Thread comparing RoadBee vs Veloce (direct, factual)

### Secondary: Community
- **WhatsApp groups**: Share with riding clubs (not spam — answer questions)
- **Instagram Reels**: 30-second demo of Group Ride Room
- **YouTube Shorts**: "This app is free and RoadBee isn't"

### Optional: Product Hunt
- Post on Product Hunt when at 200+ beta users
- Title: "Veloce — 100% free motorcycle tracker with live group maps"
- GIF demo of Group Ride Room
- Offer 1-month "Ride Captain" (if/when launched) to top commenters

---

## 4. Where Unhappy RoadBee Users Talk

From research:

- **Reddit**: r/indianbikes, r/RoadBee, r/motorcycling
- **Play Store / App Store reviews**: Direct feedback on RoadBee issues
- **Instagram**: @roadbee_official (comments)
- **Telegram**: India Riders Brotherhood, All India Motorcyclists Confederation
- **Facebook Groups**: Indian Bikers Community, Pune Riders Group

**Strategy:** Do not mention RoadBee by name in public posts. Say "other apps charge ₹300/mo for what we give free." Let reviewers draw their own conclusions.

---

## 5. First 10 Users to Hand-Contact

These are the target beta users to personally onboard:

1. **@sagar_biker** — Pune, active in local breakfast rides, commented on Reddit about RoadBee paywall
2. **@raju_enfield** — Mumbai, runs Enfield owners group (200+ members)
3. **@ninja_650rider** — Bangalore, tech-savvy, would give good feedback on the PWA
4. **@mh_ghats** — Maharashtra ghat rider, mentioned battery/connectivity issues in reviews
5. **@triumph_goa** — Goa, runs monthly ride to Dudhsagar Falls
6. **@delhi_ncr_riders** — Delhi NCR club admin, large group
7. **@chennai_bikers** — Chennai riding community
8. **@kolkata_moto** — Kolkata club
9. **@hyd_riders** — Hyderabad group
10. **@scooter_to_sportbike** — Reddit user who posted about upgrading from activa to motorcycle

**Approach:** DM on Instagram/Twitter, offer early access + direct line to founder. Ask for 1 ride report.

---

## 6. Success Metrics (First 90 Days)

| Metric | Target | How to Measure |
|--------|--------|---|
| Signups | 500 | Supabase auth table |
| MAU (monthly active) | 200 | Last login within 30 days |
| Group Ride Rooms created | 50 | rides table + group flag |
| Cost-per-km logs entered | 1,000 | fuel_logs count |
| NPS (Net Promoter Score) | >40 | In-app survey prompt |
| Churn (30-day) | <20% | (30d inactive / total) |
| Reddit / social mentions | 10+ | Manual search weekly |

---

## 7. Post-Launch: First 30 Days

### Week 1-2: Soft Launch
- Focus on bug fixes from beta users
- Daily monitoring of Supabase error logs
- Respond to every piece of feedback personally

### Week 3-4: Iterate
- Add "export to CSV" button to garage page (promised in features)
- Fix Mapbox load times
- Optimize offline-first sync logic

### Ongoing
- Weekly feature request triage
- Monthly newsletter to waitlist (optional: progress + roadmap)

---

## 8. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Supabase costs spike | Set budget alerts at ₹500/mo, ₹1,000/mo |
| Mapbox quota exceeded | Monitor usage weekly, plan fallback |
| Negative reviews on launch | Respond within 24 hours, fix fast |
| RoadBee legal notice | Brand is distinct (Veloce), features are different implementations |
| App Store rejection | Cite our fixes, show 4.1 compliance (different brand, own features) |

---

## 9. Checklist: Go / No-Go

Before declaring "launch":

- [ ] Landing page loads in <2s (Lighthouse >90)
- [ ] All 6 core flows tested: signup → add bike → log fuel → see cost → create group room → see on map
- [ ] Offline logging works (test with airplane mode)
- [ ] OTP auth works (SMS delivery to Indian numbers)
- [ ] CSV export returns valid file
- [ ] No RoadBee references anywhere in code, copy, or metadata
- [ ] Listing.json passes local validation (if listing.py available)
- [ ] Screenshots ready at required sizes
- [ ] Privacy policy live
- [ ] 2 people have tested the full signup → ride flow

---

## Summary

**Launch timeline:**  
- **Beta (Week 1-2):** 50 riders, internal testing  
- **Soft launch (Week 3):** Public waitlist opens, social posts  
- **Full launch (Week 4):** App Store + Play Store submissions  

**Key message:** Veloce is free. No paywall. No Miles. Group rides that actually work.

**Primary goal for first 90 days:** 200 active users logging rides, creating group rooms, and proving the model works without subscriptions.