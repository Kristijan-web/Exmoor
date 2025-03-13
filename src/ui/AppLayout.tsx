import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import { useCart } from "../contexts/GlobalContexts/CartContext";
import CartPage from "../pages/CartPage";

export default function AppLayout() {
  const cartContext = useCart();
  if (!cartContext) throw new Error("Cart context is not setup correctly");
  const { isCartOpen } = cartContext;

  return (
    <>
      {isCartOpen && <CartPage />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
