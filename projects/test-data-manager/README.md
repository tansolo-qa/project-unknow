# 🛠️ Test Data Manager (Project D)

A centralized, internal tool designed to generate, manage, and serve dynamic test data for QA automation pipelines. It solves the common problem of "stale data" in staging environments by providing an on-demand API for creating fresh, realistic datasets.

## 🚀 Key Features

- **Dynamic Data Generation**: Leveraging [Faker.js](https://fakerjs.dev/) to create realistic user profiles, product catalogs, and more.
- **Template Support**:
  - **👤 User Profiles**: Names, emails, job titles, avatars.
  - **📦 E-commerce Products**: Product names, prices, SKUs, categories.
- **RESTful API**: Simple endpoints to generate data programmatically from your test scripts (Playwright, Cypress, k6).
- **Live Persistence**: Data is stored in MongoDB, allowing for persistent test scenarios across sessions.
- **Modern UI**: Built with Next.js & TailwindCSS for easy manual data management.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB (via Mongoose)
- **Styling**: TailwindCSS + Lucide Icons
- **Data Engine**: Faker.js v9

## 🔌 API Reference

### 1. Generate Bulk Data
Create multiple records instantly using a specific template.

- **Endpoint**: `POST /api/data/generate`
- **Headers**: `Content-Type: application/json`
- **Body Parameters**:
  - `count` (number, optional): Number of records to generate (default: 10).
  - `type` (string, optional): Template type. Options: `'user'`, `'product'` (default: `'user'`).

**Example Request (Generate 5 Products):**
```bash
curl -X POST http://localhost:3001/api/data/generate \
  -H "Content-Type: application/json" \
  -d '{"count": 5, "type": "product"}'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully generated 5 records"
}
```

### 2. Fetch Latest Data
Retrieve the most recently generated data points.

- **Endpoint**: `GET /api/data`
- **Response**: Array of created data objects.

## 🏃‍♂️ Getting Started

### Standalone Mode
Run only this project on port 3001:

```bash
cd projects/test-data-manager
npm install
npx next dev -p 3001
```

### Integrated Mode (Recommended)
Run as part of the full portfolio suite (starts both main app and TDM):

```bash
# From the root directory
npm run dev
```

Visit the dashboard at **[http://localhost:3001](http://localhost:3001)**.
