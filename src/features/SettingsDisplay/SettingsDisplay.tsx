import { Outlet } from "react-router-dom";
// import PasswordDisplay from "./PasswordSetting/PasswordSetting";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";

export default function SettingsDisplay() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[305px_1fr] lg:p-7">
      <SettingsMenuSidebar />
      <Outlet />
    </div>
  );
}
