import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import UserSettings from "./features/SettingsDisplay/UserSettings/GeneralSettngs/GeneralSettingsDisplay";
import PasswordSetting from "./features/SettingsDisplay/UserSettings/PasswordSettings/PasswordSetting";
import FavoriteProducts from "./features/SettingsDisplay/UserSettings/FavoriteProducts/FavoriteProducts";
import PurchasedProducts from "./features/SettingsDisplay/UserSettings/PurchasedProducts/PurchasedProducts";
import Error from "./ui/Error";


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
          {
            path: "promena-sifre",
            element: <PasswordSetting />,
          },
          {
            path: "omiljeni-proizvodi",
            element: <FavoriteProducts />,
          },
          {
            path: "kupljeni-proizvodi",
            element: <PurchasedProducts />,
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
