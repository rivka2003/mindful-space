import {
  ALL_CATEGORIES_VALUE,
  CONTENT_CATEGORY_FILTER_OPTIONS,
} from "../features/content/categoryOptions";

export function getAvailableCategories() {
  return CONTENT_CATEGORY_FILTER_OPTIONS;
}

export function filterContentByCategory(items, selectedCategory) {
  if (!selectedCategory || selectedCategory === ALL_CATEGORIES_VALUE) {
    return items;
  }

  return items.filter((item) => item.category === selectedCategory);
}
