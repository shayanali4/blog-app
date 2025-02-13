# Blog Application using Next.js 15 + Prisma + Server Actions

This repository contains a Next.js 15 project using Prisma and Server Actions for database interactions. The project includes logging, analytics tracking, and pagination features.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- SQLite
- Prisma CLI (`npm install -g prisma`)
- Next.js 15

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/shayanali4/blog-app.git
   cd blog-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database:
   - Copy `.env.example` to `.env` and update the `DATABASE_URL` if needed:
     ```sh
     cp .env.example .env
     ```
   - Run Prisma migrations:
     ```sh
     npx prisma migrate dev --name init
     ```
   - Generate Prisma client:
     ```sh
     npx prisma generate
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 📄 Prisma Schema & Server Actions

### Prisma Schema

The Prisma schema (`prisma/schema.prisma`) defines the database structure.

### Server Actions

Server actions are used to interact with the database as seen in (`src/actions`) directory.

## 📌 Pagination

Pagination is implemented using Prisma's `skip` and `take`.

#### Fetch Paginated Posts

```typescript
export async function getPaginatedPosts(page: number, pageSize: number) {
  return await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { id: "desc" },
  });
}
```

📊 Analytics & Event Tracking

The application tracks user interactions through an Event model in Prisma. The analytics page (`/`) provides insights into user activity.

Fetching Analytics Data

Analytics data is retrieved using the following server actions:

import {
getTotalEventsPerPost,
getViewsPerPost,
getTimeSeriesData,
} from "@/actions/event";

Time-Series Data Aggregation

Time-series data is formatted and aggregated for visualization:

const chartData = timeSeriesData.map((event) => ({
timestamp: event.timestamp.toISOString().split("T")[0],
[event.type]: 1,
}));

const aggregatedData = chartData.reduce((acc, curr) => {
const date = curr.timestamp;
if (!acc[date]) {
acc[date] = { timestamp: date, view: 0, click: 0 };
}
if (curr.view) acc[date].view += 1;
if (curr.click) acc[date].click += 1;
return acc;
}, {} as Record<string, { timestamp: string; view: number; click: number }>);

Displaying Analytics

Analytics are displayed using a component (EventsTrend) to visualize trends, and tables to show event counts per post.

## 🔹 Additional Notes

- Ensure `.env` is correctly configured before running migrations.
- Prisma migrations should be run whenever the schema is modified.
- Server actions must be used only in server components.
