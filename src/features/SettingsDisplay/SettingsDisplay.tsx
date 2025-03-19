import { Outlet } from "react-router-dom";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";
import { useState } from "react";

export default function SettingsDisplay() {
  const [hideSidebar, setHideSidebar] = useState(false);
  // 1. Resenje: Mozes resiti problem tako sto ces citati InnerWidth kada se pokrene aplikacija
  // 2. Resenje: Mozes da stavis strelicu za vracanje u nazad kada se prikaze user settings

  console.log(hideSidebar);
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
