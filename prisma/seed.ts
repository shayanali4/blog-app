const { PrismaClient } = require("@prisma/client");
const { subDays, setHours, setMinutes, setSeconds } = require("date-fns");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing old data...");
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  console.log("Old data removed!");

  // Create users
  const user1 = await prisma.user.create({
    data: { id: 1, name: "Alice", email: "alice@example.com" },
  });
  const user2 = await prisma.user.create({
    data: { id: 2, name: "Bob", email: "bob@example.com" },
  });
  const user3 = await prisma.user.create({
    data: { id: 3, name: "Charlie", email: "charlie@example.com" },
  });

  // Create 55 posts
  const posts = [];
  for (let i = 1; i <= 55; i++) {
    const post = await prisma.post.create({
      data: {
        title: `Post ${i}`,
        content: `This is the content of post ${i}.`,
        authorId: i % 3 === 0 ? user3.id : i % 2 === 0 ? user2.id : user1.id,
      },
    });
    posts.push(post);
  }

  // Function to generate timestamps for past days
  const getPastTimestamp = (daysAgo: any) => {
    const baseDate = subDays(new Date(), daysAgo);
    return setSeconds(
      setMinutes(
        setHours(baseDate, Math.floor(Math.random() * 24)),
        Math.floor(Math.random() * 60)
      ),
      Math.floor(Math.random() * 60)
    );
  };

  // Create events (views and clicks) for posts over the past few days
  const events = [];
  for (const post of posts) {
    const days = [0, 1, 2, 3, 5, 7, 10]; // Spread events across different past days
    for (const day of days) {
      events.push(
        {
          type: "view",
          postId: post.id,
          userId: user1.id,
          timestamp: getPastTimestamp(day),
        },
        {
          type: "view",
          postId: post.id,
          userId: user2.id,
          timestamp: getPastTimestamp(day),
        },
        {
          type: "click",
          postId: post.id,
          userId: user3.id,
          timestamp: getPastTimestamp(day),
        }
      );
    }
  }

  await prisma.event.createMany({ data: events });

  console.log("Database seeded with new data including past events!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
