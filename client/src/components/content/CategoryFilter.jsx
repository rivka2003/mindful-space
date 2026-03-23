import { Chip, Stack } from "@mui/material";

function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="filter-row" aria-label="Category filters" role="group">
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.value}
            clickable
            color={selectedCategory === category.value ? "primary" : "default"}
            label={category.label}
            onClick={() => onChange(category.value)}
            variant={selectedCategory === category.value ? "filled" : "outlined"}
          />
        ))}
      </Stack>
    </div>
  );
}

export default CategoryFilter;
