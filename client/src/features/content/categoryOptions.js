export const CONTENT_CATEGORIES = [
  "general",
  "calm",
  "focus",
  "resilience",
  "vitality",
  "flow",
  "manifesting",
];

export const DEFAULT_CONTENT_CATEGORY = "general";
export const ALL_CATEGORIES_VALUE = "all";

export const CONTENT_CATEGORY_OPTIONS = CONTENT_CATEGORIES.map((category) => ({
  value: category,
  label: category.charAt(0).toUpperCase() + category.slice(1),
}));

export const CONTENT_CATEGORY_FILTER_OPTIONS = [
  {
    value: ALL_CATEGORIES_VALUE,
    label: "All",
  },
  ...CONTENT_CATEGORY_OPTIONS,
];

export function getContentCategoryLabel(category) {
  const normalizedCategory = category || DEFAULT_CONTENT_CATEGORY;
  return (
    CONTENT_CATEGORY_OPTIONS.find((option) => option.value === normalizedCategory)?.label ||
    CONTENT_CATEGORY_OPTIONS[0].label
  );
}
