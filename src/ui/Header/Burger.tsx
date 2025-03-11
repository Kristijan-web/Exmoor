import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHeader } from "../../contexts/GlobalContexts/HeaderContext";

export default function Burger() {
  const URL = useLocation();
  const headerContext =
    useHeader() ||
    (function () {
      throw new Error("Context doesn't exist");
    })();
  const { dispatch, burgerNavElement: burgerNav } = headerContext;

  useEffect(
    function resetNavBurgerCssOnURLChange() {
      if (burgerNav) {
        const hideBurgerTailwind = [
          "top-[-100%]",
          "pointer-events-none",
          "visibility-hidden",
          "hidden",
        ];
        console.log("EEE");
        dispatch({ type: "isBurgerOpen", payload: false });
        document.body.style.overflow = ""; // Enables page scroller
        burgerNav?.current?.classList.add(...hideBurgerTailwind);
      }
    },
    [URL.pathname],
  );

  function handleBurgerClick() {
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

    const isBurgerHidden =
      burgerNav?.current?.classList.contains("top-[-100%]");

    if (isBurgerHidden) {
      dispatch({ type: "isBurgerOpen", payload: true });
      document.body.style.overflow = "hidden"; // Disables page scroller
      burgerNav?.current?.classList.remove(...hideBurgerTailwind);
      burgerNav?.current?.classList.add(...showBurgerTailwind);
    } else {
      dispatch({ type: "isBurgerOpen", payload: false });
      document.body.style.overflow = ""; // Enables page scroller
      burgerNav?.current?.classList.remove(...showBurgerTailwind);
      burgerNav?.current?.classList.add(...hideBurgerTailwind);
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
