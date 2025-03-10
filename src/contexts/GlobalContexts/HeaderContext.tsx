// Ovaj context se koristi na stranicama kojima je potreban navigation sticky, to jest kad se izadje iz elementa prikazuje se navigacija
import { createContext, ReactNode, useContext, useReducer } from "react";

type DOMElement = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: HTMLElement | null;
};

type State = {
  interceptingElement: HTMLElement | null;
};
const initialState: State = {
  interceptingElement: null,
};

// ovo (null) je pocetna vrednost
const HeaderContext = createContext<{
  interceptingElement: HTMLElement | null;
  dispatch: (action: Action) => void;
} | null>(null);

// kada se prosledjue action to je obicno objekat koji sadrzi 2 property-a. payload i type
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setinterceptingElement": {
      return { ...state, interceptingElement: action.payload };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [{ interceptingElement }, dispatch] = useReducer(reducer, initialState);
  return (
    <HeaderContext.Provider value={{ interceptingElement, dispatch }}>
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
