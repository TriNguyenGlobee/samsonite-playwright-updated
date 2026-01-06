# Automation Sanity Check – Overview

## 1. Purpose

This document describes the **Automation Sanity Check framework** built using **Playwright** to support fast validation of critical functionalities across Samsonite sites.

The main objectives:
- Perform **quick sanity checks** before / after deployment
- Reduce manual smoke testing effort
- Detect blocking issues early
- Enable **manual QA team** to run automation locally with minimal setup
- Support BV (Bazaarvoice) integration verification

This automation is **not intended to replace full regression testing**.

---

## 2. Technology Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Runtime**: Node.js (>=16)
- **Browser Support**:
  - Chromium (Chrome)
  - Firefox
  - WebKit
- **Reporting**: Allure Report
- **Environment Control**: ENV / LOCALE via CLI or batch script
- **Source Control**: Git

---

## 3. Supported Sites & Locales

Automation supports **multi-locale execution**, configurable via `LOCALE` variable.

| Locale | Environment | Status | Notes |
|------|------------|--------|------|
| US | dev / stg | Active | Full sanity |

---

## 4. Automation Scope

### 4.1 Homepage
- Page loads successfully
- Key sections rendered
- No blocking popup or JS error

---

### 4.2 PLP (Product Listing Page)
- Product grid is displayed
- Sort functionality
- Filter functionality
  - Rating filter
  - Category filter (where applicable)
- Product rating display (BV)

---

### 4.3 PDP (Product Detail Page)
- Product information loaded
- Rating summary
- Review section
- Q&A section
- Media section (Images / Videos if available)

---

### 4.4 BV (Bazaarvoice) Integration
- Inline rating
- Average rating
- Review count
- Review list rendering
- Q&A section

> ⚠️ BV automation depends on external service data and may vary between environments.

---

## 5. Out of Scope

The following are **not covered** in Sanity Automation:
- Full regression flows
- Checkout / payment
- Backend or API testing
- Performance / load testing
- Visual comparison

---

## 6. Project Setup

### Prerequisites
- Node.js >= 16
- Git

### Setup Steps
```bash
git clone https://github.com/TriNguyenGlobee/samsonite-playwright.git
cd samsonite-playwright
npm install
npx playwright install
