import { IoClose, IoMenuOutline } from "react-icons/io5";

type Props = {
  burgerNav: React.RefObject<HTMLElement | null> | null;
  showBurgerIcon: boolean;
  setShowBurgerIcon: (toggle: boolean) => void;
};

export default function Burger({
  burgerNav,
  showBurgerIcon,
  setShowBurgerIcon,
}: Props) {
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
      document.body.style.overflow = "hidden"; // Disables page scroller
      burgerNav?.current?.classList?.remove(...hideBurgerTailwind);
      burgerNav?.current?.classList.add(...showBurgerTailwind);
      setShowBurgerIcon(false);
    } else {
      document.body.style.overflow = ""; // Enables page scroller
      burgerNav?.current?.classList.remove(...showBurgerTailwind);
      burgerNav?.current?.classList.add(...hideBurgerTailwind);
      setShowBurgerIcon(true);
    }
  }
  // This bellow write better
  return showBurgerIcon ? (
    <span
      onClick={() => handleBurgerClick()}
      className="text-secondary-color z-5 cursor-pointer md:hidden"
    >
      <IoMenuOutline className="text-3xl" />
    </span>
  ) : (
    <span
      className="flex items-center text-2xl text-white"
      onClick={() => handleBurgerClick()}
    >
      <IoClose />
    </span>
  );
}
