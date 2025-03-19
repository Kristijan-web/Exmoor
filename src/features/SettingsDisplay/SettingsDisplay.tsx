import { Outlet } from "react-router-dom";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";
import { useEffect, useState } from "react";

export default function SettingsDisplay() {
  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(function showSettingsMenu() {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target?.getAttribute("href") === "/podesavanja") {
        console.log("ola");
        setHideSidebar(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className={`mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[305px_1fr] lg:p-7`}
    >
      <SettingsMenuSidebar
        hideSidebar={hideSidebar}
        setHideSidebar={setHideSidebar}
      />
      <section
        className={` ${hideSidebar ? "" : "hidden"} border-1 border-l-0 border-black lg:block`}
      >
        {/* Mozda je moglo hideSidebr ? null : <Outlet/> */}
        <Outlet />
      </section>
    </div>
  );
}
