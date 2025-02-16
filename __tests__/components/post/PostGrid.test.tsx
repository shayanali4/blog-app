import { render, screen } from "@testing-library/react";
import PostsGrid from "@/components/post/PostsGrid";

// Mock child components
jest.mock("@/components/post/PostCard", () => ({
  __esModule: true,
  default: jest.fn(({ post }) => <div>Mocked Post: {post.title}</div>),
}));

jest.mock("@/components/Pagination", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Pagination</div>),
}));

jest.mock("@/components/PageSizeInput", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Page Size Input</div>),
}));

describe("PostsGrid", () => {
  it("renders posts, pagination, and page size input", () => {
    const mockProps = {
      posts: [
        {
          id: 1,
          title: "First Post",
          content: "Content 1",
          author: { name: "John" },
        },
        {
          id: 2,
          title: "Second Post",
          content: "Content 2",
          author: { name: "Jane" },
        },
      ],
      totalPages: 5,
      page: 1,
      pageSize: 10,
    };

    // Render component
    render(<PostsGrid {...mockProps} />);

    // Check if page size input is rendered
    expect(screen.getByText("Mocked Page Size Input")).toBeInTheDocument();

    // Check if posts are rendered
    expect(screen.getByText("Mocked Post: First Post")).toBeInTheDocument();
    expect(screen.getByText("Mocked Post: Second Post")).toBeInTheDocument();

    // Check if pagination is rendered
    expect(screen.getByText("Mocked Pagination")).toBeInTheDocument();
  });
});
