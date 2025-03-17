import { Outlet } from "react-router-dom";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";

export default function SettingsDisplay() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[305px_1fr] lg:p-7">
      <SettingsMenuSidebar />
      <section className="hidden border-1 border-l-0 border-black lg:block">
        <div className="mx-auto h-full sm:p-7">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
