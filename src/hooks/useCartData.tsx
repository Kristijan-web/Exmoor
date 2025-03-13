import { useCart } from "../contexts/GlobalContexts/CartContext";
// Used in components
// Dispatch:
// - AppLayout.tsx
// - closeCart.tsx
export default function useCartData() {
  const cartContext = useCart();
  if (!cartContext) throw new Error("Cart context is not setup correctly");
  return cartContext;
}
