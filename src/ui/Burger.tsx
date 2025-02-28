export default function Burger() {
  function handleClick() {
    let nav = document.querySelector("#temp-nav");
    if (!nav) {
      const createNavID = document.querySelector("nav");
      if (createNavID === null) {
        console.error("Failed to create nav");
        return;
      }
      createNavID.id = "temp-nav";
      nav = document.querySelector("#temp-nav");
    }
    const isNavHidden = nav?.classList.contains("top-[-100%]");
    const hideNav = ["top-[-100%]", "pointer-events-none", "visibility-hidden"];
    const showNav = [
      "top-21",
      "bottom-0",
      "pointer-events-auto",
      "visibility:visible",
    ];
    if (isNavHidden) {
      if (nav === null) {
        console.error("nav element ne postoji");
        return;
      }
      nav.classList.remove(...hideNav);
      nav.classList.add(...showNav);
    } else {
      if (nav === null) {
        console.error("nav element ne postoji");
        return;
      }
      nav.classList.remove(...showNav);
      nav.classList.add(...hideNav);
    }
  }
  return (
    <span
      onClick={() => handleClick()}
      className="text-secondary-color z-5 cursor-pointer sm:hidden"
    >
      {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
      <ion-icon name="menu-outline" size="large"></ion-icon>
    </span>
  );
}
