import OtherSettings from "./OtherSettings/OtherSettings";
// import PasswordDisplay from "./PasswordSetting/PasswordSetting";
import SettingsMenu from "./SettingsMenu/SettingsMenu";

export default function SettingsDisplay() {
  return (
    <div className="grid grid-cols-15">
      <SettingsMenu />
      <OtherSettings />
      {/* <PasswordDisplay /> */}
    </div>
  );
}
