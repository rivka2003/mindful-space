import useHabits from "../../hooks/useHabits";
import useJournalPrompts from "../../hooks/useJournalPrompts";
import useMantras from "../../hooks/useMantras";
import useMeditations from "../../hooks/useMeditations";
import usePodcasts from "../../hooks/usePodcasts";

export const contentConfigs = {
  mantras: {
    title: "Mantras",
    intro: "Short affirmations to support focus, calm, and confidence throughout the day.",
    supportsReminder: true,
    queryKey: "mantras",
    useContentQuery: useMantras,
  },
  meditations: {
    title: "Meditations",
    intro: "Guided sessions for breath, grounding, and mindful recovery.",
    supportsReminder: false,
    queryKey: "meditations",
    useContentQuery: useMeditations,
  },
  podcasts: {
    title: "Podcasts",
    intro: "Audio content for reflection, learning, and steady mental space.",
    supportsReminder: false,
    queryKey: "podcasts",
    useContentQuery: usePodcasts,
  },
  "journal-prompts": {
    title: "Journal Prompts",
    intro: "Questions that help organize thoughts and deepen self-observation.",
    supportsReminder: false,
    queryKey: "journal-prompts",
    useContentQuery: useJournalPrompts,
  },
  habits: {
    title: "Habits",
    intro: "Small repeatable actions that turn wellbeing into a daily practice.",
    supportsReminder: true,
    queryKey: "habits",
    useContentQuery: useHabits,
  },
};
