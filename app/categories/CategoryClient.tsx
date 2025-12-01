"use client";

import { useState, useTransition } from "react";
import { createCategory, getCategories, CategoryInput } from "../actions/categoryActions";

interface Category {
  id: number;
  name: string | null;
  slug: string | null;
}

export default function CategoryClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isPending, start] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const slugInput = form.elements.namedItem("slug") as HTMLInputElement;

    const data: CategoryInput = {
      name: nameInput.value,
      slug: slugInput.value,
    };

    start(async () => {
      try {
        const newCategory = await createCategory(data);
        setCategories([newCategory, ...categories]);
        form.reset();
      } catch (err: any) {
        // Zod errors
        if (err?.issues) {
          const fieldErrors = err.issues.reduce((acc: any, issue: any) => {
            acc[issue.path[0]] = issue.message;
            return acc;
          }, {});
          setErrors(fieldErrors);
        } else {
          console.error(err);
        }
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 border">
        <h2 className="text-xl font-semibold">Create Category</h2>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-blue-500 outline-none"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <input
            name="slug"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-blue-500 outline-none"
            required
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Category
        </button>
      </form>

      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {categories.length === 0 && <p className="text-gray-500">No categories yet.</p>}

        <ul className="divide-y">
          {categories.map((cat) => (
            <li key={cat.id} className="py-3">
              <div className="font-semibold">{cat.name}</div>
              <div className="text-sm text-gray-600">Slug: {cat.slug}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
