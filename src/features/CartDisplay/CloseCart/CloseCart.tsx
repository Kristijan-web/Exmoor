import { useCart } from "../../../contexts/GlobalContexts/CartContext";

export default function CloseCart() {
  const { dispatch } = useCart();

  function handleCloseCart() {
    dispatch({ type: "closeCart", payload: false });
  }

  return (

  );
}
