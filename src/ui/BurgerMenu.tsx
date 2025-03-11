import { NavLink } from "react-router-dom";
import Burger from "./Burger";

export default function BurgerMenu() {
  // Napravi da svaki put kada se stranica promeni da se restartuju klase na header-u
  // Mozda ovo moze koriscenjem useNavigaiton i useEffect-a

  return (
    <>
      <Burger />
      <nav
        id="burger-nav"
        className="visibility-hidden bg-main-color-shade text-secondary-color pointer-events-none absolute top-[-100%] right-0 left-0 hidden w-screen transition-all duration-300 ease-in-out"
      >
        <ul className="text-secondary-color flex h-full w-full flex-col items-center justify-center gap-3.5 text-2xl">
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
    </>
  );
}
