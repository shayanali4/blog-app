import { render, screen } from "@testing-library/react";
import PostsPage from "@/app/posts/page";
import { getPosts } from "@/actions/post";
import "@testing-library/jest-dom";

// Mock the `getPosts` API call
jest.mock("@/actions/post", () => ({
  getPosts: jest.fn(),
}));

describe("PostsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the posts page with posts grid and create button", async () => {
    // Mock API response
    (getPosts as jest.Mock).mockResolvedValue({
      posts: [
        {
          id: 1,
          title: "First Post",
          content: "This is the first post",
          author: { name: "John Doe", email: "john@gmail.com" },
        },
        {
          id: 2,
          title: "Second Post",
          content: "This is the second post",
          author: { name: "John Doe", email: "john@gmail.com" },
        },
      ],
      totalPosts: 2,
    });

    // Render the page
    render(await PostsPage({ searchParams: Promise.resolve({}) }));

    // Check if the page title is displayed
    expect(screen.getByTestId("posts-title")).toHaveTextContent("All Posts");

    // Check if the create post button is displayed
    expect(screen.getByTestId("create-post-btn")).toBeInTheDocument();

    // Check if the posts grid is displayed
    expect(screen.getByTestId("posts-grid")).toBeInTheDocument();
  });
});
