// Ovaj context se koristi na stranicama kojima je potreban navigation sticky, to jest kad se izadje iz elementa prikazuje se navigacija
import { createContext, ReactNode, useContext, useReducer } from "react";

type DOMElement = {
  children: ReactNode;
};

type Action =
  | { type: "setInterceptingElement"; payload: HTMLElement | null }
  | { type: "toggleBurgerMenu"; payload: boolean };

type State = {
  interceptingElement: HTMLElement | null;
  isBurgerMenuActive: boolean;
};
const initialState: State = {
  interceptingElement: null,
  isBurgerMenuActive: false,
};

// ovo (null) je pocetna vrednost
const HeaderContext = createContext<{
  interceptingElement: HTMLElement | null;
  dispatch: (action: Action) => void;
  isBurgerMenuActive: boolean;
} | null>(null);

// kada se prosledjue action to je obicno objekat koji sadrzi 2 property-a. payload i type
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setInterceptingElement": {
      return { ...state, interceptingElement: action.payload };
    }
    case "toggleBurgerMenu": {
      return { ...state, isBurgerMenuActive: !state.isBurgerMenuActive };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [{ interceptingElement, isBurgerMenuActive }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <HeaderContext.Provider
      value={{ interceptingElement, dispatch, isBurgerMenuActive }}
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
