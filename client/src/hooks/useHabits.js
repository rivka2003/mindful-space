import { useQuery } from "@tanstack/react-query";
import { fetchHabits, fetchMyHabits } from "../api/habitsApi";
import { mapHabit } from "../mappers/contentMappers";
import useAuth from "./useAuth";

function useHabits(options = {}) {
  const { token } = useAuth();
  const { category, scope = "all" } = options;

  return useQuery({
    queryKey: ["habits", { category: category || null, scope }],
    queryFn: async () => {
      const data =
        scope === "mine"
          ? await fetchMyHabits(token, { category })
          : await fetchHabits(token, { category });
      return data.map(mapHabit);
    },
    enabled: scope === "all" || Boolean(token),
  });
}

export default useHabits;
