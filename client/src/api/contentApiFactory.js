import { buildAuthRequest, buildJsonAuthRequest, request } from "./httpClient";

export function createContentApi(resourcePath) {
  function buildCollectionPath(category, scope = "all") {
    const basePath =
      scope === "mine" ? `/api/${resourcePath}/mine` : `/api/${resourcePath}`;

    if (!category) {
      return basePath;
    }

    const queryParams = new URLSearchParams({ category });
    return `${basePath}?${queryParams.toString()}`;
  }

  return {
    fetchAll: (token, options = {}) =>
      request(buildCollectionPath(options.category, "all"), buildAuthRequest(token)),
    fetchMine: (token, options = {}) =>
      request(buildCollectionPath(options.category, "mine"), buildAuthRequest(token)),
    create: (payload, token) =>
      request(`/api/${resourcePath}`, buildJsonAuthRequest("POST", payload, token)),
    update: (id, payload, token) =>
      request(
        `/api/${resourcePath}/${id}`,
        buildJsonAuthRequest("PUT", payload, token)
      ),
    remove: (id, token) =>
      request(`/api/${resourcePath}/${id}`, {
        ...buildAuthRequest(token),
        method: "DELETE",
      }),
    like: (id, token) =>
      request(`/api/${resourcePath}/${id}/like`, {
        ...buildAuthRequest(token),
        method: "POST",
      }),
    unlike: (id, token) =>
      request(`/api/${resourcePath}/${id}/like`, {
        ...buildAuthRequest(token),
        method: "DELETE",
      }),
    activateReminder: (id, token) =>
      request(`/api/${resourcePath}/${id}/reminder`, {
        ...buildAuthRequest(token),
        method: "POST",
      }),
    deactivateReminder: (id, token) =>
      request(`/api/${resourcePath}/${id}/reminder`, {
        ...buildAuthRequest(token),
        method: "DELETE",
      }),
  };
}
