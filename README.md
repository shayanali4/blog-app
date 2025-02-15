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
   - Seed the database:
     ```sh
     npm run seed
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 📄 Prisma Schema & Server Actions

### Prisma Schema

The Prisma schema (`prisma/schema.prisma`) defines the database structure. Here’s an example of the schema:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  events    Event[]
  createdAt DateTime @default(now())
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  posts Post[]
  events Event[]
}

model Event {
  id        Int      @id @default(autoincrement())
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  type      String
  timestamp DateTime @default(now())
}
```

### Server Actions

Server actions are used to interact with the database, ensuring efficient data retrieval and updates. These actions are found in the `src/actions` directory.

#### Example: Fetching a Single Post by ID

```typescript
import { prisma } from "@/lib/prisma";

export async function getPostById(postId: number) {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
}
```

#### Example: Logging an Event

```typescript
export async function logEvent(postId: number, userId: number, type: string) {
  return await prisma.event.create({
    data: { postId, userId, type },
  });
}
```

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

## 📊 Analytics & Event Tracking

The application tracks user interactions through an Event model in Prisma. The analytics page (`/`) provides insights into user activity.

### Logging Events

To log an event when a user views a post, the following function is used:

#### Example: Logging a "view" Event

```typescript
// app/posts/[id]/page.tsx
import { getPostById } from "@/actions";
import { logEvent } from "@/actions/event";
import { notFound } from "next/navigation";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const postId = parseInt(id);
  const userId = 1; // Replace with actual user ID

  // Fetch the post data
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  // Log a "view" event
  await logEvent(postId, userId, "view");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        Author: <span className="font-medium">{post.author.name}</span>
      </p>
    </div>
  );
}
```

### Fetching Analytics Data

Analytics data is retrieved using the following server actions:

```typescript
import {
  getTotalEventsPerPost,
  getViewsPerPost,
  getTimeSeriesData,
} from "@/actions/event";
```

### Time-Series Data Aggregation

Time-series data is formatted and aggregated for visualization:

```typescript
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
```

### Displaying Analytics

Analytics are displayed using a component (`EventsTrend`) to visualize trends and tables to show event counts per post.

## 🔹 Additional Notes

- Ensure `.env` is correctly configured before running migrations.
- Prisma migrations should be run whenever the schema is modified.
- Server actions must be used only in server components.
