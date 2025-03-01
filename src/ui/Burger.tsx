export default function Burger() {
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
    ];
    const showBurger = [
      "top-21",
      "bottom-0",
      "pointer-events-auto",
      "visibility:visible",
    ];

    if (isBurgerHidden) {
      if (burgerNav === null) {
        console.error("burgerNav element ne postoji");
        return;
      }
      burgerNav.classList.remove(...hideBurger);
      burgerNav.classList.add(...showBurger);
    } else {
      if (burgerNav === null) {
        console.error("burgerNav element ne postoji");
        return;
      }
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
