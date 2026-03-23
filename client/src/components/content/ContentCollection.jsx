import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ContentCard from "./ContentCard";
import {
  ALL_CATEGORIES_VALUE,
  CONTENT_CATEGORY_FILTER_OPTIONS,
} from "../../features/content/categoryOptions";

function ContentCollection({
  title,
  intro,
  items = [],
  queryKey,
  supportsReminder = false,
  isLoading,
  isError,
  error,
}) {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES_VALUE);
  const filteredItems = useMemo(
    () => {
      const currentItems = items ?? [];

      if (selectedCategory === ALL_CATEGORIES_VALUE) {
        return currentItems;
      }

      return currentItems.filter((item) => item.category === selectedCategory);
    },
    [items, selectedCategory]
  );

  return (
    <section className="content-section">
      <div className="content-section__header">
        <p className="eyebrow">{title}</p>
        <h1>{title}</h1>
        <p className="section-copy">{intro}</p>
      </div>

      <CategoryFilter
        categories={CONTENT_CATEGORY_FILTER_OPTIONS}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      {isLoading ? <p className="status-text">Loading content...</p> : null}
      {isError ? (
        <p className="status-text status-text--error">
          {error?.message || "Something went wrong while loading content."}
        </p>
      ) : null}
      {!isLoading && !isError && filteredItems.length === 0 ? (
        <p className="status-text">No content found for this category.</p>
      ) : null}

      <div className="content-grid">
        {filteredItems.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            queryKey={queryKey}
            supportsReminder={supportsReminder}
          />
        ))}
      </div>
    </section>
  );
}

export default ContentCollection;
