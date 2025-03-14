// Purpose of this context:
// - To make navigation show after viewport passed "Intercepting element"

// Used in pages:
// - HomePage -> thumbnail
// - ShopPage -> thumbnail
// - Header.tsx

import { createContext, ReactNode, useContext, useReducer } from "react";

type DOMElement = {
  children: ReactNode;
};

type Action = { type: "setInterceptingElement"; payload: HTMLElement | null };

type State = {
  interceptingElement: HTMLElement | null;
};
const initialState: State = {
  interceptingElement: null,
};

const HeaderContext = createContext<{
  interceptingElement: HTMLElement | null;
  dispatch: (action: Action) => void;
} | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setInterceptingElement": {
      return { ...state, interceptingElement: action.payload };
    }
    default:
      return state;
  }
}
export default function HeaderProvider({ children }: DOMElement) {
  const [{ interceptingElement }, dispatch] = useReducer(reducer, initialState);
  return (
    <HeaderContext.Provider
      value={{
        interceptingElement,
        dispatch,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const headerData = useContext(HeaderContext);
  if (headerData === undefined || headerData === null) {
    throw new Error("Header context not setup correctly");
  }
  return headerData;
}
