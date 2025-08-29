import {
  IoBagOutline,
  IoHeartOutline,
  IoLockClosedOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

type Props = {
  lessThan1024Width: boolean;
  setShowSidebar: (value: boolean) => void;
  showSidebar: boolean;
};

export default function SettingsMenuSidebar({
  lessThan1024Width,
  setShowSidebar,
  showSidebar,
}: Props) {
  const routes = [
    {
      to: "postavke",
      description: "Opšte postavke",
      icon: <IoPersonOutline />,
    },
    {
      to: "promena-sifre",
      description: "Promena šifre",
      icon: <IoLockClosedOutline />,
    },
    {
      to: "omiljeni-proizvodi",
      description: "Omiljeni proizvodi",
      icon: <IoHeartOutline />,
    },
    {
      to: "kupljeni-proizvodi",
      description: "Kupljeni proizvodi",
      icon: <IoBagOutline />,
    },
    {
      description: "Odjavi se",
      icon: <IoLogOutOutline />,
    },
  ];
  if (!showSidebar) {
    return null;
  }
  return (
    <aside
      data-testid="sidebar"
      className="lg:h-180 lg:border-1 lg:border-black"
    >
      <div className="flex h-full flex-col items-center justify-start gap-4 p-7 lg:gap-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white lg:h-25 lg:w-25">
            <span className="text-4xl">P</span>
          </div>
          <h2 className="mb-10 text-4xl">Dobrodošli Petar</h2>
        </div>
        <ul className="flex flex-col gap-10 px-5 lg:px-2">
          {routes.map(({ to, description, icon }, index) => {
            return (
              <li
                data-testid="sidebarOption"
                key={to || index}
                onClick={() => {
                  if (lessThan1024Width) {
                    setShowSidebar(false);
                  }
                }}
                className="flex cursor-pointer items-center justify-start gap-3"
              >
                <span className="flex items-center justify-start text-xl">
                  {icon}
                </span>
                {to ? (
                  <NavLink to={to} className="text-2xl lg:text-xl">
                    {description}
                  </NavLink>
                ) : (
                  <span className="text-2xl lg:text-xl">{description}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
