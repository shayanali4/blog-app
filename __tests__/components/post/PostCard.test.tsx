import { render, screen } from "@testing-library/react";
import PostCard from "@/components/post/PostCard";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe("PostCard", () => {
  const mockPost = {
    id: 1,
    title: "Test Post Title",
    content: "This is a test post content.",
    author: { name: "John Doe" },
  };

  beforeEach(() => {
    mockRouter.setCurrentUrl("/posts");
  });

  it("renders the post card with correct data", () => {
    render(<PostCard post={mockPost} />);

    // Check if title is rendered
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // Check if content is rendered
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();

    // Check if author name is rendered
    expect(screen.getByTestId("post-author")).toHaveTextContent(
      `Author: ${mockPost.author.name}`
    );

    // expect(
    //   screen.getByText((content, element) =>
    //     element?.textContent?.includes(`Author: ${mockPost.author.name}`)
    //   )
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByText(`Author: ${mockPost.author.name}`)
    // ).toBeInTheDocument();

    // Check if the link points to the correct post
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/posts/${mockPost.id}`);
  });
});
