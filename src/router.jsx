import AppLayout from "./ui/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter({
  element: <AppLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/shop",
      element: <ShopPage />,
    },
    {
      path: "/shop/:id",
      element: <ProductDetailsPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
});

export default router;
