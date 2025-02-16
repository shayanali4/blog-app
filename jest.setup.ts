// import { prisma } from "@/lib/prisma";
import "@testing-library/jest-dom";
// jest.mock("@/lib/prisma", () => require("@/__mocks__/prisma").default);

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// beforeEach(async () => {
//   await prisma.user.deleteMany(); // Deletes all test users
// });

// beforeAll(async () => {
//   await prisma.$executeRaw`PRAGMA foreign_keys = ON;`; // Ensures cascading deletes
// });

// afterEach(async () => {
//   await prisma.user.deleteMany(); // Reset DB after each test
// });

// afterAll(async () => {
//   await prisma.$disconnect();
// });
