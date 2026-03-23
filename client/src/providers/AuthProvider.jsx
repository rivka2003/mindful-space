import { createContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, loginUser, registerUser } from "../api/authApi";

const AUTH_STORAGE_KEY = "mindful-space-auth";

export const AuthContext = createContext(null);

function getStoredAuth() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return { token: null, user: null };
    }

    return JSON.parse(rawValue);
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => getStoredAuth());
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(authState.token));

  useEffect(() => {
    if (!authState.token) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsBootstrapping(false);
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapUser() {
      if (!authState.token) {
        return;
      }

      try {
        const user = await fetchCurrentUser(authState.token);

        if (isMounted) {
          setAuthState((currentState) => ({
            ...currentState,
            user,
          }));
        }
      } catch {
        if (isMounted) {
          setAuthState({ token: null, user: null });
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrapUser();

    return () => {
      isMounted = false;
    };
  }, [authState.token]);

  async function refreshUser() {
    if (!authState.token) {
      return null;
    }

    const user = await fetchCurrentUser(authState.token);
    setAuthState((currentState) => ({
      ...currentState,
      user,
    }));

    return user;
  }

  async function login(credentials) {
    const result = await loginUser(credentials);
    setAuthState(result);
    const user = await fetchCurrentUser(result.token);
    const nextState = { token: result.token, user };
    setAuthState(nextState);
    return nextState;
  }

  async function register(payload) {
    const result = await registerUser(payload);
    setAuthState(result);
    const user = await fetchCurrentUser(result.token);
    const nextState = { token: result.token, user };
    setAuthState(nextState);
    return nextState;
  }

  function logout() {
    setAuthState({ token: null, user: null });
  }

  const value = useMemo(
    () => ({
      token: authState.token,
      user: authState.user,
      isAuthenticated: Boolean(authState.token),
      isAdmin: authState.user?.role === "admin",
      isBootstrapping,
      login,
      register,
      refreshUser,
      logout,
    }),
    [authState, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
