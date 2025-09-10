import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import CartPage from "../pages/CartPage";
import { useCart } from "../contexts/GlobalContexts/CartContext";
import ScrollToTopOnURLChange from "./ScrollToTopOnURLCange";
import { useQuery } from "@tanstack/react-query";
import getUser from "../services/User/getUser";

export default function AppLayout() {
  const { isCartOpen } = useCart();

  // Ovde pozivam react query da dohvati korisinkove podatke

  // iskoristi isLoading da se prikaze spinner na sajtu dok ne stignu podaci
  // ako cu tako ici onda obrisi loader u ProtectedRoute.tsx jer se ovaj pre izvrsava
  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
