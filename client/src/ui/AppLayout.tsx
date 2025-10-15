import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import CartPage from "../pages/CartPage";
import { useCart } from "../contexts/GlobalContexts/CartContext";
import ScrollToTopOnURLChange from "./ScrollToTopOnURLCange";
import Loader from "./Loader";
import useGetUser from "../hooks/user2/useGetUser";

export default function AppLayout() {
  const { isCartOpen } = useCart();

  // Ovde pozivam react query da dohvati korisinkove podatke

  // iskoristi isLoading da se prikaze spinner na sajtu dok ne stignu podaci
  // ako cu tako ici onda obrisi loader u ProtectedRoute.tsx jer se ovaj pre izvrsava
  const { isLoading, data } = useGetUser();

  if (isLoading) {
    return (
      <div className="absolute top-[50%] left-[50%] translate-[-50%]">
        <Loader size={100} />
      </div>
    );
  }

  console.log("Evo fresh user", data);

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
