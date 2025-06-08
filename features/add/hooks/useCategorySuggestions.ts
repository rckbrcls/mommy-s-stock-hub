import { useState } from "react";

export function useCategorySuggestions(items: { category?: string }[]) {
  const [category, setCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const allCategories = Array.from(
    new Set(items.map((item) => item.category || "Sem Categoria"))
  );

  function handleCategoryChange(value: string) {
    setCategory(value);
    if (value.trim()) {
      const filtered = allCategories.filter((cat) =>
        cat.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  }

  function handleSelectCategory(selectedCategory: string) {
    setCategory(selectedCategory);
    setFilteredCategories([]);
  }

  return {
    category,
    setCategory,
    filteredCategories,
    handleCategoryChange,
    handleSelectCategory,
    allCategories,
  };
}
