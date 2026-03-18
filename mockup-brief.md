# Mockup Brief: FixMyADA
**Slug**: wcag-ada-fix-scanner
**Date**: 2026-03-18
**Research file**: research/2026-03-18-1045/research.md

---

## Product Summary

FixMyADA is a WCAG 2.2 AA accessibility scanner for small businesses. It takes a URL,
runs a headless axe-core scan, and outputs a prioritized list of violations — each one
paired with a copy-paste HTML fix snippet the owner can hand to any developer.

Positioning: "You got an ADA demand letter. We tell you exactly what's broken and exactly
how to fix it — for less than your attorney's first phone call."

---

## Tech Stack

**Node.js + Express (HTML/CSS/JS)**

- No build step required
- axe-core via `npm install axe-core` — MIT licensed, zero cost
- playwright or puppeteer for headless browser scanning
- SQLite for scan storage (no external DB dependency on Replit)
- pdfkit for PDF report generation
- Stripe for billing (mockup can stub this)

---

## Pages to Build (mockup — all functional)

### 1. Landing Page (`/`)
- Hero: "Got an ADA demand letter? Find out exactly what's wrong and how to fix it."
- CTA: "Scan my website for free" (email + URL input, no credit card)
- Three-column pricing: Starter $29/mo | Business $79/mo | Agency $199/mo
- Trust section: "AccessiBe was fined $1M by the FTC. Overlays don't work. Code fixes do."
- Stats bar: "50,000 demand letters sent in 2025. Is yours next?"

### 2. Free Scan Results Page (`/scan/:id`)
- URL scanned + timestamp
- Summary bar: X Critical, Y Serious, Z Moderate violations
- Violations list — each card shows:
  - Violation name (e.g., "Image missing alt text")
  - WCAG criterion (e.g., "1.1.1 Non-text Content — Level A")
  - Impact badge: CRITICAL / SERIOUS / MODERATE
  - Affected element: `<img src="hero.jpg">` (syntax highlighted)
  - **Code Fix (the differentiator)**:
    ```
    BEFORE: <img src="hero.jpg">
    AFTER:  <img src="hero.jpg" alt="Team photo of our staff at the front desk">
    ```
  - Plain-English instruction: "Add a descriptive alt attribute to this image."
- CTA at top: "Get your full report + PDF for $79/mo" (blurred/locked for violations 4+)
- Free scan shows first 3 violations in full, rest blurred

### 3. Dashboard (`/dashboard`) — stub with hardcoded demo data
- Domain list with last scan date and violation count
- Trend chart: violations over time (simple line using Chart.js CDN)
- "Download PDF Report" button (generates and serves a real PDF via pdfkit)
- "Rescan Now" button

### 4. PDF Report (served at `/report/:id/pdf`)
- Generated via pdfkit
- Header: FixMyADA logo, site URL, scan date, "WCAG 2.2 AA Compliance Report"
- Executive summary: total violations by severity
- Per-violation pages: before/after code snippets, WCAG criterion, impact
- Footer: "This report documents accessibility violations found by automated scanning.
  Remediation of all critical and serious violations is recommended before responding to
  any legal notice."

---

## Mock Violation Data (hardcode for demo)

Use these 6 violations in the demo scan results so the mockup is immediately impressive:

```json
[
  {
    "id": "image-alt",
    "impact": "critical",
    "wcag": "1.1.1 Non-text Content (Level A)",
    "description": "Image missing alternative text",
    "before": "<img src=\"/hero.jpg\">",
    "after": "<img src=\"/hero.jpg\" alt=\"Smiling customer service representative at front desk\">",
    "instruction": "Add a descriptive alt attribute that conveys the purpose of the image to screen reader users."
  },
  {
    "id": "label",
    "impact": "critical",
    "wcag": "1.3.1 Info and Relationships (Level A)",
    "description": "Form input has no accessible label",
    "before": "<input type=\"email\" placeholder=\"Enter your email\">",
    "after": "<label for=\"email\">Email address</label>\n<input type=\"email\" id=\"email\" placeholder=\"Enter your email\">",
    "instruction": "Add a <label> element that is programmatically associated with the input via matching for/id attributes."
  },
  {
    "id": "color-contrast",
    "impact": "serious",
    "wcag": "1.4.3 Contrast (Minimum) (Level AA)",
    "description": "Text has insufficient color contrast (ratio: 2.8:1, required: 4.5:1)",
    "before": "<p style=\"color: #aaaaaa; background: #ffffff;\">Contact us today</p>",
    "after": "<p style=\"color: #767676; background: #ffffff;\">Contact us today</p>",
    "instruction": "Increase the text color contrast to at least 4.5:1 for normal text. Use a contrast checker to verify."
  },
  {
    "id": "html-lang-valid",
    "impact": "serious",
    "wcag": "3.1.1 Language of Page (Level A)",
    "description": "HTML element is missing a lang attribute",
    "before": "<html>",
    "after": "<html lang=\"en\">",
    "instruction": "Add the lang attribute to the <html> element to help screen readers pronounce content correctly."
  },
  {
    "id": "link-name",
    "impact": "serious",
    "wcag": "2.4.4 Link Purpose (Level A)",
    "description": "Link has no discernible text",
    "before": "<a href=\"/contact\"><img src=\"arrow.svg\"></a>",
    "after": "<a href=\"/contact\" aria-label=\"Contact us\"><img src=\"arrow.svg\" alt=\"\"></a>",
    "instruction": "Add an aria-label to the link describing its destination. Set alt=\"\" on the decorative icon inside."
  },
  {
    "id": "button-name",
    "impact": "critical",
    "wcag": "4.1.2 Name, Role, Value (Level A)",
    "description": "Button has no accessible name",
    "before": "<button onclick=\"openMenu()\"><svg>...</svg></button>",
    "after": "<button onclick=\"openMenu()\" aria-label=\"Open navigation menu\"><svg aria-hidden=\"true\">...</svg></button>",
    "instruction": "Add aria-label to the button. Add aria-hidden=\"true\" to decorative SVG icons inside buttons."
  }
]
```

---

## Server Requirements

- Must listen on `process.env.PORT || 3000`
- Must bind to `0.0.0.0`
- No build steps — all JS/CSS via CDN links in HTML
- SQLite file stored in `/tmp/fixmyada.db` on Replit (ephemeral is fine for demo)
- PDF generation must work without external services (use pdfkit npm package)
- axe-core scan is optional for the mockup — hardcoded demo data is acceptable if
  Playwright/Puppeteer causes Replit timeout issues

---

## Design Direction

- Colors: Deep navy (#0F172A) + white + amber accent (#F59E0B) for violation badges
- Font: System sans-serif stack
- Violation cards: white cards with colored left border (red=critical, orange=serious, yellow=moderate)
- Code snippets: dark monospace code blocks, before in red tint, after in green tint
- Mobile responsive (flex/grid, no framework needed)

---

## Repo & Publishing Instructions

1. Create GitHub repo: `Gabangxa/fixmyada` (public)
2. Push all code
3. Import repo into Replit at replit.com/new — click Run. No config needed.
4. Return the GitHub repo URL and Replit import URL in your completion report.

---

## Completion Report Format

When done, return:
- GitHub repo URL
- Replit import URL
- List of files created
- Confirmation that server starts and landing page loads
- Any issues encountered
