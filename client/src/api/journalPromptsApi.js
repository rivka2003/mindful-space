import { createContentApi } from "./contentApiFactory";

const journalPromptsApi = createContentApi("journal-prompts");

export const fetchJournalPrompts = journalPromptsApi.fetchAll;
export const fetchMyJournalPrompts = journalPromptsApi.fetchMine;
export const createJournalPrompt = journalPromptsApi.create;
export const updateJournalPrompt = journalPromptsApi.update;
export const deleteJournalPrompt = journalPromptsApi.remove;
export const likeJournalPrompt = journalPromptsApi.like;
export const unlikeJournalPrompt = journalPromptsApi.unlike;
