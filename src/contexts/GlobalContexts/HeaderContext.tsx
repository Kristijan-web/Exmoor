// Purpose of this context:
// - To make navigation show after viewport passed "Intercepting element"

// Used in pages:
// - HomePage -> thumbnail
// - ShopPage -> thumbnail
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useReducer,
} from "react";

type DOMElement = {
  children: ReactNode;
};

type Action =
  | { type: "setInterceptingElement"; payload: HTMLElement | null }
  | { type: "isBurgerOpen"; payload: boolean }
  | { type: "setBurgerElement"; payload: RefObject<HTMLElement | null> | null };

type State = {
  interceptingElement: HTMLElement | null;
  isBurgerMenuOpen: boolean;
  burgerNavElement: RefObject<HTMLElement | null> | null;
};
const initialState: State = {
  interceptingElement: null,
  isBurgerMenuOpen: false,
  burgerNavElement: null,
};

// ovo (null) je pocetna vrednost
const HeaderContext = createContext<{
  interceptingElement: HTMLElement | null;
  dispatch: (action: Action) => void;
  isBurgerMenuOpen: boolean;
  burgerNavElement: RefObject<HTMLElement | null> | null;
} | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setInterceptingElement": {
      return { ...state, interceptingElement: action.payload };
    }
    case "isBurgerOpen": {
      return { ...state, isBurgerMenuOpen: action.payload };
    }
    case "setBurgerElement": {
      return { ...state, burgerNavElement: action.payload };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [
    { interceptingElement, isBurgerMenuOpen, burgerNavElement },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <HeaderContext.Provider
      value={{
        interceptingElement,
        dispatch,
        isBurgerMenuOpen,
        burgerNavElement,
      }}
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
