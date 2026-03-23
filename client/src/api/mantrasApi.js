import { createContentApi } from "./contentApiFactory";

const mantrasApi = createContentApi("mantras");

export const fetchMantras = mantrasApi.fetchAll;
export const fetchMyMantras = mantrasApi.fetchMine;
export const createMantra = mantrasApi.create;
export const updateMantra = mantrasApi.update;
export const deleteMantra = mantrasApi.remove;
export const likeMantra = mantrasApi.like;
export const unlikeMantra = mantrasApi.unlike;
export const activateMantraReminder = mantrasApi.activateReminder;
export const deactivateMantraReminder = mantrasApi.deactivateReminder;
