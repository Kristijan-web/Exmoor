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
      /* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/
      icon: <ion-icon name="person-outline"></ion-icon>,
    },
    {
      to: "promena-sifre",
      description: "Promena šifre",
      /* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/
      icon: <ion-icon name="lock-closed-outline"></ion-icon>,
    },
    {
      to: "omiljeni-proizvodi",
      description: "Omiljeni proizvodi",
      /* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/
      icon: <ion-icon name="heart-outline"></ion-icon>,
    },
    {
      to: "kupljeni-proizvodi",
      description: "Kupljeni proizvodi",
      /* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/
      icon: <ion-icon name="bag-outline"></ion-icon>,
    },
    {
      description: "Odjavi se",
      /* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/
      icon: <ion-icon name="log-in-outline"></ion-icon>,
    },
  ];
  if (!showSidebar) {
    return null;
  }
  return (
    <aside className="lg:h-180 lg:border-1 lg:border-black">
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
                key={to || index}
                onClick={() => {
                  // proveri da li sectionOutlet ima na sebi hidden, ako nema onda ne izvrsavaj sledecu liniju
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
