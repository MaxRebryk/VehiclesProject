import { httpUser } from "./http";

export const userApi = {
  register: (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ) => {
    return httpUser.post("/auth/register", {
      email,
      name,
      password,
      confirmPassword,
    });
  },

  login: (email: string, password: string) => {
    return httpUser.post("/auth/login", { email, password });
  },
  refresh: (refreshToken: string) => {
    return httpUser.post("/auth/refresh", { refreshToken });
  },
  logout: () => {
    return httpUser.post("auth/logout");
  },

  getAll: () => {
    return httpUser.get("user");
  },
};
