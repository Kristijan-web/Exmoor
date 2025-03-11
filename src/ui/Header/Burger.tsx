import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";

export default function Burger() {
  // Pri promeni stranice resetuje se css za burger navigaciju kako bi se samo pokazao logo i burger
  const headerContext = useHeader();
  if (!headerContext) {
    throw new Error("Context nije prikljucen");
  }
  const { dispatch } = headerContext;
  const URL = useLocation();
  useEffect(
    function resetNavBurgerCssOnURLChange() {
      const burgerNav = document.querySelector("#burger-nav");
      if (!burgerNav) {
        throw new Error("Burger nav doesn't eixst");
      }
      const hideBurgerTailwind = [
        "top-[-100%]",
        "pointer-events-none",
        "visibility-hidden",
        "hidden",
      ];
      dispatch({ type: "isBurgerOpen", payload: false });
      document.body.style.overflow = "";
      burgerNav.classList.add(...hideBurgerTailwind);
    },
    [URL.pathname],
  );
  // end

  // funkcija ispod pokrece ostale
  function handleBurgerClick() {
    const burgerNav = document.querySelector("#burger-nav");

    if (!burgerNav) {
      throw new Error("There is no navigation with burger-nav id");
    }

    const hideBurgerTailwind = [
      "top-[-100%]",
      "pointer-events-none",
      "visibility-hidden",
      "hidden",
    ];
    const showBurgerTailwind = [
      "top-21",
      "bottom-0",
      "pointer-events-auto",
      "visibility:visible",
      "fixed",
    ];

    const isBurgerHidden = burgerNav?.classList.contains("top-[-100%]");

    if (isBurgerHidden) {
      // zasta bese koristim ovaj dispatch
      dispatch({ type: "isBurgerOpen", payload: true });
      document.body.style.overflow = "hidden";
      burgerNav.classList.remove(...hideBurgerTailwind);
      burgerNav.classList.add(...showBurgerTailwind);
    } else {
      dispatch({ type: "isBurgerOpen", payload: false });
      document.body.style.overflow = "";
      burgerNav.classList.remove(...showBurgerTailwind);
      burgerNav.classList.add(...hideBurgerTailwind);
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
