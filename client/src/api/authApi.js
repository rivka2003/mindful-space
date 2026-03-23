import {
  buildAuthRequest,
  buildJsonAuthRequest,
  buildJsonRequest,
  request,
} from "./httpClient";
import { mapUser } from "../mappers/userMappers";

function mapAuthResponse(data) {
  return {
    token: data.token,
    user: mapUser(data.user),
  };
}

export async function loginUser(credentials) {
  const data = await request(
    "/api/users/login",
    buildJsonRequest("POST", credentials)
  );

  return mapAuthResponse(data);
}

export async function registerUser(payload) {
  const data = await request(
    "/api/users/register",
    buildJsonRequest("POST", payload)
  );

  return mapAuthResponse(data);
}

export async function fetchCurrentUser(token) {
  const data = await request("/api/users/me", buildAuthRequest(token));
  return mapUser(data);
}

export async function fetchFavoriteContent(token) {
  return request("/api/users/favorites", buildAuthRequest(token));
}

export async function fetchUsers(token) {
  const data = await request("/api/users", buildAuthRequest(token));
  return data.map(mapUser);
}

export async function updateUserByAdmin(userId, payload, token) {
  const data = await request(
    `/api/users/${userId}`,
    buildJsonAuthRequest("PUT", payload, token)
  );
  return mapUser(data);
}

export async function deleteUserByAdmin(userId, token) {
  return request(`/api/users/${userId}`, {
    ...buildAuthRequest(token),
    method: "DELETE",
  });
}
