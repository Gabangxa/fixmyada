# WCAG/ADA Code-Fix Scanner for Small Businesses
**Slug**: wcag-ada-fix-scanner
**Date**: 2026-03-18
**Score**: 22/25

---

## Problem

Small businesses receive 25,000–50,000 ADA demand letters per year. ADA Title III lawsuits
hit 8,800 in 2024 and are projecting ~5,000+ in 2025 (H1 2025 alone saw +37% YoY surge).
67–77% of targets are businesses under $25M revenue. Settlement costs average $5K–$25K.

When a business owner gets a demand letter, they need to know:
1. What specific WCAG 2.2 AA violations does their site have?
2. Exactly how to fix them — in code — to hand to any developer?

**Today's options are all broken:**
- Free tools (WAVE, axe browser extension): detect issues, zero fix guidance
- Overlay widgets (AccessiBe, AudioEye): FTC fined AccessiBe $1M in Jan 2025 for deceptive
  compliance claims; 22.6% of ADA lawsuits in H1 2025 targeted sites *using overlays*
- Enterprise tools (Level Access, Siteimprove): $10K–$60K/yr, sales-gated, 6-week procurement

**There is nothing at $29–$199/mo that scans a site and outputs copy-paste HTML fix snippets.**

---

## Market

- Digital accessibility software market: $800M–$1.5B (2025), growing at 8.6–9.5% CAGR
- ADA demand letters: 25,000–50,000/year in the US alone; accelerating
- DOJ April 2024 Final Rule: codified WCAG 2.1 AA as legal standard; deadlines April 2026/2027
  for state/local government — creates urgency across public and private sectors
- Serial plaintiff attorneys drive 80%+ of filings; small businesses are primary targets
- Overlay category collapse: AccessiBe FTC fine + UserWay class action = vacuum for alternatives

---

## Existing Solutions (Competitor Matrix)

| Competitor | Pricing | Type | Critical Weakness |
|---|---|---|---|
| WAVE (WebAIM) | Free | Browser scanner | Detect only, no fix guidance, no monitoring |
| axe DevTools Free | Free (extension) | Dev tool | Developer-facing only, no code-fix snippets for owners |
| axe DevTools Pro | $45/mo per seat | Dev tool | Targets CI/CD teams, not demand-letter recipients |
| A11y Pulse | $19–$159/mo | Scanner SaaS | Detect only, no code-fix snippets |
| AccessiBe | $49–$490/mo | Overlay widget | FTC-fined $1M; overlays generate MORE lawsuits |
| AudioEye | $49–$499/mo | Overlay hybrid | Same overlay problem; 50% barrier coverage max |
| EqualWeb | ~$590/yr+ | Overlay | Client-side JS cannot fix server-rendered markup |
| SiteScanX | Unknown | Scanner | Score-only output; no fix snippets; no clear SaaS tier |
| Siteimprove | ~$28K/yr avg | Enterprise | Completely priced out of SMB; sales-gated |
| Level Access | $10K–$60K+/yr | Enterprise | Same — no self-serve; 6-week procurement cycle |
| Wally (new) | Unknown | Dev tool | Developer positioning; not demand-letter UX |

**The $29–$199/mo code-fix-first slot is unoccupied.**

---

## The Improvement Angle

Every existing tool in the affordable range gives you a list of problems. None gives you
the fix. The "before/after HTML snippet" differentiator is the entire product:

- axe-core (MIT licensed) detects violations and returns the broken DOM node
- A curated fix-template library maps each of the ~30 most common rule violations to a
  corrected HTML snippet
- The product outputs: broken element HTML + corrected HTML + plain-English explanation
  + WCAG criterion reference + impact label (critical/serious)
- Packaged as an attorney-ready PDF the owner can send to their lawyer and developer

This is a workflow product, not a technical product. The buyer is a scared business owner
who got a letter, not a developer who wants to run axe in CI.

---

## Proposed Solution

**FixMyADA** — WCAG 2.2 AA scanner for small businesses that outputs copy-paste code fixes.

Core user flow:
1. Owner enters their site URL (no credit card for first scan)
2. Tool runs headless Playwright + axe-core, scans the page
3. Dashboard shows: violations by severity, WCAG criterion, affected element
4. For each violation: broken HTML snippet + corrected HTML snippet + plain-English instruction
5. PDF report generated: "Your site has 14 critical violations. Here are the exact code fixes."
6. Scheduled rescans confirm when fixes are applied
7. Compliance certificate generated when zero critical/serious violations remain

---

## Revenue Model

| Tier | Price | Limits | Key feature |
|---|---|---|---|
| Starter | $29/mo | 1 domain, 50 pages, monthly scan | Full violation report + code-fix snippets |
| Business | $79/mo | 1 domain, 500 pages, weekly scan | + PDF compliance report, priority scoring |
| Agency | $199/mo | 10 domains, 500 pages each, weekly | + White-label PDFs, client dashboard |

**Path to $10K MRR**: 120 Starter + 60 Business + 15 Agency = $11,205 MRR
That is ~195 customers in a market receiving 50,000 demand letters/year — 0.4% capture rate.

Annual billing at 20% discount improves cash flow. One-time "emergency audit" PDF at $149
(no subscription) captures demand-letter panic buyers.

---

## MVP Scope (v0.1 — 4-week solo build)

**Week 1**: Node.js + Express backend; Playwright + axe-core scanner; JSON output stored in Postgres

**Week 2**: Fix-template library for top 30 axe rules (covers 80%+ of demand-letter violations):
  missing alt text, form labels, color contrast, lang attribute, empty links/buttons,
  heading structure, ARIA roles — each with before/after HTML snippet

**Week 3**: Auth (email/password), Stripe billing (3 tiers), React (CDN) dashboard
  with violation list, severity grouping, code-fix view; PDF generation via Puppeteer

**Week 4**: Cron rescan (monthly Starter, weekly Business/Agency); email digest on new issues;
  landing page with demand-letter CTA; free first scan (no CC)

**Explicitly out of scope for v0.1**: multi-page crawl, CI/CD integration, mobile app scanning,
  manual audit services, overlay widget (never), ARIA live region simulation

---

## Unfair Advantage

Three forces converged in 2024–2025 to open this window:

1. **FTC invalidated the incumbent solution**: AccessiBe's $1M fine (Jan 2025) + UserWay
   class action (Feb 2025) made overlays legally toxic. Legal counsel now advises against
   them. The $400M+ overlay market has nowhere to go.

2. **DOJ codified WCAG 2.1 AA into law**: April 2024 final rule + April 2026/2027 compliance
   deadlines create government procurement cycles NOW. Private-sector plaintiff attorneys
   have a clearer statutory hook. Enforcement is accelerating (+37% H1 2025).

3. **axe-core is MIT licensed**: Deque open-sourced the best automated WCAG engine available.
   No licensing cost. No rev-share. The fix-template layer on top is proprietary IP.

Positioning: "You got a demand letter. We tell you exactly what's broken and exactly how to
fix it in code — for less than your attorney's first phone call."

---

## Rejected Candidates

| Slug | Score | Reason Eliminated |
|---|---|---|
| freelance-contract-renewal-tracker | 19/25 | Real gap but narrow TAM; Bonsai/Moxie will add renewal tracking as features |
| multi-delivery-restaurant-dashboard | 15/25 | Critical risk: DoorDash/Uber Eats/Grubhub restrict third-party API access; Otter's scraping history is a warning |
| subscription-cancel-flow-widget | 18/25 | FTC Click-to-Cancel rule vacated July 2025; primary urgency driver (federal penalty) is gone for 2–4 years |
| api-changelog-generator | 18/25 | Gap is real but narrow; Bump.sh ($700/mo) and Theneo ($450/mo) can add this as a feature with existing distribution |
