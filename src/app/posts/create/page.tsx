"use client";
import Form from "next/form";
import { createPost } from "@/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();

  const [state, action, pending] = useActionState(createPostAction, {
    title: "",
    authorId: 1,
    content: "",
    published: false,
    id: 1,
    errors: {}, // Add an errors object to store validation errors
  });

  async function createPostAction(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authorId = 1;

    // Initialize an errors object
    const errors: { title?: string; content?: string } = {};

    // Validate title
    if (!title) {
      errors.title = "Title is required";
    } else if (title.length < 5) {
      errors.title = "Title must be at least 5 characters long";
    }

    // Validate content
    if (!content) {
      errors.content = "Content is required";
    } else if (content.length < 20) {
      errors.content = "Content must be at least 20 characters long";
    }

    // If there are errors, return them
    if (Object.keys(errors).length > 0) {
      return { ...prevState, errors };
    }

    const newPost = await createPost({ title, content, authorId });

    // If no errors, proceed to create the post
    // return await createPost({ title, content, authorId });
    if (newPost) {
      router.push("/posts"); // Redirect to posts page
    }

    return newPost;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={action} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
            required
            minLength={5}
          />
          {state.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
            required
            minLength={20}
          />
          {state.errors?.content && (
            <p className="text-red-500 text-sm mt-1">{state.errors.content}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          {pending ? "Loading..." : "Create Post"}
        </button>
      </Form>
    </div>
  );
}
