# FixMyADA

> WCAG 2.2 AA accessibility scanner for small businesses — scan your site and get copy-paste HTML fix snippets for every violation.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)

---

## 📋 Overview

FixMyADA helps small business owners who've received ADA demand letters quickly identify and fix accessibility issues on their websites — without needing a lawyer or a full-time developer. Submit a URL, get a prioritised list of WCAG 2.2 AA violations, and receive ready-to-paste HTML code that fixes each one.

---

## ✨ Features

- 🔍 **Automated Accessibility Scanning** — Powered by [axe-core](https://github.com/dequelabs/axe-core) with headless browser automation (Playwright/Puppeteer)
- 🗂️ **Violations by Severity** — Issues categorised as Critical, Serious, or Moderate with WCAG 2.2 references
- 🛠️ **Copy-Paste Fix Snippets** — Every violation comes with a before/after HTML code block so anyone can apply the fix
- 📄 **PDF Compliance Reports** — Downloadable reports with executive summaries and per-violation remediation guidance suitable for legal responses
- 📊 **Results Dashboard** — Track violation counts and remediation progress over time
- 💳 **Stripe Integration** — Payment processing built in for future monetisation

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm

### Installation

```bash
git clone https://github.com/Gabangxa/fixmyada.git
cd fixmyada
npm install
```

### Running the App

```bash
# Production
npm start

# Development
npm run dev
```

The server starts on port `3000` by default. Override with the `PORT` environment variable:

```bash
PORT=8080 npm start
```

Open your browser at `http://localhost:3000`.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Landing page |
| `POST` | `/scan` | Submit a URL to scan |
| `GET` | `/scan/:id` | View scan results page |
| `GET` | `/api/scan/:id` | JSON response of violations |
| `GET` | `/dashboard` | Results dashboard |
| `GET` | `/report/:id/pdf` | Download PDF compliance report |
| `GET` | `/health` | Health check |

### Example: Submit a Scan

```bash
curl -X POST http://localhost:3000/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourbusiness.com"}'
```

### Example: Fetch Violations as JSON

```bash
curl http://localhost:3000/api/scan/<scan-id>
```

**Sample violation object:**

```json
{
  "id": "img-alt",
  "impact": "critical",
  "wcag": "1.1.1",
  "description": "Images must have alternate text",
  "before": "<img src=\"logo.png\">",
  "after": "<img src=\"logo.png\" alt=\"Company logo\">",
  "instructions": "Add a descriptive alt attribute to every meaningful image."
}
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express |
| Scanning | axe-core + Playwright/Puppeteer |
| PDF Generation | PDFKit |
| Database | SQLite |
| Payments | Stripe |
| Hosting | Replit-compatible |

---

## 🔍 Common Violations Detected

- Missing image `alt` text *(WCAG 1.1.1 — Critical)*
- Unlabelled form inputs *(WCAG 1.3.1 — Critical)*
- Insufficient colour contrast *(WCAG 1.4.3 — Serious)*
- Missing `lang` attribute on `<html>` *(WCAG 3.1.1 — Serious)*
- Non-descriptive link text *(WCAG 2.4.4 — Serious)*
- Inaccessible button names *(WCAG 4.1.2 — Moderate)*

---

## 📁 Project Structure

```
fixmyada/
├── public/          # Static assets (HTML, CSS, JS)
├── server.js        # Express server & API routes
├── package.json     # Dependencies & scripts
├── replit.nix       # Replit environment config
└── .replit          # Replit run configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change, then submit a pull request.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> **Disclaimer:** FixMyADA is a diagnostic and remediation tool. It is not a substitute for legal advice. Consult a qualified attorney for guidance on ADA compliance obligations.
