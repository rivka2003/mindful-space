import { useQuery } from "@tanstack/react-query";
import {
  fetchJournalPrompts,
  fetchMyJournalPrompts,
} from "../api/journalPromptsApi";
import { mapJournalPrompt } from "../mappers/contentMappers";
import useAuth from "./useAuth";

function useJournalPrompts(options = {}) {
  const { token } = useAuth();
  const { category, scope = "all" } = options;

  return useQuery({
    queryKey: ["journal-prompts", { category: category || null, scope }],
    queryFn: async () => {
      const data =
        scope === "mine"
          ? await fetchMyJournalPrompts(token, { category })
          : await fetchJournalPrompts(token, { category });
      return data.map(mapJournalPrompt);
    },
    enabled: scope === "all" || Boolean(token),
  });
}

export default useJournalPrompts;
