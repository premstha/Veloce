# RoadBee Clone — Bug Report

Generated: 2026-10-19 | Format: bug-report.md

---

## To Check (Not Reproduced)
<!-- List any suspected issues that need more investigation -->

---

## Open Bugs

### S1 — Critical
<!-- Data loss, security hole, payments wrong, core flow blocked -->

### S2 — High
<!-- Feature broken, no workaround -->

### S3 — Medium
<!-- Broken with workaround, or visibly wrong -->

### S4 — Low
<!-- Cosmetic issues -->

---

## Fixed Bugs

| Bug ID | Severity | Steps | Fix Commit |
|--------|--------|-------|------------|
| (empty until bugs found) | | | |

---

## Bug Report Template

```
### [ID]
**Severity:** S1/S2/S3/S4

**Steps:**
1. Go to [page]
2. Do [action]
3. ...

**Expected:**
[What should happen]

**Actual:**
[What actually happens]

**Evidence:**
- Screenshot: path/to/screenshot.png
- Console: [error message]
- Network: [failed request]
```

---

## Testing Notes

- All Playwright specs run against localhost:3000
- Use seed data for consistent test environment
- Mobile tests use Pixel 5 viewport
- Offline tests mock connection state