import { useQuery } from "@tanstack/react-query";
import { fetchMeditations, fetchMyMeditations } from "../api/meditationsApi";
import { mapMeditation } from "../mappers/contentMappers";
import useAuth from "./useAuth";

function useMeditations(options = {}) {
  const { token } = useAuth();
  const { category, scope = "all" } = options;

  return useQuery({
    queryKey: ["meditations", { category: category || null, scope }],
    queryFn: async () => {
      const data =
        scope === "mine"
          ? await fetchMyMeditations(token, { category })
          : await fetchMeditations(token, { category });
      return data.map(mapMeditation);
    },
    enabled: scope === "all" || Boolean(token),
  });
}

export default useMeditations;
