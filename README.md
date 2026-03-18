# FixMyADA

> WCAG 2.2 AA accessibility scanner for small businesses — scan your site and get copy-paste HTML fix snippets for every violation.

---

## The Problem

Small businesses receive 25,000–50,000 ADA demand letters per year in the United States. ADA Title III lawsuits hit 8,800 in 2024 and are projected to exceed that pace in 2025 — with the first half of 2025 already showing a 37% year-over-year increase. Between 67% and 77% of targets are businesses under $25M in revenue. Settlement costs average $5,000–$25,000.

When a business owner receives a demand letter, they need two things immediately: a list of the specific WCAG 2.2 AA violations their site has, and the exact code changes required to fix them. Today's options all fail that need. Free tools (WAVE, axe browser extension) detect issues but give zero fix guidance. Overlay widgets (AccessiBe, AudioEye) were effectively invalidated in January 2025 when the FTC fined AccessiBe $1M for deceptive compliance claims — and 22.6% of ADA lawsuits in H1 2025 targeted sites already running overlays. Enterprise tools (Level Access, Siteimprove) cost $10,000–$60,000 per year with 6-week procurement cycles and no self-serve option.

---

## The Solution

FixMyADA is the first WCAG 2.2 AA scanner in the $29–$199/month range that outputs copy-paste HTML fix snippets alongside every violation. The core product loop is:

1. Owner enters their site URL — no credit card for the first scan
2. A headless axe-core scan runs and detects WCAG 2.2 AA violations
3. Each violation is presented with: the broken HTML element, the corrected HTML snippet, the WCAG criterion reference, an impact label (Critical/Serious/Moderate), and a plain-English instruction the owner can hand to any developer
4. An attorney-ready PDF report is generated for download
5. Scheduled rescans confirm fixes were applied; a compliance certificate is issued once the site clears all critical and serious violations

The differentiation is the fix-template layer. axe-core (MIT licensed) detects violations and returns the broken DOM node. FixMyADA maps each of the ~30 most common rule violations to a curated before/after HTML snippet — a proprietary library that no competitor in this price range provides.

This is a workflow product for a scared business owner, not a technical tool for developers.

---

## Market Context

The digital accessibility software market is valued at $800M–$1.5B in 2025, growing at 8.6–9.5% CAGR. The DOJ's April 2024 Final Rule codified WCAG 2.1 AA as the legal standard for Title III; compliance deadlines for state and local government fall in April 2026 and April 2027, accelerating private-sector enforcement. The FTC's AccessiBe action effectively invalidated the $400M overlay widget category, removing the incumbent "easy fix" option from the market.

| Competitor | Pricing | Critical Weakness |
|---|---|---|
| WAVE (WebAIM) | Free | Detect only, zero fix guidance |
| axe DevTools Free | Free | Developer-facing, no fix snippets for owners |
| axe DevTools Pro | $45/mo/seat | CI/CD teams, not demand-letter recipients |
| A11y Pulse | $19–$159/mo | Detect only, no code-fix snippets |
| AccessiBe | $49–$490/mo | FTC-fined $1M; overlays generate more lawsuits |
| AudioEye | $49–$499/mo | Same overlay problem |
| Siteimprove | ~$28K/yr avg | Completely priced out of SMB; sales-gated |
| Level Access | $10K–$60K+/yr | No self-serve; 6-week procurement cycle |

The $29–$199/month code-fix-first slot is unoccupied.

---

## Revenue Model

| Tier | Price | Key Feature |
|---|---|---|
| Starter | $29/mo | 1 domain, 50 pages, monthly scan, full code-fix report |
| Business | $79/mo | 1 domain, 500 pages, weekly scan, PDF compliance report |
| Agency | $199/mo | 10 domains, 500 pages each, white-label PDFs, client dashboard |

**Path to $10K MRR**: 120 Starter + 60 Business + 15 Agency customers = $11,205/month. That is approximately 195 customers in a market receiving 50,000 demand letters per year — a 0.4% capture rate.

One-time "Emergency Audit" PDF at $149 (no subscription) captures demand-letter panic buyers who are not ready to commit to a monthly plan.

---

## Mockup

This repository contains a fully functional Node.js + Express mockup of FixMyADA. All pages are working:

| Page | Route | Description |
|---|---|---|
| Landing page | `/` | Hero, scan form, pricing, FAQ, trust section |
| Scan results | `/scan/demo-001` | 6 hardcoded violations with before/after code fixes; violations 4–6 blurred behind paywall |
| Dashboard | `/dashboard` | Domain table, violations trend chart (Chart.js), PDF download |
| PDF report | `/report/demo-001/pdf` | Generated via pdfkit — real downloadable PDF with all 6 violations |

### Run locally

```bash
npm install
npm start
# Open http://localhost:3000
```

### Deploy on Replit

1. Import this repo into Replit at [replit.com/new](https://replit.com/new) — paste the GitHub URL
2. Click **Run**
3. Replit installs dependencies automatically and starts the server
4. No configuration needed — the server listens on `process.env.PORT` and binds to `0.0.0.0`

---

## MVP Scope

**In v0.1 (4-week solo build)**:
- Node.js + Express backend with Playwright + axe-core scanner
- Fix-template library for the 30 most common WCAG violations (covers 80%+ of demand-letter issues)
- Email/password auth and Stripe billing for three tiers
- Dashboard with violation list, severity grouping, code-fix view
- PDF generation via pdfkit
- Monthly (Starter) and weekly (Business/Agency) rescan cron jobs
- Email digest on new violations
- Landing page with demand-letter CTA and free first scan (no CC)

**Explicitly out of scope for v0.1**:
- Multi-page crawl beyond single-page entry point
- CI/CD integration or GitHub Actions hooks
- Mobile app scanning
- Manual audit services or human review
- Overlay widget (never — see AccessiBe FTC action)
- ARIA live region simulation

**Estimated build time**: 4 weeks solo

---

## Research

Full research document: [research.md](./research.md)

---

*Generated by autonomous research agent — 2026-03-18*
