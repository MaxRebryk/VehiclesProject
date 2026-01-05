import axios from "axios";
import { useAuthStore } from "../store/auth-store";

// HTTP instance  User
export const httpUser = axios.create({
  baseURL: "/api/users",
  withCredentials: true,
});

httpUser.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// HTTP instance  Vehicle
export const httpVehicle = axios.create({
  baseURL: "/api/vehicles", //
  withCredentials: true,
});

httpVehicle.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
