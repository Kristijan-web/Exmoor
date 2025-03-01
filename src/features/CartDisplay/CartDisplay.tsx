import ReactDOM from "react-dom";
import CartItem from "./CartItemDisplay/CartItem";
import TotalPrice from "./TotalPrice/TotalPrice";

export default function CartDisplay() {
  return ReactDOM.createPortal(
    <aside className="bg-secondary-new fixed top-0 right-0 z-100 h-screen w-full sm:w-100">
      <div className="mx-auto flex max-w-95 flex-col gap-10 px-8 py-10">
        <CartItem />
        <TotalPrice />
      </div>
    </aside>,
    document.body,
  );
}
