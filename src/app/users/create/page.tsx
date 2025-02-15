"use client";
import Form from "next/form";
import { createUser } from "@/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function NewUser() {
  const router = useRouter();

  const [state, action, pending] = useActionState(createUserAction, {
    id: 1,
    name: "",
    email: "",
    errors: {}, // Add an errors object to store validation errors
  });

  async function createUserAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Initialize an errors object
    const errors: { name?: string; email?: string } = {};

    // Validate name
    if (!name) {
      errors.name = "Name is required";
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }

    // Validate email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    // If there are errors, return them
    if (Object.keys(errors).length > 0) {
      return { ...prevState, errors };
    }

    // If no errors, proceed to create the user
    const newUser = await createUser({ name, email });

    if (newUser) {
      router.push("/users"); // Redirect to posts page
    }

    return newUser;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>
      <Form action={action} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter user name"
            className="w-full px-4 py-2 border rounded-lg"
            required
            minLength={3}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter user email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          {pending ? "Creating..." : "Create User"}
        </button>
      </Form>
    </div>
  );
}
