import { useCart } from "../contexts/GlobalContexts/CartContext";
// Used in components
// SAD IZOBRISI SVE OVO DOLE I KORISTI CONTEXT OBICAN BEZ HOOK-As
// Dispatch:
// - Header.tsx
export default function useCartData() {
  const cartContext = useCart();
  if (!cartContext) throw new Error("Cart context is not setup correctly");
  return cartContext;
}
