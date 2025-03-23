import { Outlet } from "react-router-dom";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BackButton from "./UserSettings/GeneralSettngs/BackButton";

export default function SettingsDisplay() {
  // liftin state up, because its needed in parent of Outlet
  const [showSidebar, setshowSidebar] = useState(true);
  const lessThan1024Width = useMediaQuery({ maxWidth: 1024 });
  useEffect(function showSettingsMenu() {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target?.getAttribute("href") === "/podesavanja") {
        setshowSidebar(true);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[305px_1fr] lg:p-7">
      <SettingsMenuSidebar
        lessThan1024Width={lessThan1024Width}
        setShowSidebar={setshowSidebar}
        showSidebar={showSidebar}
      />
      <section
        className={` ${showSidebar ? "hidden" : null} relative border-1 border-l-0 border-black lg:block`}
      >
        <BackButton setShowSidebar={setshowSidebar} />
        <Outlet />
      </section>
    </div>
  );
}
