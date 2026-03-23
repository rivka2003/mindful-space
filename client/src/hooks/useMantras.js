import { useQuery } from "@tanstack/react-query";
import { fetchMantras, fetchMyMantras } from "../api/mantrasApi";
import { mapMantra } from "../mappers/contentMappers";
import useAuth from "./useAuth";

function useMantras(options = {}) {
  const { token } = useAuth();
  const { category, scope = "all" } = options;

  return useQuery({
    queryKey: ["mantras", { category: category || null, scope }],
    queryFn: async () => {
      const data =
        scope === "mine"
          ? await fetchMyMantras(token, { category })
          : await fetchMantras(token, { category });
      return data.map(mapMantra);
    },
    enabled: scope === "all" || Boolean(token),
  });
}

export default useMantras;
