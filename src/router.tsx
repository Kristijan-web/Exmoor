import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import UserSettings from "./features/SettingsDisplay/UserSettings/UserSettings";

const router = createBrowserRouter([
  {
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
        path: "/kontakt",
        element: <ContactPage />,
      },
      {
        path: "/podesavanja",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="postavke" replace />,
          },
          {
            path: "postavke",
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/prijava",
        element: <SignUpPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
