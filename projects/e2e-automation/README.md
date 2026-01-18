# E2E Automation Framework

Enterprise-grade E2E testing framework built with Playwright and TypeScript, implementing Page Object Model and Data-Driven Testing patterns.

## Features

- **Page Object Model (POM)**: Maintainable test architecture
- **Data-Driven Testing**: JSON-based test data
- **Visual Regression Testing**: Automated UI comparison
- **Multi-Context Testing**: Session isolation verification
- **Allure Reporting**: Beautiful test reports
- **CI/CD Integration**: GitHub Actions workflow

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
npx playwright install --with-deps
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suite
```bash
npm test tests/e2e/auth.spec.ts
npm test tests/visual
npm test tests/multi-context.spec.ts
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

## Visual Regression Testing

Automated screenshot comparison to catch UI bugs that functional tests miss.

### Run Visual Tests
```bash
npm test -- tests/visual
```

### Update Baselines
When UI changes are intentional, update the baseline images:
```bash
npm test -- tests/visual --update-snapshots
```

## Accessibility Testing ♿

Automated WCAG 2.1 compliance checks using `@axe-core/playwright`.

### Run Accessibility Tests
```bash
npm run test:a11y
```

### Coverage
- Scans `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` rules
- Checks Login Page and Inventory Page
- Reports violations in console and test output

### How It Works
1. Navigates to the page
2. Injects axe-core engine
3. Analyzes DOM for violations
4. Fails test if any violations found

### How It Works
1. Captures screenshots of critical pages (Login, Inventory, Product Card)
2. Compares against baseline images stored in Git
3. Fails if differences exceed threshold (20% or 100 pixels)
4. Generates diff images for review in `*-diff.png` files

### Reviewing Failures
When visual tests fail:
1. Check the test output for diff image paths
2. Review `*-actual.png` (current state) vs baseline
3. Review `*-diff.png` (highlighted differences)
4. If changes are correct, update baselines

## Reporting

### Allure Report
```bash
npm run report
```

This generates and opens an interactive HTML report with:
- Test execution timeline
- Screenshots and videos
- Detailed error traces
- Historical trends

## Project Structure

```
.
├── page-objects/       # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/
│   ├── e2e/           # Functional E2E tests
│   ├── visual/        # Visual regression tests
│   └── multi-context.spec.ts
├── data/              # Test data (JSON)
└── playwright.config.ts
```

## Configuration

Key settings in `playwright.config.ts`:
- **Base URL**: `https://www.saucedemo.com`
- **Viewport**: 1280x720 (fixed for visual consistency)
- **Retries**: 2 (in CI)
- **Screenshot**: On failure
- **Video**: Retain on failure

## CI/CD

Tests run automatically on:
- Push to `main` branch
- Pull requests

Visual regression failures upload diff artifacts for review.
