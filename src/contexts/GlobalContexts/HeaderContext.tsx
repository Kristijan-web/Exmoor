// Ovaj context se koristi na stranicama kojima je potreban navigation sticky, to jest kad se izadje iz elementa prikazuje se navigacija
import { createContext, ReactNode, useReducer } from "react";

// ovo (null) je pocetna vrednost
const HeaderContext = createContext<{
  observer: HTMLElement | null;
  dispatch: (action: Action) => void;
} | null>(null);

type DOMElement = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: HTMLElement | null;
};

type State = {
  observer: HTMLElement | null;
};
const initialState = {
  observer: null,
};
// kada se prosledjue action to je obicno objekat koji sadrzi 2 property-a. payload i type
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setObserver": {
      return { ...state, observer: action.payload };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [{ observer }, dispatch] = useReducer(reducer, initialState);
  return (
    <HeaderContext.Provider value={{ observer, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
}
