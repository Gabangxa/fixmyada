'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Mock violation data (hardcoded for demo)
// ---------------------------------------------------------------------------
const VIOLATIONS = [
  {
    id: 'image-alt',
    impact: 'critical',
    wcag: '1.1.1 Non-text Content (Level A)',
    description: 'Image missing alternative text',
    before: '<img src="/hero.jpg">',
    after: '<img src="/hero.jpg" alt="Smiling customer service representative at front desk">',
    instruction: 'Add a descriptive alt attribute that conveys the purpose of the image to screen reader users.'
  },
  {
    id: 'label',
    impact: 'critical',
    wcag: '1.3.1 Info and Relationships (Level A)',
    description: 'Form input has no accessible label',
    before: '<input type="email" placeholder="Enter your email">',
    after: '<label for="email">Email address</label>\n<input type="email" id="email" placeholder="Enter your email">',
    instruction: 'Add a <label> element that is programmatically associated with the input via matching for/id attributes.'
  },
  {
    id: 'color-contrast',
    impact: 'serious',
    wcag: '1.4.3 Contrast (Minimum) (Level AA)',
    description: 'Text has insufficient color contrast (ratio: 2.8:1, required: 4.5:1)',
    before: '<p style="color: #aaaaaa; background: #ffffff;">Contact us today</p>',
    after: '<p style="color: #767676; background: #ffffff;">Contact us today</p>',
    instruction: 'Increase the text color contrast to at least 4.5:1 for normal text. Use a contrast checker to verify.'
  },
  {
    id: 'html-lang-valid',
    impact: 'serious',
    wcag: '3.1.1 Language of Page (Level A)',
    description: 'HTML element is missing a lang attribute',
    before: '<html>',
    after: '<html lang="en">',
    instruction: 'Add the lang attribute to the <html> element to help screen readers pronounce content correctly.'
  },
  {
    id: 'link-name',
    impact: 'serious',
    wcag: '2.4.4 Link Purpose (Level A)',
    description: 'Link has no discernible text',
    before: '<a href="/contact"><img src="arrow.svg"></a>',
    after: '<a href="/contact" aria-label="Contact us"><img src="arrow.svg" alt=""></a>',
    instruction: 'Add an aria-label to the link describing its destination. Set alt="" on the decorative icon inside.'
  },
  {
    id: 'button-name',
    impact: 'critical',
    wcag: '4.1.2 Name, Role, Value (Level A)',
    description: 'Button has no accessible name',
    before: '<button onclick="openMenu()"><svg>...</svg></button>',
    after: '<button onclick="openMenu()" aria-label="Open navigation menu"><svg aria-hidden="true">...</svg></button>',
    instruction: 'Add aria-label to the button. Add aria-hidden="true" to decorative SVG icons inside buttons.'
  }
];

// ---------------------------------------------------------------------------
// Demo scan record
// ---------------------------------------------------------------------------
const DEMO_SCAN = {
  id: 'demo-001',
  url: 'https://www.mapleleafcafe.com',
  scannedAt: new Date('2026-03-18T09:31:00Z').toISOString(),
  violations: VIOLATIONS
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initiate a "scan" (demo: redirect to hardcoded result)
app.post('/scan', (req, res) => {
  const { url } = req.body;
  if (!url || url.trim() === '') {
    return res.redirect('/?error=missing_url');
  }
  // In production this would queue a real Playwright/axe-core job.
  // For the demo, send straight to the hardcoded result page.
  res.redirect('/scan/demo-001');
});

// Scan results page
app.get('/scan/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scan.html'));
});

// Scan data API
app.get('/api/scan/:id', (req, res) => {
  res.json(DEMO_SCAN);
});

// Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// PDF report
app.get('/report/:id/pdf', (req, res) => {
  const scan = DEMO_SCAN; // always demo for mockup

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="fixmyada-report-${scan.id}.pdf"`
  );

  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  doc.pipe(res);

  // ---- Header ----
  doc.rect(0, 0, doc.page.width, 80).fill('#0F172A');
  doc.fillColor('#F59E0B').fontSize(24).font('Helvetica-Bold')
    .text('FixMyADA', 50, 20);
  doc.fillColor('white').fontSize(10).font('Helvetica')
    .text('WCAG 2.2 AA Compliance Report', 50, 48);
  doc.fillColor('white').fontSize(9)
    .text(`Site: ${scan.url}`, 50, 60)
    .text(`Scanned: ${new Date(scan.scannedAt).toLocaleString()}`, 300, 60);

  doc.moveDown(3);
  doc.fillColor('#0F172A');

  // ---- Executive Summary ----
  const critical = scan.violations.filter(v => v.impact === 'critical').length;
  const serious  = scan.violations.filter(v => v.impact === 'serious').length;
  const moderate = scan.violations.filter(v => v.impact === 'moderate').length;

  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0F172A')
    .text('Executive Summary', { underline: false });
  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica').fillColor('#334155')
    .text(`Total violations found: ${scan.violations.length}`);
  doc.fillColor('#DC2626').text(`Critical: ${critical}`);
  doc.fillColor('#EA580C').text(`Serious: ${serious}`);
  doc.fillColor('#D97706').text(`Moderate: ${moderate}`);

  doc.moveDown(1);
  doc.fillColor('#334155').fontSize(10)
    .text(
      'Remediation of all critical and serious violations is recommended before ' +
      'responding to any legal notice. This report documents violations found by automated ' +
      'WCAG 2.2 AA scanning using axe-core rules.'
    );

  doc.addPage();

  // ---- Per-violation pages ----
  scan.violations.forEach((v, i) => {
    if (i > 0) doc.addPage();

    const impactColor =
      v.impact === 'critical' ? '#DC2626' :
      v.impact === 'serious'  ? '#EA580C' : '#D97706';

    doc.fontSize(14).font('Helvetica-Bold').fillColor('#0F172A')
      .text(`${i + 1}. ${v.description}`);
    doc.moveDown(0.3);

    doc.roundedRect(50, doc.y, 100, 20, 4).fill(impactColor);
    doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
      .text(v.impact.toUpperCase(), 56, doc.y - 16);
    doc.moveDown(1.2);

    doc.fillColor('#64748B').fontSize(10).font('Helvetica')
      .text(`WCAG: ${v.wcag}`);
    doc.moveDown(0.8);

    // Before
    doc.fillColor('#DC2626').fontSize(10).font('Helvetica-Bold').text('BEFORE:');
    doc.rect(50, doc.y, doc.page.width - 100, 30).fill('#FEF2F2');
    doc.fillColor('#7F1D1D').fontSize(9).font('Courier')
      .text(v.before, 58, doc.y - 26, { lineBreak: true });
    doc.moveDown(1.5);

    // After
    doc.fillColor('#16A34A').fontSize(10).font('Helvetica-Bold').text('AFTER:');
    doc.rect(50, doc.y, doc.page.width - 100, 40).fill('#F0FDF4');
    doc.fillColor('#14532D').fontSize(9).font('Courier')
      .text(v.after, 58, doc.y - 26, { lineBreak: true });
    doc.moveDown(2);

    // Instruction
    doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold')
      .text('Remediation:');
    doc.fillColor('#334155').font('Helvetica').fontSize(10)
      .text(v.instruction, { indent: 10 });
  });

  // ---- Footer on last page ----
  doc.moveDown(2);
  doc.fontSize(8).fillColor('#94A3B8')
    .text(
      'This report documents accessibility violations found by automated scanning. ' +
      'Remediation of all critical and serious violations is recommended before responding ' +
      'to any legal notice. | Generated by FixMyADA — fixmyada.com',
      { align: 'center' }
    );

  doc.end();
});

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ---------------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FixMyADA server running on http://0.0.0.0:${PORT}`);
});
