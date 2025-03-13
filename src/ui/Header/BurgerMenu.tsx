import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";
import { useEffect, useRef } from "react";

export default function BurgerMenu() {
  const { dispatch } = useHeader();
  const burgerElement = useRef(null);
  useEffect(
    function sendBurgerNavToGlobal() {
      dispatch({ type: "setBurgerElement", payload: burgerElement });
    },
    [burgerElement],
  );

  return (
    <>
      <Burger />
      <nav
        ref={burgerElement}
        id="burger-nav"
        className="visibility-hidden bg-main-color-shade text-secondary-color pointer-events-none absolute top-[-100%] right-0 left-0 hidden w-screen transition-all duration-300 ease-in-out"
      >
        <ul className="text-secondary-color flex h-full w-full flex-col items-center justify-center gap-3.5 text-2xl">
          <li>
            <NavLink to="/">Pocetna</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Kontakt</NavLink>
          </li>
          <li>
            <NavLink to="/korpa">Korpa</NavLink>
          </li>
          <li>
            <NavLink to="/podesavanja">Podesavanja</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Prijava</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
