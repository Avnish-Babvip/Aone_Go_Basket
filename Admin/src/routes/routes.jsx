import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import AdminDefaultLayout from "../layout/DefaultLayout/AdminDefaultLayout";
import Login from "../pages/Authentication/Login";
import LoginOTP from "../pages/Authentication/LoginOTP";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { NotFound } from "../pages/NotFound";
import ResetPassword from "../pages/Authentication/ResetPassword";
import AdminUser from "../pages/AdminUser/AdminUser";
import Customer from "../pages/Customer/Customer";
import Role from "../pages/Role/Role";
import Permission from "../pages/Permission/Permission";
import RolePermission from "../pages/Role/RolePermission";
import Category from "../pages/Category/Category";
import Attribute from "../pages/Attribute/Attribute";
import SubCategory from "../pages/Category/SubCategory";
import AttributeValue from "../pages/Attribute/AttributeValue";
import Product from "../pages/Product/Product";
import AddBulkProduct from "../pages/Product/AddBulkProduct";
import AddZipImages from "../pages/Product/AddZipImages";
import Rider from "../pages/Rider/Rider";
import RiderReferral from "../pages/Rider/RiderReferral";
import Order from "../pages/Order/Order";

export const appRouter = createBrowserRouter([
  /* ---------------- PUBLIC ROUTES ---------------- */
  {
    path: "/",
    element: <DefaultLayout />, // Public layout
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "/login-otp", element: <LoginOTP /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/admin/reset-password/", element: <ResetPassword /> },
    ],
  },

  /* ---------------- PROTECTED ROUTES ---------------- */
  {
    path: "/admin",
    element: <AdminDefaultLayout />, // Protected layout
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "user", element: <AdminUser /> },
      { path: "customer", element: <Customer /> },
      { path: "role", element: <Role /> },
      { path: "permission", element: <Permission /> },
      { path: "role/:id", element: <RolePermission /> },
      { path: "category", element: <Category /> },
      { path: "category/:id", element: <SubCategory /> },
      { path: "attribute", element: <Attribute /> },
      { path: "attribute/:id", element: <AttributeValue /> },
      { path: "product", element: <Product /> },
      { path: "product/bulk-products", element: <AddBulkProduct /> },
      { path: "product/bulk-images", element: <AddZipImages /> },
      { path: "order", element: <Order /> },
      { path: "rider", element: <Rider /> },
      { path: "rider/referral", element: <RiderReferral /> },
    ],
  },

  /* ---------------- FALLBACK ---------------- */
  {
    path: "*",
    element: <NotFound />,
  },
]);
