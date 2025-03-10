import { NavLink } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import { useHeader } from "../contexts/GlobalContexts/HeaderContext";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const headerContext = useHeader();
  const headerElement = useRef(null);
  const [intersecting, setIntersecting] = useState(true);

  if (!headerContext) {
    throw new Error("Nije povezan context u root-u");
  }

  const { interceptingElement } = headerContext;

  useEffect(
    function checkForIntersecting() {
      if (interceptingElement) {
        function intersection(entries: IntersectionObserverEntry[]): void {
          if (!entries[0].isIntersecting) {
            console.log("test");
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/korpa">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/podesavanja">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        </ul>
      </nav>
      <BurgerMenu />
    </header>
  );
}
