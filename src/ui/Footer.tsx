import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/GlobalContexts/CartContext";
import { FaRegUser } from "react-icons/fa";
import {
  IoCartOutline,
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoYoutube,
  IoMailOutline,
} from "react-icons/io5";

export default function Footer() {
  const { dispatch } = useCart();
  function showCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch({ type: "openCart", payload: true });
  }

  return (
    <footer className="bg-main-color-shade">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-start justify-items-center gap-10 p-15">
        <div className="text-secondary-color col-span-full justify-self-start sm:col-start-1 sm:col-end-6 md:col-start-1 md:col-end-4">
          <h4 className="mb-4 text-2xl font-semibold">Popularni linkovi</h4>
          <nav>
            <ul className="flex flex-col gap-4 text-xl">
              <li>
                <NavLink to="/">Početna</NavLink>
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
                  <IoCartOutline />
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
        </div>
        <div className="text-secondary-color col-span-full flex flex-col gap-4 justify-self-start text-xl sm:col-start-6 sm:col-end-13 md:col-start-4 md:col-end-9">
          <h4 className="text-2xl font-semibold">Kontak</h4>
          <address className="w-50 sm:w-full">
            <p className="break-words">Zdravka Čelara 1, Novi grad, Beograd</p>
          </address>
          <a className="block" href="tel:111-222-333">
            +111 222-333
          </a>
          <a className="block" href="mailto:kristijanstojanovic8@gmail.com">
            exmoor23@gmail.com
          </a>
          <p>RSS & SITEMAP</p>
        </div>
        <div className="col-span-full justify-self-start md:col-start-9 md:col-end-13">
          <h4 className="text-secondary-color mb-4 text-2xl font-semibold">
            Društvene mreže
          </h4>
          <div className="text-secondary-color flex gap-6 text-4xl">
            <IoLogoInstagram />
            <IoMailOutline />
            <IoLogoYoutube />
            <IoLogoGithub />
          </div>
        </div>
      </div>
      <div className="px-15">
        <p className="text-secondary-color text-center">
          Privacy | Terms & Conditions | Contact Copyright © 2025 All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
