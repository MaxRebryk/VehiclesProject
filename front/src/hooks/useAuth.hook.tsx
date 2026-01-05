import { userApi } from "../api/user.api";
import { useAuthStore } from "../store/auth-store";
import { useCallback } from "react";

export function useAuth() {
  const { setAuth, clearAuth, accessToken, refreshToken } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await userApi.login(email, password);
      setAuth({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        user: data.user,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const refresh = async () => {
    if (!refreshToken) {
      clearAuth();
      return null;
    }
    try {
      const { data } = await userApi.refresh(refreshToken);
      const currentUser = useAuthStore.getState().user;
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: currentUser!,
      });
      return data.accessToken;
    } catch (error) {
      clearAuth();
      return null;
    }
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const { data } = await userApi.register(
        email,
        name,
        password,
        confirmPassword
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      clearAuth();
    }
  };

  const authorizedRequest = useCallback(
    async <T,>(request: (token: string) => Promise<T>) => {
      if (!accessToken) {
        const newToken = await refresh();
        if (!newToken) throw new Error("Unauthorized");
        return request(newToken);
      }

      try {
        return await request(accessToken);
      } catch (err: any) {
        if (err.response?.status === 401) {
          const newToken = await refresh();
          if (!newToken) throw err;
          return request(newToken);
        }
        throw err;
      }
    },
    [accessToken]
  );

  return {
    login,
    register,
    logout,
    refresh,
    authorizedRequest,
  };
}
