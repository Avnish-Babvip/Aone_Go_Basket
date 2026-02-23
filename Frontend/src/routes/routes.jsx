// -----------------------------------------------Imports---------------------------------------------
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import Maintenance from "../pages/Maintenance";
import Home from "../pages/Home";
import ResetForgotPassword from "../pages/ResetForgotPassword";
import Product from "../pages/Product/Product";
import AboutUs from "../pages/About";
import ContactUs from "../pages/Contact";
import FAQPage from "../pages/FaqPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Checkout from "../pages/Checkout/Checkout";
import MyProfile from "../pages/MyProfile";
import OrderPlaced from "../pages/Checkout/OrderPlaced";
import MyOrders from "../pages/Order/MyOrders";
import OrderDetails from "../pages/Order/OrderDetails";
import Category from "../pages/Category";

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
        path: "products",
        element: <Product />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "checkout/order-placed",
        element: <OrderPlaced />,
      },
      {
        path: "account/my-profile",
        element: <MyProfile />,
      },
      {
        path: "account/order-history",
        element: <MyOrders />,
      },
      {
        path: "account/order-history/:slug",
        element: <OrderDetails />,
      },
      {
        path: "category",
        element: <Product />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
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
