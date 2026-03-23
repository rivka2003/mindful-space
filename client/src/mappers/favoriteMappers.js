import { DEFAULT_CONTENT_CATEGORY } from "../features/content/categoryOptions";

function normalizeFavoriteEntity(entityType, entity) {
  if (!entity || typeof entity !== "object") {
    return null;
  }

  const commonFields = {
    id: entity._id,
    category: entity.category || DEFAULT_CONTENT_CATEGORY,
    likesCount: Number(entity.likesCount || 0),
    visibility: entity.visibility || "public",
    entityType,
  };

  switch (entityType) {
    case "Mantra":
      return {
        ...commonFields,
        title: entity.text,
      };
    case "Meditation":
    case "Podcast":
    case "Habit":
      return {
        ...commonFields,
        title: entity.title,
      };
    case "JournalPrompt":
      return {
        ...commonFields,
        title: entity.question,
      };
    default:
      return {
        ...commonFields,
        title: "Untitled content",
      };
  }
}

export function mapFavoriteItem(item) {
  return {
    entityType: item.entityType,
    item: normalizeFavoriteEntity(item.entityType, item.entityId),
  };
}
