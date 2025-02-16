/**
 * @jest-environment node
 */
import { createUser, createPost, getPosts, getPostById } from "@/actions";

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(), // Prevents actual Next.js errors
}));

describe("Post Server Actions", () => {
  let userId: number;

  beforeAll(async () => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    const user = await createUser({
      name: "Test User",
      email: uniqueEmail,
    });

    userId = user.id;
  });

  test("Should create a post", async () => {
    const post = await createPost({
      title: "Test Post",
      content: "This is a test post.",
      authorId: userId,
    });

    expect(post).toHaveProperty("id");
    expect(post.title).toBe("Test Post");
    expect(post.content).toBe("This is a test post.");
    expect(post.published).toBe(true);
    expect(post.authorId).toBe(userId);
  });

  test("Should fetch paginated posts", async () => {
    await createPost({
      title: "Post 1",
      content: "Content 1",
      authorId: userId,
    });
    await createPost({
      title: "Post 2",
      content: "Content 2",
      authorId: userId,
    });

    const { posts, totalPosts } = await getPosts(1, 1);

    expect(posts.length).toBe(1);
    expect(totalPosts).toBeGreaterThanOrEqual(2);
  });

  test("Should fetch a post by ID", async () => {
    const newPost = await createPost({
      title: "Unique Post",
      content: "Unique Content",
      authorId: userId,
    });

    const post = await getPostById(newPost.id);
    expect(post).toBeDefined();
    expect(post?.title).toBe("Unique Post");
  });

  test("Should return null if post not found", async () => {
    const post = await getPostById(999);
    expect(post).toBeNull();
  });
});
