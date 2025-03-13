import ReactDOM from "react-dom";
import CartItem from "./CartItem/CartItem";
import TotalPrice from "./TotalPrice/TotalPrice";
import CloseCart from "./CloseCart/CloseCart";
import { useCart } from "../../contexts/GlobalContexts/CartContext";

export default function CartDisplay() {
  // Problem je sto se nikad ne ulazi u ovaj cart
  const cartContext = useCart();
  if (!cartContext) throw new Error("Cart context is not setup");
  const { isCartOpen } = cartContext;
  console.log(isCartOpen);
  return (
    isCartOpen &&
    ReactDOM.createPortal(
      <aside className="bg-secondary-new cart fixed top-0 right-0 z-100 h-screen w-full sm:w-100">
        <div className="relative mx-auto flex max-w-95 flex-col gap-10 px-8 py-10">
          <CloseCart />
          <CartItem />
          <CartItem />
          <TotalPrice />
        </div>
      </aside>,
      document.body,
    )
  );
}
