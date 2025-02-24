export default function Burger() {
  function handleClick() {
    let nav = document.querySelector("#temp-nav");
    if (!nav) {
      const createNavID = document.querySelector("nav");
      createNavID.id = "temp-nav";
      nav = document.querySelector("#temp-nav");
    }
    const isNavHidden = nav.classList.contains("top-[-100%]");
    const hideNav = ["top-[-100%]", "pointer-events-none", "visibility-hidden"];
    const showNav = [
      "top-21",
      "bottom-0",
      "pointer-events-auto",
      "visibility:visible",
    ];
    if (isNavHidden) {
      nav.classList.remove(...hideNav);
      nav.classList.add(...showNav);
    } else {
      nav.classList.remove(...showNav);
      nav.classList.add(...hideNav);
    }
  }
  return (
    <span
      onClick={() => handleClick()}
      className="text-secondary-color z-5 cursor-pointer sm:hidden"
    >
      <ion-icon name="menu-outline" size="large"></ion-icon>
    </span>
  );
}
