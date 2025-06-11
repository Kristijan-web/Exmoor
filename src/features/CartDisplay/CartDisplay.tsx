import ReactDOM from "react-dom";
import CartItem from "./CartItem/CartItem";
import TotalPrice from "./TotalPrice/TotalPrice";
import CloseCart from "./CloseCart/CloseCart";
import { useEffect } from "react";
import { useCart } from "../../contexts/GlobalContexts/CartContext";

export default function CartDisplay() {
  const { dispatch } = useCart();


    }

    document.addEventListener("click", closeCart);

    return () => {
      document.removeEventListener("click", closeCart);
    };
  }, []);

  return ReactDOM.createPortal(
    <aside className="cart bg-secondary-new fixed top-0 right-0 z-100 h-screen w-full sm:w-100">
      <div className="relative mx-auto flex max-w-95 flex-col gap-10 px-8 py-10">
        <CloseCart />
        <CartItem />
        <CartItem />
        <TotalPrice />
      </div>
    </aside>,
    document.body,
  );
}
