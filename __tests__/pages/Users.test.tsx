import { render, screen } from "@testing-library/react";
import UsersPage from "@/app/users/page";
import { getUsers } from "@/actions/user";
import "@testing-library/jest-dom";

// Mock the `getUsers` API call
jest.mock("@/actions/user", () => ({
  getUsers: jest.fn(),
}));

describe("UsersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the users page with users table and create button", async () => {
    // Mock API response
    (getUsers as jest.Mock).mockResolvedValue({
      users: [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          _count: { posts: 1, events: 2 },
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@example.com",

          _count: { posts: 3, events: 6 },
        },
      ],
      totalUsers: 2,
    });

    // Render the page
    render(await UsersPage({ searchParams: Promise.resolve({}) }));

    // Check if the page title is displayed
    expect(screen.getByTestId("users-title")).toHaveTextContent("All Users");

    // Check if the create user button is displayed
    expect(screen.getByTestId("create-user-btn")).toBeInTheDocument();

    // Check if the users table is displayed
    expect(screen.getByTestId("users-table")).toBeInTheDocument();
  });
});
