import { Outlet } from "react-router-dom";
// import PasswordDisplay from "./PasswordSetting/PasswordSetting";
import SettingsMenu from "./SettingsMenuSidebar/SettingsMenuSidebar";

export default function SettingsDisplay() {
  return (
    <div className="grid grid-cols-12">
      <SettingsMenu />
      <Outlet />
    </div>
  );
}
