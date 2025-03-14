import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";
import { useEffect, useRef } from "react";
import { useCart } from "../../contexts/GlobalContexts/CartContext";

export default function BurgerMenu() {
  const { dispatch } = useHeader();
  const { dispatch: dispatchCart } = useCart();
  const burgerElement = useRef(null);
  useEffect(
    function sendBurgerNavToGlobalForStickyNavigation() {
      dispatch({ type: "setBurgerElement", payload: burgerElement });
    },
    [burgerElement],
  );
  function showCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatchCart({ type: "openCart", payload: true });
  }

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
          <li
            onClick={(e) => showCart(e)}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="flex items-center justify-center text-2xl">
              {/* @ts-expect-error  Typescript doesn't recognize icon as valid jsx element*/}
              <ion-icon name="cart-outline"></ion-icon>
            </span>
            <span>Korpa</span>
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
