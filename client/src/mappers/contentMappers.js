import { DEFAULT_CONTENT_CATEGORY } from "../features/content/categoryOptions";

function mapBaseFields(item) {
  return {
    id: item._id,
    category: item.category || DEFAULT_CONTENT_CATEGORY,
    likesCount: Number(item.likesCount || 0),
    visibility: item.visibility || "public",
    createdAt: item.createdAt || null,
    updatedAt: item.updatedAt || null,
  };
}

export function mapMantra(item) {
  return {
    ...mapBaseFields(item),
    type: "mantra",
    entityType: "Mantra",
    title: item.text,
    text: item.text,
    description: "Short affirmation for focus, calm, or confidence.",
    reminderType: item.reminderType || "none",
    reminderTime: item.reminderTime || "",
  };
}

export function mapMeditation(item) {
  return {
    ...mapBaseFields(item),
    type: "meditation",
    entityType: "Meditation",
    title: item.title,
    description: `${item.duration ? `${item.duration} min guided` : "Guided"} meditation session.`,
    url: item.url,
    duration: item.duration ? Number(item.duration) : null,
  };
}

export function mapPodcast(item) {
  return {
    ...mapBaseFields(item),
    type: "podcast",
    entityType: "Podcast",
    title: item.title,
    description: `Listen on ${item.platform || "your preferred platform"}.`,
    url: item.url,
    platform: item.platform || "other",
  };
}

export function mapJournalPrompt(item) {
  return {
    ...mapBaseFields(item),
    type: "journalPrompt",
    entityType: "JournalPrompt",
    title: item.question,
    question: item.question,
    description: "Reflective writing prompt for mindful journaling.",
  };
}

export function mapHabit(item) {
  return {
    ...mapBaseFields(item),
    type: "habit",
    entityType: "Habit",
    title: item.title,
    description: item.description || "Intentional habit for daily wellbeing.",
    reminderType: item.reminderType || "none",
    reminderTime: item.reminderTime || "",
  };
}
