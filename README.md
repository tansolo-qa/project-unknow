# Full Stack QA Portfolio 🚀

Welcome to my comprehensive **QA Automation & Full Stack Development Portfolio**. This project is a monorepo that showcases expertise across the entire testing pyramid and development lifecycle.

## 🌟 Portfolio Website
The landing page you see here is built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It serves as a centralized hub to demonstrate my technical arsenal and featured projects.

---

## 🏗️ Core Projects

This repository contains four specialized projects, each targeting a critical area of Quality Engineering:

### 1. [E2E Automation Framework](file:///e:/POC/project-unknow/projects/e2e-automation)
*   **Goal**: Enterprise-grade E2E testing.
*   **Stack**: Playwright, TypeScript, Allure Reports.
*   **Key Features**: Page Object Model (POM), Data-Driven Testing, CI/CD Integration via GitHub Actions.

### 2. [API & Contract Testing](file:///e:/POC/project-unknow/projects/api-contract-testing)
*   **Goal**: Robust backend and middleware verification.
*   **Stack**: Jest, Supertest, Pact.io.
*   **Key Features**: Consumer-Driven Contract Testing, Security/Auth validation, Dockerized test environments.

### 3. [Performance & Load Testing](file:///e:/POC/project-unknow/projects/performance-load-testing)
*   **Goal**: Performance bench-marking and bottleneck analysis.
*   **Stack**: k6, InfluxDB, Grafana.
*   **Key Features**: 1k+ VU simulation, real-time monitoring dashboard, Docker Compose setup.

### 4. [Test Data Manager (Full Stack App)](file:///e:/POC/project-unknow/projects/test-data-manager)
*   **Goal**: Solving data dependency issues with custom tooling.
*   **Stack**: Next.js (Full Stack), MongoDB, Tailwind.
*   **Key Features**: CRUD interface for test data, RESTful API, modern responsive dashboard.

---

## 🛠️ Getting Started

### 1. Run the Portfolio Website
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Run Portfolio Self-Tests (E2E)
We use a **"Testing the Tester"** approach—verified via root-level Playwright tests.
```bash
# Install Playwright browsers (first time only)
npx playwright install --with-deps

# Run E2E tests
npm run test:e2e
```

---

## 📁 Repository Structure
```text
.
├── projects/
│   ├── e2e-automation/          # Project A
│   ├── api-contract-testing/    # Project B
│   ├── performance-load-testing/ # Project C
│   └── test-data-manager/       # Project D
├── tests/
│   └── portfolio.spec.ts        # E2E tests for the landing page
├── src/                         # Portfolio Website Source
├── .github/workflows/           # CI/CD Workflows for all projects
└── playwright.config.ts         # Root Playwright configuration
```

## 🛡️ Technical Arsenal
*   **Testing**: Playwright, Jest, Supertest, Pact, k6.
*   **Frontend**: Next.js, React, Tailwind CSS, Framer Motion.
*   **Backend & DB**: Node.js, Next API Routes, MongoDB.
*   **DevOps**: Docker, GitHub Actions, Allure.
