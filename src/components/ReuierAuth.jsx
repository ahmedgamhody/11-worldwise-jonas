import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function RequirAuth() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
