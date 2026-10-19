# Veloce — Pricing Strategy
Generated: 2026-10-19 | Skill: /replica-launch

---

## 1. Competitive Landscape

| App | Basic | Premium Tier 1 | Premium Tier 2 | Annual Discount |
|-----|-------|---|---|---|
| **RoadBee** | Free (limited) | ₹99/mo (cost analytics) | ₹199/mo (group + analytics) | None listed |
| **Strava Cycling** | Free | $3.99/mo (~₹330) | $12.99/mo (~₹1,080) | $39.99/yr (~₹3,300) |
| **Komoot** | Free (basic maps) | €4.99/mo (~₹450) | — | €39.99/yr (~₹3,600) |
| **AllTrails** | Free | $3.99/mo | $8.99/mo | $39.99/yr |

**Date researched:** 2026-10-19  
**Source:** Play Store, App Store public pricing pages

---

## 2. What Reviewers Said About Pricing

From `reviews.csv`:

- **"Why lock cost per km behind miles or subscription? Basic analytics should be free."** (Play Store, 2024-08-12, 2★)
  - **Theme:** Resentment toward paywall for basic features (3 mentions across platforms)

- **"Too complicated to earn Miles just to check my bike's service intervals. Make it straightforward without gamification."** (Play Store, 2024-06-15, 1★)
  - **Theme:** Confusion and frustration with currency-based paywalls

- **"I already bought my bike. I hate subscription models for maintenance reminders."** (Reddit, 2024-04-10, 3★)
  - **Theme:** Objection to subscriptions for utility features (not premium, but expected)

**Key finding:** Riders do not object to the *existence* of pricing—they object to paywalling basic insights and using gamification as a soft paywall.

---

## 3. Our Model: 100% Free Forever

**Rationale:**

1. **Fix the core complaint:** RoadBee's paywall is the #1 frustration. We remove it entirely.
2. **Network effects:** Group ride room needs critical mass. Free removes friction.
3. **Sustainable:** Lean ops (managed Supabase, no ML, no gaming backend), small team, low CAC (word of mouth + organic).
4. **Future revenue (optional):** If needed, we'll offer paid features that *add* value, not gate existing ones:
   - Advanced analytics (predictive maintenance, CO₂ tracking)
   - API access for clubs/commercial groups
   - White-label licensing

**Commitment:** Core features (logging, group rides, data export, clubs) remain free forever. No trial limits, no feature flags, no artificial restrictions.

---

## 4. Pricing Tiers (Current & Future)

### Current Launch: **1 Tier (Free)**

| Feature | Free |
|---------|------|
| Motorcycle logging (unlimited bikes) | ✓ |
| Fuel & expense logging | ✓ |
| Cost per km analytics | ✓ |
| Service & parts tracking | ✓ |
| Group ride room (real-time map) | ✓ |
| Club discovery & membership | ✓ |
| Data export (CSV) | ✓ |
| Offline logging & sync | ✓ |
| **Cost per month** | **₹0** |

---

### Future Expansion (if adopted): **3 Tiers**

| Feature | Free | Ride Captain | Fleet | 
|---------|------|---|---|
| Motorcycles tracked | 2 | Unlimited | Unlimited |
| Group ride rooms | Unlimited | Unlimited | Unlimited |
| Core analytics | ✓ | ✓ | ✓ |
| **Advanced analytics** | — | Predictive maintenance, CO₂ impact | ✓ (+ emissions reports) |
| **Commercial API** | — | — | ✓ (for tour ops) |
| **Priority support** | — | ✓ | ✓ |
| **Suggested price** | ₹0 | ₹299/mo (~$3.50) | ₹999/mo (~$12) |
| **Annual (2 mo free)** | — | ₹2,990/yr | ₹9,990/yr |

**Note:** These tiers are *not* launched now. They exist as a roadmap to show investors there's a path to revenue if needed. We stay 100% free for at least 1 year or until we hit 10k active users.

---

## 5. Billing & Customer Experience

To avoid the mistakes RoadBee reviewers complained about:

- **No surprise charges:** Annual is auto-renewed; user must manually opt in before billing.
- **One-click cancel:** Cancellation form in app under Settings → Account. Immediate confirmation email.
- **No per-seat surprises:** Pricing is flat per account, not per motorcycle or per group member.
- **Clear renewal emails:** 7 days before annual renewal, we send an email with the charge amount, date, and cancellation link.
- **No gamification:** No "Miles" currency, no "earn to unlock." What you see is what you get.
- **Free trial:** N/A (everything is free).

---

## 6. Stripe Setup

When we launch, create these products & prices:

```json
[
  {
    "name": "Veloce Free",
    "type": "service",
    "prices": [
      {
        "currency": "inr",
        "unit_amount": 0,
        "recurring": null,
        "description": "Free forever, no payment method required"
      }
    ]
  },
  {
    "name": "Veloce Ride Captain (Future)",
    "type": "service",
    "prices": [
      {
        "currency": "inr",
        "unit_amount": 29900,
        "recurring": { "interval": "month", "interval_count": 1 },
        "description": "₹299/mo"
      },
      {
        "currency": "inr",
        "unit_amount": 299000,
        "recurring": { "interval": "year", "interval_count": 1 },
        "description": "₹2,990/yr (save ₹490)"
      }
    ]
  }
]
```

---

## 7. Launch Strategy: Free Entry

1. **No payment onboarding:** Sign up is phone OTP or Google OAuth. No payment method collected at signup.
2. **Usage-based invitations:** No artificial caps (e.g., "5 bikes on free tier"). User hits a real limit only when server resources exceed budget (unlikely with Supabase's auto-scaling).
3. **Transparency:** Show server costs (estimated ₹X per active user per month) on the about page. Build trust through openness.
4. **Monetization defer:** Revisit in Q2 2027 if adoption warrants it.

---

## 8. Key Metrics to Track (Free Model)

- DAU / MAU (monthly active users)
- Cost per active user (Supabase + storage + bandwidth)
- Churn (% of users who stop logging in 30d)
- Group ride room sessions (# of rides shared, # of participants per ride)
- NPS (Net Promoter Score) from in-app survey

---

## Summary

**Veloce launches free.** No tiers, no paywall, no surprises. This is the core positioning fix for RoadBee. We make money later (if at all) through premium features that add genuine value, not features we gate. For now, the business model is: build something riders love, hit product-market fit, then decide how to scale sustainably.

**Next step:** Build the App Store and Google Play listings with `listing.json`.
