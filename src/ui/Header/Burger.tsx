type Props = {
  burgerNav: React.RefObject<HTMLElement | null> | null;
};
export default function Burger({ burgerNav }: Props) {
  function handleBurgerClick() {
    console.log("hello");
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
      document.body.style.overflow = "hidden"; // Disables page scroller
      burgerNav?.current?.classList?.remove(...hideBurgerTailwind);
      burgerNav?.current?.classList.add(...showBurgerTailwind);
    } else {
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
      {/* @ts-expect-error  Doesn't recognize icon as valid jsx element*/}
      <ion-icon name="menu-outline" size="large"></ion-icon>
    </span>
  );
}
