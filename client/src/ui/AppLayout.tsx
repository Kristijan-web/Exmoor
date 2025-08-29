import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import CartPage from "../pages/CartPage";
import { useCart } from "../contexts/GlobalContexts/CartContext";
import ScrollToTopOnURLChange from "./ScrollToTopOnURLCange";

export default function AppLayout() {
  const { isCartOpen } = useCart();

  return (
    <>
      <ScrollToTopOnURLChange />
      {isCartOpen && <CartPage />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
