import { useQuery } from "@tanstack/react-query";
import { fetchPodcasts, fetchMyPodcasts } from "../api/podcastsApi";
import { mapPodcast } from "../mappers/contentMappers";
import useAuth from "./useAuth";

function usePodcasts(options = {}) {
  const { token } = useAuth();
  const { category, scope = "all" } = options;

  return useQuery({
    queryKey: ["podcasts", { category: category || null, scope }],
    queryFn: async () => {
      const data =
        scope === "mine"
          ? await fetchMyPodcasts(token, { category })
          : await fetchPodcasts(token, { category });
      return data.map(mapPodcast);
    },
    enabled: scope === "all" || Boolean(token),
  });
}

export default usePodcasts;
