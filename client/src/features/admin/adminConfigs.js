import { contentConfigs } from "../content/contentConfigs";
import { CONTENT_CATEGORY_OPTIONS } from "../content/categoryOptions";

export const adminContentConfigs = {
  mantras: {
    ...contentConfigs.mantras,
    fields: [
      { name: "text", label: "Text", type: "textarea", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: CONTENT_CATEGORY_OPTIONS,
        required: true,
      },
      {
        name: "reminderType",
        label: "Reminder Type",
        type: "select",
        options: ["none", "email", "sms"],
      },
      { name: "reminderTime", label: "Reminder Time", type: "time" },
      {
        name: "visibility",
        label: "Visibility",
        type: "select",
        options: ["public", "private"],
      },
    ],
  },
  meditations: {
    ...contentConfigs.meditations,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: CONTENT_CATEGORY_OPTIONS,
        required: true,
      },
      { name: "url", label: "URL", type: "url", required: true },
      { name: "duration", label: "Duration", type: "number" },
      {
        name: "visibility",
        label: "Visibility",
        type: "select",
        options: ["public", "private"],
      },
    ],
  },
  podcasts: {
    ...contentConfigs.podcasts,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: CONTENT_CATEGORY_OPTIONS,
        required: true,
      },
      { name: "url", label: "URL", type: "url", required: true },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: ["other", "spotify", "apple"],
      },
      {
        name: "visibility",
        label: "Visibility",
        type: "select",
        options: ["public", "private"],
      },
    ],
  },
  "journal-prompts": {
    ...contentConfigs["journal-prompts"],
    fields: [
      { name: "question", label: "Question", type: "textarea", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: CONTENT_CATEGORY_OPTIONS,
        required: true,
      },
      {
        name: "visibility",
        label: "Visibility",
        type: "select",
        options: ["public", "private"],
      },
    ],
  },
  habits: {
    ...contentConfigs.habits,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: CONTENT_CATEGORY_OPTIONS,
        required: true,
      },
      {
        name: "reminderType",
        label: "Reminder Type",
        type: "select",
        options: ["none", "email", "sms"],
      },
      { name: "reminderTime", label: "Reminder Time", type: "time" },
      {
        name: "visibility",
        label: "Visibility",
        type: "select",
        options: ["public", "private"],
      },
    ],
  },
};
