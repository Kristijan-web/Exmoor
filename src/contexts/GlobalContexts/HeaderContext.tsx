// Used in pages:
// - HomePage -> thumbnail
// - ShopPage -> thumbnail
import { createContext, ReactNode, useContext, useReducer } from "react";

type DOMElement = {
  children: ReactNode;
};

type Action =
  | { type: "setInterceptingElement"; payload: HTMLElement | null }
  | { type: "isBurgerOpen"; payload: boolean };

type State = {
  interceptingElement: HTMLElement | null;
  isBurgerMenuOpen: boolean;
};
const initialState: State = {
  interceptingElement: null,
  isBurgerMenuOpen: false,
};

// ovo (null) je pocetna vrednost
const HeaderContext = createContext<{
  interceptingElement: HTMLElement | null;
  dispatch: (action: Action) => void;
  isBurgerMenuOpen: boolean;
} | null>(null);

// kada se prosledjue action to je obicno objekat koji sadrzi 2 property-a. payload i type
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setInterceptingElement": {
      return { ...state, interceptingElement: action.payload };
    }
    case "isBurgerOpen": {
      return { ...state, isBurgerMenuOpen: !state.isBurgerMenuOpen };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [{ interceptingElement, isBurgerMenuOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <HeaderContext.Provider
      value={{ interceptingElement, dispatch, isBurgerMenuOpen }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const headerData = useContext(HeaderContext);
  if (headerData === undefined) {
    throw new Error("Componenta nije pretplacena na context");
  }
  return headerData;
}
