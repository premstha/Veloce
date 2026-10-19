# Veloce — Test Plan
Generated: 2026-10-19 | Skill: /replica-test

---

## Test Strategy

This plan tests the Veloce clone against the 9 flows in `replica/recon.md`. Each flow has happy path, edge cases, and negative cases.

**Constraints:**
- Test the clone, not the original
- Playwright e2e where possible (auth, garage, fuel logging, rides)
- Manual checklist for OAuth, payments (none), email delivery
- No testing against RoadBee servers

---

## Test Cases by Flow

### F01 — Rider logs a fill-up
**Screen:** `/fuel/new`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F01-H1 | Happy | Fill all 5 fields, submit, see confirmation | Log saved, rolling kmpl updated on garage |
| F01-E1 | Edge | Empty input fields | Inline validation shows errors |
| F01-E2 | Edge | Very long input (1000 chars in notes) | Field trims or rejects gracefully |
| F01-E3 | Edge | Emoji in notes | Saved correctly, displays correctly |
| F01-E4 | Edge | Two tabs at once | Last write wins, no duplicate |
| F01-E5 | Edge | Double click submit | Only one log created |
| F01-E6 | Edge | Back button mid-flow | Form data preserved or lost gracefully |
| F01-E7 | Edge | Refresh mid-flow | Form restored or cleared gracefully |
| F01-E8 | Edge | Slow network (3G) | Loading spinner, no duplicate |
| F01-E9 | Edge | Offline | Log queued, syncs on reconnect |
| F01-E10 | Edge | Expired session | Redirects to login, data preserved |
| F01-E11 | Edge | Second user's data invisible | Can only see own logs |
| F01-E12 | Edge | Mobile width (375px) | Form fills width, scrolls |
| F01-E13 | Edge | Keyboard only navigation | Tab order logical, Enter submits |
| F01-N1 | Negative | Wrong bike selected | Bike mismatch caught |
| F01-N2 | Negative | Negative litres | Validation fails |

---

### F02 — Rider tracks a ride and shares live
**Screens:** `/rides/new` → live tracking

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F02-H1 | Happy | Start ride, track for 5 min, stop, see map | Ride saved, distance, duration accurate |
| F02-E1 | Edge | GPS permission denied | User prompted, ride not started |
| F02-E2 | Edge | Background GPS blocked | Ride pauses, resumes when foregrounded |
| F02-E3 | Edge | Straight line routes (short ride) | Map shows correct path |
| F02-E4 | Edge | Emergency contacts empty | Ride starts anyway, no blocking |
| F02-E5 | Edge | Ride over 24 hours | Still tracked, no crash |
| F02-E6 | Edge | Battery low mid-ride | Warning shown, ride continues |
| F02-E7 | Edge | Time zone change during ride | Duration calculated correctly |
| F02-E8 | Edge | Daylight saving change | Duration unaffected |
| F02-E9 | Edge | Share link to non-user | Works, shows live map |
| F02-N1 | Negative | Try to start ride without bike selected | Blocked with message |
| F02-N2 | Negative | Delete ride before start | Ride removed, clean state |

---

### F03 — Rider finds public ride and asks to join
**Screens:** `/rides` → `/rides/{city}` → `/rides/{id}`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F03-H1 | Happy | Discover ride, click join, see confirmation | Request sent, status updates |
| F03-E1 | Edge | Ride full | Join button disabled, message shown |
| F03-E2 | Edge | Ride declined | Correct status shown, notification sent |
| F03-E3 | Edge | Multiple rides same time | Can request to join both |
| F03-E4 | Edge | Ride cost sharing stated | Cost shown clearly |
| F03-E5 | Edge | Back button after join | Status preserved |
| F03-E6 | Edge | Refresh after join | Status correct |
| F03-N1 | Negative | Try to join without login | Redirect to login |
| F03-N2 | Negative | Organiser blocks user | Request rejected, no notification |

---

### F04 — Rider posts a public ride
**Screen:** `/rides/new`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F04-H1 | Happy | Fill form, submit, ride appears publicly | Ride listed on rides page |
| F04-E1 | Edge | Unwanted joiners | Organiser can reject |
| F04-E2 | Edge | Edit ride after posting | Changes reflect publicly |
| F04-E3 | Edge | Cancel ride | Removed from public listing |
| F04-E4 | Edge | Ride type incorrect | Still posted, can be filtered |
| F04-E5 | Edge | Very long description | Truncates in list, full on detail |
| F04-N1 | Negative | Post ride in past | Validation fails |
| F04-N2 | Negative | Post ride with no location | Validation fails |

---

### F05 — Rider joins a club
**Screens:** `/clubs` → `/clubs/{id}`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F05-H1 | Happy | Request to join club, status updates | Request recorded, notification sent |
| F05-E1 | Edge | Club full | Join disabled, message shown |
| F05-E2 | Edge | Club private | Request goes to pending |
| F05-E3 | Edge | Multiple requests | Only one sent |
| F05-E4 | Edge | Back button after request | Status correct on return |
| F05-N1 | Negative | Try to join without login | Redirect to login |

---

### F06 — Rider records a part replacement
**Screen:** `/garage/parts` → `/parts/new`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F06-H1 | Happy | Select part, enter odometer, save, see countdown | Part status updates, interval starts |
| F06-E1 | Edge | Part already recorded | New entry, old archived |
| F06-E2 | Edge | Odometer lower than previous | Validation warning |
| F06-E3 | Edge | Two tabs add same part | Last write wins |
| F06-E4 | Edge | Offline | Queued, syncs later |
| F06-E5 | Edge | Double click submit | Only one record |
| F06-N1 | Negative | Delete part without confirmation | Confirmation shown |

---

### F07 — Cost per km and parts tracker always free
**Screens:** `/expenses/cost-per-km`, `/garage/parts`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F07-H1 | Happy | View cost per km without subscription | Always visible, no gate |
| F07-H2 | Happy | View parts health without subscription | Always visible, no gate |
| F07-E1 | Edge | No logs yet | Empty state with CTA |
| F07-E2 | Edge | Huge numbers | Formats correctly (lakhs/crores) |
| F07-E3 | Edge | Mobile width | Charts readable |
| F07-N1 | Negative | Try to hide analytics | Always visible |

---

### F08 — Group ride: rider joins and sees live group map
**Screens:** `/rides/{id}` → `/rides/group-room`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F08-H1 | Happy | Join group room, see 6 riders on map | Map updates, speeds shown |
| F08-E1 | Edge | Network drops | Shows "reconnecting", auto resumes |
| F08-E2 | Edge | Battery low | Warning, polling slower |
| F08-E3 | Edge | Rider lags behind | Lag indicator shown |
| F08-E4 | Edge | Rider leaves mid-ride | Removed from map |
| F08-E5 | Edge | Ride ends | Room shows finished state |
| F08-E6 | Edge | Back button mid-ride | Room still active |
| F08-E7 | Edge | Mobile data slow | Map degrades gracefully |
| F08-N1 | Negative | Try to join without being invited | Access denied |
| F08-N2 | Negative | Ride full | Join disabled |

---

### F09 — Group join via invite
**Screen:** `/rides/group-room?code=XXXX`

| ID | Type | Description | Expected Result |
|----|------|-------------|-----------------|
| F09-H1 | Happy | Enter code, see group map | Joined successfully |
| F09-E1 | Edge | Invalid code | Error message, no crash |
| F09-E2 | Edge | Expired link | Error, offer to request new invite |
| F09-E3 | Edge | Code with spaces | Trimmed, works |
| F09-E4 | Edge | Copy/paste code | Works correctly |
| F09-N1 | Negative | Brute force code attempts | Rate limited |

---

## Automation Priority

### Playwright specs (auto-testable)
- F01-H1, F01-E1, F01-E5, F01-E9, F01-N1
- F03-H1, F03-E1, F03-N1
- F04-H1, F04-N1
- F05-H1, F05-E1
- F06-H1, F06-E2
- F07-H1, F07-H2, F07-E1
- F08-H1, F08-E4
- F09-H1, F09-E1

### Manual test checklist
- F02 (requires real GPS)
- F08-E1, F08-E2, F08-E7 (network conditions)
- F01-E8 (slow network simulation)
- All screen reader tests
- All keyboard navigation
- All mobile width tests
- Email delivery (notifications)

---

## Edge Case Coverage

Testing all of:
- Empty input
- Very long input
- Emoji and accents
- Two tabs at once
- Double click submit
- Back button mid-flow
- Refresh mid-flow
- Slow network
- Offline
- Expired session
- Second user's data invisible
- Time zones and DST
- Mobile width
- Keyboard only
- Screen reader labels

---

## Negative Cases Covered

All flows tested with:
- Wrong password / wrong credentials
- Card declined (not applicable - no payments)
- Permission denied
- Deleted record access
- Unauthorized access to other user's data
- Invalid codes/links
- Expired sessions
