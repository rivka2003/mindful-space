function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="filter-row" aria-label="Category filters" role="group">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            className={`filter-button${selectedCategory === category.value ? " filter-button--active" : ""}`}
            aria-pressed={selectedCategory === category.value}
            onClick={() => onChange(category.value)}
          >{category.label}</button>
        ))}
    </div>
  );
}

export default CategoryFilter;
