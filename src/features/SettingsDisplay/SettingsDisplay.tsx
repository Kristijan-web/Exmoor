import { Outlet } from "react-router-dom";
import SettingsMenuSidebar from "./SettingsMenuSidebar/SettingsMenuSidebar";

export default function SettingsDisplay() {
  // const [showUserSettings, setShowUserSettings] = useState(false);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[305px_1fr] lg:p-7">
      <SettingsMenuSidebar />
      <Outlet />
      {/* PA MOGLO JE OVAKO */}
      {/* showUserSettings && <Outlet/> */}
    </div>
  );
}
