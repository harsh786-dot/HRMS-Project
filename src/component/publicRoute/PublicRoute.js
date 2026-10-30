import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated =
    sessionStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};

export default PublicRoute;