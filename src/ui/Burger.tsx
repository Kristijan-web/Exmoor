import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHeader } from "../contexts/GlobalContexts/HeaderContext";

export default function Burger() {
  // Pri promeni stranice resetuje se css za burger navigaciju kako bi se samo pokazao logo i burger
  const headerContext = useHeader();
  if (!headerContext) {
    throw new Error("Context nije prikljucen");
  }
  const { dispatch } = headerContext;
  const URL = useLocation();
  useEffect(
    function resetNavBurgerCSS() {
      const burgerNav = document.querySelector("#burger-nav");
      if (!burgerNav) {
        throw new Error("Burger nav doesn't eixst");
      }
      const hideBurger = [
        "top-[-100%]",
        "pointer-events-none",
        "visibility-hidden",
        "hidden",
      ];
      dispatch({ type: "toggleBurgerMenu", payload: false });
      document.body.style.overflow = "";
      burgerNav.classList.add(...hideBurger);
    },
    [URL.pathname],
  );
  // end

  function createBurgerIDOnburgerNavElement() {
    const navElement = document.querySelector("nav");
    if (navElement === null) {
      console.error("Failed to create nav");
      return;
    }
    navElement.id = "burger-nav";
    return document.querySelector("#burger-nav");
  }

  // funkcija ispod pokrece ostale
  function handleBurgerClick() {
    const burgerNav = document.querySelector("#burger-nav");

    if (!burgerNav) {
      return createBurgerIDOnburgerNavElement();
    }

    const isBurgerHidden = burgerNav?.classList.contains("top-[-100%]");
    const hideBurger = [
      "top-[-100%]",
      "pointer-events-none",
      "visibility-hidden",
      "hidden",
    ];
    const showBurger = [
      "top-21",
      "bottom-0",
      "pointer-events-auto",
      "visibility:visible",
      "fixed",
    ];

    if (isBurgerHidden) {
      if (burgerNav === null) {
        console.error("burgerNav element ne postoji");
        return;
      }
      dispatch({ type: "toggleBurgerMenu", payload: false });

      document.body.style.overflow = "hidden";
      burgerNav.classList.remove(...hideBurger);
      burgerNav.classList.add(...showBurger);
    } else {
      if (burgerNav === null) {
        console.error("burgerNav element ne postoji");
        return;
      }
      dispatch({ type: "toggleBurgerMenu", payload: true });

      document.body.style.overflow = "";
      burgerNav.classList.remove(...showBurger);
      burgerNav.classList.add(...hideBurger);
    }
  }

  return (
    <span
      onClick={() => handleBurgerClick()}
      className="text-secondary-color z-5 cursor-pointer sm:hidden"
    >
      {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
      <ion-icon name="menu-outline" size="large"></ion-icon>
    </span>
  );
}
