import { createContentApi } from "./contentApiFactory";

const podcastsApi = createContentApi("podcasts");

export const fetchPodcasts = podcastsApi.fetchAll;
export const fetchMyPodcasts = podcastsApi.fetchMine;
export const createPodcast = podcastsApi.create;
export const updatePodcast = podcastsApi.update;
export const deletePodcast = podcastsApi.remove;
export const likePodcast = podcastsApi.like;
export const unlikePodcast = podcastsApi.unlike;
