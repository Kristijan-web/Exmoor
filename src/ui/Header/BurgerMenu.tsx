import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import { useRef, useState } from "react";
import { useCart } from "../../contexts/GlobalContexts/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function BurgerMenu() {
  const { dispatch: dispatchCart } = useCart();
  const [showBurgerIcon, setShowBurgerIcon] = useState(true);
  const burgerNav = useRef<HTMLElement | null>(null);

  function showCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatchCart({ type: "openCart", payload: true });
  }

  function closeBurgerNav() {
    const hideBurgerTailwind = [
      "top-[-100%]",
      "pointer-events-none",
      "visibility-hidden",
      "hidden",
    ];
    if (burgerNav) {
      burgerNav?.current?.classList?.add(...hideBurgerTailwind);
      document.body.style.overflow = ""; // enables page scroller
      setShowBurgerIcon(true);
    }
  }

  return (
    <>
      <Burger
        burgerNav={burgerNav}
        showBurgerIcon={showBurgerIcon}
        setShowBurgerIcon={setShowBurgerIcon}
      />
      <nav
        ref={burgerNav}
        id="burger-nav"
        className="visibility-hidden bg-main-color-shade text-secondary-color pointer-events-none absolute top-[-100%] right-0 left-0 z-100 hidden w-screen"
      >
        <ul className="text-secondary-color flex h-full w-full flex-col items-center justify-center gap-3.5 text-2xl">
          <li onClick={closeBurgerNav}>
            <NavLink to="/">Početna</NavLink>
          </li>
          <li onClick={closeBurgerNav}>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li onClick={closeBurgerNav}>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </li>
          <li
            onClick={(e) => showCart(e)}
            className="flex cursor-pointer items-center gap-2"
          >
            <span className="flex items-center justify-center text-2xl">
              <IoCartOutline />
            </span>
            <span>Korpa</span>
          </li>
          <li
            onClick={() => {
              closeBurgerNav();
            }}
          >
            <NavLink to="/podesavanja">Podešavanja</NavLink>
          </li>
          <li onClick={closeBurgerNav}>
            <NavLink className="flex items-center gap-2" to="/prijava">
              <span>
                <FaRegUser className="text-xl" />
              </span>
              <span>Prijava</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
