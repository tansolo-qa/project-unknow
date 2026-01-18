# Project B: API & Contract Testing

## Overview
This project demonstrates **Senior-Backend QA** capabilities, focusing on verifying business logic, service compatibility, and security layers. It goes beyond simple functional testing by implementing **Consumer-Driven Contract Testing (Pact)** and **Security checks**.

## 🛠️ Tech Stack
- **Framework**: Jest + Supertest (TypeScript)
- **Contract Testing**: Pact.io (PactV3)
- **Security**: Basic Auth & Injection checks
- **Reporting**: `jest-html-reporter`

## 🧪 Test Coverage

### 1. Functional Testing (`tests/functional`)
Verifies the CRUD operations and business logic of the user service.
- **Positive Flows**: Create, Read, Update, Delete users.
- **Negative Flows**: Handling of non-existent resources (404), Invalid payloads.
- **Performance**: Assertions on response time (SLAs).
- **Validation**: Strict schema checks and Header validations.

### 2. Contract Testing (`tests/contract`)
Ensures compatibility between the Frontend (Consumer) and Backend (Provider) without ensuring the backend is running.
- **Consumer**: `FrontendApp`
- **Provider**: `UserService`
- **States Covered**:
  - "User exists" (200 OK)
  - "User does not exist" (404 Not Found)

### 3. Security Testing (`tests/security`)
Basic automated security checks to catch low-hanging fruit vulnerabilities.
- **Auth**: Missing credentials, Invalid tokens.
- **Injection**: Basic SQL Injection attempts (`' OR '1'='1`).

## 🚀 How to Run

### Run All API Tests
```bash
npm test
```

### Run Specific Suites
```bash
# Functional Only
npm test -- functional

# Contract Only
npm test -- contract

# Security Only
npm test -- security
```

---
*Part of the Tansolo QA Portfolio.*
