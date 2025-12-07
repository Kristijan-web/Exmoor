import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import UserSettings from "./features/SettingsDisplay/UserSettings/GeneralSettngs/GeneralSettingsDisplay";
import PasswordSetting from "./features/SettingsDisplay/UserSettings/PasswordSettings/PasswordSetting";
import FavoriteProducts from "./features/SettingsDisplay/UserSettings/FavoriteProducts/FavoriteProducts";
import PurchasedProducts from "./features/SettingsDisplay/UserSettings/PurchasedProducts/PurchasedProducts";
import Error from "./ui/Error";
import Redirect from "./ui/Redirect";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import PageNotFound from "./pages/PageNotFound";
import DisplayProducts from "./features/AdminDisplay/AdminPanels/ProductsPanel/DisplayProducts";
import AddProduct from "./features/AdminDisplay/AdminPanels/ProductsPanel/AddProduct";
import EditProduct from "./features/AdminDisplay/AdminPanels/ProductsPanel/EditProduct";

// Nakon logovanja/signup-a ne bi trebalo da moze ponovo da se pristupi tim stranicama
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
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
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="proizvodi" replace />,
          },
          {
            path: "proizvodi",
            children: [
              {
                index: true,
                element: <Navigate to="svi-proizvodi" replace />,
              },
              {
                path: "svi-proizvodi",
                element: <DisplayProducts />,
              },
              {
                path: "dodaj-proizvod",
                element: <AddProduct />,
              },
              {
                path: "izmeni-proizvod/:id",
                element: <EditProduct />,
              },
            ],
          },
        ],
      },
      {
        path: "/podesavanja",
        element: (
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <SettingsPage />
          </ProtectedRoute>
        ),
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
        // ovde nastaje greska jer pokusavam da pozovem /me endpoint ali nemam httpOnly cookie sa JWT-om
        path: "/prijava",
        element: (
          <Redirect>
            <SignUpPage />
          </Redirect>
        ),
      },
      {
        path: "/zaboravljena-sifra",
        element: (
          <Redirect>
            <ForgotPasswordPage />
          </Redirect>
        ),
      },
      {
        path: "/nova-sifra/:token",
        element: (
          <Redirect>
            <NewPasswordPage />
          </Redirect>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
