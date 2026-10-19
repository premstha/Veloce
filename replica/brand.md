# RoadBee Clone — Brand Identity & Rebranding
Generated: 2026-10-19 | Skill: /replica-brand

---

## Step 1: Name Candidates (5 finalists)

Based on the positioning angle ("free analytics + group live map"), here are 5 name candidates:

| Name | Style | Meaning | Checks to Run |
|------|-------|---------|---------------|
| **Veloce** | Italian word | "Fast" — evokes touring, group dynamics | US/EU/IN trademark, .com/.in domain, Play/App Store |
| **Tarmac** | Descriptive | Where riders spend their time | US/EU/IN trademark, .com/.in domain |
| **Paceline** | Cycling term | Riders drafting in formation — group riding | US trademark, .com domain |
| **Convoy** | Metaphor | Group movement, road companions | US/EU trademark (check class 9 & 42) |
| **RideSync** | Compound | Sync riders on one map | US trademark, .com/.in domain |

**Recommendation:** **Veloce** — short, memorable, spellable, and signals the speed/touring ethos without overlapping RoadBee's brand.

**Next:** User runs trademark searches at tmsearch.uspto.gov (class 9, 42), domain whois, Play/App Store name search.

---

## Step 2: Palette (Rebrand from RoadBee Yellow)

RoadBee uses near-black bg + warm yellow accent (`#f7b731`). 

**Our palette:** Shift to a cooler **electric cyan** accent to differentiate trade dress.

```json
{
  "bg": "#0a0a0f",
  "surface": "#12121a",
  "border": "#1e1e26",
  "border-input": "#2a2a3a",
  "text": "#e8e8f0",
  "text-muted": "#8888a0",
  "accent": "#06d6a0",  // ← CHANGED: Electric cyan (was yellow)
  "on-accent": "#0a0a0f",
  "danger": "#ff5252",
  "success": "#4ade80",
  "warning": "#f59e0b"
}
```

Run contrast check: `python3 contrast.py replica/design/tokens.json` — must pass WCAG AA (4.5:1 body, 3:1 large).

---

## Step 3: Logo Brief

**Concept:** A forward-pointing arrow made of interlocking road lines, symbolizing group formation + forward motion.

- **Type:** Symbol + wordmark (Veloce in DM Sans Bold)
- **Must work at:** 16px favicon, 192px PWA icon, 1024x1024 iOS app icon
- **Colors:** Accent cyan on dark bg; white on light bg
- **Deliverables:** SVG, PNG (1024x1024 with no transparency), favicon set, social OG image (1200x630)
- **Original, not traced:** Must not resemble RoadBee's bee/honeycomb or any other moto app marks.

---

## Step 4: Voice Guide

**How it sounds:** Direct. Practical. Grounded.

| Do | Don't |
|----|-------|
| "Track your real costs" | "Unlock insights with Miles" |
| "See everyone on the map" | "Premium group features" |
| "Export your data anytime" | "Your ride, our platform" |
| "Free. No gates." | "Freemium model" |
| "Log offline, sync later" | "Always connected experience" |

**Sample rewrites (10 most-seen strings):**

1. Sign up CTA: "Start tracking for free" (not "Get the app")
2. Empty fuel log: "Add your first fill-up to see mileage" (not "No entries yet")
3. Cost locked state: **REMOVED** — everything is free
4. Group invite: "Share this link with your group" (not "Invite friends to ride")
5. Ride confirm: "You're in. Meet at 05:30." (not "Booking confirmed")

---

## Step 5: Sweep (Find Leftovers)

```bash
cd roadbee-clone
python3 ../replica-brand/sweep.py . \
  --avoid "RoadBee,RBX Autoworld,roadbee.in" \
  --domains "roadbee.in" \
  --colors "#f7b731"
```

**Must be clean (exit 0) before launch.** Check by eye: favicon, page titles, OG image, email templates.

---

## Output

- Name: **Veloce** (pending trademark clearance)
- Palette: Electric cyan accent (`#06d6a0`)
- Logo: Brief written, ready for designer or image model
- Voice: Direct, no-BS, anti-paywall
- Sweep: Run before deploy

**Next:** `/replica-launch` (landing page, pricing, store listing)