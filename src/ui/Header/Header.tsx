import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { useCart } from "../../contexts/GlobalContexts/CartContext";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const { interceptingElement } = useHeader();
  const { dispatch } = useCart();
  const headerElement = useRef(null);
  const [intersecting, setIntersecting] = useState(true);

  function showCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch({ type: "openCart", payload: true });
  }

  useEffect(
    function checkForStickyNavigation() {
      if (interceptingElement) {
        function intersection(entries: IntersectionObserverEntry[]): void {
          if (!entries[0].isIntersecting) {
            setIntersecting(() => false);
          } else {
            setIntersecting(() => true);
          }
        }
        const obsOptions = {
          root: null,
          threshold: 0,
          rootMargin: "-84px",
        };
        const observer = new IntersectionObserver(intersection, obsOptions);
        observer.observe(interceptingElement);
      }
    },
    [interceptingElement],
  );

  return (
    <header
      ref={headerElement}
      className={`${!intersecting && "sticky top-0"} p-x-horizontal bg-main-color-shade z-5 flex h-21 items-center justify-between gap-4`}
    >
      <img
        className="w-40"
        src="/Images/logo-no-background.png"
        alt="exmoor logo"
      />
      <nav className="hidden sm:block">
        <ul className="text-secondary-color flex items-center gap-8">
          <li>
            <NavLink to="/">Početna</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt">Kontakt</NavLink>
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
            <NavLink to="/podesavanja">Podešavanja</NavLink>
          </li>
          <li className="flex cursor-pointer items-center gap-2">
            <span className="flex items-center justify-center text-xl">
              <FaRegUser />
            </span>
            <NavLink to="/prijava">Prijava</NavLink>
          </li>
        </ul>
      </nav>
      <BurgerMenu />
    </header>
  );
}
