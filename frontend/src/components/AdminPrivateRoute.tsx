import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminPrivateRouteProps {
  children: ReactNode;
}

const AdminPrivateRoute = ({ children }: AdminPrivateRouteProps) => {
  const token = localStorage.getItem("adminToken");
  // You can add more checks (e.g., token expiration) if needed

  return token ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
