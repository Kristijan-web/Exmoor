import { useCart } from "../../../contexts/GlobalContexts/CartContext";

export default function CloseCart() {
  const { dispatch } = useCart();

  function handleCloseCart() {}

  return (
    <div
      onClick={handleCloseCart}
      className="absolute top-5 right-4 cursor-pointer"
    >
      &#10006;
    </div>
  );
}
