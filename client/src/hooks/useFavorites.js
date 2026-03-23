import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteContent } from "../api/authApi";
import { mapFavoriteItem } from "../mappers/favoriteMappers";
import useAuth from "./useAuth";

function useFavorites() {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const data = await fetchFavoriteContent(token);
      return data.map(mapFavoriteItem);
    },
    enabled: isAuthenticated,
  });
}

export default useFavorites;
