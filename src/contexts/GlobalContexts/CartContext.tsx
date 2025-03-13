import { createContext, ReactNode, useContext, useReducer } from "react";

type Props = {
  children: ReactNode;
};
type State = {
  isCartOpen: boolean;
};
type Action =
  | {
      type: "openCart";
      payload: boolean;
    }
  | { type: "closeCart"; payload: boolean };

const CartContext = createContext<{
  isCartOpen: boolean;
  dispatch: (action: Action) => void;
} | null>(null); // last null makes sure to tell me that i have not wrapped component in provider, second to last null makes me check for existance of provider data in each component

const initialState: State = {
  isCartOpen: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "openCart": {
      return { ...state, isCartOpen: true };
    }
    case "closeCart": {
      return { ...state, isCartOpen: false };
    }
    default:
      return state;
  }
}
export default function CartProvider({ children }: Props) {
  const [{ isCartOpen }, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ isCartOpen, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const x = useContext(CartContext);
  if (x === undefined) throw new Error("Context is not setup correctly");
  return x;
}
