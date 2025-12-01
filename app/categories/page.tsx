import { getCategories } from "../actions/categoryActions";
import CategoryClient from "./CategoryClient";

export default async function CategoriesPage() {
  const categories = await getCategories(); // Server-side fetch

  return (
    <div className="p-6">
      <CategoryClient initialCategories={categories} />
    </div>
  );
}
