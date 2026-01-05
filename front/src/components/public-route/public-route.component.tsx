import { useAuthStore } from "../../store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { accessToken } = useAuthStore();

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
}
