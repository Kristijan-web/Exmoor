import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { useCart } from "../../contexts/GlobalContexts/CartContext";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import useGetUser from "../../hooks/user/useGetUser";
import useCatchAsync from "../../utills/useCatchAsync";
import { API_URL } from "../../utills/constants";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { interceptingElement } = useHeader();
  const { dispatch } = useCart();
  const headerElement = useRef(null);
  const [intersecting, setIntersecting] = useState<boolean>(true);
  const { data } = useGetUser();
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  function showCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dispatch({ type: "openCart", payload: true });
  }

  const handleLogout = useCatchAsync(async (signal) => {
    // mora neki loader dok je logout otkud on zna da to nije instant
    // moram ovako jer nmg ja da obrisem u frontu httpOnly Cookie
    await fetch(`${API_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include",
      signal,
    });

    queryClient.removeQueries({ queryKey: ["user"] });
  }, setLoading);

  useEffect(
    function displayToasterWhenLoggingOut() {
      const toastId = "boolean-toast";

      if (loading) {
        toast.loading("Odjava u toku...", { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    },
    [loading],
  );

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
      <nav className="hidden md:block">
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
              <IoCartOutline />
            </span>
            <span>Korpa</span>
          </li>
          {/* ======================== */}
          {data ? (
            <>
              <li>
                <NavLink to="/podesavanja">Podešavanja</NavLink>
              </li>
              <li className="cursor-pointer" onClick={() => handleLogout()}>
                <p>Logout</p>
              </li>
            </>
          ) : (
            <li className="cursor-pointer">
              <NavLink to="/prijava" className="flex items-end gap-2">
                <span className="flex items-center justify-center text-xl">
                  <FaRegUser />
                </span>
                <span>Prijava</span>
              </NavLink>
            </li>
          )}
          {/* ======================= */}
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </ul>
      </nav>
      <BurgerMenu />
    </header>
  );
}
