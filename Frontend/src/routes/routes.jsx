// -----------------------------------------------Imports---------------------------------------------
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import Maintenance from "../pages/Maintenance";
import Home from "../pages/Home";
import ResetForgotPassword from "../pages/ResetForgotPassword";
import ProductsPage from "../../components/pages/Products/Index";
import Product from "../pages/Product/Product";

// Lazy Loading 😴
// const Blog = lazy(() => import("../pages/Blog"));

// ---------------------------------------------------------------------------------------------------
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // 👈 THIS IS THE KEY
        element: <Home />,
      },
      {
        path: "index", // 👈 THIS IS THE KEY
        element: <ProductsPage />,
      },
      {
        path: "products", //
        element: <Product />,
      },
      {
        path: "customer/reset-password",
        element: <ResetForgotPassword />,
      },
    ],
  },
]);

export const maintenanceAppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Maintenance />,
  },
]);
