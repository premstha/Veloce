/* RoadBee Clone Design Tokens Component Specifications
   Generated from replica/recon.md and user's roadbee.in observation
   All values use tokens.json roles; no raw hex or pixel values.
   Never copy RoadBee's logos, icons, images, or copy.
   CC BY-SA: intent is WCAG AA compliance 4.5:1 body text, 3:1 large text.
*/

/* ============================================
   COLOR ROLES (from tokens.json)
   ============================================ */
.COLOR_ROLES {
  bg: "bg" surface;           /* page backgrounds */
  text: "text" text-muted;    /* body copy, labels */
  textPrimary: "text";        /* headings, important text */
  border: "border";           /* inputs, dividers */
  placeholder: "border-input"; /* input placeholders */
  accent: "accent";           /* primary CTA pill, highlights */
  onAccent: "on-accent";      /* text on accent (usually dark on yellow) */
  danger: "danger";           /* errors, warnings */
  success: "success";         /* success states */
  warning: "warning";         /* non-critical alerts */
}

/* ============================================
   TYPOGRAPHY (from tokens.json)
   ============================================ */
.TYPOGRAPHY_SCALE {
  "12": ["12px", "1.5"],    /* xs */
  "14": ["14px", "1.5"],    /* sm */
  "16": ["16px", "1.5"],    /* md default */
  "20": ["20px", "1.5"],    /* lg */
  "24": ["24px", "1.5"],    /* xl */
  "32": ["32px", "1.5"],    /* 2xl */
  "40": ["40px", "1.5"],    /* 3xl */

  /* Line heights */
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75",
}

/* ============================================
   SPACING SCALE (from tokens.json)
   ============================================ */
.SPACING_SCALE {
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "7": "32px",
  "8": "40px"
}

/* ============================================
   RADIUS SCALE (from tokens.json)
   ============================================ */
.RADIUS_SCALE {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px"
}

/* ============================================
   SHADOW SCALE (from tokens.json)
   ============================================ */
.SHADOW_SCALE {
  sm: "0 1px 2px 0 rgba(0,0,0,0.1)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
  xl: "0 20px 25px -5px rgba(0,0,0,0.1)"
}

/* ============================================
   COMPONENTS
   ============================================ */

/* 1. Nav Bar */
.NavBar {
  padding: var(--spacing-4) var(--spacing-4) var(--spacing-2);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

/* Sticky nav links */
.NavBar-links {
  display: flex;
  gap: var(--spacing-8);
  align-items: center;
}

/* Primary CTA pill — RoadBee yellow accent */
.PrimaryCTAPill {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.PrimaryCTAPill:hover { background: #e6a829; }
.PrimaryCTAPill:focus-visible {
  outline: 2px solid var(--on-accent);
  outline-offset: 2px;
}

/* 2. Primary Button (variant) */
.PrimaryButton {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.PrimaryButton:hover { background: #e6a829; }
.PrimaryButton:focus-visible { outline: 2px solid var(--on-accent); outline-offset: 2px; }
.PrimaryButton:disabled { opacity: 0.5; cursor: not-allowed; }

/* 3. Fill-up Form */
.FillUpForm {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}
.FillUpForm-label { font-size: var(--font-size-sm); color: var(--textPrimary); }
.FillUpForm-input { padding: var(--spacing-3) var(--spacing-4); border: 1px solid var(--border-input); border-radius: var(--radius-md); background: var(--surface); color: var(--text); font-size: var(--font-size-md); }
.FillUpForm-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(247,183,49,0.15); }
.FillUpForm-input::placeholder { color: var(--text-muted); }
.FillUpForm-select { padding: var(--spacing-3) var(--spacing-4); border: 1px solid var(--border-input); border-radius: var(--radius-md); background: var(--surface); color: var(--text); font-size: var(--font-size-md); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23666' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-right: calc(1em + .5rem); padding-right: calc(1.5em + .5rem); }
.FillUpForm-select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(247,183,49,0.15); }
.FillUpForm-toggle { width: 1.2em; height: 1.2em; cursor: pointer; appearance: none; border: 1px solid var(--border-input); border-radius: var(--radius-sm); position: relative; }
.FillUpForm-toggle:checked::after { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 8px; height: 8px; background: var(--on-accent); border-radius: 50%; }

/* 4. Category Chips */
.CategoryChip {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--surface);
  border: 1px solid var(--border-input);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text);
  cursor: selected;
  gap: var(--spacing-2);
}
.CategoryChip--selected { background: var(--accent); color: var(--on-accent); }

/* 5. Ride-type Card */
.RideTypeCard {
  padding: var(--spacing-4) var(--spacing-3);
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  transition: border-color 0.2s, transform 0.1s;
}
.RideTypeCard:hover { border-color: var(--accent); transform: translateY(-2px); }
.RideTypeCard--active { border-color: var(--accent); }

/* 6. Club Card */
.ClubCard {
  padding: var(--spacing-4);
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  transition: transform 0.2s;
}
.ClubCard:hover { transform: translateY(-4px); }
.ClubCard__logo { width: 48px; height: 48px; border-radius: var(--radius-md); object-fit: cover; margin-bottom: var(--spacing-3); }
.ClubCard__meta { font-size: var(--font-size-sm); color: var(--text-muted); }
.ClubCard__count { color: var(--text-muted); font-size: var(--font-size-xs); }

/* 7. Nav Bar Footer */
.Footer {
  padding: var(--spacing-6) var(--spacing-4);
  background: var(--surface);
  border-top: 1px solid var(--border);
  margin-top: auto;
}
.Footer-links { display: flex; gap: var(--spacing-6); font-size: var(--font-size-sm); color: var(--text-muted); }
.Footer a { color: var(--text-muted); text-decoration: underline; text-underline-offset: 4px; }

/* 8. Group Map Live Rider Indicator */
.GroupMap-RiderIcon {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 3px solid var(--on-accent);
  position: relative;
}
.GroupMap-RiderIcon::after { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }

/* 9. Status Buttons (fuel stop, tea break, issue) */
.StatusButton {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s;
}
.StatusButton--active { background: var(--accent); color: var(--on-accent); }
.StatusButton:hover { background: #e6a829; }

/* 10. Distance Warning */
.DistanceWarning {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  background: rgba(255,82,82,0.1);
  border: 1px solid var(--danger);
  border-radius: var(--radius-md);
  color: var(--danger);
  font-size: var(--font-size-sm);
}

/* 11. Ride Notes */
.RideNote {
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--surface);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--warning);
  margin: var(--spacing-3) 0;
  font-size: var(--font-size-sm);
  color: var(--text);
}

/* 12. Toast */
.Toast {
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--surface);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent);
  margin: var(--spacing-3) 0;
  font-size: var(--font-size-sm);
  color: var(--text);
}

/* 13. Table Row (fuel logs, expenses) */
.TableRow {
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: var(--spacing-3);
  align-items: center;
}

/* 14. Price Display */
.PriceDisplay {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-weight: var(--font-weight-medium);
  color: var(--accent);
}

/* 15. Map Pin (web, static) */
.MapPin {
  width: 24px; height: 24px;
  background: var(--accent);
  color: var(--on-accent);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
}

/* 16. Invite QR Code placeholder */
.InviteQR {
  border: 1px dashed var(--border);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
  text-align: center;
  color: var(--text-muted);
  min-height: 120px;
}

/* 17. Status Badge */
.StatusBadge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

/* 18. Loading Skeleton */
.Skeleton {
  background: var(--surface);
  border-radius: var(--radius-md);
  animation: shimmer 1.5s infinite ease-in-out;
}
.Skeleton-text { height: 1.2em; width: 100%; }
.Skeleton-card { height: 2.5em; width: 50%; margin: 0 var(--spacing-2); animation-direction: alternate; }

@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

/* ============================================
   RESPONSIVE BREAKPOINTS (Tailwind-like)
   ============================================ */
@media (min-width: 640px) { /* sm */
  .NavBar-links { gap: var(--spacing-10); }
  .PrimaryCTAPill { font-size: var(--font-size-md); padding: var(--spacing-3) var(--spacing-5); }
  .PrimaryButton { font-size: var(--font-size-lg); padding: var(--spacing-4) var(--spacing-5); }
}

@media (min-width: 768px) { /* md */
  .MainContent { max-width: var(--spacing-96); margin: 0 auto; }
}

@media (min-width: 1024px) { /* lg */
  .MainContent { max-width: var(--spacing-112); }
}