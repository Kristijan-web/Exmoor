import BurgerMenu from "./BurgerMenu";

export default function Header() {
  return (
    <header className="p-x-horizontal bg-main-color-shade z-5 flex h-21 items-center justify-between">
      <p className="text-secondary-color z-5">Logo...</p>
      <BurgerMenu />
    </header>
  );
}
