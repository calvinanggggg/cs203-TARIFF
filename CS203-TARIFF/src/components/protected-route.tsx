import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * A wrapper component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated
 */
export function ProtectedRoute({ 
  redirectPath = "/login" 
}: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}