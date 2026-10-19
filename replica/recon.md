# RoadBee Clone — Recon Map
Generated: 2026-10-19 | Source: user-reconstructed from roadbee.in observation

## Scope

**App:** RoadBee clone — a motorcycle rider companion platform for logging fuel, expenses, tracking parts and papers, finding and organizing rides, and group riding features.
**Platform:** Web PWA first (responsive), Native iOS/Android later (Expo/React Native)
**Slice:** Full web app with all core features plus group riding extensions
**For:** Motorcycle riders who want a comprehensive tracking and ride-organizing solution. All features free for everyone.

**Core loop:** A rider logs fuel and expenses during rides, tracks costs and maintenance, discovers public rides and clubs, and joins/group rides with friends where everyone sees each other live.

---

## Sources (public pages only, read by hand)

| # | source | URL | notes |
|---|--------|-----|-------|
| 1 | home page | https://roadbee.in/ | positioning, stats, pricing table |
| 2 | rides hub | https://roadbee.in/rides/ | ride discovery, live link explainer |
| 3 | clubs | https://roadbee.in/clubs/ | directory by city, listing rules |
| 4 | mileage & expenses | https://roadbee.in/mileage-and-expenses/ | fuel log fields, categories |
| 5 | motorcycle health | https://roadbee.in/motorcycle-health/ | part intervals, 3 states, spare parts |
| 6 | user screenshot | replica/screens/screenshot.png | "Spare parts" phone mockup, nav, CTA |
| 7 | Google Play | com.roadbee.android | read later: screenshots, reviews |
| 8 | App Store | id6474824672 | read later: screenshots, reviews |

---

## Step 1: Scope

**App:** RoadBee clone — motorcycle rider platform for logging, tracking, rides, clubs, and group riding
**Platform:** Web PWA (responsive), native apps later
**Slice:** Full — all features listed, no premium/paywall
**For:** Motorcycle riders managing their bikes, logging trips, and sharing rides

---

## Step 2: Screen Inventory

### Public Website (confidence: high, seen directly)

| ID | screen | route | purpose | key components | states seen |
|----|--------|-------|---------|----------------|-------------|
| S01 | Home | / | Pitch, stats, plan table, download CTA | sticky nav, hero, stat strip, features, pricing table, store badges, footer | filled |
| S02 | Rides hub | /rides/ | Find rides, how to post, live link explainer | stats, ride-type cards, city chips, upcoming rides list, numbered how-to | filled |
| S03 | City rides | /rides/{city}/ | Rides and clubs for one city | list, club cards | filled |
| S04 | Public ride detail | /rides/{city}/{slug}-{id}/ | Route, date, riders, ask to join | map, cost, participants, join button | loaded |
| S05 | Clubs directory | /clubs/ | Clubs grouped by city | totals strip, city groups, club cards | filled |
| S06 | Club detail | /clubs/{slug}-{city}-{id}/ | One club's profile | club info, members, rides, km | loaded |
| S07 | Mileage & expenses | /mileage-and-expenses/ | Fuel log and cost tracking | form mockup, category chips, stats | filled |
| S08 | Motorcycle health | /motorcycle-health/ | Parts and paperwork tracking | interval table, 3-state legend, spare parts mockup | filled |

### App Screens (confidence: medium, from marketing mockups)

| ID | screen | purpose | key components | states |
|----|--------|---------|----------------|--------|
| S20 | Log a fill-up | amount, litres, rate, odometer, full tank | form, rolling kmpl result | filled, offline queued |
| S21 | Log an expense | category, amount, parts/labour split | category chips, form | filled |
| S22 | Spare parts | per-part km vs interval, Good/Due Soon/Overdue | odometer header, list, status text | filled, locked |
| S23 | Papers | RC, insurance, PUC, expiry reminders | list, dates, upload | loaded |
| S24 | Live ride | distance, avg speed, time stopped, share | big stats, share control | live, paused |
| S25 | Ride history | route, distance, moving vs stopped | map, stats | loaded |
| S26 | Create ride | where, when, riders wanted, public | form | loaded |
| S27 | Clubs | create, join, request to join | list, request | loaded |

### Group Ride Extensions

| ID | screen | purpose | key components | states |
|----|--------|---------|----------------|--------|
| S32 | Group ride room | All riders on one live map | live map, rider list, status | active, paused, finished |
| S33 | Invite & join | Link, QR code, ride code | input, copy, scan | submitted, error |
| S34 | Ride chat | Inside the group ride | messages, status buttons | loading, with messages |
| S35 | Expense split | Shared trip costs | expenses list, settle button | calculated, settled |
| S36 | Route planner | Waypoints, fuel stops | map, form, dropdown | planned, driving |
| S37 | SOS/alerts | Emergency alerts to group | alerts list, contacts | triggered, resolved |
| S38 | Privacy settings | Location sharing controls | toggles, expiry | saved |
| S39 | Data export/delete | Export as CSV, delete account | buttons, confirmation | exported, deleted |

---

## Step 3: User Flows

```
F01 Rider logs a fill-up
    S20 -> (result) rolling kmpl
    happy path: ~10 seconds, 5 fields
    edge: partial tank, back-dated entry, delete, no signal (syncs later)

F02 Rider tracks a ride and shares live
    S24 (start) -> share link -> S14 viewer (no account) -> S25 saved ride
    edge: background GPS blocked, straight-line routes, emergency contacts

F03 Rider finds a public ride and asks to join
    S02 -> S03 -> S04 -> app -> ask to join -> organiser accepts
    edge: ride full, declined, cost-sharing stated

F04 Rider posts a public ride
    S26 (where, when, riders, public) -> appears on S02/S03/S04
    edge: unwanted joiners (organiser approves)

F05 Rider joins a club
    S05 -> S06 -> app -> request to join

F06 Rider records a part replacement
    S22 -> pick part + odometer -> clock starts -> Due Soon -> Overdue

F07 Rider uses cost per km and parts tracker (always free)
    log or ride -> unlock S28 / S22 automatically

F08 Group ride: rider joins and sees live group map
    S02 -> S04 -> S32 (group ride room)
    edge: network drops, battery low, regroups, wait for me

F09 Group join via invite
    S33 -> S32
    edge: invalid code, expired link
```

---

## Step 4: Components

| Component | Variants | States | Used On |
|-----------|----------|--------|---------|
| Nav bar | sticky, 6 links + primary CTA pill | default, active | all |
| Primary CTA pill | yellow | default, hover, focus | all |
| Store badges | Google Play, App Store | default | S01 |
| Phone mockup card | dark rounded frame | static | S01, S07, S08 |
| Stat tile | number + label | static | S01, S02, S05, S07 |
| Status text | Good, Due Soon, Overdue | static | S22 |
| ride-type card | breakfast, day, multi-day | default | S02 |
| City chip link | per city | default, hover | S02 |
| Club card | logo, members, rides+km | default | S05, S03 |
| Plan table | Free vs Premium | static | S01 |
| Fill-up form | 5 fields, tank toggle | default, error, offline | S20 |
| Category chips | Fuel, Repairs, Gear, etc. | selected | S21 |
| Footer | explore, help, policies | static | all |
| Interval status | Good (green), Due Soon (amber), Overdue (red) | static | S22 |
| Group map | live markers, rider positions | active, paused | S32 |
| Status buttons | fuel stop, tea break, issue | clicked | S34 |
| Distance warning | laggy rider indicator | warning | S32 |
| Ride notes | pothole, road condition | entered | S25 |

---

## Step 5: Inferred Data Model

```
User
  id, name, email, phone, city, premium bool (removed), created_at
  evidence: S01 plan table; confidence: medium
Motorcycle
  id, user_id, make, model, odometer_latest, purchase_date
  evidence: S22 "latest odometer", "which bike"; confidence: high
FuelLog
  id, motorcycle_id, amount_paid, litres, rate, odometer, full_tank, logged_at
  evidence: S20 form; confidence: high
Expense
  id, motorcycle_id, category, amount, parts_amount, labour_amount, workshop_id?, ride_id?, date
  evidence: S07 text; confidence: high
Workshop
  id, name, city
  evidence: S07; confidence: medium
PartType
  id, name, group, default_interval_km
  evidence: S08 table; confidence: high
PartReplacement
  id, motorcycle_id, part_type_id, odometer_at, custom_interval_km?
  evidence: S08; confidence: high
Document
  id, motorcycle_id, kind, insurer, policy_no, expires_on, file
  evidence: S08; confidence: medium
Reminder
  id, motorcycle_id, kind, due_date or due_km, sent_at
  evidence: S08; confidence: medium
Ride
  id, owner_id, bike_id, start/end_place, start/end_time, public, riders_wanted, cost_note, type
  evidence: S02; confidence: high
RideParticipant
  id, ride_id, user_id, role (organiser|rider|spectator), status, distance, avg_speed, stopped_minutes
  evidence: S02; confidence: high
TrackPoint
  id, ride_id, user_id, lat, lng, ts
  evidence: S02 "29 lakh+ points"; confidence: high
Group
  id, ride_id, invite_code, created_at
  evidence: S01, S02; confidence: high
GroupMember
  id, group_id, user_id, role, status (pending|joined)
  evidence: invite/join flow; confidence: high
Club
  id, name, city, logo, since_year, public, confirmed
  evidence: S05; confidence: high
ClubMember
  id, club_id, user_id, status
  evidence: S05 member counts; confidence: high
MilesLedger (removed feature, no paywall)
Subscription (removed finance feature)
Vehicle (merged into motorcycle)
Incident (removed SOS safety feature)
Message (removed chat feature, insufficient detail)
Notification
  id, user_id, type, payload, read_at
  evidence: notifications screen; confidence: medium
City
  id, name, slug
  evidence: S02 city pages; confidence: high
```

Relationships:
- User 1-n Motorcycle
- Motorcycle 1-n FuelLog, Expense, PartReplacement, Document
- Ride 1-n RideParticipant, TrackPoint, Group
- Club 1-n ClubMember
- User 1-n Notification

---

## Step 6: What Cannot Be Cloned (Out of Scope)

| feature | reason | priority |
|---------|---------|----------|
| Existing user base and club network | Their data and network | skip |
| "Learns what parts really last" from all riders | Needs large user base | skip |
| Their logo, name, taglines, copy, images | Must be original | skip |
| Native background GPS | Web can only do foreground tracking | skip |
| Premium plan and payments | All features free, no payment code | skip |
| Miles economy | Unlock system removed | skip |
| Ads and sponsored cards | Not in this version | skip |
| SOS/breakdown alerts | Emergency contact feature removed | skip |
| Group chat | Feature removed due to insufficient detail | skip |
| User's SRB/MPS/Miles | Narayana region specifics not applicable | skip |

---

## Step 7: Size

- **Screens:** 14 public + 12 app + 7 group extensions = 33
- **Flows:** 9
- **Entities:** ~20
- **Hard parts:** Offline-first sync with client-generated IDs, ride tracking/Mapbox integration, group ride live updates, parts catalog management, city-based search
- **Size:** M for web slice (public site + fuel/expense + clubs + rides) + L for group ride extensions

---

## Summary

**Core loop:** Log fuel/expenses → plan + track rides → discover clubs → share group rides live  
**Platform:** Web PWA first, Native later  
**Screens:** 14 public + 12 app + 7 group = 33  
**Key features:** Free for all, group ride live map, parts tracking, offline logging, city-based ride discovery  
**Differentiator:** Everyone sees everyone live in group rides  
**Decisions:** No premium/paywall, all analysis free, PWA-first, original brand only  
**Next:** `/replica-architect`