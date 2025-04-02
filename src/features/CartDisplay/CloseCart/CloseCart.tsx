import { useCart } from "../../../contexts/GlobalContexts/CartContext";

export default function CloseCart() {
  const { dispatch } = useCart();

  function handleCloseCart() {
    const cartSection = document.querySelector(".cartt");
    if (!cartSection) {
      throw new Error("Section element does not exist");
    }
    const hideCart = [
      "translate-x-[100%]",
      "transition-all",
      "duration-[0.3s]",
    ];

    cartSection?.classList.add(...hideCart);
    dispatch({ type: "closeCart", payload: false });
  }

  return (
    <div
      onClick={handleCloseCart}
      className="absolute top-5 right-4 cursor-pointer"
    >
      &#10006;
    </div>
  );
}
