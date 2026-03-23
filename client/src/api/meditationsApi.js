import { createContentApi } from "./contentApiFactory";

const meditationsApi = createContentApi("meditations");

export const fetchMeditations = meditationsApi.fetchAll;
export const fetchMyMeditations = meditationsApi.fetchMine;
export const createMeditation = meditationsApi.create;
export const updateMeditation = meditationsApi.update;
export const deleteMeditation = meditationsApi.remove;
export const likeMeditation = meditationsApi.like;
export const unlikeMeditation = meditationsApi.unlike;
