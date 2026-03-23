import { createContentApi } from "./contentApiFactory";

const habitsApi = createContentApi("habits");

export const fetchHabits = habitsApi.fetchAll;
export const fetchMyHabits = habitsApi.fetchMine;
export const createHabit = habitsApi.create;
export const updateHabit = habitsApi.update;
export const deleteHabit = habitsApi.remove;
export const likeHabit = habitsApi.like;
export const unlikeHabit = habitsApi.unlike;
export const activateHabitReminder = habitsApi.activateReminder;
export const deactivateHabitReminder = habitsApi.deactivateReminder;
