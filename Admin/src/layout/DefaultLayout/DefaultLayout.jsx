import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.authentication);

  // If already logged in, redirect away from login pages
  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default DefaultLayout;
