import { NavLink } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  return (
    <header className="p-x-horizontal bg-main-color-shade z-5 flex h-21 items-center justify-between gap-4">
      <img
        className="w-40"
        src="/public/Images/logo-no-background.png"
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
